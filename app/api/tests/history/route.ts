import { NextResponse } from 'next/server';
import { TestService } from '@/app/services/test.service';
import { auth } from '@/lib/auth';

/**
 * GET /api/tests/history?skillId=optional - Get student test history
 */
export async function GET(request: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const skillId = searchParams.get('skillId') || undefined;

    const history = await TestService.getTestHistory(session.user.id, skillId);

    return NextResponse.json({
      success: true,
      data: history,
    });
  } catch (error) {
    console.error('Error fetching test history:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch test history',
      },
      { status: 500 }
    );
  }
}
