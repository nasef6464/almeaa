import React from 'react';
import { Clock } from 'lucide-react';

interface ScheduleItem {
  id: string;
  subject: string;
  day: string;
  duration: string;
  status: 'completed' | 'in-progress' | 'pending';
}

interface Props {
  items?: ScheduleItem[];
  title?: string;
}

const mockSchedule: ScheduleItem[] = [
  {
    id: '1',
    subject: 'مراجعة الجبر',
    day: 'اليوم',
    duration: '45 دقيقة',
    status: 'in-progress'
  },
  {
    id: '2', 
    subject: 'اختبار الهندسة',
    day: 'غداً',
    duration: '30 دقيقة',
    status: 'pending'
  },
  {
    id: '3',
    subject: 'درس التفاضل',
    day: 'أمس',
    duration: '60 دقيقة', 
    status: 'completed'
  }
];

export const WeeklySchedule: React.FC<Props> = ({ items = mockSchedule, title = "الجدول الدراسي" }) => {
  return (
    <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold">{title}</h3>
      </div>
      
      <div className="space-y-3">
        {items.slice(0, 3).map((item) => (
          <div 
            key={item.id} 
            className={`p-4 rounded-xl border flex justify-between items-center transition-colors ${
              item.status === 'in-progress' 
                ? 'bg-blue-50 border-blue-200' 
                : 'bg-white border-gray-100 hover:border-gray-200'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                item.status === 'completed' ? 'bg-emerald-100 text-emerald-600' :
                item.status === 'in-progress' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'
              }`}>
                <Clock size={20} />
              </div>
              <div>
                <h4 className="font-bold text-gray-800">{item.subject}</h4>
                <p className="text-sm text-gray-500">{item.day}</p>
              </div>
            </div>
            <div className="text-left">
              <span className="block font-bold text-gray-800">{item.duration}</span>
              {item.status === 'in-progress' && (
                <span className="text-xs text-blue-600 font-bold animate-pulse">جاري الآن</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};