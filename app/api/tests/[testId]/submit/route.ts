import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/app/db';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ testId: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { testId } = await params;
    const { attemptId } = await req.json();

    // التحقق من أن المحاولة تخص المستخدم
    const attempt = await prisma.testAttempt.findUnique({
      where: { id: attemptId },
      include: {
        student: { include: { user: true } },
        test: {
          include: {
            questions: true,
          },
        },
        answers: true,
      },
    });

    if (!attempt || attempt.student.userId !== session.user.id) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    if (attempt.completedAt) {
      return NextResponse.json(
        { success: false, error: 'Test already completed' },
        { status: 400 }
      );
    }

    // حساب النتيجة
    const totalQuestions = attempt.test.questions.length;
    const correctAnswers = attempt.answers.filter((a) => a.isCorrect).length;
    const score = totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0;
    const passed = score >= (attempt.test.passingScore || 60);

    // تحديث المحاولة
    const timeSpent = Math.round(
      (new Date().getTime() - attempt.startedAt.getTime()) / 1000
    );

    await prisma.testAttempt.update({
      where: { id: attemptId },
      data: {
        completedAt: new Date(),
        score,
        totalPoints: totalQuestions,
        earnedPoints: correctAnswers,
        timeSpent,
      },
    });

    return NextResponse.json({ success: true, score, passed });
  } catch (error) {
    console.error('Error submitting test:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
