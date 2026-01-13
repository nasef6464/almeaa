/**
 * Test Service - Adaptive Testing Logic
 * 
 * This service handles:
 * - Adaptive test generation based on student skill level
 * - Test scoring and mastery calculation
 * - Recovery plan generation for weak skills
 */

import { prisma } from '@/app/db';
import { DifficultyLevel, QuestionType, TestType } from '@/app/generated/prisma';
import type { Prisma, Question } from '@/app/generated/prisma';
import { SkillService } from './skill.service';

export class TestService {
  /**
   * Generate adaptive test for a skill
   * Selects questions based on:
   * - Student's current mastery level
   * - Question difficulty distribution
   * - Previously answered questions (avoid repeats)
   */
  static async generateAdaptiveTest(
    studentId: string,
    skillId: string,
    questionCount: number = 5
  ) {
    // Get student's current mastery for this skill
    const mastery = await SkillService.getStudentSkillMastery(studentId, skillId);
    const masteryScore = mastery?.masteryScore || 0;

    // Determine difficulty distribution based on mastery
    let difficultyDistribution: { level: DifficultyLevel; count: number }[];

    if (masteryScore < 40) {
      // Beginner focus
      difficultyDistribution = [
        { level: DifficultyLevel.BEGINNER, count: Math.ceil(questionCount * 0.7) },
        { level: DifficultyLevel.INTERMEDIATE, count: Math.floor(questionCount * 0.3) },
      ];
    } else if (masteryScore < 70) {
      // Balanced
      difficultyDistribution = [
        { level: DifficultyLevel.BEGINNER, count: Math.ceil(questionCount * 0.2) },
        { level: DifficultyLevel.INTERMEDIATE, count: Math.ceil(questionCount * 0.5) },
        { level: DifficultyLevel.ADVANCED, count: Math.floor(questionCount * 0.3) },
      ];
    } else {
      // Challenge mode
      difficultyDistribution = [
        { level: DifficultyLevel.INTERMEDIATE, count: Math.ceil(questionCount * 0.4) },
        { level: DifficultyLevel.ADVANCED, count: Math.floor(questionCount * 0.6) },
      ];
    }

    // Get previously answered questions to avoid repeats
    const previousAttempts = await prisma.testAttempt.findMany({
      where: {
        studentId,
        test: {
          testQuestions: {
            some: {
              question: { skillId },
            },
          },
        },
      },
      include: {
        answers: { select: { questionId: true } },
      },
      take: 5,
      orderBy: { createdAt: 'desc' },
    });

    const answeredQuestionIds = previousAttempts.flatMap((attempt) => attempt.answers.map((qa) => qa.questionId));

    // Fetch questions by difficulty
    const selectedQuestions = [];
    
    for (const { level, count } of difficultyDistribution) {
      const questions = await prisma.question.findMany({
        where: {
          skillId,
          difficultyLevel: level,
          id: { notIn: answeredQuestionIds },
        },
        take: count,
        orderBy: { createdAt: 'desc' },
      });

      selectedQuestions.push(...questions);
    }

    // If we don't have enough unique questions, allow repeats
    if (selectedQuestions.length < questionCount) {
      const additionalQuestions = await prisma.question.findMany({
        where: {
          skillId,
          id: { notIn: selectedQuestions.map((q) => q.id) },
        },
        take: questionCount - selectedQuestions.length,
      });
      selectedQuestions.push(...additionalQuestions);
    }

    // Create test record
    const test = await prisma.test.create({
      data: {
        title: `اختبار تكيفي - ${new Date().toLocaleDateString('ar-SA')}`,
        type: TestType.PRACTICE,
        timeLimit: questionCount * 2, // دقائق تقديرية
        passingScore: 60,
        testQuestions: {
          create: selectedQuestions.map((question, index) => ({
            questionId: question.id,
            order: index + 1,
          })),
        },
      },
      include: {
        testQuestions: {
          include: {
            question: true,
          },
          orderBy: { order: 'asc' },
        },
      },
    });

    // Create test attempt
    const attempt = await prisma.testAttempt.create({
      data: {
        studentId,
        testId: test.id,
        startedAt: new Date(),
      },
    });

    return {
      attemptId: attempt.id,
      test: {
        id: test.id,
        title: test.title,
        timeLimit: test.timeLimit,
        questionCount: selectedQuestions.length,
        questions: test.testQuestions.map((tq) => ({
          id: tq.question.id,
          text: tq.question.question,
          type: tq.question.type,
          options: tq.question.options,
          difficultyLevel: tq.question.difficultyLevel,
          points: tq.question.points,
        })),
      },
    };
  }

