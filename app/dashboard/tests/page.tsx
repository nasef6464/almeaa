import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { prisma } from '@/app/db';
import { Target, Sparkles, FileText } from 'lucide-react';

export default async function TestsPage() {
  const session = await auth();
  if (!session?.user) redirect('/auth/signin');

  const role = session.user.role;
  const studentId = session.user.student?.id || null;

  const attempts = studentId
    ? await prisma.testAttempt.findMany({
        where: { studentId },
        include: {
          test: { select: { title: true, type: true, passingScore: true } },
        },
        orderBy: { createdAt: 'desc' },
        take: 10,
      })
    : [];

  return (
    <div className="space-y-6" dir="rtl">
      <header className="space-y-1">
        <p className="text-sm text-slate-500">الاختبارات</p>
        <h1 className="text-3xl font-bold text-slate-900">اختبارات ساهر والتكيفي</h1>
        <p className="text-sm text-slate-500">أنشئ اختبار تكيفي لكل مهارة، أو راجع سجل محاولاتك.</p>
      </header>

      {role === 'STUDENT' ? (
        <>
          <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                <Sparkles size={16} /> اختبار ساهر السريع
              </div>
              <Link href="/dashboard/saher" className="text-sm font-semibold text-amber-600 hover:text-amber-700">ابدأ</Link>
            </div>
            <p className="text-sm text-slate-600">يولد أسئلة تكيفية بناءً على مستوى إتقانك الحالي.</p>
          </section>

          <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4 text-slate-800 font-semibold text-sm">
              <FileText size={16} /> سجل المحاولات
            </div>
            {attempts.length ? (
              <div className="grid gap-3">
                {attempts.map((a) => (
                  <div key={a.id} className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{a.test.title}</p>
                      <p className="text-xs text-slate-500">{a.test.type} • {formatDate(a.createdAt)}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-600 border border-purple-100 flex items-center justify-center">
                        <Target size={18} />
                      </div>
                      <div className="text-sm font-semibold text-slate-900">{a.score ?? 0}%</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-500">لا يوجد سجل محاولات بعد.</p>
            )}
          </section>
        </>
      ) : (
        <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm text-sm text-slate-600">
          هذه الصفحة مخصصة للطلاب لعرض محاولاتهم. يمكن للمديرين/المدربين إدارة الاختبارات من لوحة المدير أو صفحات الدورة.
        </section>
      )}
    </div>
  );
}

function formatDate(date: Date) {
  try {
    return new Intl.DateTimeFormat('ar-SA', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }).format(date);
  } catch {
    return '' + date;
  }
}
