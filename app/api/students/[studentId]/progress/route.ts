import { NextResponse } from 'next/server';
import { SkillService } from '@/app/services/skill.service';

/**
 * GET /api/students/:studentId/progress - Get student overall progress
 */
export async function GET(
  request: Request,
  { params }: { params: { studentId: string } }
) {
  try {
    const { studentId } = params;

    const progress = await SkillService.getStudentProgress(studentId);
    const weakSkills = await SkillService.getWeakSkills(studentId);
    const recommendations = await SkillService.getRecommendedVideos(studentId);

    return NextResponse.json({
      success: true,
      data: {
        progress,
        weakSkills,
        recommendations,
      },
    });
  } catch (error) {
    console.error('Error fetching student progress:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch student progress',
      },
      { status: 500 }
    );
  }
}
