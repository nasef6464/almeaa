import React from 'react';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { prisma } from '@/app/db';
import { Users, PieChart } from 'lucide-react';

export default async function SupervisorDashboardPage() {
  const session = await auth();
  if (!session?.user) redirect('/auth/signin');
  if (session.user.role !== 'SUPERVISOR') {
    redirect('/dashboard');
  }

  const groupsCount = await prisma.school.count();
  const studentsCount = await prisma.student.count();

  return (
    <div className="space-y-6" dir="rtl">
      <header className="space-y-1">
        <p className="text-sm text-slate-500">لوحة المشرف</p>
        <h1 className="text-3xl font-bold text-slate-900">المجموعات والمدارس</h1>
        <p className="text-sm text-slate-500">راقب أداء الفصول والمدارس المرتبطة بك.</p>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <StatCard title="المدارس/المجموعات" value={groupsCount} icon={<Users size={18} />} />
        <StatCard title="الطلاب" value={studentsCount} icon={<PieChart size={18} />} />
      </section>

      <section className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
        خريطة حرارية للأداء وتقارير CSV ستضاف لاحقاً.
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
