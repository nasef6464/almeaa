import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/db';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      name, 
      email, 
      password, 
      role, 
      phone,
      // Student fields
      grade,
      schoolName,
      dateOfBirth,
      // Trainer fields
      bio,
      specialization,
      // Parent fields
      relationToStudent,
    } = body;

    // Validation
    if (!name || !email || !password || !phone) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    // Role-specific validation
    if (role === 'STUDENT' && (!grade || !dateOfBirth)) {
      return NextResponse.json(
        { error: 'Student accounts require grade and date of birth' },
        { status: 400 }
      );
    }

    if (role === 'TRAINER' && !specialization) {
      return NextResponse.json(
        { error: 'Trainer accounts require specialization' },
        { status: 400 }
      );
    }

    if (role === 'PARENT' && !relationToStudent) {
      return NextResponse.json(
        { error: 'Parent accounts require relation to student' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phone,
        role: role || 'STUDENT',
        isActive: true,
        emailVerified: new Date(),
      },
    });

    // Create related record based on role
    if (role === 'STUDENT') {
      await prisma.student.create({
        data: {
          userId: user.id,
          grade: grade,
          dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
        },
      });
      
      // Update school name if provided (stored in user table as metadata)
      if (schoolName) {
        await prisma.user.update({
          where: { id: user.id },
          data: { 
            // Store in a way that doesn't break schema
            name: `${name} (${schoolName})` 
          },
        });
      }
    } else if (role === 'TRAINER') {
      await prisma.trainer.create({
        data: {
          userId: user.id,
          bio: bio || null,
          specialization: specialization || null,
        },
      });
    } else if (role === 'PARENT') {
      await prisma.parent.create({
        data: {
          userId: user.id,
        },
      });
    } else if (role === 'SUPERVISOR') {
      await prisma.supervisor.create({
        data: {
          userId: user.id,
        },
      });
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Account created successfully',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'An error occurred during registration' },
      { status: 500 }
    );
  }
}
