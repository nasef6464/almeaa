import { prisma } from '@/app/db';

interface SkillMasteryData {
  skillId: string;
  masteryScore: number;
  totalAttempts: number;
  correctAnswers: number;
  lastAttemptDate: Date | null;
}

export class SaherEngine {
  /**
   * حساب نسبة الإتقان للمهارة
   */
  static async calculateMastery(
    studentId: string,
    skillId: string
  ): Promise<number> {
    const attempts = await prisma.testAttempt.findMany({
      where: {
        studentId,
        completedAt: {
          not: null,
        },
        test: {
          questions: {
            some: {
              question: { skillId },
            },
          },
        },
      },
      include: {
        answers: {
          include: {
            question: true,
          },
        },
      },
      orderBy: { completedAt: 'desc' },
      take: 10, // آخر 10 محاولات
    });

    if (attempts.length === 0) return 0;

    // 1. حساب نسبة الإجابات الصحيحة
    let totalQuestions = 0;
    let correctAnswers = 0;

    attempts.forEach((attempt) => {
      attempt.answers.forEach((answer) => {
        if (answer.question.skillId === skillId) {
          totalQuestions++;
          if (answer.isCorrect) correctAnswers++;
        }
      });
    });

    if (totalQuestions === 0) return 0;

    const accuracy = (correctAnswers / totalQuestions) * 100;

    // 2. عامل التحسن (مقارنة أحدث 3 محاولات بأقدم 3)
    const improvement = this.calculateImprovement(attempts, skillId);

    // 3. عامل الاستمرارية (Consistency)
    const consistency = this.calculateConsistency(attempts, skillId);

    // 4. النسبة النهائية (متوسط مرجح)
    const mastery = accuracy * 0.6 + improvement * 0.25 + consistency * 0.15;

    // 5. حفظ في قاعدة البيانات
    await prisma.studentSkillMastery.upsert({
      where: {
        studentId_skillId: { studentId, skillId },
      },
      update: {
        masteryScore: Math.round(mastery),
        lastAttemptAt: new Date(),
        attemptsCount: { increment: 1 },
      },
      create: {
        studentId,
        skillId,
        masteryScore: Math.round(mastery),
        lastAttemptAt: new Date(),
        attemptsCount: 1,
      },
    });

    return Math.round(mastery);
  }

  /**
   * حساب عامل التحسن
   */
  private static calculateImprovement(
    attempts: any[],
    skillId: string
  ): number {
    if (attempts.length < 2) return 50;

    const recentAttempts = attempts.slice(0, 3);
    const oldAttempts = attempts.slice(-3);

    const recentScore = this.getAverageScore(recentAttempts, skillId);
    const oldScore = this.getAverageScore(oldAttempts, skillId);

    // نسبة التحسن (من 0 إلى 100)
    const improvement = ((recentScore - oldScore) / 100) * 100 + 50;
    return Math.max(0, Math.min(100, improvement));
  }

  /**
   * حساب عامل الاستمرارية
   */
  private static calculateConsistency(
    attempts: any[],
    skillId: string
  ): number {
    if (attempts.length < 3) return 50;

    const scores = attempts.map((attempt) =>
      this.getAttemptScore(attempt, skillId)
    );

    // حساب الانحراف المعياري
    const mean = scores.reduce((a, b) => a + b, 0) / scores.length;
    const variance =
      scores.reduce((sum, score) => sum + Math.pow(score - mean, 2), 0) /
      scores.length;
    const stdDev = Math.sqrt(variance);

    // كلما قل الانحراف المعياري، زادت الاستمرارية
    const consistency = 100 - Math.min(stdDev, 100);
    return consistency;
  }

  /**
   * حساب متوسط الدرجات
   */
  private static getAverageScore(attempts: any[], skillId: string): number {
    if (attempts.length === 0) return 0;

    const scores = attempts.map((attempt) =>
      this.getAttemptScore(attempt, skillId)
    );
    return scores.reduce((a, b) => a + b, 0) / scores.length;
  }

