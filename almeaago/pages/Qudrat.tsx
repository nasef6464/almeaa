
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { courses } from '../services/mockData';
import { Card } from '../components/ui/Card';
import { Star, User, Percent, Sparkles, Loader2, RefreshCw } from 'lucide-react';
import { generateCourseSummary } from '../services/geminiService';

// Sub-component for Course Item to handle individual state
const CourseItem: React.FC<{ course: any }> = ({ course }) => {
    const [summary, setSummary] = useState<string | null>(null);
    const [loadingSummary, setLoadingSummary] = useState(false);

    const handleGetSummary = async () => {
        if (summary) return; // already loaded
        setLoadingSummary(true);
        const text = await generateCourseSummary(course.title);
        setSummary(text);
        setLoadingSummary(false);
    };

    return (
        <Card className="flex flex-col h-full hover:shadow-xl transition-shadow duration-300 border border-gray-100 overflow-hidden">
            {/* Image */}
            <div className="relative h-48 bg-gray-100 group overflow-hidden rounded-t-2xl">
                <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur shadow-sm px-2 py-1 rounded-lg text-xs font-bold text-gray-700 flex items-center gap-1">
                    <Star size={12} className="text-amber-400 fill-current" />
                    {course.rating}
                </div>
            </div>

            {/* Content */}
            <div className="p-5 flex-1 flex flex-col">
                <div className="mb-1">
                    <span className={`text-[10px] px-2 py-1 rounded-full font-bold ${
                        course.title.includes('كمي') ? 'bg-blue-50 text-blue-600' : 'bg-amber-50 text-amber-600'
                    }`}>
                        {course.title.includes('كمي') ? 'القسم الكمي' : 'القسم اللفظي'}
                    </span>
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-2 leading-snug">{course.title}</h3>
                
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                    <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200">
                        <User size={14} />
                    </div>
                    <span>{course.instructor}</span>
                </div>

                {/* AI Summary Section */}
                <div className="mt-auto pt-4 border-t border-gray-50 space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                            <span className="text-xs text-gray-400 line-through">{course.price + 100} {course.currency}</span>
                            <span className="text-xl font-black text-emerald-600">{course.price} <span className="text-xs font-normal text-gray-500">{course.currency}</span></span>
                        </div>
                        <Link to={`/course/${course.id}`} className="bg-white border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white px-6 py-2 rounded-xl font-bold text-sm transition-all flex items-center gap-2">
                            مواصلة التعلم
                        </Link>
                    </div>

                    {/* AI Summary Button & Content */}
                    <div>
                        {!summary && !loadingSummary && (
                            <button 
                                onClick={handleGetSummary}
                                className="text-xs font-bold text-purple-600 flex items-center gap-1 hover:text-purple-800 transition-colors bg-purple-50 px-3 py-1.5 rounded-lg w-full justify-center"
                            >
                                <Sparkles size={14} />
                                شرح موجز (AI)
                            </button>
                        )}
                        
                        {loadingSummary && (
                            <div className="text-xs text-gray-500 flex items-center gap-2 justify-center bg-gray-50 p-2 rounded-lg">
                                <Loader2 size={14} className="animate-spin" />
                                جاري التحميل...
                            </div>
                        )}

                        {summary && (
                            <div className="text-xs text-gray-600 bg-purple-50 p-3 rounded-lg leading-relaxed border border-purple-100 animate-fade-in">
                                <div className="flex items-center gap-1 text-purple-700 font-bold mb-1">
                                    <Sparkles size={12} />
                                    ملخص ذكي:
                                </div>
                                {summary}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Card>
    );
};

export const Qudrat: React.FC = () => {
    // Filter only Qudrat courses for the grid below
    const filteredCourses = courses.filter(course => course.category === 'القدرات' || course.category === 'قدرات');

    return (
        <div className="bg-gray-50 min-h-screen pb-20 new-style">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 py-12 relative overflow-hidden">
                <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
                    <h1 className="text-4xl font-black text-indigo-900 mb-4">دورات الكمي واللفظي 2025</h1>
                    <p className="text-gray-500 max-w-2xl mx-auto">تأسيس وتدريب شامل لاختبار القدرات العامة مع نخبة من أفضل المعلمين</p>
                </div>
            </div>

            {/* Navigation Buttons (Refactored to Rectangular & Responsive) */}
            <div className="max-w-5xl mx-auto px-4 -mt-8 mb-16 relative z-10">
                <div className="grid grid-cols-3 gap-4 md:gap-8 justify-center items-center">
                    {/* Verbal Button */}
                    <Link 
                        to="/category/qudrat/verbal"
                        className="group relative h-24 md:h-36 w-full transition-all duration-300 focus:outline-none hover:-translate-y-1"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl md:rounded-3xl shadow-lg transition-colors hover:shadow-amber-200/50"></div>
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-2">
                            <span className="text-xl md:text-3xl font-black drop-shadow-md text-center">لفظي قدرات</span>
                            <span className="text-[10px] md:text-xs font-bold opacity-90 mt-1 hidden md:block">تأسيس - نماذج - تدريب</span>
                        </div>
                    </Link>

                    {/* Quantitative Button */}
                    <Link 
                        to="/category/qudrat/quant"
                        className="group relative h-24 md:h-36 w-full transition-all duration-300 focus:outline-none hover:-translate-y-1"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl md:rounded-3xl shadow-lg transition-colors hover:shadow-blue-200/50"></div>
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-2">
                            <span className="text-xl md:text-3xl font-black drop-shadow-md text-center">كمي قدرات</span>
                            <span className="text-[10px] md:text-xs font-bold opacity-90 mt-1 hidden md:block">تأسيس - محاكي - شروحات</span>
                        </div>
                    </Link>

                    {/* Offers Button */}
                    <Link 
                        to="/category/qudrat/packages"
                        className="group relative h-24 md:h-36 w-full transition-all duration-300 focus:outline-none hover:-translate-y-1"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl md:rounded-3xl shadow-lg transition-colors hover:shadow-emerald-200/50"></div>
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-2">
                            <span className="text-xl md:text-3xl font-black drop-shadow-md mb-1 text-center">العروض والباقات</span>
                            <div className="bg-white/20 backdrop-blur-md px-2 md:px-3 py-0.5 md:py-1 rounded-full flex items-center gap-1 hidden md:flex">
                                <Percent size={14} />
                                <span className="text-[10px] md:text-xs font-bold">خصومات حصرية</span>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>

            {/* Courses Grid */}
            <div className="max-w-7xl mx-auto px-4">
                <div className="mb-6 flex items-center gap-2">
                    <div className="w-3 h-8 rounded-full bg-indigo-600"></div>
                    <h2 className="text-2xl font-bold text-gray-800">أحدث الدورات</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredCourses.map(course => (
                        <CourseItem key={course.id} course={course} />
                    ))}
                </div>

                {filteredCourses.length === 0 && (
                    <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
                        <p className="text-gray-400">لا توجد دورات متاحة في هذا القسم حالياً.</p>
                    </div>
                )}
            </div>
        </div>
    );
};
