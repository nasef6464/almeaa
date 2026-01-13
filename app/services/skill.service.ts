/**
 * Skill Service - Business Logic for Skills-Based Learning
 * 
 * This service handles:
 * - Skill CRUD operations
 * - Student skill mastery tracking
 * - Adaptive test generation
 * - Recovery plan creation
 */

import { prisma } from '@/app/db';
import { ContentStatus } from '@/app/generated/prisma';

export class SkillService {
  /**
   * Get skill hierarchy (Subject -> Category -> Section -> Skill)
   */
  static async getSkillTree(subjectId?: string) {
    const where = subjectId ? { id: subjectId } : {};

    return await prisma.subject.findMany({
      where: {
        ...where,
        status: ContentStatus.PUBLISHED,
      },
      include: {
        categories: {
          where: { status: ContentStatus.PUBLISHED },
          orderBy: { order: 'asc' },
          include: {
            sections: {
              where: { status: ContentStatus.PUBLISHED },
              orderBy: { order: 'asc' },
              include: {
                skills: {
                  where: { status: ContentStatus.PUBLISHED },
                  orderBy: { order: 'asc' },
                  include: {
                    _count: {
                      select: {
                        questions: true,
                        videos: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      orderBy: { order: 'asc' },
    });
  }

  /**
   * Get student's mastery for a specific skill
   */
  static async getStudentSkillMastery(studentId: string, skillId: string) {
    return await prisma.studentSkillMastery.findUnique({
      where: {
        studentId_skillId: {
          studentId,
          skillId,
        },
      },
      include: {
        skill: {
          include: {
            section: {
              include: {
                category: {
                  include: {
                    subject: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  /**
   * Update student skill mastery after test
   */
  static async updateSkillMastery(
    studentId: string,
    skillId: string,
    score: number
  ) {
    const existing = await prisma.studentSkillMastery.findUnique({
      where: {
        studentId_skillId: { studentId, skillId },
      },
    });

    if (existing) {
      // Calculate weighted average (70% old, 30% new)
      const newMastery = existing.masteryScore * 0.7 + score * 0.3;

      return await prisma.studentSkillMastery.update({
        where: {
          studentId_skillId: { studentId, skillId },
        },
        data: {
          masteryScore: newMastery,
          attemptsCount: { increment: 1 },
          lastAttemptAt: new Date(),
        },
      });
    } else {
      return await prisma.studentSkillMastery.create({
        data: {
          studentId,
          skillId,
          masteryScore: score,
          attemptsCount: 1,
          lastAttemptAt: new Date(),
        },
      });
    }
  }

  /**
   * Get weak skills for a student (mastery < threshold)
   */
  static async getWeakSkills(studentId: string, threshold: number = 60) {
    return await prisma.studentSkillMastery.findMany({
      where: {
        studentId,
        masteryScore: { lt: threshold },
      },
      include: {
        skill: {
          include: {
            section: {
              include: {
                category: {
                  include: {
                    subject: true,
                  },
                },
              },
            },
            videos: {
              where: { status: ContentStatus.PUBLISHED },
              orderBy: { order: 'asc' },
            },
          },
        },
      },
      orderBy: {
        masteryScore: 'asc',
      },
    });
  }

  /**
   * Generate adaptive recovery plan
   */
  static async createRecoveryPlan(
    studentId: string,
    weakSkillIds: string[],
    targetScore: number = 80
  ) {
    const weakSkills = await prisma.studentSkillMastery.findMany({
      where: {
        studentId,
        skillId: { in: weakSkillIds },
      },
      include: {
        skill: true,
      },
    });

    const recoveryPlan = await prisma.recoveryPlan.create({
      data: {
        studentId,
        title: `Recovery Plan - ${new Date().toLocaleDateString()}`,
        description: `Auto-generated recovery plan for ${weakSkills.length} weak skills`,
        skills: {
          create: weakSkills.map((ws) => ({
            skillId: ws.skillId,
            targetScore,
          })),
        },
      },
      include: {
        skills: {
          include: {
            skill: true,
          },
        },
      },
    });

    return recoveryPlan;
  }

  /**
   * Get recommended videos based on weak skills
   */
  static async getRecommendedVideos(studentId: string, limit: number = 10) {
    const weakSkills = await this.getWeakSkills(studentId);
    const skillIds = weakSkills.map((ws) => ws.skillId);

    return await prisma.video.findMany({
      where: {
        skillId: { in: skillIds },
        status: ContentStatus.PUBLISHED,
      },
      include: {
        skill: {
          include: {
            section: {
              include: {
                category: {
                  include: {
                    subject: true,
                  },
                },
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: limit,
    });
  }

  /**
   * Get student overall progress
   */
  static async getStudentProgress(studentId: string) {
    const masteryRecords = await prisma.studentSkillMastery.findMany({
      where: { studentId },
    });

    const totalSkills = masteryRecords.length;
    const masteredSkills = masteryRecords.filter(
      (m) => m.masteryScore >= 80
    ).length;
    const averageMastery =
      masteryRecords.reduce((sum, m) => sum + m.masteryScore, 0) / totalSkills || 0;

    return {
      totalSkills,
      masteredSkills,
      weakSkills: totalSkills - masteredSkills,
      averageMastery: Math.round(averageMastery),
      masteryPercentage: Math.round((masteredSkills / totalSkills) * 100) || 0,
    };
  }
}
