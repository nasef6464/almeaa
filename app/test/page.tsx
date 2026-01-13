'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

interface Question {
  id: string;
  text: string;
  type: string;
  options: any;
  difficultyLevel: string;
  points: number;
}

interface Test {
  id: string;
  title: string;
  duration: number;
  questionCount: number;
  questions: Question[];
}

function TestContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const skillId = searchParams.get('skillId');

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [test, setTest] = useState<Test | null>(null);
  const [attemptId, setAttemptId] = useState<string>('');
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    if (!skillId) {
      router.push('/dashboard');
      return;
    }

    generateTest();
  }, [skillId]);

  useEffect(() => {
    if (timeRemaining <= 0) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining]);

  const generateTest = async () => {
    try {
      const response = await fetch('/api/tests/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ skillId, questionCount: 5 }),
      });

      const data = await response.json();
      if (data.success) {
        setTest(data.data.test);
        setAttemptId(data.data.attemptId);
        setTimeRemaining(data.data.test.duration * 60); // Convert to seconds
      }
    } catch (error) {
      console.error('Error generating test:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerChange = (questionId: string, answer: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmit = async () => {
    if (submitting) return;
    setSubmitting(true);

    try {
      const answerArray = Object.entries(answers).map(([questionId, answer]) => ({
        questionId,
        answer,
      }));

      const response = await fetch('/api/tests/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ attemptId, answers: answerArray }),
      });

      const data = await response.json();
      if (data.success) {
        setResult(data.data);
      }
    } catch (error) {
      console.error('Error submitting test:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Generating your adaptive test...</p>
        </div>
      </div>
    );
  }

  if (result) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <div className={`text-6xl mb-4 ${result.passed ? '🎉' : '📚'}`}>
                {result.passed ? '🎉' : '📚'}
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {result.passed ? 'Great Job!' : 'Keep Learning!'}
              </h1>
              <p className="text-gray-600">
                {result.passed
                  ? 'You passed the test!'
                  : 'Review the material and try again'}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-blue-50 rounded-xl p-6 text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {result.score}%
                </div>
                <div className="text-sm text-gray-600">Score</div>
              </div>
              <div className="bg-green-50 rounded-xl p-6 text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">
                  {result.correctAnswers}/{result.questionsCount}
                </div>
                <div className="text-sm text-gray-600">Correct</div>
              </div>
            </div>

            <div className="space-y-4">
              <Link
                href="/dashboard"
                className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Back to Dashboard
              </Link>
              <button
                onClick={() => router.refresh()}
                className="block w-full bg-gray-200 text-gray-800 text-center py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
              >
                Take Another Test
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">{test?.title}</h1>
            <div
              className={`text-2xl font-bold ${
                timeRemaining < 60 ? 'text-red-600' : 'text-blue-600'
              }`}
            >
              ⏱️ {formatTime(timeRemaining)}
            </div>
          </div>

          <div className="space-y-8">
            {test?.questions.map((question, index) => (
              <div key={question.id} className="border-b pb-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-600">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm px-2 py-1 bg-gray-100 rounded-full text-gray-600">
                        {question.difficultyLevel}
                      </span>
                      <span className="text-sm text-gray-500">
                        {question.points} points
                      </span>
                    </div>
                    <p className="text-lg text-gray-900">{question.text}</p>
                  </div>
                </div>

                <div className="ml-12 space-y-2">
                  {question.type === 'MULTIPLE_CHOICE' &&
                    question.options.map((option: string, optIndex: number) => (
                      <label
                        key={optIndex}
                        className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name={question.id}
                          value={option}
                          checked={answers[question.id] === option}
                          onChange={(e) =>
                            handleAnswerChange(question.id, e.target.value)
                          }
                          className="w-4 h-4"
                        />
                        <span className="text-gray-700">{option}</span>
                      </label>
                    ))}

                  {question.type === 'TRUE_FALSE' && (
                    <>
                      <label className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                        <input
                          type="radio"
                          name={question.id}
                          value="true"
                          checked={answers[question.id] === 'true'}
                          onChange={(e) =>
                            handleAnswerChange(question.id, e.target.value)
                          }
                          className="w-4 h-4"
                        />
                        <span className="text-gray-700">True</span>
                      </label>
                      <label className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                        <input
                          type="radio"
                          name={question.id}
                          value="false"
                          checked={answers[question.id] === 'false'}
                          onChange={(e) =>
                            handleAnswerChange(question.id, e.target.value)
                          }
                          className="w-4 h-4"
                        />
                        <span className="text-gray-700">False</span>
                      </label>
                    </>
                  )}

                  {question.type === 'SHORT_ANSWER' && (
                    <input
                      type="text"
                      value={answers[question.id] || ''}
                      onChange={(e) =>
                        handleAnswerChange(question.id, e.target.value)
                      }
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Type your answer..."
                    />
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex gap-4">
            <button
              onClick={handleSubmit}
              disabled={submitting || Object.keys(answers).length === 0}
              className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {submitting ? 'Submitting...' : 'Submit Test'}
            </button>
            <Link
              href="/dashboard"
              className="px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TestPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <TestContent />
    </Suspense>
  );
}
