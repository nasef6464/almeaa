import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { LayoutTemplate, PlusCircle, Wand2 } from 'lucide-react';

export default async function AdminCoursesPage() {
  const session = await auth();
  if (!session?.user) redirect('/auth/signin');
  const role = session.user.role;
  if (!['SUPER_ADMIN', 'SCHOOL_ADMIN', 'ADMIN'].includes(role)) {
    redirect('/dashboard');
  }

  return (
    <div className="space-y-6" dir="rtl">
      <header className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm text-slate-500">باني الدورات</p>
          <h1 className="text-2xl font-bold text-slate-900">أنشئ دورة، أضف وحدات، دروس، واختبارات</h1>
          <p className="text-sm text-slate-500">سحب وإفلات، تسعير، كوبونات، شهادات.</p>
        </div>
        <div className="flex gap-2">
          <Link href="/dashboard/admin/courses/new" className="inline-flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-600">
            <PlusCircle size={16} /> دورة جديدة
          </Link>
          <button className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
            <Wand2 size={16} /> قوالب جاهزة
          </button>
        </div>
      </header>

      <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm space-y-3">
        <div className="grid md:grid-cols-3 gap-3">
          {['وحدة دراسية', 'درس فيديو', 'اختبار قصير'].map((item) => (
            <div key={item} className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
              <p className="text-sm font-semibold text-slate-900">{item}</p>
              <p className="text-xs text-slate-500 mt-1">أضف ترتيب، حالة نشر، ووسوم مهارة.</p>
            </div>
          ))}
        </div>
        <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
          سيتم ربط هذه الصفحة بالبيانات الحقيقية (الدورات، الوحدات، الدروس، الاختبارات) فور جاهزيتها في قاعدة البيانات.
        </div>
      </section>

      <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-3 text-slate-800 font-semibold text-sm">
          <LayoutTemplate size={16} /> تدفقات جاهزة
        </div>
        <div className="grid md:grid-cols-2 gap-3">
          <TemplateCard title="دورة مدفوعة" description="وحدات + اختبارات + شهادات + كوبونات" />
          <TemplateCard title="مراجعة قدرات" description="اختبارات سريعة + مسار علاجي" />
          <TemplateCard title="معسكر قصير" description="جدول زمني مكثف + بث مباشر" />
          <TemplateCard title="محتوى مجاني" description="فيديوهات عامة مع CTA للترقية" />
        </div>
      </section>
    </div>
  );
}

function TemplateCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
      <p className="text-sm font-semibold text-slate-900">{title}</p>
      <p className="text-xs text-slate-500 mt-1">{description}</p>
    </div>
  );
}
