import Link from 'next/link';

export default function HomePage() {
  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8 text-right">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🎓 منصة التعلم التكيفي
          </h1>
          <p className="text-xl text-gray-600">
            تعلم قائم على المهارات مع تحليلات ذكية
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-bold mb-2">تعلم قائم على المهارات</h3>
            <p className="text-gray-600">إتقان المهارة الفردية وليس الدروس فقط</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="text-4xl mb-4">🧠</div>
            <h3 className="text-xl font-bold mb-2">اختبارات تكيفية</h3>
            <p className="text-gray-600">خطط علاجية تُنشأ تلقائيًا</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-bold mb-2">تحليلات</h3>
            <p className="text-gray-600">رؤى مبنية على البيانات</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold mb-6">لوحات التحكم</h2>
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <Link href="/taxonomy" className="block p-4 border-2 rounded-xl hover:border-amber-500 hover:bg-amber-50 transition-colors">
              <div className="text-2xl mb-2">🌳</div>
              <h3 className="font-bold text-gray-900">شجرة المهارات</h3>
              <p className="text-sm text-gray-600">استعرض المواد والأقسام والمهارات</p>
            </Link>
            <Link href="/schools" className="block p-4 border-2 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-colors">
              <div className="text-2xl mb-2">🏫</div>
              <h3 className="font-bold text-gray-900">المدارس</h3>
              <p className="text-sm text-gray-600">إدارة المدارس والمجموعات</p>
            </Link>
            <Link href="/banks" className="block p-4 border-2 rounded-xl hover:border-green-500 hover:bg-green-50 transition-colors">
              <div className="text-2xl mb-2">📚</div>
              <h3 className="font-bold text-gray-900">بنك الأسئلة</h3>
              <p className="text-sm text-gray-600">إدارة وتصنيف الأسئلة</p>
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mt-8">
          <h2 className="text-2xl font-bold mb-6">واجهات البرمجة (API)</h2>
          <div className="space-y-3">
            <Link href="/api/health" className="block p-4 border rounded-lg hover:border-blue-500">
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-bold mr-2">GET</span>
              <code className="text-sm">/api/health</code>
            </Link>
            <Link href="/api/skills" className="block p-4 border rounded-lg hover:border-blue-500">
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-bold mr-2">GET</span>
              <code className="text-sm">/api/skills</code>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
