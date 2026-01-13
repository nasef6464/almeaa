import Link from 'next/link';
import { tahsiliSubjects } from '@/app/lib/catalogData';

export const dynamic = 'force-static';

export default function TahsiliPage() {
  return (
    <div className="bg-gray-50 min-h-screen pb-20" dir="rtl">
      <div className="bg-white border-b border-gray-200 py-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl font-black text-gray-900 mb-4">التحصيلي العلمي</h1>
          <p className="text-gray-500 max-w-2xl mx-auto">تغطية شاملة لجميع المواد العلمية مع بنوك أسئلة محدثة وشروحات تفاعلية</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 -mt-8 mb-16 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {tahsiliSubjects.map((sub) => (
            <Link key={sub.id} href={`/tahsili/${sub.id}`} className="group relative h-24 md:h-36 w-full transition-all duration-300 focus:outline-none hover:-translate-y-1">
              <div className={`absolute inset-0 bg-gradient-to-br ${sub.color} rounded-2xl shadow-lg transition-colors group-hover:shadow-xl`} />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-2 text-center">
                <span className="text-xl md:text-2xl font-black drop-shadow-md">{sub.label}</span>
                <span className="text-[10px] md:text-xs font-bold opacity-90 mt-1 hidden md:block">{sub.subtitle}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">لماذا تختار دورات التحصيلي معنا؟</h2>
          <div className="grid md:grid-cols-3 gap-8 text-right">
            <FeatureItem title="تغطية شاملة" desc="شرح لجميع مقررات الصف الأول والثاني والثالث الثانوي" />
            <FeatureItem title="تجميعات محدثة" desc="حل وشرح أحدث التجميعات والأسئلة المتكررة" />
            <FeatureItem title="خرائط ذهنية" desc="ملخصات ذكية لربط المعلومات وتسهيل الحفظ" />
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureItem({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="p-4">
      <h3 className="font-bold text-lg text-gray-900 mb-2 border-r-4 border-emerald-500 pr-3">{title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}
