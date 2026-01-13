import { NextResponse } from 'next/server';
import { SkillService } from '@/app/services/skill.service';

/**
 * GET /api/skills - Get skill tree hierarchy
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const subjectId = searchParams.get('subjectId') || undefined;

    const skillTree = await SkillService.getSkillTree(subjectId);

    return NextResponse.json({
      success: true,
      data: skillTree,
    });
  } catch (error) {
    console.error('Error fetching skill tree:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch skill tree',
      },
      { status: 500 }
    );
  }
}
