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
  
  // Get user avatar (use default if not set)
  const userAvatar = session.user.image || session.user.avatar || '/images/default-avatar.png';
  const userName = session.user.name || 'مستخدم';
  const userEmail = session.user.email || '';

  if (isStudent) {
    return (
      <div className="min-h-screen bg-gray-50" dir="rtl">
        <DashboardShell userName={userName} userRole={role} navItems={navItems}>
          <div className="flex">
            <StudentSidebar />
            <main className="flex-1 p-6">{children}</main>
          </div>
        </DashboardShell>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <DashboardShell userName={userName} userRole={role} navItems={navItems}>
        {/* User Profile Card */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img 
                src={userAvatar} 
                alt={userName}
                className="w-20 h-20 rounded-full object-cover border-4 border-blue-100"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(userName) + '&background=3b82f6&color=fff&size=200';
                }}
              />
              <div className="absolute bottom-0 right-0 w-5 h-5 bg-green-500 border-2 border-white rounded-full"></div>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900">مرحباً، {userName}</h2>
              <p className="text-gray-500 text-sm">{userEmail}</p>
              <div className="mt-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {role === 'ADMIN' ? 'مدير النظام' : 
                   role === 'SUPER_ADMIN' ? 'المدير العام' :
                   role === 'SCHOOL_ADMIN' ? 'مدير المدرسة' :
                   role === 'TRAINER' ? 'مدرب' :
                   role === 'SUPERVISOR' ? 'مشرف' :
                   role === 'PARENT' ? 'ولي أمر' : 'طالب'}
                </span>
              </div>
            </div>
          </div>
        </div>
        {children}
      </DashboardShell>
    </div>
  );
}
