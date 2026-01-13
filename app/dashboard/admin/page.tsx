import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { prisma } from '@/app/db';
import { UserRole } from '@/app/generated/prisma';
import { BookOpen, FileText, Layers, LayoutDashboard, Sparkles, Users, Video } from 'lucide-react';

const adminRoles: UserRole[] = [UserRole.SUPER_ADMIN, UserRole.SCHOOL_ADMIN];

export default async function AdminDashboardPage() {
  const session = await auth();
  if (!session?.user) redirect('/auth/signin');

  const role = session.user.role as UserRole;
  if (!adminRoles.includes(role)) {
    redirect('/dashboard');
  }

  const [stats, recentCourses, recentTests, questionSample] = await Promise.all([
    fetchStats(),
    prisma.course.findMany({
      select: { id: true, title: true, status: true, isPublished: true, updatedAt: true },
      orderBy: { updatedAt: 'desc' },
      take: 4,
    }),
    prisma.test.findMany({
      select: { id: true, title: true, type: true, status: true, createdAt: true },
      orderBy: { createdAt: 'desc' },
      take: 4,
    }),
    prisma.question.findMany({
      select: {
        id: true,
        question: true,
        difficultyLevel: true,
        skill: {
          select: {
            name: true,
            section: {
              select: {
                category: {
                  select: { subject: { select: { name: true } } },
                },
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: 12,
    }),
  ]);

  const subjectBuckets = questionSample.reduce<Record<string, number>>((acc, q) => {
    const subjectName = q.skill.section.category.subject.name;
    acc[subjectName] = (acc[subjectName] || 0) + 1;
    return acc;
  }, {});

  const subjectStats = Object.entries(subjectBuckets)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 4);

  return (
    <div className="space-y-8" dir="rtl">
      <header className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div className="space-y-2">
          <p className="text-sm text-slate-500">لوحة تحكم المدير</p>
          <h1 className="text-3xl font-bold text-slate-900">مرحباً {session.user.name?.split(' ')[0] || 'مدير'} 👋</h1>
          <p className="text-slate-500">إدارة المحتوى، الاختبارات، الأدوار، والتقارير في مكان واحد.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/dashboard/admin/questions" className="px-4 py-2 rounded-lg bg-amber-500 text-white text-sm font-semibold hover:bg-amber-600">إنشاء سؤال</Link>
          <Link href="/dashboard/admin/courses" className="px-4 py-2 rounded-lg border border-amber-200 text-amber-700 text-sm font-semibold hover:bg-amber-50">بناء دورة</Link>
        </div>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={<Users size={18} />} title="المستخدمون" value={`${stats.users}`} hint={`طلاب ${stats.students} • مدربون ${stats.trainers}`} />
        <StatCard icon={<BookOpen size={18} />} title="الدورات" value={`${stats.courses}`} hint="منشورة/مسودة" />
        <StatCard icon={<FileText size={18} />} title="الأسئلة" value={`${stats.questions}`} hint="بنك الأسئلة متعدد الوسوم" />
        <StatCard icon={<Sparkles size={18} />} title="الاختبارات" value={`${stats.tests}`} hint="تشمل ساهر والتكيفي" />
      </section>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Panel title="باني الدورات التفاعلي" actions={<Link href="/dashboard/admin/courses" className="text-sm font-semibold text-amber-600 hover:text-amber-700">فتح الباني</Link>}>
            <div className="grid md:grid-cols-3 gap-3">
              {['إضافة الوحدات', 'ربط الدروس والفيديوهات', 'إرفاق اختبارات قصيرة'].map((step) => (
                <div key={step} className="p-4 rounded-xl border border-slate-100 bg-white shadow-sm">
                  <p className="text-sm font-semibold text-slate-800">{step}</p>
                  <p className="text-xs text-slate-500 mt-1">اسحب وأسقط، حدد التسعير، فعل الشهادات.</p>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <p className="text-sm text-slate-600">يدعم السحب والإفلات، التسعير، الكوبونات، وإحصاءات المشاهدة.</p>
            </div>
          </Panel>

          <Panel title="آخر الدورات" actions={<Link href="/dashboard/admin/courses" className="text-sm font-semibold text-amber-600 hover:text-amber-700">عرض الكل</Link>}>
            {recentCourses.length ? (
              <div className="grid gap-3">
                {recentCourses.map((course) => (
                  <div key={course.id} className="flex items-center justify-between rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{course.title}</p>
                      <p className="text-xs text-slate-500">الحالة: {course.isPublished ? 'منشورة' : 'مسودة'} • {course.status}</p>
                    </div>
                    <Link href={`/dashboard/admin/courses/${course.id}`} className="text-sm font-semibold text-amber-600 hover:text-amber-700">تحرير</Link>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState title="لا توجد دورات بعد" actionHref="/dashboard/admin/courses" actionLabel="أنشئ دورة" />
            )}
          </Panel>
        </div>

        <div className="space-y-6">
          <Panel title="توزيع الأسئلة حسب المادة">
            {subjectStats.length ? (
              <div className="space-y-3">
                {subjectStats.map((s) => (
                  <div key={s.name} className="flex items-center justify-between rounded-xl border border-slate-100 bg-white p-3 shadow-sm">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{s.name}</p>
                      <p className="text-xs text-slate-500">عدد الأسئلة</p>
                    </div>
                    <span className="text-sm font-bold text-amber-600">{s.count}</span>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState title="أضف أسئلة لتظهر الإحصاءات" />
            )}
          </Panel>

          <Panel title="أحدث الاختبارات" actions={<Link href="/dashboard/tests" className="text-sm font-semibold text-amber-600 hover:text-amber-700">إدارة الاختبارات</Link>}>
            {recentTests.length ? (
              <div className="space-y-3">
                {recentTests.map((test) => (
                  <div key={test.id} className="rounded-xl border border-slate-100 bg-white p-3 shadow-sm">
                    <p className="text-sm font-semibold text-slate-900">{test.title}</p>
                    <p className="text-xs text-slate-500">{test.type} • {test.status}</p>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState title="لا توجد اختبارات بعد" actionHref="/dashboard/tests" actionLabel="إنشاء اختبار" />
            )}
          </Panel>

          <Panel title="بنك الفيديوهات" actions={<Link href="/dashboard/admin/videos" className="text-sm font-semibold text-amber-600 hover:text-amber-700">إدارة الفيديوهات</Link>}>
            <p className="text-sm text-slate-600">اربط كل فيديو بوسوم المادة/المهارة والصعوبة. دعم عام/مشترك/مدفوع.</p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {["علامات المهارة", "حالة الإتاحة", "مدة الفيديو", "مصدر محمي"].map((item) => (
                <div key={item} className="rounded-lg border border-slate-100 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm">{item}</div>
              ))}
            </div>
          </Panel>
        </div>
      </div>

      <Panel title="قوالب وعمليات سريعة" actions={<Link href="/dashboard/users" className="text-sm font-semibold text-amber-600 hover:text-amber-700">إدارة الأدوار</Link>}>
        <div className="grid md:grid-cols-3 gap-3">
          <QuickAction icon={<LayoutDashboard size={18} />} title="رفع جماعي (Excel)" hint="للطلاب والمجموعات" />
          <QuickAction icon={<Layers size={18} />} title="استيراد أسئلة" hint="من CSV أو بنك الأسئلة" />
          <QuickAction icon={<Video size={18} />} title="ربط الفيديوهات بالمهارات" hint="وسوم + إتاحة" />
          <QuickAction icon={<FileText size={18} />} title="اختبار ساهر" hint="تفعيل التجربة التكيفية" />
          <QuickAction icon={<Sparkles size={18} />} title="خطط علاجية" hint="توليد تلقائي للمهارات الضعيفة" />
          <QuickAction icon={<BookOpen size={18} />} title="الشهادات والكوبونات" hint="تسويق الدورة" />
        </div>
      </Panel>
    </div>
  );
}

async function fetchStats() {
  const [users, students, trainers, courses, questions, tests] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({ where: { role: UserRole.STUDENT } }),
    prisma.user.count({ where: { role: UserRole.TRAINER } }),
    prisma.course.count(),
    prisma.question.count(),
    prisma.test.count(),
  ]);

  return { users, students, trainers, courses, questions, tests };
}

function StatCard({ icon, title, value, hint }: { icon: React.ReactNode; title: string; value: string; hint?: string }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600 border border-amber-100">
        {icon}
      </div>
      <div>
        <p className="text-sm text-slate-500">{title}</p>
        <p className="text-xl font-bold text-slate-900">{value}</p>
        {hint ? <p className="text-xs text-slate-500 mt-0.5">{hint}</p> : null}
      </div>
    </div>
  );
}

function Panel({ title, children, actions }: { title: string; children: React.ReactNode; actions?: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-900">{title}</h2>
        {actions}
      </div>
      {children}
    </section>
  );
}

function EmptyState({ title, actionHref, actionLabel }: { title: string; actionHref?: string; actionLabel?: string }) {
  return (
    <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 p-4 text-center text-sm text-slate-600">
      <p className="font-semibold text-slate-700">{title}</p>
      {actionHref && actionLabel ? (
        <Link href={actionHref} className="mt-2 inline-block text-amber-600 font-semibold text-xs hover:text-amber-700">
          {actionLabel}
        </Link>
      ) : null}
    </div>
  );
}

function QuickAction({ icon, title, hint }: { icon: React.ReactNode; title: string; hint: string }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
      <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-slate-100 text-slate-600">
        {icon}
      </div>
      <div>
        <p className="text-sm font-semibold text-slate-900">{title}</p>
        <p className="text-xs text-slate-500">{hint}</p>
      </div>
    </div>
  );
}
