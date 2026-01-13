
import React from 'react';
import { ArrowRight, AlertTriangle, Play, ChevronLeft, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { skillsData } from '../services/mockData';

const Reports: React.FC = () => {
    return (
        <div className="space-y-6 pb-20">
            {/* Header */}
            <header className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link to="/dashboard" className="text-gray-500 hover:text-gray-700">
                        <ArrowRight size={24} />
                    </Link>
                    <div>
                        <h1 className="text-xl font-bold text-gray-800">تقارير الأداء</h1>
                        <p className="text-xs text-gray-500">نظرة شاملة على مستوى التقدم ونقاط الضعف</p>
                    </div>
                </div>
                <div className="w-10 h-10 bg-secondary-500 text-white rounded-lg flex items-center justify-center font-bold shadow-sm">
                    %
                </div>
            </header>

            {/* Notifications/Activities */}
            <div className="space-y-3">
                {/* Weak Point Alert (Actionable) */}
                <Card className="p-4 flex items-center justify-between shadow-sm border border-red-100 bg-red-50">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-red-500 shadow-sm">
                            <AlertTriangle size={20} />
                        </div>
                        <div>
                            <div className="font-bold text-gray-800">نقطة ضعف في الكسور العشرية</div>
                            <div className="text-xs text-red-400">تم اكتشافها أمس</div>
                        </div>
                    </div>
                    <Link to="/quiz?skill=decimal" className="bg-white text-red-600 border border-red-200 text-xs font-bold px-3 py-2 rounded-lg hover:bg-red-50 transition-colors shadow-sm">
                        اختبار إضافي
                    </Link>
                </Card>

                {/* Lesson Activity */}
                <Card className="p-4 flex items-center justify-between shadow-sm border-0">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                            <Play size={20} fill="currentColor" />
                        </div>
                        <div>
                            <div className="font-bold text-gray-800">درس الهندسة التحليلية</div>
                            <div className="text-xs text-gray-500">تمت المشاهدة منذ 4 ساعات</div>
                        </div>
                    </div>
                    <ChevronLeft size={20} className="text-gray-300" />
                </Card>
            </div>

            {/* Skills Requiring Improvement */}
            <Card className="p-6 shadow-md border-0 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-1 bg-secondary-500 h-full"></div>
                <div className="flex items-center gap-2 mb-8">
                    <AlertTriangle className="text-secondary-500" size={24} />
                    <h2 className="text-lg font-bold text-gray-800">المهارات المطلوب تحسينها</h2>
                </div>

                <div className="space-y-8">
                    {skillsData.map((skill, index) => {
                        // Determine color based on mastery
                        let colorClass = 'bg-emerald-500';
                        let textClass = 'text-emerald-600';
                        
                        if (skill.mastery < 50) {
                            colorClass = 'bg-red-500';
                            textClass = 'text-red-600';
                        } else if (skill.mastery < 70) {
                            colorClass = 'bg-amber-500';
                            textClass = 'text-amber-600';
                        }

                        return (
                            <div key={index} className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <span className="font-bold text-gray-400 text-sm">{skill.mastery}%</span>
                                    <span className="font-bold text-gray-800">{skill.skill}</span>
                                </div>
                                
                                <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                                    <div 
                                        className={`h-full rounded-full ${colorClass} transition-all duration-1000 ease-out`} 
                                        style={{ width: `${skill.mastery}%` }}
                                    ></div>
                                </div>

                                {skill.recommendation && (
                                    <div className="flex justify-end pt-2">
                                        {skill.mastery < 70 ? (
                                            <Link 
                                                to={`/quiz?skill=${encodeURIComponent(skill.skill)}`}
                                                className={`text-xs font-bold px-4 py-2 rounded-lg flex items-center gap-2 transition-all shadow-sm ${
                                                    skill.mastery < 50 
                                                    ? 'bg-red-500 text-white hover:bg-red-600 shadow-red-100' 
                                                    : 'bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100'
                                                }`}
                                            >
                                                {skill.mastery < 50 && <Target size={14} />}
                                                {skill.recommendation}
                                                <ChevronLeft size={14} />
                                            </Link>
                                        ) : (
                                            <button className={`text-xs font-bold ${textClass} hover:underline flex items-center gap-1`}>
                                                {skill.recommendation}
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
                
                <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                    <Link to="/courses" className="text-secondary-600 text-sm font-bold hover:text-secondary-700 flex items-center justify-center gap-2">
                        مراجعة جميع الدروس
                        <ArrowRight size={16} className="transform rotate-180" />
                    </Link>
                </div>
            </Card>
        </div>
    );
};

export default Reports;
