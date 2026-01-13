
import React, { useState } from 'react';
import { quizHistory } from '../services/mockData';
import { QuizHistoryItem } from '../types';
import { Sparkles, TrendingUp, CheckCircle, FileText, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { QuizDetailsModal } from '../components/QuizDetailsModal';

const Quizzes: React.FC = () => {
    const [selectedQuiz, setSelectedQuiz] = useState<QuizHistoryItem | null>(null);
    const [activeFilter, setActiveFilter] = useState<string>('all');

    // Calculate Stats
    const totalQuizzes = quizHistory.length;
    const passedQuizzes = quizHistory.filter(q => q.status === 'passed').length;
    const maxScore = Math.max(...quizHistory.map(q => q.bestAttempt.score), 0);
    const avgImprovement = 0; // Mock value, can be calculated

    const courseFilters = [
        "الكل",
        "دورة التأسيس الشامل ( لفظي ) 2026",
        "دورة التدريبات والنماذج ( كمي ) 2026",
        "دورة التأسيس الشامل ( كمي ) 2026",
        "دورة الـ 100 % ( رياضيات تأسيس 2026 )"
    ];

    const filteredQuizzes = activeFilter === 'الكل' || activeFilter === 'all'
        ? quizHistory
        : quizHistory.filter(q => q.courseName === activeFilter);

    const getDifficultyLabel = (difficulty: string) => {
        switch(difficulty) {
            case 'Easy': return { label: 'سهل', color: 'bg-emerald-50 text-emerald-600 border-emerald-100' };
            case 'Medium': return { label: 'متوسط', color: 'bg-amber-50 text-amber-600 border-amber-100' };
            case 'Hard': return { label: 'صعب', color: 'bg-red-50 text-red-600 border-red-100' };
            default: return { label: difficulty, color: 'bg-gray-50 text-gray-600 border-gray-100' };
        }
    };

    return (
        <div className="space-y-8 pb-20">
            {/* Header */}
            <header className="flex items-center gap-4">
                <Link to="/" className="text-gray-500 hover:text-gray-700"><ArrowRight /></Link>
                <h1 className="text-2xl font-bold text-gray-800">اختباراتي</h1>
            </header>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard 
                    icon={<Sparkles size={24} />} 
                    value={`${maxScore}%`} 
                    label="أعلى درجة" 
                    color="purple"
                />
                <StatCard 
                    icon={<TrendingUp size={24} />} 
                    value={`${avgImprovement}%`} 
                    label="متوسط التحسن" 
                    color="amber"
                />
                <StatCard 
                    icon={<CheckCircle size={24} />} 
                    value={passedQuizzes} 
                    label="الاختبارات الناجحة" 
                    color="blue"
                />
                <StatCard 
                    icon={<FileText size={24} />} 
                    value={totalQuizzes} 
                    label="إجمالي الاختبارات" 
                    color="emerald"
                />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3 justify-center">
                {courseFilters.map((filter, idx) => (
                    <button
                        key={idx}
                        onClick={() => setActiveFilter(filter === "الكل" ? 'all' : filter)}
                        className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${
                            (activeFilter === 'all' && filter === "الكل") || activeFilter === filter
                                ? 'bg-secondary-500 text-white shadow-md'
                                : 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'
                        }`}
                    >
                        {filter}
                    </button>
                ))}
            </div>

            {/* Quizzes Table */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="bg-secondary-500 text-white p-4 text-center font-bold text-lg">
                    تفاصيل الاختبارات
                </div>
                
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[800px]">
                        <thead className="bg-gray-50 text-gray-500 text-xs font-bold">
                            <tr>
                                <th className="p-4 text-right">اسم الاختبار وعدد الأسئلة</th>
                                <th className="p-4 text-center">الدورة ودرجة النجاح</th>
                                <th className="p-4 text-center">الماولة الأولى<br/>والوقت والتاريخ</th>
                                <th className="p-4 text-center">أعلى درجة<br/>والوقت والتاريخ</th>
                                <th className="p-4 text-center">التحسن</th>
                                <th className="p-4 text-center">الحالة</th>
                                <th className="p-4 text-center"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredQuizzes.map((quiz) => {
                                const diff = getDifficultyLabel(quiz.difficulty);
                                return (
                                    <tr key={quiz.id} className="hover:bg-gray-50 transition-colors group">
                                        <td className="p-4">
                                            <div className="flex flex-col gap-1">
                                                <div className="font-bold text-gray-800">{quiz.title}</div>
                                                <div className="flex items-center gap-2">
                                                     <span className="text-xs text-gray-500">{quiz.questionCount} سؤال</span>
                                                     <span className={`text-[10px] px-2 py-0.5 rounded border ${diff.color}`}>
                                                        {diff.label}
                                                     </span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4 text-center">
                                            <div className="font-medium text-gray-700 text-sm mb-1">{quiz.courseName}</div>
                                            <div className="text-[10px] text-gray-400">درجة النجاح: {quiz.passMark}%</div>
                                        </td>
                                        <td className="p-4 text-center">
                                            <div className={`text-sm font-bold ${quiz.firstAttempt.score < 50 ? 'text-red-500 text-opacity-70' : 'text-emerald-600'}`}>
                                                {quiz.firstAttempt.score}%
                                            </div>
                                            <div className="text-[10px] text-gray-400" dir="ltr">{quiz.firstAttempt.time}</div>
                                            <div className="text-[10px] text-gray-400" dir="ltr">{quiz.firstAttempt.date}</div>
                                        </td>
                                        <td className="p-4 text-center">
                                            <div className={`text-sm font-bold ${quiz.bestAttempt.score < 50 ? 'text-red-500 text-opacity-70' : 'text-emerald-600'}`}>
                                                {quiz.bestAttempt.score}%
                                            </div>
                                            <div className="text-[10px] text-gray-400" dir="ltr">{quiz.bestAttempt.time}</div>
                                            <div className="text-[10px] text-gray-400" dir="ltr">{quiz.bestAttempt.date}</div>
                                        </td>
                                        <td className="p-4 text-center">
                                            <span className="text-xs font-bold text-gray-600">
                                                {quiz.improvement > 0 ? `+${quiz.improvement}%` : 'لا تغيير'}
                                            </span>
                                        </td>
                                        <td className="p-4 text-center">
                                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                                                quiz.status === 'passed' 
                                                    ? 'bg-emerald-100 text-emerald-700' 
                                                    : 'bg-red-100 text-red-700'
                                            }`}>
                                                {quiz.status === 'passed' ? 'ناجح' : 'لم ينجح'}
                                            </span>
                                        </td>
                                        <td className="p-4 text-center">
                                            <button 
                                                onClick={() => setSelectedQuiz(quiz)}
                                                className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold px-4 py-2 rounded-full transition-colors shadow-sm"
                                            >
                                                التفاصيل
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                
                {filteredQuizzes.length === 0 && (
                    <div className="p-8 text-center text-gray-500">
                        لا توجد اختبارات مطابقة للفلتر المحدد.
                    </div>
                )}
            </div>

            {/* Modal */}
            {selectedQuiz && (
                <QuizDetailsModal 
                    quiz={selectedQuiz} 
                    onClose={() => setSelectedQuiz(null)} 
                />
            )}
        </div>
    );
};

const StatCard = ({ icon, value, label, color }: { icon: React.ReactNode, value: string | number, label: string, color: 'purple' | 'amber' | 'blue' | 'emerald' }) => {
    const colorClasses = {
        purple: 'bg-purple-50 text-purple-600 border-purple-100',
        amber: 'bg-amber-50 text-amber-600 border-amber-100',
        blue: 'bg-blue-50 text-blue-600 border-blue-100',
        emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    };

    return (
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${colorClasses[color].split(' ')[0]} ${colorClasses[color].split(' ')[1]}`}>
                {icon}
            </div>
            <div className="text-left">
                <div className="font-bold text-2xl text-gray-800 dir-ltr">{value}</div>
                <div className="text-xs text-gray-500 font-medium">{label}</div>
            </div>
        </div>
    );
};

export default Quizzes;