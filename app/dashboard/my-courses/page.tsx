import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { prisma } from '@/app/db';

export default async function MyCoursesPage() {
  const session = await auth();
  if (!session?.user) redirect('/auth/signin');
  if (session.user.role !== 'STUDENT') {
    redirect('/dashboard');
  }

  const studentId = session.user.student?.id;
  const enrollments = studentId
    ? await prisma.enrollment.findMany({
        where: { studentId },
        include: { course: { select: { id: true, title: true, level: true } } },
        orderBy: { enrolledAt: 'desc' },
      })
    : [];

  return (
    <div className="space-y-6" dir="rtl">
      <header className="space-y-1">
        <p className="text-sm text-slate-500">دوراتي</p>
        <h1 className="text-3xl font-bold text-slate-900">الدورات المسجلة</h1>
        <p className="text-sm text-slate-500">تابع تقدمك في كل دورة وارجع للاختبارات.</p>
      </header>

      <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
        {enrollments.length ? (
          <div className="grid gap-3">
            {enrollments.map((enrollment) => (
              <div key={enrollment.id} className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-900">{enrollment.course.title}</p>
                  <p className="text-xs text-slate-500">المستوى: {enrollment.course.level}</p>
                </div>
                <Link href={`/dashboard/my-courses/${enrollment.course.id}`} className="text-sm font-semibold text-amber-600 hover:text-amber-700">دخول</Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-500">لا توجد دورات مسجلة حالياً.</p>
        )}
      </section>
    </div>
  );
}
