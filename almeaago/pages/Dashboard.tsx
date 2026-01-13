
import React, { useState, Suspense } from 'react';
import { schedule, courses, skillsData, currentUser, saherUpcomingTests } from '../services/mockData';
import { 
    Clock, TrendingUp, AlertTriangle, Zap, FileText, 
    PieChart, Heart, Map, HelpCircle, LayoutDashboard, 
    ShoppingCart, ChevronLeft, Menu, X, Target, Loader2 
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { ProgressBar } from '../components/ui/ProgressBar';
import { Link } from 'react-router-dom';
import { SmartLearningPath } from '../components/SmartLearningPath';

// Lazy Load Sub-Pages to optimize Dashboard initial load
const Quizzes = React.lazy(() => import('./Quizzes'));
const Reports = React.lazy(() => import('./Reports'));
const Favorites = React.lazy(() => import('./Favorites'));
const Plan = React.lazy(() => import('./Plan'));
const QA = React.lazy(() => import('./QA'));
const MyRequests = React.lazy(() => import('./MyRequests').then(module => ({ default: module.MyRequests })));

const TabLoading = () => (
    <div className="flex items-center justify-center h-64 text-amber-500">
        <Loader2 size={40} className="animate-spin" />
    </div>
);

const Dashboard: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'overview' | 'saher' | 'quizzes' | 'reports' | 'favorites' | 'plan' | 'qa' | 'requests'>('overview');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const menuItems = [
        { id: 'overview', label: 'نظرة عامة', icon: <LayoutDashboard size={20} /> },
        { id: 'saher', label: 'اختبار ساهر', icon: <Zap size={20} /> },
        { id: 'quizzes', label: 'اختباراتي', icon: <FileText size={20} /> },
        { id: 'reports', label: 'تقاريري', icon: <PieChart size={20} /> },
        { id: 'favorites', label: 'الأسئلة المفضلة', icon: <Heart size={20} /> },
        { id: 'plan', label: 'خطتي', icon: <Map size={20} /> },
        { id: 'qa', label: 'سؤال وجواب', icon: <HelpCircle size={20} /> },
        { id: 'requests', label: 'طلباتي', icon: <ShoppingCart size={20} /> },
    ];

    // Render Content Based on Tab
    const renderContent = () => {
        switch(activeTab) {
            case 'overview': return <OverviewTab setActiveTab={setActiveTab} />;
            case 'saher': return <SaherTab />;
            case 'quizzes': return <Suspense fallback={<TabLoading />}><Quizzes /></Suspense>;
            case 'reports': return <Suspense fallback={<TabLoading />}><Reports /></Suspense>;
            case 'favorites': return <Suspense fallback={<TabLoading />}><Favorites /></Suspense>;
            case 'plan': return <Suspense fallback={<TabLoading />}><Plan /></Suspense>;
            case 'qa': return <Suspense fallback={<TabLoading />}><QA /></Suspense>;
            case 'requests': return <Suspense fallback={<TabLoading />}><MyRequests /></Suspense>;
            default: return <OverviewTab setActiveTab={setActiveTab} />;
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Mobile Menu Toggle */}
            <button 
                className="lg:hidden fixed bottom-6 left-6 z-50 bg-amber-500 text-white p-3 rounded-full shadow-lg"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
                {isSidebarOpen ? <X /> : <Menu />}
            </button>

            {/* Sidebar Navigation */}
            <aside className={`
                fixed lg:sticky top-20 right-0 bottom-0 w-64 bg-white border-l border-gray-200 z-40 transition-transform duration-300 overflow-y-auto h-[calc(100vh-5rem)]
                ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
            `}>
                <div className="p-6">
                    <div className="flex items-center gap-3 mb-8">
                        <img src={currentUser.avatar} alt={currentUser.name} className="w-12 h-12 rounded-full border-2 border-amber-100" loading="lazy" />
                        <div>
                            <h3 className="font-bold text-gray-800 text-sm">{currentUser.name}</h3>
                            <span className="text-xs text-gray-500">لوحة تحكم الطالب</span>
                        </div>
                    </div>

                    <nav className="space-y-2">
                        {menuItems.map(item => (
                            <button
                                key={item.id}
                                onClick={() => {
                                    setActiveTab(item.id as any);
                                    setIsSidebarOpen(false);
                                }}
                                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                                    activeTab === item.id 
                                    ? 'bg-amber-50 text-amber-600 shadow-sm' 
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    {item.icon}
                                    {item.label}
                                </div>
                                {activeTab === item.id && <ChevronLeft size={16} />}
                            </button>
                        ))}
                    </nav>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 p-4 lg:p-8 w-full max-w-[100vw] lg:max-w-[calc(100vw-16rem)]">
                <div className="max-w-5xl mx-auto">
                    {renderContent()}
                </div>
            </main>
        </div>
    );
};

// -- Sub-Components --

