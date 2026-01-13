
import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, ArrowLeft, Clock, CheckCircle, Camera, Mic, Lock, AlertCircle, PlayCircle, Heart, AlertTriangle, Gauge, ChevronRight, Save, Sparkles } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { VideoModal } from '../components/VideoModal';
import { ProgressBar } from '../components/ui/ProgressBar';
import { explainQuestion } from '../services/geminiService';

const Quiz: React.FC = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    
    // Read Context Params
    const testId = searchParams.get('testId');
    const bankId = searchParams.get('bankId');
    const skillParam = searchParams.get('skill');
    
    // Dynamic Title based on context
    const quizTitle = testId ? `اختبار محاكاة #${testId}` : 
                      bankId ? `تدريب بنك أسئلة #${bankId}` : 
                      skillParam ? `تدريب مهارة: ${skillParam}` : 
                      "اختبار تحديد المستوى";

    // States
    const [permissionGranted, setPermissionGranted] = useState(false);
    const [loadingPermissions, setLoadingPermissions] = useState(false);
    const [quizStarted, setQuizStarted] = useState(false);
    const [difficulty, setDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>('Easy');
    
    const videoRef = useRef<HTMLVideoElement>(null);
    
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [timeLeft, setTimeLeft] = useState(1200); // 20 minutes
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [answers, setAnswers] = useState<{[key: number]: number}>({}); // Store all answers
    const [showVideo, setShowVideo] = useState(false);
    
    // AI Feedback State
    const [aiExplanation, setAiExplanation] = useState<string | null>(null);
    const [loadingExplanation, setLoadingExplanation] = useState(false);
    
    // State for exit confirmation
    const [showExitDialog, setShowExitDialog] = useState(false);

    // Extended Mock Questions with Difficulty
    const allQuestions = [
        {
            id: 1,
            text: "الشركة (أ) نسبة الموظفين غير السعوديين فيها 30%، والشركة (ب) عدد موظفيها نصف عدد موظفين الشركة (أ). وكانت نسبة الموظفين الغير سعوديين فيها 40%. فما نسبة الموظفين الغير سعوديين في الشركتين معاً؟",
            options: ["33.3%", "30%", "25%", "66.6%"],
            correct: 0,
            videoUrl: "https://www.youtube.com/embed/M5QGkOGZubQ",
            difficulty: 'Easy'
        },
        {
            id: 2,
            text: "إذا كان س = ٨ × ٧ ... (١٠) فما قيمة س؟",
            options: ["٥٦", "٤٢", "١٥", "٤٨"],
            correct: 0,
            videoUrl: "https://www.youtube.com/embed/e6rglsLy1Ys",
            difficulty: 'Medium'
        },
        {
            id: 3,
            text: "متى تتطابق عقارب الساعة تماماً بعد الساعة 3:00؟",
            options: ["3:15:00", "3:16:21", "3:16:00", "3:17:00"],
            correct: 1,
            videoUrl: null,
            difficulty: 'Hard'
        },
        {
            id: 4,
            text: "أكمل المتتابعة: 1، 1، 2، 3، 5، ...",
            options: ["7", "8", "9", "10"],
            correct: 1,
            videoUrl: null,
            difficulty: 'Easy'
        },
        {
            id: 5,
            text: "ما هو ناتج قسمة 1/0.5؟",
            options: ["0.2", "2", "20", "0.5"],
            correct: 1,
            videoUrl: null,
            difficulty: 'Easy'
        }
    ];

    // Filter questions based on selected difficulty
    // If testId is present, we might skip difficulty filtering or use specific logic
    const questions = allQuestions.filter(q => q.difficulty === difficulty).length > 0 
        ? allQuestions.filter(q => q.difficulty === difficulty) 
        : allQuestions;

    // Load saved progress on mount
    useEffect(() => {
        const savedProgress = localStorage.getItem('quiz_progress');
        if (savedProgress) {
            const { currentQuestion: savedQ, answers: savedA } = JSON.parse(savedProgress);
            if (savedQ !== undefined) setCurrentQuestion(savedQ);
            if (savedA) setAnswers(savedA);
        }
    }, []);

    // Save progress effect
    useEffect(() => {
        if (quizStarted) {
            localStorage.setItem('quiz_progress', JSON.stringify({
                currentQuestion,
                answers
            }));
        }
    }, [currentQuestion, answers, quizStarted]);

    const requestPermissions = async () => {
        setLoadingPermissions(true);
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
            setPermissionGranted(true);
        } catch (err) {
            console.error("Permission denied", err);
            alert("عذراً، يجب تفعيل الكاميرا والميكروفون لبدء الاختبار لضمان النزاهة.");
        } finally {
            setLoadingPermissions(false);
        }
    };

    const startQuiz = () => {
        setQuizStarted(true);
    };

    useEffect(() => {
        let timer: any;
        if (quizStarted) {
            timer = setInterval(() => {
                setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [quizStarted]);

    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            if (quizStarted) {
                e.preventDefault();
                e.returnValue = '';
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, [quizStarted]);

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    const handleAnswerSelect = async (index: number) => {
        setSelectedAnswer(index);
        setAnswers(prev => ({
            ...prev,
            [currentQuestion]: index
        }));

        // AI Explanation Trigger
        setLoadingExplanation(true);
        setAiExplanation(null);
        
        const q = questions[currentQuestion];
        const selectedText = q.options[index];
        const correctText = q.options[q.correct];
        
        // Only fetch if incorrect or just to provide feedback
        // if (index !== q.correct) {
            const explanation = await explainQuestion(q.text, selectedText, correctText);
            setAiExplanation(explanation);
        // }
        setLoadingExplanation(false);
    };

    const handleNext = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(curr => curr + 1);
            setSelectedAnswer(answers[currentQuestion + 1] ?? null);
            setShowVideo(false);
            setAiExplanation(null);
        } else {
            navigate('/results');
        }
    };

    const handlePrev = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(curr => curr - 1);
            setSelectedAnswer(answers[currentQuestion - 1] ?? null);
            setShowVideo(false);
            setAiExplanation(null);
        }
    };

    const handleExitAttempt = () => {
        if (quizStarted) {
            setShowExitDialog(true);
        } else {
            navigate('/dashboard');
        }
    };

    const handleSaveProgress = () => {
        localStorage.setItem('quiz_progress_save', JSON.stringify({
            currentQuestion,
            answers
        }));
        alert("تم حفظ تقدمك بنجاح!");
    };

    // 1. Permission Gate UI
    if (!permissionGranted) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
                <Card className="max-w-md w-full p-8 text-center space-y-6">
                    <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto text-purple-600">
                        <Lock size={40} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">إعداد المراقبة الذكية</h2>
                        <p className="text-gray-500 leading-relaxed">
                            يتطلب هذا الاختبار تفعيل الكاميرا والميكروفون لضمان نزاهة الاختبار وتطبيق معايير المراقبة الآلية.
                        </p>
                    </div>
                    
                    <button 
                        onClick={requestPermissions}
                        disabled={loadingPermissions}
                        className="w-full bg-purple-600 text-white py-3 rounded-xl font-bold hover:bg-purple-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {loadingPermissions ? (
                            <>جاري التحقق من الأجهزة...</>
                        ) : (
                            <>
                                <CheckCircle size={20} />
                                تفعيل ومتابعة
                            </>
                        )}
                    </button>
                    <button onClick={() => navigate('/dashboard')} className="text-gray-400 text-sm hover:text-gray-600">
                        العودة للرئيسية
                    </button>
                </Card>
            </div>
        );
    }

    // 2. Difficulty Selection UI
    if (!quizStarted) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
                <Card className="max-w-2xl w-full p-8 space-y-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">اختر مستوى الصعوبة</h2>
                        <p className="text-gray-500">حدد المستوى المناسب لبدء الاختبار</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {['Easy', 'Medium', 'Hard'].map((level) => (
                            <button 
                                key={level}
                                onClick={() => setDifficulty(level as any)}
                                className={`p-6 rounded-xl border-2 transition-all flex flex-col items-center gap-4 ${
                                    difficulty === level 
                                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700' 
                                    : 'border-gray-200 hover:border-emerald-200'
                                }`}
                            >
                                <span className="font-bold text-lg">{level === 'Easy' ? 'سهل' : level === 'Medium' ? 'متوسط' : 'صعب'}</span>
                            </button>
                        ))}
                    </div>

                    <button 
                        onClick={startQuiz}
                        className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-lg hover:shadow-indigo-200 flex items-center justify-center gap-2"
                    >
                        بدء الاختبار
                        <ChevronRight size={24} className={document.dir === 'rtl' ? 'rotate-180' : ''} />
                    </button>
                </Card>
            </div>
        );
    }

    // 3. Actual Quiz UI
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <video ref={videoRef} autoPlay playsInline muted className="hidden" />

            <header className="bg-white border-b p-4 shadow-sm sticky top-0 z-20">
                <div className="max-w-4xl mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <button className="text-gray-500 hover:text-gray-800 transition-colors" onClick={handleExitAttempt}>
                            <ArrowRight />
                        </button>
                        <div>
                            <h1 className="font-bold text-lg">{quizTitle}</h1>
                            <span className="text-xs px-2 py-0.5 rounded bg-emerald-100 text-emerald-700">
                                المستوى: {difficulty === 'Easy' ? 'سهل' : difficulty === 'Medium' ? 'متوسط' : 'صعب'}
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 bg-secondary-50 text-secondary-700 px-3 py-1 rounded-lg font-mono font-bold">
                        <Clock size={18} />
                        <span>{formatTime(timeLeft)}</span>
                    </div>
                </div>
            </header>

            <main className="flex-1 p-4 max-w-3xl mx-auto w-full flex flex-col justify-center">
                <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>التقدم</span>
                        <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}%</span>
                    </div>
                    <ProgressBar percentage={((currentQuestion + 1) / questions.length) * 100} showPercentage={false} color="secondary" />
                </div>

                <Card className="rounded-t-none rounded-b-xl p-6 min-h-[400px] flex flex-col">
                    <div className="flex justify-between mb-6">
                        <button className="bg-indigo-50 text-indigo-900 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-indigo-100 transition-colors">
                            <Heart size={18} />
                            إضافة إلى المفضلة
                        </button>

                        <button 
                            onClick={() => setShowVideo(true)}
                            disabled={!questions[currentQuestion].videoUrl}
                            className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors shadow-sm ${
                                questions[currentQuestion].videoUrl
                                ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 cursor-pointer'
                                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            }`}
                        >
                            <PlayCircle size={18} />
                            {questions[currentQuestion].videoUrl ? 'شرح الفيديو' : 'لا يوجد شرح'}
                        </button>
                    </div>

                    <div className="flex-1">
                        <p className="text-lg font-medium text-gray-800 leading-loose mb-8 text-right">
                            ({currentQuestion + 1}) {questions[currentQuestion].text}
                        </p>

                        <div className="grid grid-cols-2 gap-4 dir-rtl">
                            {questions[currentQuestion].options.map((option, idx) => {
                                const isSelected = selectedAnswer === idx || answers[currentQuestion] === idx;
                                let borderClass = 'border-gray-200 hover:border-gray-300 bg-white';
                                if (isSelected) {
                                    if (idx === questions[currentQuestion].correct) {
                                        borderClass = 'border-emerald-500 bg-emerald-50 text-emerald-700';
                                    } else {
                                        borderClass = 'border-red-500 bg-red-50 text-red-700';
                                    }
                                }

                                return (
                                    <button
                                        key={idx}
                                        onClick={() => handleAnswerSelect(idx)}
                                        className={`p-4 rounded-xl border-2 transition-all flex items-center justify-between ${borderClass}`}
                                    >
                                        <span className="font-bold text-lg">{option}</span>
                                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                                            isSelected && idx === questions[currentQuestion].correct ? 'border-emerald-500 bg-emerald-500' : 
                                            isSelected ? 'border-red-500 bg-red-500' : 'border-gray-300'
                                        }`}>
                                            {isSelected && idx === questions[currentQuestion].correct && <CheckCircle size={14} className="text-white" />}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                        
                        {/* AI Explanation Area */}
                        {loadingExplanation && (
                            <div className="mt-4 text-center text-gray-500 text-sm animate-pulse">
                                جاري تحليل الإجابة...
                            </div>
                        )}
                        
                        {aiExplanation && (
                            <div className="mt-6 p-4 bg-indigo-50 rounded-xl border border-indigo-100 animate-fade-in">
                                <h4 className="font-bold text-indigo-800 mb-2 flex items-center gap-2">
                                    <Sparkles size={16} />
                                    توضيح الذكاء الاصطناعي:
                                </h4>
                                <p className="text-indigo-700 text-sm leading-relaxed">
                                    {aiExplanation}
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-100">
                        <button 
                            onClick={handleSaveProgress}
                            className="px-4 py-2 rounded-lg bg-amber-100 text-amber-700 font-bold flex items-center gap-2 hover:bg-amber-200"
                        >
                            <Save size={18} />
                            <span className="hidden sm:inline">حفظ الإجابة</span>
                        </button>

                        <div className="flex gap-2">
                            <button 
                                onClick={handlePrev}
                                disabled={currentQuestion === 0}
                                className="px-6 py-3 rounded-lg bg-gray-200 text-gray-600 font-bold disabled:opacity-50"
                            >
                                السابق
                            </button>
                            <button 
                                onClick={handleNext}
                                className="px-6 py-3 rounded-lg bg-indigo-900 text-white font-bold flex items-center gap-2"
                            >
                                {currentQuestion === questions.length - 1 ? 'إنهاء الاختبار' : 'التالي'}
                                <ArrowLeft size={20} />
                            </button>
                        </div>
                    </div>
                </Card>

                <div className="mt-6 flex flex-wrap justify-center gap-2">
                    {Array.from({ length: questions.length }, (_, i) => (
                        <button 
                            key={i}
                            onClick={() => {
                                setCurrentQuestion(i);
                                setSelectedAnswer(answers[i] ?? null);
                                setShowVideo(false);
                                setAiExplanation(null);
                            }}
                            className={`w-10 h-10 rounded-lg font-bold transition-all ${
                                currentQuestion === i 
                                ? 'bg-secondary-500 text-white shadow-md transform scale-105' 
                                : answers[i] !== undefined 
                                    ? 'bg-indigo-50 text-indigo-600 border border-indigo-200' 
                                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                            }`}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            </main>

            {showVideo && questions[currentQuestion].videoUrl && (
                <VideoModal 
                    videoUrl={questions[currentQuestion].videoUrl} 
                    title="شرح السؤال بالفيديو" 
                    onClose={() => setShowVideo(false)} 
                />
            )}

            {showExitDialog && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm animate-fade-in">
                    <Card className="max-w-sm w-full p-6 text-center space-y-4 shadow-2xl animate-scale-up">
                        <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <AlertTriangle size={32} />
                        </div>
                        <div>
                            <h3 className="font-bold text-xl text-gray-800 mb-2">هل تريد الخروج؟</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                الاختبار لا يزال سارياً. الخروج الآن قد يؤدي إلى فقدان تقدمك الحالي.
                            </p>
                        </div>
                        <div className="flex gap-3 mt-6">
                            <button 
                                onClick={() => navigate('/dashboard')}
                                className="flex-1 bg-red-500 text-white py-3 rounded-xl font-bold hover:bg-red-600 transition-colors shadow-lg shadow-red-100"
                            >
                                خروج وإنهاء
                            </button>
                            <button 
                                onClick={() => setShowExitDialog(false)}
                                className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-200 transition-colors"
                            >
                                إلغاء
                            </button>
                        </div>
                    </Card>
                </div>
            )}
        </div>
    );
};

export default Quiz;
