import React from 'react';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { prisma } from '@/app/db';
import { CreditCard, HeartHandshake, Users } from 'lucide-react';

export default async function ParentDashboardPage() {
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

  const paymentsCount = parentId
    ? await prisma.payment.count({ where: { school: { students: { some: { parents: { some: { parentId } } } } } } })
    : 0;

  return (
    <div className="space-y-6" dir="rtl">
      <header className="space-y-1">
        <p className="text-sm text-slate-500">لوحة ولي الأمر</p>
        <h1 className="text-3xl font-bold text-slate-900">أبناءك وتقدمهم</h1>
        <p className="text-sm text-slate-500">تتبع التقدم، المدفوعات، والمكافآت.</p>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <StatCard title="عدد الأبناء" value={children.length} icon={<Users size={18} />} />
        <StatCard title="مدفوعات" value={paymentsCount} icon={<CreditCard size={18} />} />
        <StatCard title="مكافآت" value={0} icon={<HeartHandshake size={18} />} />
      </section>

      <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900 mb-3">الأبناء</h2>
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
