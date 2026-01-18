import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { prisma } from '@/app/db';
import { Brain, Target, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default async function SaherPage() {
  const session = await auth();
  if (!session?.user) redirect('/auth/signin');
  if (session.user.role !== 'STUDENT') redirect('/dashboard');

  const studentId = session.user.student?.id;
  if (!studentId) redirect('/dashboard');

  // جلب بيانات الإتقان
  const masteries = await prisma.studentSkillMastery.findMany({
    where: { studentId },
    include: {
      skill: {
        include: {
          section: {
            include: {
              category: {
                select: { name: true },
              },
            },
          },
        },
      },
    },
    orderBy: { masteryScore: 'desc' },
  });

  // تصنيف المهارات
  const excellent = masteries.filter((m) => m.masteryScore >= 80);
  const good = masteries.filter(
    (m) => m.masteryScore >= 60 && m.masteryScore < 80
  );
  const needsWork = masteries.filter((m) => m.masteryScore < 60);

  // حساب المتوسط العام
  const overallMastery =
    masteries.length > 0
      ? Math.round(
          masteries.reduce((sum, m) => sum + m.masteryScore, 0) /
            masteries.length
        )
      : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full mb-4">
            <Brain className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            محرك ساهر التكيفي
          </h1>
          <p className="text-xl text-gray-600">
            نظام ذكي لتتبع مهاراتك وتطوير نقاط قوتك
          </p>
        </div>

        {/* Overall Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <Target className="w-10 h-10 text-purple-600 mb-3" />
            <p className="text-gray-600 mb-1">الإتقان العام</p>
            <p className="text-4xl font-bold text-gray-900">{overallMastery}%</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <CheckCircle className="w-10 h-10 text-green-600 mb-3" />
            <p className="text-gray-600 mb-1">مهارات متقنة</p>
            <p className="text-4xl font-bold text-green-700">{excellent.length}</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <TrendingUp className="w-10 h-10 text-blue-600 mb-3" />
            <p className="text-gray-600 mb-1">في التحسن</p>
            <p className="text-4xl font-bold text-blue-700">{good.length}</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <AlertCircle className="w-10 h-10 text-red-600 mb-3" />
            <p className="text-gray-600 mb-1">تحتاج تركيز</p>
            <p className="text-4xl font-bold text-red-700">{needsWork.length}</p>
          </div>
        </div>

        {/* Weak Skills Alert */}
        {needsWork.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-12">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="text-xl font-bold text-red-900 mb-2">
                  تنبيه: مهارات تحتاج تحسين
                </h3>
                <p className="text-red-700 mb-4">
                  لديك {needsWork.length} مهارة تحتاج إلى مزيد من التدريب.
                  ننصحك بالتركيز عليها خلال الأيام القادمة.
                </p>
                <Link
                  href="/dashboard/saher/recovery-plan"
                  className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition"
                >
                  إنشاء خطة علاجية
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Skills Breakdown */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Excellent Skills */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-7 h-7 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">مهارات متقنة</h2>
            </div>

            {excellent.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                لا توجد مهارات متقنة بعد. استمر في التدريب!
              </p>
            ) : (
              <div className="space-y-3">
                {excellent.map((mastery) => (
                  <div
                    key={mastery.id}
                    className="border border-green-200 rounded-lg p-4 bg-green-50"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">
                        {mastery.skill.name}
                      </h3>
                      <span className="text-2xl font-bold text-green-700">
                        {mastery.masteryScore}%
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {mastery.skill.section.category.name} •{' '}
                      {mastery.skill.section.name}
                    </p>
                    <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full"
                        style={{ width: `${mastery.masteryScore}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Good Skills */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-7 h-7 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">في التحسن</h2>
            </div>

            {good.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                لا توجد مهارات في هذه الفئة
              </p>
            ) : (
              <div className="space-y-3">
                {good.map((mastery) => (
                  <div
                    key={mastery.id}
                    className="border border-blue-200 rounded-lg p-4 bg-blue-50"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">
                        {mastery.skill.name}
                      </h3>
                      <span className="text-2xl font-bold text-blue-700">
                        {mastery.masteryScore}%
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {mastery.skill.section.category.name} •{' '}
                      {mastery.skill.section.name}
                    </p>
                    <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${mastery.masteryScore}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Needs Work */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <AlertCircle className="w-7 h-7 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">تحتاج تركيز</h2>
            </div>

            {needsWork.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                رائع! لا توجد مهارات ضعيفة
              </p>
            ) : (
              <div className="space-y-3">
                {needsWork.map((mastery) => (
                  <div
                    key={mastery.id}
                    className="border border-red-200 rounded-lg p-4 bg-red-50"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">
                        {mastery.skill.name}
                      </h3>
                      <span className="text-2xl font-bold text-red-700">
                        {mastery.masteryScore}%
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {mastery.skill.section.category.name} •{' '}
                      {mastery.skill.section.name}
                    </p>
                    <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-red-600 h-2 rounded-full"
                        style={{ width: `${mastery.masteryScore}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Empty State */}
        {masteries.length === 0 && (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <Brain className="w-20 h-20 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              ابدأ رحلتك التعليمية
            </h2>
            <p className="text-gray-600 mb-6">
              لم تبدأ أي اختبارات بعد. قم بحل اختبار واحد على الأقل لنبدأ تتبع
              مهاراتك!
            </p>
            <Link
              href="/dashboard/tests"
              className="inline-block bg-purple-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-purple-700 transition"
            >
              استكشف الاختبارات
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
