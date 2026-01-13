
import React, { useState } from 'react';
import { ArrowRight, Trash2, ArrowLeft, Sparkles, Eye, EyeOff, BookOpen, CheckCircle, XCircle, PlayCircle, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { favoriteQuestions } from '../services/mockData';
import { explainQuestion } from '../services/geminiService';
import { VideoModal } from '../components/VideoModal';

const Favorites: React.FC = () => {
    // State
    const [activeCourseId, setActiveCourseId] = useState<string | 'all'>('all');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);
    const [explanation, setExplanation] = useState<string | null>(null);
    const [showVideo, setShowVideo] = useState(false);
    const [localFavorites, setLocalFavorites] = useState(favoriteQuestions);

    // Get unique courses for filter buttons
    const courses = Array.from(new Set(localFavorites.map(q => JSON.stringify({ id: q.courseId, title: q.courseTitle }))))
        .map((s: string) => JSON.parse(s));

    // Filter questions
    const filteredQuestions = activeCourseId === 'all' 
        ? localFavorites 
        : localFavorites.filter(q => q.courseId === activeCourseId);

    const currentQuestion = filteredQuestions[currentIndex];

    // Handlers
    const handleCourseFilter = (courseId: string) => {
        setActiveCourseId(courseId);
        setCurrentIndex(0);
        setShowAnswer(false);
        setExplanation(null);
        setShowVideo(false);
    };

    const handleNext = () => {
        if (currentIndex < filteredQuestions.length - 1) {
            setCurrentIndex(prev => prev + 1);
            setShowAnswer(false);
            setExplanation(null);
            setShowVideo(false);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
            setShowAnswer(false);
            setExplanation(null);
            setShowVideo(false);
        }
    };

    const handleRemoveFavorite = () => {
        if (!currentQuestion) return;
        const newFavorites = localFavorites.filter(q => q.id !== currentQuestion.id);
        setLocalFavorites(newFavorites);
        if (currentIndex >= newFavorites.length) {
            setCurrentIndex(Math.max(0, newFavorites.length - 1));
        }
    };

    if (filteredQuestions.length === 0) {
        return (
             <div className="space-y-6 pb-20">
                <header className="flex items-center gap-4">
                    <Link to="/" className="text-gray-500 hover:text-gray-700"><ArrowRight /></Link>
                    <h1 className="text-2xl font-bold text-emerald-600">الأسئلة المفضلة</h1>
                </header>
                <Card className="p-12 text-center text-gray-500">
                    <BookOpen size={48} className="mx-auto mb-4 text-gray-300" />
                    <p>لا توجد أسئلة مفضلة في هذا القسم حالياً.</p>
                    <button 
                        onClick={() => setActiveCourseId('all')}
                        className="mt-4 text-emerald-600 font-bold hover:underline"
                    >
                        عرض جميع الأسئلة
                    </button>
                </Card>
             </div>
        );
    }

    return (
        <div className="space-y-6 pb-20">
            {/* Header */}
            <header className="text-center mb-8">
                <h1 className="text-2xl font-bold text-emerald-600 mb-2">الأسئلة المفضلة</h1>
                <p className="text-gray-500 text-sm">نظرة شاملة على جميع الأسئلة المفضلة. يرجى اختيار الدورة المناسبة</p>
            </header>

            {/* Course Filters */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
                <button
                    onClick={() => handleCourseFilter('all')}
                    className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${
                        activeCourseId === 'all' 
                        ? 'bg-gray-800 text-white shadow-md' 
                        : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                >
                    الكل
                </button>
                {courses.map((course, idx) => {
                    // Alternate colors based on index to match screenshot style (Green/Orange)
                    const isEven = idx % 2 === 0;
                    const activeClass = isEven ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white';
                    const inactiveClass = 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50';
                    
                    return (
                        <button
                            key={course.id}
                            onClick={() => handleCourseFilter(course.id)}
                            className={`px-4 py-2 rounded-lg font-bold text-sm transition-all shadow-sm ${
                                activeCourseId === course.id ? activeClass : inactiveClass
                            }`}
                        >
                            {course.title}
                        </button>
                    );
                })}
            </div>

            {/* Question Toolbar */}
            <div className="flex justify-between items-center">
                <button 
                    onClick={handleRemoveFavorite}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors flex items-center gap-2 shadow-sm"
                >
                    <Trash2 size={16} />
                    مسح من المفضلة
                </button>
                <div className="bg-amber-500 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-sm">
                    السؤال {currentIndex + 1} من {filteredQuestions.length}
                </div>
            </div>

            {/* Question Card */}
            <Card className="overflow-hidden border border-gray-200 shadow-md transition-all duration-300">
                {/* Image/Content Area */}
                <div className="bg-white p-4 md:p-8 border-b border-gray-100 min-h-[200px] flex flex-col items-center justify-center">
                    {currentQuestion.imageUrl ? (
                        <div className="relative w-full max-w-2xl mx-auto">
                            <img 
                                src={currentQuestion.imageUrl} 
                                alt="Question" 
                                className="w-full h-auto rounded-lg border border-gray-100"
                            />
                            <div className="mt-4 text-center font-bold text-lg text-gray-800">
                                {currentQuestion.text}
                            </div>
                        </div>
                    ) : (
                        <div className="text-xl font-bold text-gray-800 text-center leading-loose">
                            {currentQuestion.text}
                        </div>
                    )}
                </div>

                {/* Options Area */}
                <div className="p-6 bg-gray-50">
                    <div className="flex justify-center items-center gap-8 md:gap-16 flex-wrap" dir="ltr">
                        {currentQuestion.options.map((option, idx) => {
                            let statusColor = 'border-gray-300 bg-white text-gray-700';
                            let icon = <div className="w-4 h-4 rounded-full border border-gray-300" />;

                            if (showAnswer) {
                                if (idx === currentQuestion.correctOptionIndex) {
                                    statusColor = 'border-emerald-500 bg-emerald-50 text-emerald-700 ring-2 ring-emerald-200'; // Correct
                                    icon = <CheckCircle size={18} className="text-emerald-500" />;
                                } else if (idx === currentQuestion.userSelectedOptionIndex && idx !== currentQuestion.correctOptionIndex) {
                                    statusColor = 'border-red-500 bg-red-50 text-red-700'; // Wrong User Choice
                                    icon = <XCircle size={18} className="text-red-500" />;
                                }
                            } else {
                                if (idx === currentQuestion.userSelectedOptionIndex) {
                                     statusColor = 'border-gray-400 bg-gray-100 text-gray-900';
                                     icon = <div className="w-4 h-4 rounded-full bg-gray-500" />;
                                }
                            }

                            return (
                                <div key={idx} className="flex items-center gap-3">
                                    <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center font-bold text-lg shadow-sm transition-all ${statusColor}`}>
                                        {option}
                                    </div>
                                    <span className="font-bold text-gray-400 text-sm">
                                        {String.fromCharCode(65 + idx)}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Footer / Controls */}
                <div className="bg-white p-4 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex gap-2 w-full md:w-auto">
                        <button 
                            onClick={handlePrev}
                            disabled={currentIndex === 0}
                            className="bg-slate-500 text-white px-4 py-2 rounded-lg font-bold text-sm disabled:opacity-50 hover:bg-slate-600 flex items-center gap-2"
                        >
                            السابق
                        </button>
                        <button 
                            onClick={handleNext}
                            disabled={currentIndex === filteredQuestions.length - 1}
                            className="bg-slate-500 text-white px-4 py-2 rounded-lg font-bold text-sm disabled:opacity-50 hover:bg-slate-600 flex items-center gap-2"
                        >
                            <ArrowLeft size={16} />
                            التالي
                        </button>
                    </div>

                    <div className="flex gap-2 w-full md:w-auto justify-center">
                        <button 
                            onClick={() => setShowAnswer(!showAnswer)}
                            className="bg-blue-50 text-blue-600 border border-blue-200 px-4 py-2 rounded-lg font-bold text-sm hover:bg-blue-100 flex items-center gap-2"
                        >
                            {showAnswer ? <EyeOff size={16} /> : <Eye size={16} />}
                            {showAnswer ? 'إخفاء الحل' : 'إظهار الحل'}
                        </button>

                        {/* Video Explanation Button */}
                        {currentQuestion.videoUrl && (
                            <button 
                                onClick={() => setShowVideo(true)}
                                className="px-6 py-2 rounded-full font-bold text-sm transition-colors shadow-md flex items-center gap-2 bg-emerald-500 text-white hover:bg-emerald-600 shadow-emerald-200"
                            >
                                <PlayCircle size={16} />
                                شرح الفيديو
                            </button>
                        )}
                    </div>
                </div>
            </Card>

            {/* Video Modal */}
            {showVideo && currentQuestion.videoUrl && (
                <VideoModal 
                    videoUrl={currentQuestion.videoUrl} 
                    title="شرح السؤال" 
                    onClose={() => setShowVideo(false)} 
                />
            )}
        </div>
    );
};

export default Favorites;