  /**
   * Submit test and calculate score
   */
  static async submitTest(
    attemptId: string,
    answers: { questionId: string; answer: string }[]
  ) {
    const attempt = await prisma.testAttempt.findUnique({
      where: { id: attemptId },
      include: {
        test: {
          include: {
            testQuestions: {
              include: { question: true },
            },
          },
        },
        student: true,
      },
    });

    if (!attempt) {
      throw new Error('Test attempt not found');
    }

    if (attempt.completedAt) {
      throw new Error('Test already submitted');
    }

    let totalPoints = 0;
    let earnedPoints = 0;
    const questionAnswers = [];

    // Grade each answer
    for (const answer of answers) {
      const testQuestion = attempt.test.testQuestions.find(
        (tq) => tq.questionId === answer.questionId
      );

      if (!testQuestion) continue;

      const question = testQuestion.question;
      const isCorrect = this.checkAnswer(question, answer.answer);
      const pointsEarned = isCorrect ? question.points : 0;

      totalPoints += question.points;
      earnedPoints += pointsEarned;

      questionAnswers.push({
        attemptId,
        questionId: answer.questionId,
        answer: answer.answer,
        isCorrect,
        pointsEarned,
      });
    }

    const score = totalPoints > 0 ? Math.round((earnedPoints / totalPoints) * 100) : 0;
    const passed = score >= attempt.test.passingScore;

    // Save answers and update attempt
    await prisma.$transaction([
      prisma.questionAnswer.createMany({
        data: questionAnswers,
      }),
      prisma.testAttempt.update({
        where: { id: attemptId },
        data: {
          completedAt: new Date(),
          score,
          passed,
          totalPoints,
          earnedPoints,
        },
      }),
    ]);

    // Update skill mastery for each skill in the test
    const skillIds = [
      ...new Set(
        attempt.test.testQuestions.map((tq) => tq.question.skillId)
      ),
    ];

    for (const skillId of skillIds) {
      await SkillService.updateSkillMastery(attempt.studentId, skillId, score);
    }

    // Generate recovery plan if score is low
    if (score < 60) {
      const weakSkills = await SkillService.getWeakSkills(attempt.studentId, 60);
      if (weakSkills.length > 0) {
        await SkillService.createRecoveryPlan(
          attempt.studentId,
          weakSkills.map((s) => s.id),
          new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 1 week deadline
        );
      }
    }

    return {
      score,
      passed,
      totalPoints,
      earnedPoints,
      questionsCount: answers.length,
      correctAnswers: questionAnswers.filter((qa) => qa.isCorrect).length,
      details: questionAnswers,
    };
  }

  /**
   * Check if an answer is correct
   */
  private static checkAnswer(
    question: Pick<Question, 'type' | 'correctAnswer'>,
    studentAnswer: string
  ): boolean {
    const normalizedAnswer = studentAnswer.trim().toLowerCase();
    const normalizedCorrect = String(question.correctAnswer || '').trim().toLowerCase();

    if (question.type === QuestionType.MULTIPLE_CHOICE) {
      return normalizedAnswer === normalizedCorrect;
    }

    if (question.type === QuestionType.TRUE_FALSE) {
      return normalizedAnswer === normalizedCorrect;
    }

    if (question.type === QuestionType.FILL_BLANK) {
      return normalizedAnswer === normalizedCorrect;
    }

    // For essay/matching we skip auto-grade
    return false;
  }

  /**
   * Get student's test history for a skill
   */
  static async getTestHistory(studentId: string, skillId?: string) {
    const where: Prisma.TestAttemptWhereInput = { studentId };

    if (skillId) {
      where.test = {
        testQuestions: {
          some: {
            question: { skillId },
          },
        },
      };
    }

    return prisma.testAttempt.findMany({
      where,
      include: {
        test: {
          select: {
            title: true,
            type: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: 10,
    });
  }
}