  /**
   * حساب درجة محاولة واحدة
   */
  private static getAttemptScore(attempt: any, skillId: string): number {
    const skillAnswers = attempt.answers.filter(
      (a: any) => a.question.skillId === skillId
    );
    if (skillAnswers.length === 0) return 0;

    const correct = skillAnswers.filter((a: any) => a.isCorrect).length;
    return (correct / skillAnswers.length) * 100;
  }

  /**
   * اكتشاف نقاط الضعف
   */
  static async detectWeakSkills(
    studentId: string,
    threshold: number = 60
  ): Promise<SkillMasteryData[]> {
    const masteries = await prisma.studentSkillMastery.findMany({
      where: {
        studentId,
        masteryScore: { lt: threshold },
      },
      include: {
        skill: {
          select: {
            id: true,
            name: true,
            section: {
              select: {
                name: true,
                category: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
      orderBy: { masteryScore: 'asc' },
    });

    return masteries.map((m) => ({
      skillId: m.skillId,
      masteryScore: m.masteryScore,
      totalAttempts: m.attemptsCount,
      correctAnswers: 0,
      lastAttemptDate: m.lastAttemptAt,
    }));
  }

  /**
   * توليد خطة علاجية
   */
  static async generateRecoveryPlan(
    studentId: string,
    weakSkillIds: string[],
    durationDays: number = 30
  ) {
    // 1. إنشاء الخطة
    const plan = await prisma.recoveryPlan.create({
      data: {
        studentId,
        title: 'خطة علاجية',
        description: `خطة لتحسين ${weakSkillIds.length} مهارة ضعيفة خلال ${durationDays} يوم`,
      },
    });

    // 2. إضافة المهارات
    for (const skillId of weakSkillIds) {
      await prisma.recoveryPlanSkill.create({
        data: {
          recoveryPlanId: plan.id,
          skillId,
          targetScore: 80, // الهدف: 80%
        },
      });
    }

    return plan;
  }

  /**
   * اختيار أسئلة تكيفية
   */
  static async selectAdaptiveQuestions(
    studentId: string,
    skillId: string,
    count: number = 10
  ) {
    const mastery = await this.getCurrentMastery(studentId, skillId);

    // تحديد مستوى الصعوبة المناسب
    let difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
    if (mastery < 40) {
      difficulty = 'BEGINNER';
    } else if (mastery < 70) {
      difficulty = 'INTERMEDIATE';
    } else {
      difficulty = 'ADVANCED';
    }

    // جلب الأسئلة
    const questions = await prisma.question.findMany({
      where: {
        skillId,
        difficultyLevel: difficulty,
      },
      take: count,
    });

    return questions;
  }

  /**
   * الحصول على نسبة الإتقان الحالية
   */
  static async getCurrentMastery(
    studentId: string,
    skillId: string
  ): Promise<number> {
    const mastery = await prisma.studentSkillMastery.findUnique({
      where: {
        studentId_skillId: { studentId, skillId },
      },
    });

    return mastery?.masteryScore || 0;
  }

  /**
   * تحديث جميع نسب الإتقان لطالب
   */
  static async updateAllMasteries(studentId: string) {
    // جلب جميع المهارات التي حاول الطالب الإجابة عليها
    const attempts = await prisma.testAttempt.findMany({
      where: { 
        studentId, 
        completedAt: { not: null } 
      },
      include: {
        answers: {
          include: { question: true },
        },
      },
    });

    const skillIds = new Set<string>();
    attempts.forEach((attempt) => {
      attempt.answers.forEach((answer) => {
        if (answer.question.skillId) {
          skillIds.add(answer.question.skillId);
        }
      });
    });

    // تحديث كل مهارة
    for (const skillId of skillIds) {
      await this.calculateMastery(studentId, skillId);
    }
  }
}
