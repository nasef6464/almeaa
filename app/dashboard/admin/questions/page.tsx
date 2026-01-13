import React from 'react';
import Link from 'next/link';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { Filter, PlusCircle, Search, Sparkles, Tags } from 'lucide-react';

export default async function QuestionBankPage() {
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
          <p className="text-sm text-slate-500">بنك الأسئلة</p>
          <h1 className="text-2xl font-bold text-slate-900">إنشاء، فرز، واستيراد الأسئلة</h1>
          <p className="text-sm text-slate-500">وسوم مهارة/مادة/صعوبة، دعم صور ورياضيات.</p>
        </div>
        <div className="flex gap-2">
          <Link href="/dashboard/admin/questions/new" className="inline-flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-600">
            <PlusCircle size={16} /> سؤال جديد
          </Link>
          <button className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
            <Sparkles size={16} /> استيراد CSV
          </button>
        </div>
      </header>

      <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm space-y-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-1 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
            <Search size={16} className="text-slate-400" />
            <input className="w-full bg-transparent text-sm outline-none" placeholder="بحث في السؤال أو المهارة" />
          </div>
          <div className="flex flex-wrap gap-2">
            <FilterChip label="المادة" />
            <FilterChip label="القسم" />
            <FilterChip label="المهارة" />
            <FilterChip label="الصعوبة" />
            <FilterChip label="النوع" />
          </div>
        </div>

        <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 p-6 text-center text-sm text-slate-600">
          اربط كل سؤال بمهارة وصعوبة. ادعم Math, صور، وفيديو. قادم: لصق من Word وLaTeX.
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {['اختيار من متعدد', 'صح/خطأ', 'مقالي قصير', 'فراغات', 'مطابقة'].map((type) => (
            <div key={type} className="rounded-xl border border-slate-100 bg-white p-3 shadow-sm">
              <p className="text-sm font-semibold text-slate-900">{type}</p>
              <p className="text-xs text-slate-500 mt-1">قوالب جاهزة لتسريع الإدخال.</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
        <div className="mb-3 flex items-center gap-2 text-slate-700 text-sm font-semibold">
          <Tags size={16} /> وسوم المهارات: مادة • قسم • مهارة • صعوبة
        </div>
        <p className="text-xs text-slate-500">ستظهر الإحصاءات هنا بمجرد إضافة أسئلة حقيقية.</p>
      </div>
    </div>
  );
}

function FilterChip({ label }: { label: string }) {
  return (
    <button className="inline-flex items-center gap-1 rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50">
      <Filter size={14} /> {label}
    </button>
  );
}
