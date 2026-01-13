import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { Zap, Sparkles } from 'lucide-react';

export default async function SaherPage() {
  const session = await auth();
  if (!session?.user) redirect('/auth/signin');

  return (
    <div className="space-y-6" dir="rtl">
      <header className="space-y-1">
        <p className="text-sm text-slate-500">اختبار ساهر</p>
        <h1 className="text-3xl font-bold text-slate-900">اختبار تكيفي سريع</h1>
        <p className="text-sm text-slate-500">اختر مهارة ليتم توليد اختبار تكيفي بحسب مستوى إتقانك.</p>
      </header>

      <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm flex flex-col gap-3">
        <div className="flex items-center gap-2 text-slate-800 font-semibold text-sm">
          <Zap size={18} className="text-amber-500" /> توليد اختبار
        </div>
        <p className="text-sm text-slate-600">استخدم واجهة API: POST /api/tests/generate بتمرير skillId و questionCount. صفحة تفاعلية كاملة ستضاف لاحقاً.</p>
        <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 p-4 text-xs text-slate-600 leading-relaxed">
          مثال JSON:<br />
          {`{
  "skillId": "SKILL_ID",
  "questionCount": 5
}`}
        </div>
        <Link href="/dashboard/tests" className="inline-flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-600 w-fit">
          <Sparkles size={16} /> اذهب لسجل الاختبارات
        </Link>
      </section>
    </div>
  );
}
