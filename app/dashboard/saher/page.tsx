import React from 'react';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { Zap, Clock, Target, Brain } from 'lucide-react';
import Link from 'next/link';

export default async function SaherTestPage() {
  const session = await auth();
  if (!session?.user) redirect('/auth/signin');

  const { user } = session;
  if (user.role !== 'STUDENT') redirect('/dashboard');

  const firstName = user.name?.split(' ')[0] || 'طالب';

  return (
    <div className="space-y-8" dir="rtl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center">
            <Zap size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">اختبار ساهر الذكي</h1>
            <p className="text-gray-500">اختبار تشخيصي شامل لقياس مستواك الحقيقي</p>
            <p className="text-sm text-gray-400">جاهز يا {firstName}؟</p>
          </div>
        </div>
      </div>

      {/* Test Overview Card */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <Clock size={28} />
            </div>
            <h3 className="font-bold text-lg mb-1">45 دقيقة</h3>
            <p className="text-sm text-gray-500">مدة الاختبار</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <Target size={28} />
            </div>
            <h3 className="font-bold text-lg mb-1">40 سؤال</h3>
            <p className="text-sm text-gray-500">متدرج الصعوبة</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <Brain size={28} />
            </div>
            <h3 className="font-bold text-lg mb-1">تقييم ذكي</h3>
            <p className="text-sm text-gray-500">يتكيف مع إجاباتك</p>
          </div>
        </div>
      </div>

      {/* How it works */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">كيف يعمل اختبار ساهر؟</h2>
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">1</div>
            <div>
              <h3 className="font-bold text-gray-800">يبدأ بأسئلة متوسطة</h3>
              <p className="text-sm text-gray-500">ليحدد مستواك التقريبي</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-bold">2</div>
            <div>
              <h3 className="font-bold text-gray-800">يتكيف مع أداءك</h3>
              <p className="text-sm text-gray-500">الأسئلة تصبح أسهل أو أصعب حسب إجاباتك</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-sm font-bold">3</div>
            <div>
              <h3 className="font-bold text-gray-800">يحدد نقاط قوتك وضعفك</h3>
              <p className="text-sm text-gray-500">تقرير مفصل مع خطة تحسين شخصية</p>
            </div>
          </div>
        </div>
      </div>

      {/* Important Notes */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-8">
        <h3 className="font-bold text-amber-800 mb-3 flex items-center gap-2">
          ⚠️ ملاحظات مهمة
        </h3>
        <ul className="space-y-2 text-sm text-amber-700">
          <li>• تأكد من وجود اتصال إنترنت مستقر</li>
          <li>• خذ وقتك في قراءة كل سؤال بعناية</li>
          <li>• لا يمكن العودة لسؤال سابق بعد الإجابة عليه</li>
          <li>• تجنب المقاطعات أثناء الاختبار</li>
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-colors flex items-center justify-center gap-3">
          <Zap size={24} />
          ابدأ اختبار ساهر
        </button>
        <Link href="/dashboard" className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-8 py-4 rounded-xl font-bold text-lg transition-colors text-center">
          العودة للوحة التحكم
        </Link>
      </div>

      {/* Recent Tests */}
      <div className="mt-12">
        <h3 className="text-lg font-bold text-gray-900 mb-4">آخر اختباراتك</h3>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-3">
              <Target size={28} />
            </div>
            <p className="text-gray-500">لم تؤد أي اختبار ساهر بعد</p>
            <p className="text-sm text-gray-400 mt-1">ستظهر نتائج اختباراتك السابقة هنا</p>
          </div>
        </div>
      </div>
    </div>
  );
}
