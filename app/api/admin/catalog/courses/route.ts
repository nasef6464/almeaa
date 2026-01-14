import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/db';
import { CatalogCategory } from '@prisma/client';

// GET: Fetch all courses
export async function GET() {
  try {
    const courses = await prisma.catalogCourse.findMany({
      orderBy: [
        { order: 'asc' },
        { createdAt: 'desc' }
      ]
    });

    return NextResponse.json({ courses });
  } catch (error) {
    console.error('Error fetching courses:', error);
    return NextResponse.json({ error: 'Failed to fetch courses' }, { status: 500 });
  }
}

// POST: Create new course
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const course = await prisma.catalogCourse.create({
      data: {
        category: body.category as CatalogCategory,
        title: body.title,
        instructor: body.instructor,
        rating: body.rating || 4.5,
        studentsCount: body.studentsCount || 0,
        price: body.price,
        oldPrice: body.oldPrice || null,
        badge: body.badge || null,
        imageUrl: body.imageUrl || null,
        isPublished: body.isPublished ?? true,
        order: body.order || 0,
      }
    });

    return NextResponse.json({ course }, { status: 201 });
  } catch (error) {
    console.error('Error creating course:', error);
    return NextResponse.json({ error: 'Failed to create course' }, { status: 500 });
  }
}

// PUT: Update existing course
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    
    if (!body.id) {
      return NextResponse.json({ error: 'Course ID is required' }, { status: 400 });
    }

    const course = await prisma.catalogCourse.update({
      where: { id: body.id },
      data: {
        category: body.category as CatalogCategory,
        title: body.title,
        instructor: body.instructor,
        rating: body.rating,
        studentsCount: body.studentsCount,
        price: body.price,
        oldPrice: body.oldPrice || null,
        badge: body.badge || null,
        imageUrl: body.imageUrl || null,
        isPublished: body.isPublished,
        order: body.order,
      }
    });

    return NextResponse.json({ course });
  } catch (error) {
    console.error('Error updating course:', error);
    return NextResponse.json({ error: 'Failed to update course' }, { status: 500 });
  }
}

// DELETE: Delete course
export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    
    if (!body.id) {
      return NextResponse.json({ error: 'Course ID is required' }, { status: 400 });
    }

    await prisma.catalogCourse.delete({
      where: { id: body.id }
    });

    return NextResponse.json({ message: 'Course deleted successfully' });
  } catch (error) {
    console.error('Error deleting course:', error);
    return NextResponse.json({ error: 'Failed to delete course' }, { status: 500 });
  }
}
