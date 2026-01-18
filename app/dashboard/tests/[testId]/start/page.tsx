import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { prisma } from '@/app/db';
import Link from 'next/link';
import { Clock, FileText, Target } from 'lucide-react';

interface TestStartPageProps {
  params: Promise<{ testId: string }>;
}

export default async function TestStartPage({ params }: TestStartPageProps) {
  const session = await auth();
  if (!session?.user) redirect('/auth/signin');

  const { testId } = await params;

  const test = await prisma.test.findUnique({
    where: { id: testId },
    include: {
      questions: {
        include: {
          question: true,
        },
      },
    },
  });

  if (!test) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            الاختبار غير موجود
          </h1>
          <Link
            href="/dashboard/tests"
            className="text-blue-600 hover:underline"
          >
            العودة للاختبارات
          </Link>
        </div>
      </div>
    );
  }

  const questionCount = test.questions.length;
  const totalPoints = test.questions.reduce(
    (sum, q) => sum + (q.question.points || 1),
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12">
      <div className="max-w-3xl mx-auto px-4">
        {/* العنوان */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {test.title}
          </h1>
          {test.description && (
            <p className="text-gray-600">{test.description}</p>
          )}
        </div>

        {/* بطاقة التفاصيل */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            تفاصيل الاختبار
          </h2>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {/* عدد الأسئلة */}
            <div className="bg-blue-50 rounded-xl p-6 text-center">
              <FileText className="w-10 h-10 text-blue-600 mx-auto mb-3" />
              <p className="text-gray-600 mb-1">عدد الأسئلة</p>
              <p className="text-3xl font-bold text-gray-900">{questionCount}</p>
            </div>

            {/* الوقت */}
            <div className="bg-amber-50 rounded-xl p-6 text-center">
              <Clock className="w-10 h-10 text-amber-600 mx-auto mb-3" />
              <p className="text-gray-600 mb-1">المدة</p>
              <p className="text-3xl font-bold text-gray-900">
                {test.timeLimit || 60} دقيقة
              </p>
            </div>

            {/* الدرجة */}
            <div className="bg-green-50 rounded-xl p-6 text-center">
              <Target className="w-10 h-10 text-green-600 mx-auto mb-3" />
              <p className="text-gray-600 mb-1">الدرجة الكلية</p>
              <p className="text-3xl font-bold text-gray-900">{totalPoints}</p>
            </div>
          </div>

          {/* التعليمات */}
          <div className="bg-gray-50 rounded-xl p-6 mb-6">
            <h3 className="font-bold text-gray-900 mb-3">تعليمات الاختبار:</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>اقرأ كل سؤال بعناية قبل الإجابة</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>يمكنك التنقل بين الأسئلة باستخدام خريطة الأسئلة</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>سيتم حفظ إجاباتك تلقائياً</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>بمجرد انتهاء الوقت، سيتم إرسال الاختبار تلقائياً</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>درجة النجاح: {test.passingScore || 60}%</span>
              </li>
            </ul>
          </div>

          {/* زر البدء */}
          <Link
            href={`/dashboard/tests/${testId}/take`}
            className="block w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-indigo-700 transition shadow-lg hover:shadow-xl"
          >
            ابدأ الاختبار الآن
          </Link>
        </div>

        {/* العودة */}
        <div className="text-center">
          <Link
            href="/dashboard/tests"
            className="text-gray-600 hover:text-gray-900"
          >
            ← العودة للاختبارات
          </Link>
        </div>
      </div>
    </div>
  );
}
