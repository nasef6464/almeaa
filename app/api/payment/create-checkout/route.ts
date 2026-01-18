import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { stripe } from '@/lib/stripe';
import { prisma } from '@/app/db';

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { courseId } = await req.json();

    // جلب معلومات الدورة
    const course = await prisma.course.findUnique({
      where: { id: courseId },
      select: {
        id: true,
        title: true,
        price: true,
      },
    });

    if (!course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }

    if (!course.price || course.price <= 0) {
      return NextResponse.json({ error: 'Course is free' }, { status: 400 });
    }

    // التحقق من التسجيل المسبق
    const studentId = session.user.student?.id;
    if (studentId) {
      const existingEnrollment = await prisma.enrollment.findUnique({
        where: {
          studentId_courseId: {
            studentId,
            courseId: course.id,
          },
        },
      });

      if (existingEnrollment) {
        return NextResponse.json(
          { error: 'Already enrolled' },
          { status: 400 }
        );
      }
    }

    // إنشاء جلسة Stripe Checkout
    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'sar', // ريال سعودي
            product_data: {
              name: course.title,
              description: `دورة ${course.title}`,
            },
            unit_amount: Math.round(course.price * 100), // تحويل لفلس
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXTAUTH_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXTAUTH_URL}/payment/cancelled`,
      customer_email: session.user.email || undefined,
      metadata: {
        userId: session.user.id,
        courseId: course.id,
        studentId: studentId || '',
      },
    });

    // حفظ الدفع في قاعدة البيانات
    await prisma.payment.create({
      data: {
        amount: course.price,
        currency: 'SAR',
        status: 'PENDING',
        transactionId: checkoutSession.id,
        paymentMethod: 'STRIPE',
      },
    });

    return NextResponse.json({ sessionId: checkoutSession.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
