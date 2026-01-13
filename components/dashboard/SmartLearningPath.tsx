import React from 'react';
import { Sparkles, BrainCircuit, Zap, Clock, ArrowLeft } from 'lucide-react';

interface SkillGap {
  skill: string;
  mastery: number;
  gap?: number;
}

interface LearningRecommendation {
  id: string;
  title: string;
  type: 'lesson' | 'quiz' | 'review';
  priority: 'high' | 'medium' | 'low';
  duration: string;
  reason: string;
  actionLabel: string;
}

interface Props {
  skills: SkillGap[];
}

// Mock data generator - في المستقبل ممكن نربطه بالـ AI
const generateMockLearningPath = (skills: SkillGap[]): LearningRecommendation[] => {
  const weakestSkill = [...skills].sort((a, b) => a.mastery - b.mastery)[0];
  const skillLabel = weakestSkill ? weakestSkill.skill : 'مهاراتك';

  return [
    {
      id: '1',
      title: 'مراجعة أساسيات الجبر',
      type: 'lesson',
      priority: 'high',
      duration: '25 دقيقة',
      reason: `نظراً لأن درجتك في ${skillLabel} منخفضة، ننصح بمراجعة الأساسيات أولاً`,
      actionLabel: 'ابدأ المراجعة'
    },
    {
      id: '2',
      title: 'اختبار تشخيصي في الهندسة',
      type: 'quiz',
      priority: 'medium',
      duration: '15 دقيقة',
      reason: 'لتحديد نقاط ضعفك بدقة في الهندسة وبناء خطة مخصصة',
      actionLabel: 'ابدأ الاختبار'
    },
    {
      id: '3',
      title: 'حل 10 مسائل في المعادلات',
      type: 'review',
      priority: 'high',
      duration: '30 دقيقة',
      reason: 'التطبيق العملي سيساعدك في ترسيخ المفاهيم وتحسين السرعة',
      actionLabel: 'ابدأ التمرين'
    }
  ];
};

export const SmartLearningPath: React.FC<Props> = ({ skills }) => {
  const [loading, setLoading] = React.useState(true);
  const [recommendations, setRecommendations] = React.useState<LearningRecommendation[]>([]);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setRecommendations(generateMockLearningPath(skills));
      setLoading(false);
    }, 1500); // محاكاة وقت التحليل
    
    return () => clearTimeout(timer);
  }, [skills]);

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-purple-50 to-white border-2 border-purple-200 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <BrainCircuit className="text-purple-500 animate-pulse" size={24} />
          <h3 className="font-bold text-lg text-gray-800">جاري تحليل أدائك وبناء مسار ذكي...</h3>
        </div>
        <div className="space-y-3">
          <div className="h-16 bg-purple-100/50 rounded-xl animate-pulse"></div>
          <div className="h-16 bg-purple-100/50 rounded-xl animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-2 rounded-lg shadow-lg shadow-purple-200">
          <Sparkles size={20} />
        </div>
        <div>
          <h3 className="font-bold text-lg text-gray-900">مسار التعلم الذكي</h3>
          <p className="text-xs text-gray-500">تم اختياره خصيصاً لك بناءً على نقاط ضعفك</p>
        </div>
      </div>

      {/* Timeline Container */}
      <div className="relative border-r-2 border-purple-100 mr-4 space-y-6">
        {recommendations.map((item) => (
          <div key={item.id} className="relative pr-8">
            {/* Timeline Dot */}
            <div className={`absolute -right-[9px] top-0 w-4 h-4 rounded-full border-2 border-white shadow-sm ${
              item.priority === 'high' ? 'bg-red-500' : 'bg-purple-500'
            }`}></div>

            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded text-white ${
                    item.type === 'lesson' ? 'bg-blue-500' :
                    item.type === 'quiz' ? 'bg-amber-500' : 'bg-emerald-500'
                  }`}>
                    {item.type === 'lesson' ? 'درس' : item.type === 'quiz' ? 'اختبار' : 'مراجعة'}
                  </span>
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <Clock size={12} /> {item.duration}
                  </span>
                </div>
                {item.priority === 'high' && (
                  <span className="text-[10px] bg-red-50 text-red-600 px-2 py-0.5 rounded font-bold flex items-center gap-1">
                    <Zap size={12} /> أولوية عالية
                  </span>
                )}
              </div>

              <h4 className="font-bold text-gray-800 text-lg mb-2">{item.title}</h4>
              
              <div className="bg-purple-50 p-3 rounded-lg mb-3">
                <p className="text-xs text-purple-700 flex items-start gap-2">
                  <Sparkles size={12} className="mt-0.5 shrink-0" />
                  {item.reason}
                </p>
              </div>

              <button className="w-full bg-gray-50 hover:bg-purple-600 hover:text-white text-gray-700 py-2 rounded-lg font-bold text-sm transition-all flex items-center justify-center gap-2 group-hover:border-transparent">
                {item.actionLabel}
                <ArrowLeft size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};