import React from 'react';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { LayoutDashboard, Users, BookOpen, FileText, Settings, Grid, Shield, GraduationCap } from 'lucide-react';
import DashboardShell from './dashboard-shell';
import { StudentSidebar } from '@/components/dashboard/StudentSidebar';

type NavItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

const navByRole: Record<string, NavItem[]> = {
  SUPER_ADMIN: [
    { label: 'لوحة المدير', href: '/dashboard/admin', icon: <LayoutDashboard size={20} /> },
    { label: 'بنك الأسئلة', href: '/dashboard/admin/questions', icon: <FileText size={20} /> },
    { label: 'الفيديوهات', href: '/dashboard/admin/videos', icon: <Grid size={20} /> },
    { label: 'الدورات', href: '/dashboard/admin/courses', icon: <BookOpen size={20} /> },
    { label: 'المستخدمون والأدوار', href: '/dashboard/users', icon: <Users size={20} /> },
    { label: 'التقارير والتكاملات', href: '/dashboard/reports', icon: <Grid size={20} /> },
    { label: 'الإعدادات', href: '/dashboard/settings', icon: <Settings size={20} /> },
  ],
  SCHOOL_ADMIN: [
    { label: 'لوحة المدير', href: '/dashboard/admin', icon: <LayoutDashboard size={20} /> },
    { label: 'بنك الأسئلة', href: '/dashboard/admin/questions', icon: <FileText size={20} /> },
    { label: 'الفيديوهات', href: '/dashboard/admin/videos', icon: <Grid size={20} /> },
    { label: 'الدورات', href: '/dashboard/admin/courses', icon: <BookOpen size={20} /> },
    { label: 'المستخدمون', href: '/dashboard/users', icon: <Users size={20} /> },
    { label: 'الإعدادات', href: '/dashboard/settings', icon: <Settings size={20} /> },
  ],
  ADMIN: [
    { label: 'لوحة المدير', href: '/dashboard/admin', icon: <LayoutDashboard size={20} /> },
    { label: 'بنك الأسئلة', href: '/dashboard/admin/questions', icon: <FileText size={20} /> },
    { label: 'الفيديوهات', href: '/dashboard/admin/videos', icon: <Grid size={20} /> },
    { label: 'الدورات', href: '/dashboard/admin/courses', icon: <BookOpen size={20} /> },
    { label: 'المستخدمون', href: '/dashboard/users', icon: <Users size={20} /> },
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
  const isStudent = role === 'STUDENT';

  if (isStudent) {
    return (
      <div className="min-h-screen bg-gray-50" dir="rtl">
        <DashboardShell userName={session.user.name || 'مستخدم'} userRole={role} navItems={navItems}>
          <div className="flex">
            <StudentSidebar />
            <main className="flex-1 p-6">{children}</main>
          </div>
        </DashboardShell>
      </div>
    );
  }

  return <DashboardShell userName={session.user.name || 'مستخدم'} userRole={role} navItems={navItems}>{children}</DashboardShell>;
}
