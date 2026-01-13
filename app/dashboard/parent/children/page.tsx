import React from 'react';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { prisma } from '@/app/db';
import { Users } from 'lucide-react';

export default async function ParentChildrenPage() {
  const session = await auth();
  if (!session?.user) redirect('/auth/signin');
  if (session.user.role !== 'PARENT') {
    redirect('/dashboard');
  }

  const parentId = session.user.parent?.id;
  const children = parentId
    ? await prisma.studentParent.findMany({
        where: { parentId },
        include: { student: { include: { user: true } } },
      })
    : [];

  return (
    <div className="space-y-6" dir="rtl">
      <header className="space-y-1">
        <p className="text-sm text-slate-500">الأبناء والتقارير</p>
        <h1 className="text-3xl font-bold text-slate-900">أبناءك</h1>
        <p className="text-sm text-slate-500">تتبع تقدم كل ابن في الدورات والاختبارات.</p>
      </header>

      <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
        {children.length ? (
          <div className="grid gap-3">
            {children.map((c) => (
              <div key={c.id} className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-900">{c.student.user.name}</p>
                  <p className="text-xs text-slate-500">معرّف الطالب: {c.studentId}</p>
                </div>
                <button className="text-sm font-semibold text-amber-600 hover:text-amber-700">عرض التقدم</button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-500">لم يتم ربط أبناء بعد.</p>
        )}
      </section>

      <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-4 text-sm text-slate-600 flex items-center gap-2">
        <Users size={16} className="text-amber-500" /> رفع ملف Excel للأبناء سيُفعَّل لاحقاً.
      </div>
    </div>
  );
}
