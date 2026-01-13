
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowRight, BookOpen, PlayCircle, Lock } from 'lucide-react';
import { Card } from '../components/ui/Card';

export const QuestionBankDetails: React.FC = () => {
    const { bankId } = useParams<{ bankId: string }>();

    // Mock Questions List
    const questions = Array.from({ length: 10 }).map((_, i) => ({
        id: i + 1,
        title: `سؤال رقم ${i + 1} - تجميعات 1445`,
        difficulty: i % 3 === 0 ? 'صعب' : i % 2 === 0 ? 'متوسط' : 'سهل',
        isLocked: i > 2
    }));

    return (
        <div className="bg-gray-50 min-h-screen pb-20">
            <header className="bg-white border-b border-gray-200 py-6">
                <div className="max-w-4xl mx-auto px-4 flex items-center gap-4">
                    <Link to="/" className="text-gray-500 hover:text-gray-700">
                        <ArrowRight size={24} />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">بنك الأسئلة #{bankId}</h1>
                        <p className="text-sm text-gray-500">تدرب على أحدث الأسئلة المصنفة</p>
                    </div>
                </div>
            </header>

            <div className="max-w-4xl mx-auto px-4 py-8 space-y-4">
                {questions.map((q) => (
                    <div key={q.id} className="bg-white p-4 rounded-xl border border-gray-200 flex items-center justify-between hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                q.isLocked ? 'bg-gray-100 text-gray-400' : 'bg-indigo-50 text-indigo-600'
                            }`}>
                                {q.isLocked ? <Lock size={20} /> : <BookOpen size={20} />}
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-800">{q.title}</h3>
                                <span className={`text-xs px-2 py-0.5 rounded ${
                                    q.difficulty === 'سهل' ? 'bg-emerald-100 text-emerald-700' :
                                    q.difficulty === 'متوسط' ? 'bg-amber-100 text-amber-700' :
                                    'bg-red-100 text-red-700'
                                }`}>
                                    {q.difficulty}
                                </span>
                            </div>
                        </div>
                        
                        <button 
                            disabled={q.isLocked}
                            className={`px-4 py-2 rounded-lg font-bold text-sm ${
                                q.isLocked 
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                                : 'bg-indigo-600 text-white hover:bg-indigo-700'
                            }`}
                        >
                            {q.isLocked ? 'مغلق' : 'عرض السؤال'}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};
