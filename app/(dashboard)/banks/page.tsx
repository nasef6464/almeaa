import Sidebar from "@/components/layout/Sidebar";

export default function BanksPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex" dir="rtl">
      <Sidebar />
      <main className="flex-1 p-8 space-y-3">
        <header className="space-y-1">
          <p className="text-sm text-slate-500">بنوك المحتوى</p>
          <h1 className="text-2xl font-bold text-slate-900">بنك الأسئلة</h1>
          <p className="text-sm text-slate-600">ستُدمج هنا قوائم الأسئلة، الفلاتر، والاستيراد.</p>
        </header>
        <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-6 text-sm text-slate-600">
          سيتم عرض بيانات بنك الأسئلة فور ربطها بالخدمة.
        </div>
      </main>
    </div>
  );
}
