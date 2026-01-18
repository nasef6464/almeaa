'use client';

import { Check } from 'lucide-react';

interface QuestionOption {
  id: string;
  text: string;
  isCorrect?: boolean;
}

interface QuestionCardProps {
  question: {
    id: string;
    text: string;
    explanation: string | null;
    options: QuestionOption[];
  };
  answer: string | null;
  onChange: (optionId: string) => void;
  showCorrectAnswer?: boolean;
  correctAnswer?: string;
  disabled?: boolean;
}

export function QuestionCard({
  question,
  answer,
  onChange,
  showCorrectAnswer = false,
  correctAnswer,
  disabled = false,
}: QuestionCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      {/* السؤال */}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {question.text}
        </h3>
        {question.explanation && showCorrectAnswer && (
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-900">
              <strong>الشرح:</strong> {question.explanation}
            </p>
          </div>
        )}
      </div>

      {/* الخيارات */}
      <div className="space-y-3">
        {question.options.map((option, index) => {
          const isSelected = answer === option.id;
          const isCorrect = option.isCorrect;
          const showResult = showCorrectAnswer;

          let className = 'w-full text-right p-4 rounded-lg border-2 transition-all ';
          
          if (showResult) {
            if (isCorrect) {
              className += 'border-green-500 bg-green-50 text-green-900';
            } else if (isSelected && !isCorrect) {
              className += 'border-red-500 bg-red-50 text-red-900';
            } else {
              className += 'border-gray-200 bg-gray-50 text-gray-600';
            }
          } else if (isSelected) {
            className += 'border-blue-500 bg-blue-50 text-blue-900 font-semibold';
          } else {
            className += 'border-gray-300 hover:border-blue-400 hover:bg-blue-50';
          }

          return (
            <button
              key={option.id}
              onClick={() => !disabled && onChange(option.id)}
              disabled={disabled}
              className={className}
            >
              <div className="flex items-center justify-between">
                <span className="flex-1">
                  {String.fromCharCode(65 + index)}. {option.text}
                </span>
                {showResult && isCorrect && (
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
