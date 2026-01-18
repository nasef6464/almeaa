import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/app/db';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ testId: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { testId } = await params;

    const test = await prisma.test.findUnique({
      where: { id: testId },
      include: {
        questions: {
          include: {
            question: true,
          },
          orderBy: { order: 'asc' },
        },
      },
    });

    if (!test) {
      return NextResponse.json({ success: false, error: 'Test not found' }, { status: 404 });
    }

    // إنشاء محاولة جديدة
    const studentId = session.user.student?.id;
    if (!studentId) {
      return NextResponse.json({ success: false, error: 'Student not found' }, { status: 404 });
    }

    const attempt = await prisma.testAttempt.create({
      data: {
        testId: test.id,
        studentId,
        startedAt: new Date(),
        score: 0,
        totalPoints: 0,
        earnedPoints: 0,
        timeSpent: 0,
      },
    });

    // تنسيق البيانات
    const formattedTest = {
      id: test.id,
      title: test.title,
      timeLimit: test.timeLimit || 60,
      questions: test.questions.map((tq) => {
        const options = tq.question.options as any;
        return {
          id: tq.question.id,
          text: tq.question.question,
          explanation: tq.question.explanation,
          options: Array.isArray(options) ? options : [],
        };
      }),
    };

    return NextResponse.json({
      success: true,
      test: formattedTest,
      attemptId: attempt.id,
    });
  } catch (error) {
    console.error('Error loading test:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
