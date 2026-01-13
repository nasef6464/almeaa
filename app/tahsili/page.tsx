import Link from 'next/link';

export default function TahsiliMainPage() {
  return (
    <div className="bg-gray-50 min-h-screen pb-20" dir="rtl">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-emerald-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            دورات التحصيلي 2025
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            تأسيس وتدريب شامل لاختبار التحصيلي مع نخبة من أفضل المختصين
          </p>
        </div>
      </section>

      {/* Main Cards */}
      <div className="max-w-7xl mx-auto px-4 -mt-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* رياضيات */}
          <Link href="/tahsili/math">
            <div className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-3xl p-8 text-white hover:shadow-2xl transition-all cursor-pointer transform hover:-translate-y-2 min-h-[180px] flex flex-col justify-center items-center text-center">
              <h2 className="text-3xl font-black mb-2">التحصيلي رياضيات</h2>
              <p className="text-amber-50 text-sm">تأسيس شامل</p>
            </div>
          </Link>

          {/* فيزياء */}
          <Link href="/tahsili/physics">
            <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-3xl p-8 text-white hover:shadow-2xl transition-all cursor-pointer transform hover:-translate-y-2 min-h-[180px] flex flex-col justify-center items-center text-center">
              <h2 className="text-3xl font-black mb-2">التحصيلي فيزياء</h2>
              <p className="text-blue-50 text-sm">شرح مبسط</p>
            </div>
          </Link>

          {/* كيمياء */}
          <Link href="/tahsili/chemistry">
            <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl p-8 text-white hover:shadow-2xl transition-all cursor-pointer transform hover:-translate-y-2 min-h-[180px] flex flex-col justify-center items-center text-center">
              <h2 className="text-3xl font-black mb-2">التحصيلي كيمياء</h2>
              <p className="text-purple-50 text-sm">من الصفر</p>
            </div>
          </Link>

          {/* أحياء */}
          <Link href="/tahsili/biology">
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-8 text-white hover:shadow-2xl transition-all cursor-pointer transform hover:-translate-y-2 min-h-[180px] flex flex-col justify-center items-center text-center">
              <h2 className="text-3xl font-black mb-2">التحصيلي أحياء</h2>
              <p className="text-emerald-50 text-sm">التفوق المضمون</p>
            </div>
          </Link>
        </div>

        {/* العروض Card - Full Width */}
        <div className="mt-6">
          <Link href="/tahsili/offers">
            <div className="bg-gradient-to-r from-rose-400 to-red-500 rounded-3xl p-8 text-white hover:shadow-2xl transition-all cursor-pointer transform hover:-translate-y-1 min-h-[120px] flex items-center justify-center text-center">
              <div>
                <h2 className="text-3xl font-black mb-2">العروض والباقات 🎁</h2>
                <p className="text-rose-50 text-sm">احصل على أفضل الأسعار</p>
              </div>
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
          {/* Math Card */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200">
            <div className="h-32 bg-gradient-to-br from-amber-400 to-orange-500"></div>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-amber-100 text-amber-700 text-xs font-bold px-2 py-1 rounded">5.0 ⭐</span>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">دورة الـ 100% (رياضيات تأسيس 2026)</h4>
              <p className="text-sm text-gray-600 mb-1">د. عمر الزهراني</p>
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <span className="text-lg font-bold text-emerald-600">349 ريال</span>
                <Link href="/tahsili/math" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-lg text-sm">
                  تفاصيل
                </Link>
              </div>
            </div>
          </div>

          {/* Physics Card */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200">
            <div className="h-32 bg-gradient-to-br from-blue-500 to-cyan-600"></div>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded">4.8 ⭐</span>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">فيزياء تحصيلي - المنهج الكامل</h4>
              <p className="text-sm text-gray-600 mb-1">د. فهد القحطاني</p>
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <span className="text-lg font-bold text-emerald-600">329 ريال</span>
                <Link href="/tahsili/physics" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-lg text-sm">
                  تفاصيل
                </Link>
              </div>
            </div>
          </div>

          {/* Chemistry Card */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200">
            <div className="h-32 bg-gradient-to-br from-purple-500 to-pink-600"></div>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-purple-100 text-purple-700 text-xs font-bold px-2 py-1 rounded">4.7 ⭐</span>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">كيمياء تحصيلي - شرح شامل</h4>
              <p className="text-sm text-gray-600 mb-1">أ. نورة الدوسري</p>
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <span className="text-lg font-bold text-emerald-600">299 ريال</span>
                <Link href="/tahsili/chemistry" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-lg text-sm">
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
