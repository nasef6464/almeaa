'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Timer } from '@/components/test/Timer';
import { QuestionCard } from '@/components/test/QuestionCard';
import { QuestionNavigation } from '@/components/test/QuestionNavigation';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

interface Question {
  id: string;
  text: string;
  explanation: string | null;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
}

interface TestData {
  id: string;
  title: string;
  timeLimit: number;
  questions: Question[];
}

export default function TestTakePage({ params }: { params: Promise<{ testId: string }> }) {
  const router = useRouter();
  const [testId, setTestId] = useState<string>('');
  const [test, setTest] = useState<TestData | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [attemptId, setAttemptId] = useState<string>('');
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    params.then(p => setTestId(p.testId));
  }, [params]);

  useEffect(() => {
    if (!testId) return;

    async function loadTest() {
      try {
        const response = await fetch(`/api/tests/${testId}`);
        const data = await response.json();
        
        if (data.success) {
          setTest(data.test);
          setAttemptId(data.attemptId);
        } else {
          alert('فشل تحميل الاختبار');
          router.push('/dashboard/tests');
        }
      } catch (error) {
        console.error('Error loading test:', error);
        alert('حدث خطأ أثناء تحميل الاختبار');
      } finally {
        setLoading(false);
      }
    }

    loadTest();
  }, [testId, router]);

  const handleAnswer = (questionIndex: number, optionId: string) => {
    setAnswers((prev) => ({ ...prev, [questionIndex]: optionId }));

    // حفظ الإجابة تلقائياً
    fetch(`/api/tests/${testId}/answer`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        attemptId,
        questionId: test!.questions[questionIndex].id,
        optionId,
      }),
    }).catch(console.error);
  };

  const handleSubmit = async () => {
    setSubmitting(true);

    try {
      const response = await fetch(`/api/tests/${testId}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ attemptId }),
      });

      const data = await response.json();

      if (data.success) {
        router.push(`/dashboard/tests/${testId}/results/${attemptId}`);
      } else {
        alert('فشل إرسال الاختبار');
        setSubmitting(false);
      }
    } catch (error) {
      console.error('Error submitting test:', error);
      alert('حدث خطأ أثناء إرسال الاختبار');
      setSubmitting(false);
    }
  };

  const handleTimeExpire = () => {
    alert('انتهى الوقت! سيتم إرسال الاختبار الآن.');
    handleSubmit();
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!test) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>لم يتم العثور على الاختبار</p>
      </div>
    );
  }

  const answeredCount = Object.keys(answers).length;
  const totalCount = test.questions.length;
  const allAnswered = answeredCount === totalCount;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">{test.title}</h1>
          <Timer
            seconds={test.timeLimit * 60}
            onExpire={handleTimeExpire}
          />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* السؤال */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <p className="text-sm text-gray-600">
                السؤال {currentQuestion + 1} من {totalCount}
              </p>
            </div>

            <QuestionCard
              question={test.questions[currentQuestion]}
              answer={answers[currentQuestion] || null}
              onChange={(optionId) => handleAnswer(currentQuestion, optionId)}
            />

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-6">
              <button
                onClick={() => setCurrentQuestion((prev) => Math.max(0, prev - 1))}
                disabled={currentQuestion === 0}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition"
              >
                ← السابق
              </button>

              {currentQuestion === totalCount - 1 ? (
                <button
                  onClick={() => setShowConfirmSubmit(true)}
                  className="px-8 py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition shadow-lg"
                >
                  إنهاء الاختبار
                </button>
              ) : (
                <button
                  onClick={() => setCurrentQuestion((prev) => Math.min(totalCount - 1, prev + 1))}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  التالي →
                </button>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <QuestionNavigation
              total={totalCount}
              current={currentQuestion}
              answers={answers}
              onNavigate={setCurrentQuestion}
            />

            {/* تحذير */}
            {!allAnswered && (
              <div className="mt-6 bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-amber-900">
                      لم تجب على جميع الأسئلة
                    </p>
                    <p className="text-sm text-amber-700 mt-1">
                      تبقى {totalCount - answeredCount} أسئلة بدون إجابة
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Confirm Submit Modal */}
      {showConfirmSubmit && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
              هل أنت متأكد؟
            </h2>
            
            <p className="text-gray-600 text-center mb-6">
              {allAnswered
                ? 'لقد أجبت على جميع الأسئلة. هل تريد إنهاء الاختبار؟'
                : `لم تجب على ${totalCount - answeredCount} أسئلة. هل تريد المتابعة؟`}
            </p>

            <div className="flex gap-4">
              <button
                onClick={() => setShowConfirmSubmit(false)}
                className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
                disabled={submitting}
              >
                إلغاء
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition disabled:opacity-50"
                disabled={submitting}
              >
                {submitting ? 'جاري الإرسال...' : 'تأكيد'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
