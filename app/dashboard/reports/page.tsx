import React from 'react';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { BarChart3, Download } from 'lucide-react';

export default async function ReportsPage() {
  const session = await auth();
  if (!session?.user) redirect('/auth/signin');

  return (
    <div className="space-y-6" dir="rtl">
      <header className="space-y-1">
        <p className="text-sm text-slate-500">التقارير</p>
        <h1 className="text-3xl font-bold text-slate-900">لوحة التقارير</h1>
        <p className="text-sm text-slate-500">ملخصات الأداء والتحميل إلى CSV ستُفعّل لاحقاً.</p>
      </header>

      <section className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-5 text-sm text-slate-600 flex items-center gap-2">
        <BarChart3 size={18} className="text-amber-500" />
        سيتم ربط هذه الصفحة بمصادر الأداء (الاختبارات، المهارات، الدورات) مع تنزيل CSV/Excel.
      </section>

      <button className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
        <Download size={16} /> تصدير CSV (لاحقاً)
      </button>
    </div>
  );
}
