import Link from 'next/link';
import { Percent } from 'lucide-react';
import { qudratCourses } from '@/app/lib/catalogData';

export const dynamic = 'force-static';

export default function QudratPage() {
  const filteredCourses = qudratCourses.filter((c) => c.category === 'quant' || c.category === 'verbal');

  return (
    <div className="bg-gray-50 min-h-screen pb-20" dir="rtl">
      <div className="bg-white border-b border-gray-200 py-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl font-black text-indigo-900 mb-4">دورات الكمي واللفظي 2025</h1>
          <p className="text-gray-500 max-w-2xl mx-auto">تأسيس وتدريب شامل لاختبار القدرات العامة مع نخبة من أفضل المعلمين</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 -mt-8 mb-16 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8">
          <HeroTile href="/qudrat/verbal" title="لفظي قدرات" subtitle="تأسيس - نماذج - تدريب" gradient="from-amber-400 to-amber-600" />
          <HeroTile href="/qudrat/quant" title="كمي قدرات" subtitle="تأسيس - محاكي - شروحات" gradient="from-blue-500 to-blue-700" />
          <Link href="/qudrat/packages" className="group relative h-28 md:h-36 w-full transition-all duration-300 focus:outline-none hover:-translate-y-1">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl md:rounded-3xl shadow-lg transition-colors group-hover:shadow-emerald-200/50" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-3 text-center gap-2">
              <span className="text-xl md:text-3xl font-black drop-shadow-md">العروض والباقات</span>
              <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1 text-xs font-bold">
                <Percent size={14} />
                خصومات حصرية
              </div>
            </div>
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-6 flex items-center gap-2">
          <div className="w-3 h-8 rounded-full bg-indigo-600" />
          <h2 className="text-2xl font-bold text-gray-800">أحدث الدورات</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </div>
  );
}

function HeroTile({ href, title, subtitle, gradient }: { href: string; title: string; subtitle: string; gradient: string }) {
  return (
    <Link href={href} className="group relative h-28 md:h-36 w-full transition-all duration-300 focus:outline-none hover:-translate-y-1">
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} rounded-2xl md:rounded-3xl shadow-lg transition-colors group-hover:shadow-xl`} />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-3 text-center">
        <span className="text-xl md:text-3xl font-black drop-shadow-md">{title}</span>
        <span className="text-[10px] md:text-xs font-bold opacity-90 mt-1 hidden md:block">{subtitle}</span>
      </div>
    </Link>
  );
}

function CourseCard({ course }: { course: typeof qudratCourses[number] }) {
  return (
    <div className="flex flex-col h-full hover:shadow-xl transition-shadow duration-300 border border-gray-100 overflow-hidden bg-white rounded-2xl">
      <div className="relative h-48 bg-gray-100 group overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur shadow-sm px-2 py-1 rounded-lg text-xs font-bold text-gray-700 flex items-center gap-1">
          ⭐ {course.rating}
        </div>
      </div>
      <div className="p-5 flex-1 flex flex-col gap-3">
        <div>
          <span className={`text-[10px] px-2 py-1 rounded-full font-bold ${course.category === 'quant' ? 'bg-blue-50 text-blue-600' : 'bg-amber-50 text-amber-600'}`}>
            {course.badge || (course.category === 'quant' ? 'القسم الكمي' : 'القسم اللفظي')}
          </span>
          <h3 className="text-lg font-bold text-gray-900 mt-2 leading-snug">{course.title}</h3>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200">👤</div>
          <span>{course.instructor}</span>
        </div>
        <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-50">
          <div>
            <span className="text-xs text-gray-400 line-through">{course.price + 50} ر.س</span>
            <div className="text-xl font-black text-emerald-600">{course.price} <span className="text-xs font-normal text-gray-500">ر.س</span></div>
          </div>
          <Link href={`/dashboard/my-courses`} className="bg-white border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white px-4 py-2 rounded-xl font-bold text-sm transition-all">
            مواصلة التعلم
          </Link>
        </div>
      </div>
    </div>
  );
}