// 1. Overview Tab (Original Dashboard Content)
const OverviewTab = ({ setActiveTab }: { setActiveTab: (tab: any) => void }) => (
    <div className="space-y-8 animate-fade-in">
        <div className="flex justify-between items-end">
            <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">مرحباً، {currentUser.name.split(' ')[0]} 👋</h2>
                <p className="text-gray-500 text-lg">لنواصل رحلة التعلم اليوم في منصة المئة</p>
            </div>
            <div className="bg-amber-100 text-amber-700 px-6 py-3 rounded-2xl text-sm font-bold flex items-center gap-2 shadow-sm">
                <TrendingUp size={20} />
                المستوى 12
            </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
                {/* Quick Access Grid (Now acts as shortcuts for the tabs) */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <button onClick={() => setActiveTab('saher')} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center gap-2 group">
                        <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-colors">
                            <Zap size={24} />
                        </div>
                        <span className="font-bold text-gray-800 text-xs">ساهر</span>
                    </button>

                    <button onClick={() => setActiveTab('quizzes')} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center gap-2 group">
                        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                            <FileText size={24} />
                        </div>
                        <span className="font-bold text-gray-800 text-xs">اختباراتي</span>
                    </button>

                    <button onClick={() => setActiveTab('reports')} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center gap-2 group">
                        <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                            <PieChart size={24} />
                        </div>
                        <span className="font-bold text-gray-800 text-xs">التقارير</span>
                    </button>

                    <button onClick={() => setActiveTab('plan')} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center gap-2 group">
                        <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                            <Map size={24} />
                        </div>
                        <span className="font-bold text-gray-800 text-xs">خطتي</span>
                    </button>
                </div>

                {/* Active Courses */}
                <section>
                        <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-gray-900">الكورسات النشطة</h3>
                        <Link to="/courses" className="text-amber-600 text-sm font-bold hover:text-amber-700">عرض الكل</Link>
                    </div>
                    <div className="grid gap-4">
                        {courses.slice(0, 2).map(course => (
                            <Card key={course.id} className="flex flex-col md:flex-row overflow-hidden hover:shadow-lg transition-shadow">
                                <div className="relative w-full md:w-48 h-32 md:h-auto bg-gray-900 shrink-0">
                                    <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover opacity-80" loading="lazy" />
                                </div>
                                <div className="p-4 flex-1 flex flex-col justify-between">
                                    <div>
                                        <h4 className="font-bold text-lg text-gray-900 mb-1">{course.title}</h4>
                                        <p className="text-xs text-gray-500 mb-3">المدرس: {course.instructor}</p>
                                    </div>
                                    <div className="flex items-center justify-between gap-4">
                                        <div className="flex-1">
                                            <ProgressBar percentage={course.progress} color="secondary" showPercentage={true} />
                                        </div>
                                        <Link to={`/course/${course.id}`} className="bg-amber-500 text-white text-xs px-4 py-2 rounded-lg font-bold hover:bg-amber-600 transition-colors">
                                            متابعة
                                        </Link>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </section>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
                <SmartLearningPath skills={skillsData} />
                
                <section className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold text-gray-900">الجدول الدراسي</h3>
                    </div>
                    <div className="space-y-4">
                        {schedule.slice(0, 3).map((item) => (
                            <div key={item.id} className="flex items-center gap-3 border-b border-gray-50 last:border-0 pb-3 last:pb-0">
                                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 shrink-0">
                                    <Clock size={18} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-800 text-sm">{item.subject}</h4>
                                    <p className="text-xs text-gray-500">{item.duration} • {item.day}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    </div>
);

// 2. Saher Tab
const SaherTab = () => (
    <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
        {/* Hero Card */}
        <div className="bg-[#a855f7] text-white rounded-2xl p-8 md:p-12 shadow-lg shadow-purple-100 text-center relative overflow-hidden">
            <div className="relative z-10">
                <h1 className="text-3xl font-bold mb-3">اختبار "ساهر" السريع</h1>
                <p className="text-purple-100 text-lg mb-8">اختبر معرفتك في جميع المواد باختبار شامل وسريع</p>
                
                <Link 
                    to="/quiz" 
                    className="inline-block bg-white text-[#a855f7] px-8 py-3 rounded-xl font-bold text-lg hover:bg-gray-50 transition-transform hover:-translate-y-1 shadow-md"
                >
                    ابدأ اختبار ساهر
                </Link>
            </div>
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-900 opacity-10 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl"></div>
        </div>

        {/* Upcoming Tests Section */}
        <div>
            <h3 className="text-xl font-bold text-gray-800 mb-6 text-right">الاختبارات القادمة</h3>
            <div className="space-y-4">
                {saherUpcomingTests.map(test => (
                    <Card key={test.id} className="p-4 flex justify-between items-center hover:shadow-md transition-all border border-gray-100">
                        {/* Button on Left (End in Flex RTL) */}
                        <button className="bg-amber-500 text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-amber-600 transition-colors shadow-sm">
                            تفاصيل
                        </button>

                        {/* Content on Right (Start in Flex RTL) */}
                        <div className="flex items-center gap-4">
                            <div className="text-right">
                                <h4 className="font-bold text-gray-800 text-sm md:text-base">{test.title}</h4>
                                <span className="text-gray-400 text-sm font-sans font-medium">{test.date}</span>
                            </div>
                            <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center text-purple-500 border-2 border-purple-100 shrink-0">
                                <Target size={24} />
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    </div>
);

export default Dashboard;
