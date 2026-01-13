import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { FileText, Map, PieChart, Target, TrendingUp, Zap } from 'lucide-react';
import { auth } from '@/lib/auth';
import { prisma } from '@/app/db';
import { SkillService } from '@/app/services/skill.service';
import { QuickAction } from '@/components/dashboard/QuickAction';
import { SmartLearningPath } from '@/components/dashboard/SmartLearningPath';
import { WeakPointsSummary } from '@/components/dashboard/WeakPointsSummary';
import { WeeklySchedule } from '@/components/dashboard/WeeklySchedule';

type EnrollmentWithCourse = {
  id: string;
  enrolledAt: Date;
  course: {
    id: string;
    title: string;
    description: string | null;
    thumbnail: string | null;
    level: string;
  };
};

type TestAttempt = {
  id: string;
  createdAt: Date;
  score: number | null;
  test: {
    title: string;
    type: string;
  };
};

type LearningPathWithCourse = {
  id: string;
  progress: number;
  course: { id: string; title: string };
};

type WeakSkill = {
  skill: {
    id: string;
    name: string;
    section: {
      category: {
        subject: { name: string };
      };
    };
  };
  masteryScore: number;
};

type VideoRecommendation = {
  id: string;
  title: string;
  url: string;
  duration: number;
  skill: {
    name: string;
    section: {
      category: {
        subject: { name: string };
      };
    };
  };
};

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user) redirect('/auth/signin');

  const { user } = session;
  const role = user.role;

  const roleRedirect: Record<string, string> = {
    SUPER_ADMIN: '/dashboard/admin',
    SCHOOL_ADMIN: '/dashboard/admin',
    ADMIN: '/dashboard/admin',
    TRAINER: '/dashboard/trainer',
    PARENT: '/dashboard/parent',
    SUPERVISOR: '/dashboard/supervisor',
  };

  if (role !== 'STUDENT' && roleRedirect[role]) {
    redirect(roleRedirect[role]);
  }

  const studentId = user.student?.id || null;
  const isStudent = user.role === 'STUDENT';
  const firstName = user.name?.split(' ')[0] || 'مستخدم';

  const [enrollments, testHistory, learningPaths, weakSkills, progress] = await Promise.all([
    studentId
      ? prisma.enrollment.findMany({
          where: { studentId },
          include: {
            course: {
              select: {
                id: true,
                title: true,
                description: true,
                thumbnail: true,
                level: true,
              },
            },
          },
          orderBy: { enrolledAt: 'desc' },
          take: 3,
        })
      : ([] as EnrollmentWithCourse[]),
    studentId
      ? prisma.testAttempt.findMany({
          where: { studentId },
          include: {
            test: {
              select: {
                title: true,
                type: true,
              },
            },
          },
          orderBy: { createdAt: 'desc' },
          take: 4,
        })
      : ([] as TestAttempt[]),
    studentId
      ? prisma.learningPath.findMany({
          where: { studentId },
          include: {
            course: {
              select: { id: true, title: true },
            },
          },
          orderBy: { updatedAt: 'desc' },
          take: 3,
        })
      : ([] as LearningPathWithCourse[]),
    studentId ? SkillService.getWeakSkills(studentId, 75) : ([] as WeakSkill[]),
    studentId ? SkillService.getStudentProgress(studentId) : null,
  ]);

  const recommendedVideos: VideoRecommendation[] = studentId
    ? await SkillService.getRecommendedVideos(studentId, 4)
    : [];

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <main className="max-w-6xl mx-auto px-4 lg:px-6 py-8 space-y-8">
        <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <p className="text-sm text-gray-500">لوحة تحكم الطالب</p>
            <h1 className="text-3xl font-bold text-gray-900">مرحباً، {firstName} 👋</h1>
            <p className="text-gray-500 text-lg">لنواصل رحلة التعلم اليوم في منصة المئة</p>
          </div>
          <div className="bg-amber-100 text-amber-700 px-6 py-3 rounded-2xl text-sm font-bold inline-flex items-center gap-2 shadow-sm">
            <TrendingUp size={20} />
            المستوى 12
          </div>
        </header>

        {isStudent && (
          <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatCard title="متوسط الإتقان" value={`${progress?.averageMastery ?? 0}%`} hint="حساب بناءً على آخر محاولاتك" accent="amber" />
            <StatCard title="مهارات متقنة" value={String(progress?.masteredSkills ?? 0)} hint={`من أصل ${progress?.totalSkills ?? 0}`} accent="emerald" />
            <StatCard title="مهارات تحتاج دعم" value={String(progress?.weakSkills ?? 0)} hint="أولوية لمراجعة المحتوى" accent="rose" />
          </section>
        )}

        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <QuickAction href="/dashboard/saher" icon={<Zap size={22} />} label="ساهر" color="purple" />
          <QuickAction href="/dashboard/tests" icon={<FileText size={22} />} label="اختباراتي" color="blue" />
          <QuickAction href="/dashboard/reports" icon={<PieChart size={22} />} label="التقارير" color="emerald" />
          <QuickAction href="/dashboard/plan" icon={<Map size={22} />} label="خطتي" color="indigo" />
        </section>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">الكورسات النشطة</h2>
                <Link href="/dashboard/my-courses" className="text-amber-600 text-sm font-bold hover:text-amber-700">
                  عرض الكل
                </Link>
              </div>
              <div className="grid gap-4">
                {enrollments.length ? (
                  enrollments.map((enrollment) => (
                    <div key={enrollment.id} className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                      <div className="p-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <div className="space-y-1">
                          <h3 className="font-bold text-lg text-gray-900">{enrollment.course.title}</h3>
                          <p className="text-xs text-gray-500">المستوى: {enrollment.course.level}</p>
                        </div>
                        <div className="flex flex-col gap-3 md:min-w-[260px]">
                          <Progress value={Math.min(100, Math.max(0, (learningPaths.find((lp) => lp.course.id === enrollment.course.id)?.progress ?? 0)))} />
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <span>التقدم</span>
                            <span className="font-semibold text-gray-800">{Math.round(learningPaths.find((lp) => lp.course.id === enrollment.course.id)?.progress ?? 0)}%</span>
                          </div>
                        </div>
                        <Link href={`/dashboard/my-courses/${enrollment.course.id}`} className="inline-flex items-center justify-center bg-amber-500 text-white text-xs px-4 py-2 rounded-lg font-bold hover:bg-amber-600 transition-colors">
                          متابعة
                        </Link>
                      </div>
                    </div>
                  ))
                ) : (
                  <EmptyState title="لا توجد كورسات مسجلة" actionHref="/dashboard/my-courses" actionLabel="تصفح الكورسات" />
                )}
              </div>
            </section>

            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">آخر الاختبارات</h2>
                <Link href="/dashboard/tests" className="text-sm text-amber-600 font-semibold hover:text-amber-700">
                  سجل الاختبارات
                </Link>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {testHistory.length ? (
                  testHistory.map((test) => (
                    <div key={test.id} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex items-center justify-between">
                      <div className="space-y-1 text-right">
                        <h3 className="font-bold text-gray-900">{test.test.title}</h3>
                        <p className="text-sm text-gray-500 font-sans font-medium">{formatDate(test.createdAt)}</p>
                        <p className="text-xs text-gray-500">النوع: {test.test.type}</p>
                      </div>
                      <div className="flex flex-col items-center justify-center gap-2">
                        <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center text-purple-500 border-2 border-purple-100">
                          <Target size={22} />
                        </div>
                        <span className="text-sm font-semibold text-gray-800">{test.score ?? 0}%</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <EmptyState title="لا يوجد سجل اختبارات بعد" actionHref="/dashboard/tests" actionLabel="ابدأ اختبار" />
                )}
              </div>
            </section>
          </div>

          <div className="space-y-8">
            {/* AI Learning Path Widget */}
            <SmartLearningPath skills={weakSkills.map(ws => ({
              skill: ws.skill.name,
              mastery: ws.masteryScore
            }))} />

            {/* Weekly Schedule */}
            <WeeklySchedule />

            {/* Weak Points Summary */}
            <WeakPointsSummary skills={weakSkills.map(ws => ({
              skill: ws.skill.name,
              mastery: ws.masteryScore
            }))} />
          </div>
        </div>
      </main>
    </div>
  );
}

