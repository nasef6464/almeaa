import Sidebar from "@/components/layout/Sidebar";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

export default function AddSubjectPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex" dir="rtl">
      <Sidebar />
      <main className="flex-1 p-8 space-y-6">
        <header className="flex items-center gap-4">
          <Link href="/taxonomy" className="p-2 hover:bg-white rounded-lg transition-colors">
            <ArrowLeft size={20} className="text-slate-600" />
          </Link>
          <div>
            <p className="text-sm text-slate-500">إدارة التصنيف</p>
            <h1 className="text-2xl font-bold text-slate-900">إضافة مادة دراسية</h1>
          </div>
        </header>

        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                اسم المادة <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                placeholder="مثل: الرياضيات، اللغة العربية، العلوم"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                الوصف
              </label>
              <textarea
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent h-24 resize-none"
                placeholder="وصف مختصر للمادة الدراسية..."
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  الأيقونة
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="🔢"
                  maxLength={2}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  الترتيب
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  defaultValue={1}
                  min={1}
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="published"
                className="rounded border-slate-300 text-amber-500 focus:ring-amber-500"
                defaultChecked
              />
              <label htmlFor="published" className="text-sm text-slate-700">
                نشر المادة فوراً
              </label>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="inline-flex items-center gap-2 bg-amber-500 text-white px-6 py-2 rounded-lg hover:bg-amber-600 font-semibold"
              >
                <Save size={16} />
                حفظ المادة
              </button>
              <Link
                href="/taxonomy"
                className="inline-flex items-center gap-2 border border-slate-200 text-slate-700 px-6 py-2 rounded-lg hover:bg-slate-50 font-semibold"
              >
                إلغاء
              </Link>
            </div>
          </form>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <h3 className="font-semibold text-amber-800 mb-2">💡 نصائح</h3>
          <ul className="text-sm text-amber-700 space-y-1">
            <li>• اختر اسماً واضحاً ومميزاً للمادة</li>
            <li>• يمكنك إضافة الفروع والأقسام بعد حفظ المادة</li>
            <li>• الترتيب يحدد موضع المادة في الشجرة</li>
          </ul>
        </div>
      </main>
    </div>
  );
}