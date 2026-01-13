import React from 'react';
import { AlertTriangle } from 'lucide-react';
import Link from 'next/link';

interface SkillGap {
  skill: string;
  mastery: number;
}

interface Props {
  skills: SkillGap[];
  title?: string;
}

interface ProgressBarProps {
  percentage: number;
  color?: 'danger' | 'warning' | 'success';
  showPercentage?: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ percentage, color = 'success', showPercentage = true }) => {
  const getColorClasses = (color: string) => {
    switch (color) {
      case 'danger':
        return 'bg-red-500';
      case 'warning':
        return 'bg-amber-500';
      default:
        return 'bg-emerald-500';
    }
  };

  return (
    <div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full ${getColorClasses(color)} transition-all duration-300`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        ></div>
      </div>
      {showPercentage && (
        <div className="mt-1 text-[10px] text-right text-gray-500 font-bold">
          {Math.round(Math.min(percentage, 100))}%
        </div>
      )}
    </div>
  );
};

export const WeakPointsSummary: React.FC<Props> = ({ skills, title = "نقاط الضعف" }) => {
  // فلتر المهارات الضعيفة (أقل من 60%)
  const weakSkills = skills.filter(skill => skill.mastery < 60).slice(0, 3);

  if (weakSkills.length === 0) {
    return (
      <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-center flex-col gap-3 py-8">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
            ✨
          </div>
          <h3 className="text-lg font-bold text-gray-800">ممتاز!</h3>
          <p className="text-sm text-gray-500 text-center">لا توجد نقاط ضعف واضحة في أدائك الحالي</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold flex items-center gap-2">
          <AlertTriangle className="text-amber-500" size={20} />
          {title}
        </h3>
        <Link href="/dashboard/reports" className="text-xs text-blue-600 font-bold hover:text-blue-700 transition-colors">
          التفاصيل
        </Link>
      </div>
      
      <div className="space-y-6">
        {weakSkills.map((skill, index) => (
          <div key={index}>
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium text-gray-700 text-sm">{skill.skill}</span>
              <span className={`text-xs font-bold ${skill.mastery < 30 ? 'text-red-500' : skill.mastery < 50 ? 'text-amber-500' : 'text-orange-500'}`}>
                {skill.mastery}%
              </span>
            </div>
            <ProgressBar 
              percentage={skill.mastery} 
              showPercentage={false} 
              color={skill.mastery < 30 ? 'danger' : skill.mastery < 50 ? 'warning' : 'warning'} 
            />
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-100">
        <Link 
          href="/dashboard/practice" 
          className="block w-full bg-amber-50 hover:bg-amber-100 text-amber-700 text-center py-3 rounded-lg font-bold text-sm transition-colors border border-amber-200"
        >
          ابدأ التحسين الآن
        </Link>
      </div>
    </section>
  );
};