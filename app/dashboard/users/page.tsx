import React from 'react';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { prisma } from '@/app/db';
import { UserRole } from '@/app/generated/prisma';
import { Users, Shield, GraduationCap, BookOpen, Sparkles } from 'lucide-react';

const adminRoles: UserRole[] = [UserRole.SUPER_ADMIN, UserRole.SCHOOL_ADMIN, UserRole.ADMIN];

export default async function UsersPage() {
  const session = await auth();
  if (!session?.user) redirect('/auth/signin');
  const role = session.user.role as UserRole;
  if (!adminRoles.includes(role)) {
    redirect('/dashboard');
  }

  const [counts, recent] = await Promise.all([
    fetchCounts(),
    prisma.user.findMany({
      select: { id: true, name: true, email: true, role: true, createdAt: true },
      orderBy: { createdAt: 'desc' },
      take: 8,
    }),
  ]);

  return (
    <div className="space-y-6" dir="rtl">
      <header className="space-y-2">
        <p className="text-sm text-slate-500">إدارة المستخدمين والأدوار</p>
        <h1 className="text-3xl font-bold text-slate-900">المستخدمون</h1>
        <p className="text-sm text-slate-500">أدوار متعددة: مدير، مدرب، طالب، ولي أمر، مشرف.</p>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard title="الكل" value={counts.total} icon={<Users size={18} />} />
        <StatCard title="طلاب" value={counts.students} icon={<BookOpen size={18} />} />
        <StatCard title="مدربون" value={counts.trainers} icon={<GraduationCap size={18} />} />
        <StatCard title="مديرون" value={counts.admins} icon={<Shield size={18} />} />
      </section>

      <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-900">آخر المستخدمين</h2>
          <span className="text-xs text-slate-500">آخر {recent.length} مسجلين</span>
        </div>
        {recent.length ? (
          <div className="grid gap-3">
            {recent.map((u) => (
              <div key={u.id} className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-900">{u.name}</p>
                  <p className="text-xs text-slate-500">{u.email}</p>
                </div>
                <span className="text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-100 px-3 py-1 rounded-full">{u.role}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-500">لا يوجد مستخدمون بعد.</p>
        )}
      </section>

      <section className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-4 text-sm text-slate-600 flex items-center gap-2">
        <Sparkles size={16} className="text-amber-500" />
        إدارة CRUD كاملة (دعوات، تغيير أدوار، تعطيل) ستضاف لاحقاً.
      </section>
    </div>
  );
}

async function fetchCounts() {
  const [total, students, trainers, superAdmins, schoolAdmins, admins] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({ where: { role: UserRole.STUDENT } }),
    prisma.user.count({ where: { role: UserRole.TRAINER } }),
    prisma.user.count({ where: { role: UserRole.SUPER_ADMIN } }),
    prisma.user.count({ where: { role: UserRole.SCHOOL_ADMIN } }),
    prisma.user.count({ where: { role: UserRole.ADMIN } }),
  ]);

  return { total, students, trainers, admins: superAdmins + schoolAdmins + admins };
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
