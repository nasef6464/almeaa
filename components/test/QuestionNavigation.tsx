'use client';

interface QuestionNavigationProps {
  total: number;
  current: number;
  answers: Record<number, string>;
  onNavigate: (index: number) => void;
}

export function QuestionNavigation({
  total,
  current,
  answers,
  onNavigate,
}: QuestionNavigationProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h4 className="font-bold text-gray-900 mb-4">خريطة الأسئلة</h4>
      <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2">
        {Array.from({ length: total }, (_, i) => {
          const isAnswered = answers[i] !== undefined;
          const isCurrent = i === current;

          let className = 'w-10 h-10 rounded-lg font-semibold transition-all ';
          
          if (isCurrent) {
            className += 'bg-blue-600 text-white ring-2 ring-blue-300';
          } else if (isAnswered) {
            className += 'bg-green-100 text-green-700 hover:bg-green-200';
          } else {
            className += 'bg-gray-100 text-gray-600 hover:bg-gray-200';
          }

          return (
            <button
              key={i}
              onClick={() => onNavigate(i)}
              className={className}
            >
              {i + 1}
            </button>
          );
        })}
      </div>

      <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
        <span>تم الإجابة: {Object.keys(answers).length} من {total}</span>
        <span>متبقي: {total - Object.keys(answers).length}</span>
      </div>
    </div>
  );
}
