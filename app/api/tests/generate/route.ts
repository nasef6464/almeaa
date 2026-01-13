import { NextResponse } from 'next/server';
import { TestService } from '@/app/services/test.service';
import { auth } from '@/lib/auth';

/**
 * POST /api/tests/generate - Generate adaptive test for a skill
 */
export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { skillId, questionCount = 5 } = body;

    if (!skillId) {
      return NextResponse.json(
        { success: false, error: 'skillId is required' },
        { status: 400 }
      );
    }

    // Generate adaptive test
    const test = await TestService.generateAdaptiveTest(
      session.user.id,
      skillId,
      questionCount
    );

    return NextResponse.json({
      success: true,
      data: test,
    });
  } catch (error) {
    console.error('Error generating test:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to generate test',
      },
      { status: 500 }
    );
  }
}
