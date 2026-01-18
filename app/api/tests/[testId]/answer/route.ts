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
    const { attemptId, questionId, optionId } = await req.json();

    // التحقق من أن المحاولة تخص المستخدم
    const attempt = await prisma.testAttempt.findUnique({
      where: { id: attemptId },
      include: { student: { include: { user: true } } },
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

    // التحقق من الإجابة الصحيحة
    const question = await prisma.question.findUnique({
      where: { id: questionId },
    });

    if (!question) {
      return NextResponse.json({ success: false, error: 'Question not found' }, { status: 404 });
    }

    // افترض أن options هو JSON array وأن correctAnswer يحتوي على الـ ID الصحيح
    const isCorrect = question.correctAnswer === optionId;

    // حفظ أو تحديث الإجابة
    await prisma.questionAnswer.upsert({
      where: {
        attemptId_questionId: {
          attemptId,
          questionId,
        },
      },
      update: {
        answer: optionId,
        isCorrect,
        pointsEarned: isCorrect ? (question.points || 1) : 0,
        timeSpent: 0,
      },
      create: {
        attemptId,
        questionId,
        answer: optionId,
        isCorrect,
        pointsEarned: isCorrect ? (question.points || 1) : 0,
        timeSpent: 0,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving answer:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