function Progress({ value }: { value: number }) {
  return (
    <div className="w-full h-2.5 rounded-full bg-gray-100 overflow-hidden">
      <div className="h-full bg-amber-500" style={{ width: `${Math.min(Math.max(value, 0), 100)}%` }} />
    </div>
  );
}

function StatCard({ title, value, hint, accent }: { title: string; value: string; hint: string; accent: 'amber' | 'emerald' | 'rose' }) {
  const accents: Record<'amber' | 'emerald' | 'rose', string> = {
    amber: 'bg-amber-50 text-amber-700 border-amber-100',
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    rose: 'bg-rose-50 text-rose-700 border-rose-100',
  };

  return (
    <div className={`rounded-2xl border p-4 shadow-sm ${accents[accent]}`}>
      <p className="text-sm font-semibold">{title}</p>
      <p className="text-2xl font-bold mt-1">{value}</p>
      <p className="text-xs mt-1 opacity-80">{hint}</p>
    </div>
  );
}

function EmptyState({ title, actionHref, actionLabel, compact }: { title: string; actionHref?: string; actionLabel?: string; compact?: boolean }) {
  return (
    <div className={`border border-dashed border-gray-200 rounded-2xl text-center ${compact ? 'p-4' : 'p-6'} bg-gray-50`}>
      <p className="text-sm font-semibold text-gray-700">{title}</p>
      {actionHref && actionLabel && (
        <div className="mt-3">
          <Link href={actionHref} className="text-sm font-bold text-amber-600 hover:text-amber-700">
            {actionLabel}
          </Link>
        </div>
      )}
    </div>
  );
}

function formatDate(date: Date) {
  try {
    return new Intl.DateTimeFormat('ar-SA', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  } catch {
    return '' + date;
  }
}

function formatDuration(seconds: number) {
  const mins = Math.max(1, Math.round(seconds / 60));
  return `${mins} دقيقة`;
}
