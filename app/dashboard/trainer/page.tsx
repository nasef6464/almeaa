import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { prisma } from '@/app/db';
import { BookOpen, FileText, GraduationCap, Sparkles, Users } from 'lucide-react';

export default async function TrainerDashboard() {
  const session = await auth();
  if (!session?.user) redirect('/auth/signin');
  if (session.user.role !== 'TRAINER') {
    redirect('/dashboard');
  }

  const trainerId = session.user.trainer?.id;

  const [courses, tests, students] = await Promise.all([
    trainerId
      ? prisma.course.findMany({
          where: { trainerId },
          select: { id: true, title: true, isPublished: true, updatedAt: true },
          orderBy: { updatedAt: 'desc' },
          take: 4,
        })
      : [],
    trainerId
      ? prisma.test.findMany({
          where: { course: { trainerId } },
          select: { id: true, title: true, type: true, status: true },
          orderBy: { createdAt: 'desc' },
          take: 4,
        })
      : [],
    trainerId ? prisma.enrollment.count({ where: { course: { trainerId } } }) : 0,
  ]);

  const firstName = session.user.name?.split(' ')[0] || 'مدرب';

  return (
    <div className="space-y-6" dir="rtl">
      <header className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm text-slate-500">لوحة المدرب</p>
          <h1 className="text-3xl font-bold text-slate-900">مرحباً، {firstName}</h1>
          <p className="text-sm text-slate-500">أدر دوراتك، اختباراتك، وتابع تقدم الطلاب.</p>
        </div>
        <Link href="/dashboard/admin/courses/new" className="inline-flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-600">
          <Sparkles size={16} /> أنشئ درس/اختبار
        </Link>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <StatCard title="دوراتي" value={courses.length} icon={<BookOpen size={18} />} />
        <StatCard title="اختباراتي" value={tests.length} icon={<FileText size={18} />} />
        <StatCard title="الطلاب" value={students} icon={<Users size={18} />} />
      </section>

      <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-slate-900">أحدث الدورات</h2>
          <Link href="/dashboard/admin/courses" className="text-sm font-semibold text-amber-600 hover:text-amber-700">فتح الباني</Link>
        </div>
        {courses.length ? (
          <div className="grid gap-3">
            {courses.map((course) => (
              <div key={course.id} className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-900">{course.title}</p>
                  <p className="text-xs text-slate-500">{course.isPublished ? 'منشورة' : 'مسودة'}</p>
                </div>
                <Link href={`/dashboard/admin/courses/${course.id}`} className="text-sm font-semibold text-amber-600 hover:text-amber-700">تحرير</Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-500">لم تقم بإنشاء دورات بعد.</p>
        )}
      </section>

      <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-3 text-slate-800 font-semibold text-sm">
          <GraduationCap size={16} /> مهام المدرب القادمة
        </div>
        <p className="text-sm text-slate-500">ارفع محتوى جديد، أضف أسئلة علاجية، وتتبع تقدم الطلاب عبر المصفوفة (طلاب × مهارات).</p>
      </section>
    </div>
  );
}

function StatCard({ title, value, icon }: { title: string; value: number; icon: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
      <div className="h-10 w-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100">
        {icon}
      </div>
      <div>
        <p className="text-sm text-slate-500">{title}</p>
        <p className="text-xl font-bold text-slate-900">{value}</p>
      </div>
    </div>
  );
}
