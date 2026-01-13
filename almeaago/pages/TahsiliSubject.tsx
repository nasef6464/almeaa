
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockSkills, mockQuestionBanks, mockSimTests, mockCourses, mockTahsiliPackages, mockVideoLessons } from '../services/mockData';
import { Card } from '../components/ui/Card';
import { Video, BookOpen, FileText, PlayCircle, ChevronRight, Clock, CheckCircle, MonitorPlay, Star, User, ChevronDown, ChevronUp } from 'lucide-react';
import { ProgressBar } from '../components/ui/ProgressBar';
import { VideoModal } from '../components/VideoModal';

export const TahsiliSubject: React.FC = () => {
    const { subject } = useParams<{ subject: string }>();
    const [activeTab, setActiveTab] = useState<'courses' | 'skills' | 'banks' | 'tests'>('courses');
    const [expandedSkillId, setExpandedSkillId] = useState<string | null>(null);
    const [playingVideo, setPlayingVideo] = useState<{url: string, title: string} | null>(null);

    const isOffers = subject === 'offers';

    // Mock Data Retrieval
    const safeSubject = (subject || 'math') as keyof typeof mockSkills;
    
    const courses = mockCourses[safeSubject] || [];
    const skills = mockSkills[safeSubject] || [];
    const banks = mockQuestionBanks[safeSubject] || [];
    const tests = mockSimTests[safeSubject] || [];

    const toggleSkill = (id: string) => {
        setExpandedSkillId(prev => prev === id ? null : id);
    };

    // Tahsili Specific Packages Logic
    if (isOffers) {
        return (
            <div className="bg-gray-50 min-h-screen pb-20">
                <header className="bg-emerald-900 text-white py-12 relative overflow-hidden text-center">
                    <div className="max-w-7xl mx-auto px-4 relative z-10">
                        <h1 className="text-4xl font-bold mb-2">عروض وباقات التحصيلي</h1>
                        <p className="text-emerald-200">باقات شاملة ومكثفة لجميع المواد العلمية</p>
                    </div>
                </header>
                <div className="max-w-7xl mx-auto px-4 py-12">
                    <div className="grid md:grid-cols-3 gap-8">
                        {mockTahsiliPackages.map((pkg) => (
                            <div key={pkg.id} className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-all relative flex flex-col">
                                {pkg.popular && (
                                    <div className="absolute top-0 right-0 bg-amber-500 text-white text-xs font-bold px-4 py-1 rounded-bl-xl z-10">
                                        الأكثر طلباً
                                    </div>
                                )}
                                <div className={`${pkg.color} p-6 text-white text-center`}>
                                    <h3 className="text-2xl font-bold mb-2">{pkg.title}</h3>
                                    <div className="flex justify-center items-baseline gap-1">
                                        <span className="text-4xl font-black">{pkg.price}</span>
                                        <span className="text-sm opacity-80">ر.س</span>
                                    </div>
                                    <span className="text-sm line-through opacity-60">{pkg.originalPrice} ر.س</span>
                                </div>
                                <div className="p-6 flex-1 flex flex-col">
                                    <ul className="space-y-4 mb-8 flex-1">
                                        {pkg.features.map((feat, idx) => (
                                            <li key={idx} className="flex items-center gap-3 text-gray-600 text-sm">
                                                <CheckCircle size={16} className="text-emerald-500 shrink-0" />
                                                {feat}
                                            </li>
                                        ))}
                                    </ul>
                                    <button className={`w-full py-3 rounded-xl font-bold text-white transition-colors ${pkg.color.replace('bg-', 'hover:bg-').replace('600', '700').replace('500', '600')} ${pkg.color}`}>
                                        اشترك الآن
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    const subjectTitles: Record<string, string> = {
        math: 'الرياضيات (تحصيلي)',
        physics: 'الفيزياء (تحصيلي)',
        chemistry: 'الكيمياء (تحصيلي)',
        biology: 'الأحياء (تحصيلي)'
    };

    const title = subjectTitles[safeSubject] || 'المادة العلمية';

    return (
        <div className="bg-gray-50 min-h-screen pb-20">
            <header className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-12 text-center">
                <h1 className="text-3xl font-bold mb-2">{title}</h1>
                <p className="text-gray-300">كل ما تحتاجه للتفوق في {title.split(' ')[0]}</p>
            </header>

            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Tabs */}
                <div className="flex flex-wrap justify-center gap-3 mb-10">
                    <TabButton active={activeTab === 'courses'} onClick={() => setActiveTab('courses')} icon={<MonitorPlay size={18} />} label="الدورات" />
                    <TabButton active={activeTab === 'skills'} onClick={() => setActiveTab('skills')} icon={<Video size={18} />} label="المهارات" />
                    <TabButton active={activeTab === 'banks'} onClick={() => setActiveTab('banks')} icon={<BookOpen size={18} />} label="بنوك الأسئلة" />
                    <TabButton active={activeTab === 'tests'} onClick={() => setActiveTab('tests')} icon={<FileText size={18} />} label="اختبارات محاكية" />
                </div>

                {/* Content */}
                <div className="animate-fade-in">
                    {activeTab === 'courses' && (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {courses.length > 0 ? (
                                courses.map(course => (
                                    <Card key={course.id} className="flex flex-col h-full hover:shadow-xl transition-shadow duration-300 border border-gray-100 overflow-hidden group">
                                        <div className="relative h-48 bg-gray-900 overflow-hidden">
                                            <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-90" />
                                            <div className="absolute top-3 left-3 bg-white/90 backdrop-blur shadow-sm px-2 py-1 rounded-lg text-xs font-bold text-gray-700 flex items-center gap-1">
                                                <Star size={12} className="text-amber-400 fill-current" />
                                                {course.rating}
                                            </div>
                                        </div>
                                        <div className="p-5 flex-1 flex flex-col">
                                            <h3 className="text-lg font-bold text-gray-900 mb-2 leading-snug">{course.title}</h3>
                                            <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                                                <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200">
                                                    <User size={14} />
                                                </div>
                                                <span>{course.instructor}</span>
                                            </div>
                                            <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-50">
                                                <span className="text-xl font-black text-emerald-600">{course.price} <span className="text-xs font-normal text-gray-500">ر.س</span></span>
                                                <Link to={`/course/${course.id}`} className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-indigo-700 transition-colors">
                                                    تفاصيل
                                                </Link>
                                            </div>
                                        </div>
                                    </Card>
                                ))
                            ) : (
                                <div className="col-span-full text-center py-12 text-gray-400 bg-white rounded-2xl border border-dashed border-gray-200">
                                    <MonitorPlay size={48} className="mx-auto mb-4 opacity-20" />
                                    <p>لا توجد دورات متاحة حالياً في هذا القسم.</p>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'skills' && (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {skills.map((skill) => {
                                const isExpanded = expandedSkillId === skill.id.toString();
                                // @ts-ignore
                                const videos = mockVideoLessons[skill.id.toString()] || [];

                                return (
                                    <Card key={skill.id} className="p-5 border border-gray-100 hover:shadow-md transition-all cursor-pointer group">
                                        <div 
                                            className="flex justify-between items-start mb-4"
                                            onClick={() => toggleSkill(skill.id.toString())}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                                    <PlayCircle size={24} />
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-gray-800">{skill.title}</h3>
                                                    <span className="text-xs text-gray-500">{skill.totalLessons} درس فيديو</span>
                                                </div>
                                            </div>
                                            {isExpanded ? <ChevronUp size={20} className="text-gray-400" /> : <ChevronDown size={20} className="text-gray-400" />}
                                        </div>
                                        
                                        <div className="space-y-2" onClick={() => toggleSkill(skill.id.toString())}>
                                            <div className="flex justify-between text-xs text-gray-600">
                                                <span>التقدم</span>
                                                <span>{Math.round((skill.completed / skill.totalLessons) * 100)}%</span>
                                            </div>
                                            <ProgressBar percentage={(skill.completed / skill.totalLessons) * 100} showPercentage={false} />
                                        </div>

                                        {isExpanded && (
                                            <div className="mt-4 pt-4 border-t border-gray-100 animate-fade-in">
                                                <div className="space-y-2">
                                                    {videos.length > 0 ? (
                                                        videos.map((video: any) => (
                                                            <div key={video.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100 hover:border-indigo-200 transition-colors">
                                                                <div className="flex items-center gap-3">
                                                                    <button 
                                                                        onClick={() => setPlayingVideo({url: video.url, title: video.title})}
                                                                        className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-colors"
                                                                    >
                                                                        <PlayCircle size={16} />
                                                                    </button>
                                                                    <span className="text-sm font-medium text-gray-700">{video.title}</span>
                                                                </div>
                                                                <span className="text-xs text-gray-400">{video.duration}</span>
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <p className="text-center text-xs text-gray-400">لا توجد دروس متاحة</p>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </Card>
                                );
                            })}
                        </div>
                    )}

                    {activeTab === 'banks' && (
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {banks.map((bank) => (
                                <Card key={bank.id} className="p-6 text-center border border-gray-100 hover:border-amber-200 hover:shadow-lg transition-all">
                                    <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-4">
                                        <BookOpen size={32} />
                                    </div>
                                    <h3 className="font-bold text-lg text-gray-900 mb-2">{bank.title}</h3>
                                    <p className="text-gray-500 text-sm mb-4">{bank.questions} سؤال</p>
                                    <Link 
                                        to={`/bank/${bank.id}`}
                                        className="block w-full bg-amber-500 text-white py-2 rounded-lg font-bold text-sm hover:bg-amber-600 transition-colors"
                                    >
                                        بدء التدريب
                                    </Link>
                                </Card>
                            ))}
                        </div>
                    )}

                    {activeTab === 'tests' && (
                        <div className="space-y-4 max-w-3xl mx-auto">
                            {tests.map((test) => (
                                <div key={test.id} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row items-center justify-between hover:border-emerald-300 transition-all">
                                    <div className="flex items-center gap-4 mb-4 md:mb-0">
                                        <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                                            <FileText size={24} />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg text-gray-800">{test.title}</h3>
                                            <div className="flex gap-4 text-sm text-gray-500">
                                                <span className="flex items-center gap-1"><Clock size={14} /> {test.duration}</span>
                                                <span className="flex items-center gap-1"><CheckCircle size={14} /> {test.questions} سؤال</span>
                                            </div>
                                        </div>
                                    </div>
                                    <Link 
                                        to={`/quiz?testId=${test.id}`}
                                        className="bg-white text-emerald-600 border-2 border-emerald-600 px-6 py-2 rounded-lg font-bold hover:bg-emerald-600 hover:text-white transition-colors"
                                    >
                                        بدء الاختبار
                                    </Link>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {playingVideo && (
                <VideoModal 
                    videoUrl={playingVideo.url} 
                    title={playingVideo.title} 
                    onClose={() => setPlayingVideo(null)} 
                />
            )}
        </div>
    );
};

const TabButton = ({ active, onClick, icon, label }: any) => (
    <button 
        onClick={onClick}
        className={`flex items-center gap-2 px-5 py-2 rounded-full font-bold text-sm transition-all ${
            active 
            ? 'bg-gray-800 text-white shadow-md' 
            : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
        }`}
    >
        {icon}
        {label}
    </button>
);
