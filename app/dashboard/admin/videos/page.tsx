import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { Film, Globe2, Lock, PlusCircle, Shield } from 'lucide-react';

export default async function VideoBankPage() {
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
          <p className="text-sm text-slate-500">بنك الفيديوهات</p>
          <h1 className="text-2xl font-bold text-slate-900">أدر دروس الفيديو بوسوم المهارات</h1>
          <p className="text-sm text-slate-500">رابط Vimeo/Mux مفضل، مع حالة الإتاحة (عام/مشترك/مدفوع/مجموعة).</p>
        </div>
        <Link href="/dashboard/admin/videos/new" className="inline-flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-600">
          <PlusCircle size={16} /> رفع/ربط فيديو
        </Link>
      </header>

      <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
        <div className="grid md:grid-cols-3 gap-3">
          <VideoCard icon={<Film size={18} />} title="وسوم المهارات" hint="مادة • قسم • مهارة • صعوبة" />
          <VideoCard icon={<Shield size={18} />} title="مصدر آمن" hint="Vimeo/Mux مع إخفاء الرابط" />
          <VideoCard icon={<Globe2 size={18} />} title="حالة الإتاحة" hint="عام / مشترك / مدفوع / مجموعة" />
        </div>
        <div className="mt-4 rounded-xl border border-dashed border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
          سيظهر هنا جدول الفيديوهات الحقيقي فور إضافة بيانات من قاعدة البيانات.
        </div>
      </section>

      <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900 mb-3">سياسات الوصول</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          <Policy label="عام" description="متاح للجميع" icon={<Globe2 size={16} />} />
          <Policy label="مشترك" description="للمشتركين في الخطة" icon={<Lock size={16} />} />
          <Policy label="مدفوع" description="جزء من دورة مدفوعة" icon={<Film size={16} />} />
          <Policy label="مجموعة" description="مقيد على مدرسة/مجموعة" icon={<Shield size={16} />} />
        </div>
      </section>
    </div>
  );
}

function VideoCard({ icon, title, hint }: { icon: React.ReactNode; title: string; hint: string }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm flex items-start gap-3">
      <div className="h-10 w-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100">
        {icon}
      </div>
      <div>
        <p className="text-sm font-semibold text-slate-900">{title}</p>
        <p className="text-xs text-slate-500">{hint}</p>
      </div>
    </div>
  );
}

function Policy({ label, description, icon }: { label: string; description: string; icon: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2 rounded-xl border border-slate-100 bg-white p-3 shadow-sm">
      <div className="mt-0.5 text-slate-500">{icon}</div>
      <div>
        <p className="text-sm font-semibold text-slate-900">{label}</p>
        <p className="text-xs text-slate-500">{description}</p>
      </div>
    </div>
  );
}
