import { NextRequest, NextResponse } from 'next/server';
import { signIn } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    console.log('🔐 API Login attempt for:', email);

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required', success: false },
        { status: 400 }
      );
    }

    // Use NextAuth signIn server-side
    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      console.log('📊 SignIn result:', result);

      return NextResponse.json({
        success: true,
        message: 'Login successful'
      });
    } catch (authError: any) {
      console.error('❌ Auth error:', authError);
      return NextResponse.json(
        { error: authError.message || 'Invalid credentials', success: false },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('💥 Login API error:', error);
    return NextResponse.json(
      { error: 'An error occurred during login', success: false },
      { status: 500 }
    );
  }
}
