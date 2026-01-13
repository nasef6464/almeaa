import { auth } from '@/lib/auth';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Bell, LayoutDashboard, Users, BookOpen, FileText, Settings, LogOut, Menu, Pin, Grid, Shield, GraduationCap, FolderKanban } from 'lucide-react';
import React from 'react';

type NavItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

const navByRole: Record<string, NavItem[]> = {
  SUPER_ADMIN: [
    { label: 'نظرة عامة', href: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { label: 'المستخدمون والأدوار', href: '/dashboard/users', icon: <Users size={20} /> },
    { label: 'الدورات', href: '/dashboard/courses', icon: <BookOpen size={20} /> },
    { label: 'الاختبارات', href: '/dashboard/tests', icon: <FileText size={20} /> },
    { label: 'التقارير والتكاملات', href: '/dashboard/reports', icon: <Grid size={20} /> },
    { label: 'الإعدادات', href: '/dashboard/settings', icon: <Settings size={20} /> },
  ],
  ADMIN: [
    { label: 'نظرة عامة', href: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { label: 'المحتوى التعليمي', href: '/dashboard/content', icon: <FolderKanban size={20} /> },
    { label: 'المستخدمون', href: '/dashboard/users', icon: <Users size={20} /> },
    { label: 'الاختبارات', href: '/dashboard/tests', icon: <FileText size={20} /> },
    { label: 'الإعدادات', href: '/dashboard/settings', icon: <Settings size={20} /> },
  ],
  TRAINER: [
    { label: 'لوحة المدرب', href: '/dashboard/trainer', icon: <GraduationCap size={20} /> },
    { label: 'الدورات', href: '/dashboard/trainer/courses', icon: <BookOpen size={20} /> },
    { label: 'الطلاب', href: '/dashboard/trainer/students', icon: <Users size={20} /> },
    { label: 'الاختبارات', href: '/dashboard/tests', icon: <FileText size={20} /> },
  ],
  STUDENT: [
    { label: 'لوحة الطالب', href: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { label: 'دوراتي', href: '/dashboard/my-courses', icon: <BookOpen size={20} /> },
    { label: 'اختبارات ساهر', href: '/dashboard/saher', icon: <Shield size={20} /> },
    { label: 'الاختبارات', href: '/dashboard/tests', icon: <FileText size={20} /> },
  ],
  PARENT: [
    { label: 'لوحة ولي الأمر', href: '/dashboard/parent', icon: <LayoutDashboard size={20} /> },
    { label: 'الأبناء والتقارير', href: '/dashboard/parent/children', icon: <Users size={20} /> },
    { label: 'المدفوعات', href: '/dashboard/parent/payments', icon: <FileText size={20} /> },
  ],
  SUPERVISOR: [
    { label: 'لوحة المشرف', href: '/dashboard/supervisor', icon: <LayoutDashboard size={20} /> },
    { label: 'المجموعات والمدارس', href: '/dashboard/groups', icon: <Users size={20} /> },
    { label: 'التقارير', href: '/dashboard/reports', icon: <FileText size={20} /> },
  ],
};

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) redirect('/auth/signin');

  const role = session.user.role || 'STUDENT';
  const navItems = navByRole[role] || navByRole.STUDENT;

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900" dir="rtl">
      <div className="flex min-h-screen">
        <DashboardSidebar userName={session.user.name || 'مستخدم'} userRole={role} navItems={navItems} />
        <div className="flex-1 flex flex-col" style={{ marginRight: '16rem' }}>
          <DashboardHeader userName={session.user.name || 'مستخدم'} />
          <main className="p-6">{children}</main>
        </div>
      </div>
    </div>
  );
}

function DashboardSidebar({ userName, userRole, navItems }: { userName: string; userRole: string; navItems: NavItem[] }) {
  return (
    <aside className="bg-slate-900 text-white w-64 fixed inset-y-0 right-0 z-30 shadow-xl">
      <div className="p-6 flex items-center justify-between border-b border-slate-800">
        <div>
          <p className="text-sm text-slate-300">مرحبا</p>
          <h2 className="text-lg font-bold text-amber-400">{userName}</h2>
        </div>
        <div className="bg-amber-500 text-slate-900 rounded-full w-10 h-10 flex items-center justify-center font-bold">
          {userName.charAt(0).toUpperCase()}
        </div>
      </div>
      <nav className="p-4 space-y-2 overflow-y-auto h-[calc(100%-88px)]">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 px-4 py-3 text-slate-200 hover:bg-slate-800 hover:text-white rounded-lg transition-colors"
          >
            {item.icon}
            <span className="text-sm font-medium">{item.label}</span>
          </Link>
        ))}
        <div className="border-t border-slate-800 pt-4 mt-4 space-y-2">
          <Link href="/dashboard/settings" className="flex items-center gap-3 px-4 py-3 text-slate-200 hover:bg-slate-800 rounded-lg">
            <Settings size={20} />
            <span className="text-sm">الإعدادات</span>
          </Link>
          <form action="/api/auth/signout" method="POST">
            <button className="w-full flex items-center gap-3 px-4 py-3 text-red-300 hover:bg-slate-800 rounded-lg text-sm">
              <LogOut size={20} />
              <span>تسجيل خروج</span>
            </button>
          </form>
        </div>
        <div className="mt-6 rounded-xl bg-slate-800 border border-slate-700 p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-slate-200">وضع التثبيت</p>
            <Pin size={16} className="text-amber-400" />
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">القائمة الجانبية جاهزة للوضع المثبّت أو العائم مستقبلاً.</p>
        </div>
      </nav>
    </aside>
  );
}

function DashboardHeader({ userName }: { userName: string }) {
  return (
    <header className="bg-white/90 backdrop-blur shadow-sm h-16 flex items-center justify-between px-6 sticky top-0 z-20 border-b border-slate-200">
      <div className="flex items-center gap-3 text-slate-700">
        <Menu size={22} />
        <div>
          <p className="text-xs text-slate-500">لوحة التحكم</p>
          <h1 className="text-base font-semibold">مرحبا، {userName}</h1>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full">
          <Bell size={18} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <div className="bg-amber-500 text-slate-900 rounded-full w-9 h-9 flex items-center justify-center font-bold">
          {userName.charAt(0).toUpperCase()}
        </div>
      </div>
    </header>
  );
}
