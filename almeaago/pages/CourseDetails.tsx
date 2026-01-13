
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { findCourseById } from '../services/mockData';
import { Card } from '../components/ui/Card';
import { Star, User, Clock, BookOpen, List, CheckCircle, PlayCircle, ArrowRight } from 'lucide-react';

export const CourseDetails: React.FC = () => {
    const { courseId } = useParams<{ courseId: string }>();
    const course = findCourseById(courseId || '');

    if (!course) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">الدورة غير موجودة</h2>
                <p className="text-gray-500 mb-6">عذراً، لم نتمكن من العثور على الدورة التي تبحث عنها.</p>
                <Link to="/courses" className="bg-primary-600 text-white px-6 py-2 rounded-xl">
                    تصفح الدورات
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen pb-20">
            {/* Header / Hero */}
            <div className="bg-gray-900 text-white relative">
                <div className="absolute inset-0 bg-black/50 z-0">
                    <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover opacity-30" />
                </div>
                <div className="max-w-7xl mx-auto px-4 py-16 relative z-10">
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        <div className="flex-1">
                            <span className="bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-4 inline-block">
                                {course.category}
                            </span>
                            <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">{course.title}</h1>
                            <p className="text-gray-300 text-lg mb-6 max-w-2xl">{course.description}</p>
                            
                            <div className="flex flex-wrap gap-6 text-sm text-gray-300 mb-8">
                                <div className="flex items-center gap-2">
                                    <User size={18} className="text-amber-400" />
                                    <span>{course.instructor}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Star size={18} className="text-amber-400" />
                                    <span>{course.rating} تقييم</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock size={18} className="text-amber-400" />
                                    <span>{course.duration} ساعة</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <span className="text-3xl font-bold">{course.price} <span className="text-sm font-normal">{course.currency}</span></span>
                                {course.price > 0 && <span className="text-gray-400 line-through text-lg">{course.price + 100}</span>}
                            </div>
                        </div>

                        {/* Action Card (Floating) */}
                        <Card className="w-full md:w-80 bg-white text-gray-900 p-6 shadow-2xl border-0">
                            <div className="aspect-video bg-gray-100 rounded-lg mb-4 relative group cursor-pointer overflow-hidden">
                                <img src={course.thumbnail} className="w-full h-full object-cover" alt="Preview" />
                                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                                    <PlayCircle size={48} className="text-white drop-shadow-lg" />
                                </div>
                            </div>
                            <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-bold text-lg mb-3 transition-colors shadow-lg shadow-emerald-200">
                                ابدأ التعلم الآن
                            </button>
                            <p className="text-center text-xs text-gray-500 mb-4">ضمان استرجاع الأموال لمدة 30 يوم</p>
                            
                            <div className="space-y-3">
                                <h4 className="font-bold text-sm">ماذا تتضمن الدورة؟</h4>
                                <ul className="space-y-2 text-sm text-gray-600">
                                    {course.features?.map((feat: string, idx: number) => (
                                        <li key={idx} className="flex items-start gap-2">
                                            <CheckCircle size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                                            {feat}
                                        </li>
                                    ))}
                                    <li className="flex items-start gap-2">
                                        <CheckCircle size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                                        شهادة إتمام
                                    </li>
                                </ul>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>

            {/* Content Tabs */}
            <div className="max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-8">
                    {/* About */}
                    <section className="bg-white p-6 rounded-2xl border border-gray-100">
                        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <BookOpen size={20} className="text-indigo-600" />
                            عن الدورة
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                            {course.description}
                            <br/><br/>
                            صممت هذه الدورة لتأخذ بيدك من المستوى المبتدأ إلى الاحتراف، مع التركيز على التطبيق العملي وحل التجميعات الحديثة.
                        </p>
                    </section>

                    {/* Syllabus */}
                    <section className="bg-white p-6 rounded-2xl border border-gray-100">
                        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                            <List size={20} className="text-indigo-600" />
                            محتوى الدورة
                        </h3>
                        <div className="space-y-3">
                            {course.syllabus?.map((item: any, idx: number) => (
                                <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-indigo-50 transition-colors cursor-pointer group">
                                    <div className="flex items-center gap-4">
                                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-gray-400 border border-gray-200 group-hover:border-indigo-200 group-hover:text-indigo-600">
                                            {item.isCompleted ? <CheckCircle size={18} className="text-emerald-500" /> : <PlayCircle size={18} />}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-800 group-hover:text-indigo-700">{item.title}</h4>
                                            <span className="text-xs text-gray-500">درس فيديو</span>
                                        </div>
                                    </div>
                                    <span className="text-sm text-gray-500 font-medium">{item.duration}</span>
                                </div>
                            )) || <p className="text-gray-500">محتوى الدورة غير متاح حالياً للعرض.</p>}
                        </div>
                    </section>

                    {/* Instructor */}
                    <section className="bg-white p-6 rounded-2xl border border-gray-100">
                        <h3 className="text-xl font-bold text-gray-800 mb-6">عن المدرب</h3>
                        <div className="flex items-start gap-4">
                            <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden">
                                <User size={64} className="text-gray-400 mt-2 ml-2" />
                            </div>
                            <div>
                                <h4 className="font-bold text-lg text-gray-900">{course.instructor}</h4>
                                <p className="text-indigo-600 text-sm mb-2">مدرب معتمد</p>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    {course.instructorBio || 'خبير في مجاله ولديه سنوات عديدة من الخبرة في تدريس الطلاب ومساعدتهم على تحقيق أهدافهم.'}
                                </p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};
