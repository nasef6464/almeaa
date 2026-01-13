import { NextResponse } from 'next/server';
import { TestService } from '@/app/services/test.service';
import { auth } from '@/lib/auth';

/**
 * POST /api/tests/submit - Submit test answers and get score
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
    const { attemptId, answers } = body;

    if (!attemptId || !answers) {
      return NextResponse.json(
        { success: false, error: 'attemptId and answers are required' },
        { status: 400 }
      );
    }

    // Submit test and calculate score
    const result = await TestService.submitTest(attemptId, answers);

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    console.error('Error submitting test:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to submit test',
      },
      { status: 500 }
    );
  }
}
