import Link from 'next/link';

export default function QudratMainPage() {
  return (
    <div className="bg-gray-50 min-h-screen pb-20" dir="rtl">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            دورات الكمي واللفظي 2025
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            تأسيس وتدريب شامل لاختبار القدرات العامة مع نخبة من أفضل المختصين
          </p>
        </div>
      </section>

      {/* Main Cards */}
      <div className="max-w-7xl mx-auto px-4 -mt-8">
        <div className="grid md:grid-cols-3 gap-6">
          {/* لفظي قدرات */}
          <Link href="/qudrat/verbal">
            <div className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-3xl p-8 text-white hover:shadow-2xl transition-all cursor-pointer transform hover:-translate-y-2 min-h-[200px] flex flex-col justify-center items-center text-center">
              <h2 className="text-3xl font-black mb-2">القدرات اللفظي</h2>
              <p className="text-amber-50 text-sm">تأسيس - مكثف - تدريب</p>
            </div>
          </Link>

          {/* كمي قدرات */}
          <Link href="/qudrat/quant">
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl p-8 text-white hover:shadow-2xl transition-all cursor-pointer transform hover:-translate-y-2 min-h-[200px] flex flex-col justify-center items-center text-center">
              <h2 className="text-3xl font-black mb-2">القدرات الكمي</h2>
              <p className="text-blue-50 text-sm">تأسيس - كمي - شروحات</p>
            </div>
          </Link>

          {/* العروض والباقات */}
          <Link href="/qudrat/packages">
            <div className="bg-gradient-to-br from-emerald-400 to-teal-500 rounded-3xl p-8 text-white hover:shadow-2xl transition-all cursor-pointer transform hover:-translate-y-2 min-h-[200px] flex flex-col justify-center items-center text-center">
              <h2 className="text-3xl font-black mb-2">العروض والباقات</h2>
              <p className="text-emerald-50 text-sm">٪ عروض حصرية</p>
            </div>
          </Link>
        </div>
      </div>

      {/* أحدث الدورات Section */}
      <section className="max-w-7xl mx-auto px-4 mt-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
            📚 أحدث الدورات
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Qudrat Verbal Card */}
          <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl overflow-hidden shadow-lg">
            <div className="p-6 text-white">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-white/20 text-white text-xs font-bold px-2 py-1 rounded">4.9 ⭐</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Qudrat Verbal</h3>
            </div>
            <div className="bg-white p-6">
              <h4 className="font-bold text-gray-900 mb-2">التأسيس اللفظي</h4>
              <p className="text-sm text-gray-600 mb-1">أ. أحمد عبد حليم سنانر</p>
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <span className="text-sm text-gray-500">نظرى ريال</span>
                <Link href="/qudrat/verbal" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 py-2 rounded-lg text-sm">
                  تفاصيل
                </Link>
              </div>
            </div>
          </div>

          {/* Qudrat Quant Card */}
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl overflow-hidden shadow-lg">
            <div className="p-6 text-white">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-white/20 text-white text-xs font-bold px-2 py-1 rounded">4.9 ⭐</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Qudrat Quant</h3>
            </div>
            <div className="bg-white p-6">
              <h4 className="font-bold text-gray-900 mb-2">التأسيس الشامل (قدرات كمي)</h4>
              <p className="text-sm text-gray-600 mb-1">ناصف أحمد</p>
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <span className="text-sm text-gray-500">نظرى ريال 200</span>
                <Link href="/qudrat/quant" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 py-2 rounded-lg text-sm">
                  تفاصيل
                </Link>
              </div>
            </div>
          </div>

          {/* دورة التدريبات Card */}
          <div className="bg-gradient-to-br from-gray-700 to-gray-900 rounded-2xl overflow-hidden shadow-lg">
            <div className="h-48 bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=400&fit=crop)' }}>
              <div className="h-full bg-black/40 p-6 flex items-end">
                <div className="text-white">
                  <span className="bg-white/20 text-white text-xs font-bold px-2 py-1 rounded">4.9 ⭐</span>
                </div>
              </div>
            </div>
            <div className="bg-white p-6">
              <h4 className="font-bold text-gray-900 mb-2">القدرات والتحصيلي - دورة التدريبات</h4>
              <p className="text-sm text-gray-600 mb-1">أ. أحمد السالم</p>
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <span className="text-sm text-gray-500">نظرى ريال 299</span>
                <Link href="/qudrat/quant" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 py-2 rounded-lg text-sm">
                  تفاصيل
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
