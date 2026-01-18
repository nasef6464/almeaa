import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { prisma } from '@/app/db';
import Link from 'next/link';
import { Trophy, Target, Clock, CheckCircle, XCircle, Award } from 'lucide-react';

interface TestResultsPageProps {
  params: Promise<{ testId: string; attemptId: string }>;
}

export default async function TestResultsPage({ params }: TestResultsPageProps) {
  const session = await auth();
  if (!session?.user) redirect('/auth/signin');

  const { testId, attemptId } = await params;

  const attempt = await prisma.testAttempt.findUnique({
    where: { id: attemptId },
    include: {
      test: {
        include: {
          questions: {
            include: {
              question: true,
            },
          },
        },
      },
      answers: {
        include: {
          question: true,
        },
      },
    },
  });

  if (!attempt) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            النتيجة غير موجودة
          </h1>
          <Link href="/dashboard/tests" className="text-blue-600 hover:underline">
            العودة للاختبارات
          </Link>
        </div>
      </div>
    );
  }

  // حساب النتائج
  const totalQuestions = attempt.test.questions.length;
  const correctAnswers = attempt.answers.filter((a) => a.isCorrect).length;
  const score = totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0;
  const passed = score >= (attempt.test.passingScore || 60);

  const timeTaken = attempt.completedAt && attempt.startedAt
    ? Math.round((attempt.completedAt.getTime() - attempt.startedAt.getTime()) / 1000 / 60)
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Score Circle */}
        <div className="text-center mb-8">
          <div
            className={`inline-flex items-center justify-center w-40 h-40 rounded-full border-8 mb-4 ${
              passed
                ? 'border-green-500 bg-green-50'
                : 'border-red-500 bg-red-50'
            }`}
          >
            <div className="text-center">
              <p
                className={`text-5xl font-bold ${
                  passed ? 'text-green-700' : 'text-red-700'
                }`}
              >
                {Math.round(score)}%
              </p>
            </div>
          </div>

          {passed ? (
            <div className="mb-4">
              <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-2" />
              <h1 className="text-4xl font-bold text-green-700">مبروك! نجحت</h1>
              <p className="text-gray-600 mt-2">أحسنت! لقد اجتزت الاختبار بنجاح</p>
            </div>
          ) : (
            <div className="mb-4">
              <XCircle className="w-16 h-16 text-red-500 mx-auto mb-2" />
              <h1 className="text-4xl font-bold text-red-700">للأسف، لم تنجح</h1>
              <p className="text-gray-600 mt-2">
                تحتاج إلى {attempt.test.passingScore || 60}% للنجاح
              </p>
            </div>
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <Target className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <p className="text-gray-600 text-sm mb-1">الدرجة</p>
            <p className="text-2xl font-bold text-gray-900">
              {correctAnswers}/{totalQuestions}
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="text-gray-600 text-sm mb-1">إجابات صحيحة</p>
            <p className="text-2xl font-bold text-green-700">{correctAnswers}</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <XCircle className="w-8 h-8 text-red-600 mx-auto mb-2" />
            <p className="text-gray-600 text-sm mb-1">إجابات خاطئة</p>
            <p className="text-2xl font-bold text-red-700">
              {totalQuestions - correctAnswers}
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <Clock className="w-8 h-8 text-amber-600 mx-auto mb-2" />
            <p className="text-gray-600 text-sm mb-1">الوقت المستغرق</p>
            <p className="text-2xl font-bold text-gray-900">{timeTaken} دقيقة</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-gray-700">نسبة النجاح</span>
            <span className="text-sm font-semibold text-gray-700">
              {attempt.test.passingScore || 60}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
            <div
              className={`h-3 rounded-full transition-all ${
                passed ? 'bg-green-500' : 'bg-red-500'
              }`}
              style={{ width: `${score}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>0%</span>
            <span>100%</span>
          </div>
        </div>

        {/* Review Answers */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Award className="w-6 h-6" />
            مراجعة الإجابات
          </h2>

          <div className="space-y-6">
            {attempt.test.questions.map((testQuestion, index) => {
              const userAnswer = attempt.answers.find(
                (a) => a.questionId === testQuestion.questionId
              );
              const question = testQuestion.question;
              const options = (question.options as any) || [];
              const correctAnswer = question.correctAnswer;

              return (
                <div
                  key={testQuestion.id}
                  className={`border-2 rounded-xl p-6 ${
                    userAnswer?.isCorrect
                      ? 'border-green-200 bg-green-50'
                      : 'border-red-200 bg-red-50'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                        userAnswer?.isCorrect
                          ? 'bg-green-500 text-white'
                          : 'bg-red-500 text-white'
                      }`}
                    >
                      {index + 1}
                    </div>

                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 mb-4">
                        {question.question}
                      </h3>

                      <div className="space-y-2 mb-4">
                        {Array.isArray(options) && options.map((option: any) => {
                          const isUserAnswer = userAnswer?.answer === option.id;
                          const isCorrect = correctAnswer === option.id;

                          let className = 'p-3 rounded-lg border-2 ';
                          if (isCorrect) {
                            className += 'border-green-500 bg-green-100 text-green-900';
                          } else if (isUserAnswer && !isCorrect) {
                            className += 'border-red-500 bg-red-100 text-red-900';
                          } else {
                            className += 'border-gray-200 bg-white text-gray-700';
                          }

                          return (
                            <div key={option.id} className={className}>
                              <div className="flex items-center justify-between">
                                <span>{option.text}</span>
                                {isCorrect && (
                                  <CheckCircle className="w-5 h-5 text-green-600" />
                                )}
                                {isUserAnswer && !isCorrect && (
                                  <XCircle className="w-5 h-5 text-red-600" />
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {question.explanation && (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <p className="text-sm text-blue-900">
                            <strong>الشرح:</strong> {question.explanation}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 justify-center">
          <Link
            href="/dashboard/tests"
            className="px-8 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition"
          >
            العودة للاختبارات
          </Link>
          {!passed && (
            <Link
              href={`/dashboard/tests/${testId}/start`}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition"
            >
              إعادة المحاولة
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
