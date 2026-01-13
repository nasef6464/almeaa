import { NextResponse } from 'next/server';
import { prisma } from '@/app/db';

const categoryMap: Record<string, any> = {
  quant: 'QUDRAT_QUANT',
  verbal: 'QUDRAT_VERBAL',
  math: 'TAHSILI_MATH',
  physics: 'TAHSILI_PHYSICS',
  chemistry: 'TAHSILI_CHEMISTRY',
  biology: 'TAHSILI_BIOLOGY',
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');
  const dataType = searchParams.get('dataType'); // courses, skills, banks, tests, packages

  if (!type || !categoryMap[type]) {
    return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
  }

  const category = categoryMap[type];

  try {
    let data;

    switch (dataType) {
      case 'courses':
        data = await prisma.catalogCourse.findMany({
          where: { category, isPublished: true },
          orderBy: { order: 'asc' },
        });
        break;

      case 'skills':
        data = await prisma.catalogSkill.findMany({
          where: { category },
          include: {
            videoLessons: {
              orderBy: { order: 'asc' },
            },
          },
          orderBy: { order: 'asc' },
        });
        break;

      case 'banks':
        data = await prisma.catalogQuestionBank.findMany({
          where: { category },
          orderBy: { order: 'asc' },
        });
        break;

      case 'tests':
        data = await prisma.catalogSimTest.findMany({
          where: { category },
          orderBy: { order: 'asc' },
        });
        break;

      case 'packages':
        const packageType = type === 'quant' || type === 'verbal' ? 'QUDRAT' : 'TAHSILI';
        data = await prisma.catalogPackage.findMany({
          where: { type: packageType },
          orderBy: { order: 'asc' },
        });
        break;

      default:
        // Return all data
        const [courses, skills, banks, tests, packages] = await Promise.all([
          prisma.catalogCourse.findMany({
            where: { category, isPublished: true },
            orderBy: { order: 'asc' },
          }),
          prisma.catalogSkill.findMany({
            where: { category },
            include: {
              videoLessons: {
                orderBy: { order: 'asc' },
              },
            },
            orderBy: { order: 'asc' },
          }),
          prisma.catalogQuestionBank.findMany({
            where: { category },
            orderBy: { order: 'asc' },
          }),
          prisma.catalogSimTest.findMany({
            where: { category },
            orderBy: { order: 'asc' },
          }),
          prisma.catalogPackage.findMany({
            where: { type: type === 'quant' || type === 'verbal' ? 'QUDRAT' : 'TAHSILI' },
            orderBy: { order: 'asc' },
          }),
        ]);

        return NextResponse.json({
          courses,
          skills,
          banks,
          tests,
          packages,
        });
    }

    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Error fetching catalog data:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
