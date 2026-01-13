
import React from 'react';
import { ArrowDown, BookOpen, Target, Zap, Book, Users, Video, BarChart, Star, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card } from '../components/ui/Card';

export const Landing: React.FC = () => {
    return (
        <div className="bg-white font-tajawal">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-b from-indigo-50 via-white to-white pt-16 pb-24 overflow-hidden">
                {/* Background Elements */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                    <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                    <div className="absolute top-[20%] left-[-10%] w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                    <div className="absolute bottom-[-10%] right-[20%] w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                        
                        {/* Text Content */}
                        <div className="lg:w-1/2 text-center lg:text-right">
                            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-bold mb-6 border border-blue-100 shadow-sm">
                                <span className="relative flex h-3 w-3">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                                </span>
                                المنصة الأولى للقدرات والتحصيلي
                            </div>
                            
                             <h1 className="text-5xl lg:text-7xl font-black text-gray-900 leading-tight mb-6">
                                حقق <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">المئة</span> <br/>
                                في اختباراتك
                            </h1>
                            
                            <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                                رحلة تعليمية ذكية تجمع بين التدريب المكثف، الشروحات التفاعلية، والتحليل الدقيق لنقاط ضعفك لضمان أعلى الدرجات.
                            </p>

                            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                                <Link 
                                    to="/dashboard" 
                                    className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-white text-lg font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
                                >
                                    <Zap size={20} fill="currentColor" />
                                    ابدأ التدريب مجاناً
                                </Link>
                                <Link 
                                    to="/courses" 
                                    className="w-full sm:w-auto bg-white text-gray-700 border border-gray-200 text-lg font-bold px-8 py-4 rounded-xl hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
                                >
                                    <BookOpen size={20} />
                                    تصفح الدورات
                                </Link>
                            </div>

                            <div className="mt-10 flex items-center justify-center lg:justify-start gap-6 text-sm text-gray-500 font-medium">
                                <div className="flex items-center gap-2">
                                    <CheckCircle size={18} className="text-emerald-500" />
                                    <span>ضمان تحسن المستوى</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle size={18} className="text-emerald-500" />
                                    <span>مدربون معتمدون</span>
                                </div>
                            </div>
                        </div>

                        {/* Image Section */}
                        <div className="lg:w-1/2 relative">
                            <div className="relative w-full max-w-lg mx-auto">
                                {/* Main Student Image */}
                                <img 
                                    src="https://img.freepik.com/free-photo/saudi-arab-boy-student-wearing-thobe-holding-tablet_1258-122164.jpg" 
                                    alt="طالب سعودي يستخدم منصة المئة" 
                                    className="w-full h-auto rounded-3xl shadow-2xl border-4 border-white relative z-10 transform transition-transform hover:scale-[1.02]"
                                />

                                {/* Floating "Screen" Interface Simulation */}
                                <div className="absolute -bottom-6 -right-6 z-20 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/50 max-w-[200px] animate-bounce-slow">
                                    <div className="flex items-center gap-2 mb-2 border-b border-gray-100 pb-2">
                                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                                            <Target size={16} />
                                        </div>
                                        <div>
                                            <div className="text-xs font-bold text-gray-800">منصة المئة</div>
                                            <div className="text-[10px] text-emerald-500 font-bold">مستواك: متقدم</div>
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="h-1.5 bg-gray-100 rounded-full w-full overflow-hidden">
                                            <div className="h-full bg-blue-500 w-3/4"></div>
                                        </div>
                                        <div className="flex justify-between text-[10px] text-gray-500">
                                            <span>التقدم</span>
                                            <span>75%</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Floating Elements */}
                                <div className="absolute top-10 -left-10 z-20 bg-white p-3 rounded-2xl shadow-lg animate-float">
                                    <div className="text-amber-500 font-black text-xl">A+</div>
                                </div>
                                <div className="absolute bottom-20 -left-4 z-0 bg-indigo-600 text-white p-3 rounded-2xl shadow-lg animate-float animation-delay-2000">
                                    <Book size={24} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Bar */}
            <section className="bg-blue-900 text-white py-10 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-blue-800 divide-x-reverse">
                        <div>
                            <div className="text-3xl md:text-4xl font-black text-amber-400 mb-1">+50k</div>
                            <div className="text-blue-200 text-sm font-bold">طالب وطالبة</div>
                        </div>
                        <div>
                            <div className="text-3xl md:text-4xl font-black text-amber-400 mb-1">+120</div>
                            <div className="text-blue-200 text-sm font-bold">دورة تدريبية</div>
                        </div>
                        <div>
                            <div className="text-3xl md:text-4xl font-black text-amber-400 mb-1">+5k</div>
                            <div className="text-blue-200 text-sm font-bold">سؤال وجواب</div>
                        </div>
                        <div>
                            <div className="text-3xl md:text-4xl font-black text-amber-400 mb-1">4.9</div>
                            <div className="text-blue-200 text-sm font-bold">تقييم عام</div>
                        </div>
                    </div>
                </div>
                {/* Pattern Overlay */}
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#fbbf24 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
            </section>

            {/* Main Features Grid (Organic Cards) */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">كل ما تحتاجه للتفوق</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">نقدم لك أدوات تعليمية متكاملة تغطي كافة جوانب الاختبارات</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <OrganicCard 
                            title="اختبر نفسك" 
                            subtitle="بنوك أسئلة ذكية ومحدثة"
                            icon={<Zap size={24} />} 
                            color="blue" 
                            link="/quiz"
                            shape="blob1"
                        />
                         <OrganicCard 
                            title="المواد الدراسية" 
                            subtitle="شروحات لجميع المناهج"
                            icon={<BookOpen size={24} />} 
                            color="orange" 
                            link="/courses"
                            shape="blob2"
                        />
                         <OrganicCard 
                            title="القدرات" 
                            subtitle="تأسيس وتدريب كمي ولفظي"
                            icon={<Target size={24} />} 
                            color="indigo" 
                            link="/category/qudrat"
                            shape="blob3"
                        />
                         <OrganicCard 
                            title="التحصيلي" 
                            subtitle="تغطية شاملة للمواد العلمية"
                            icon={<Book size={24} />} 
                            color="emerald" 
                            link="/category/tahsili"
                            shape="blob4"
                        />
                    </div>
                </div>
            </section>

            {/* Why Choose Us (Detailed Features) */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <FeatureCard 
                                icon={<Video className="text-purple-500" size={20} />}
                                title="بث مباشر وتفاعلي"
                                description="احضر الحصص مباشرة وتفاعل مع المعلم واسأل عما يصعب عليك."
                            />
                            <FeatureCard 
                                icon={<Users className="text-blue-500" size={20} />}
                                title="نخبة المعلمين"
                                description="مدربون خبراء في القدرات والتحصيلي بخبرة تتجاوز 15 عاماً."
                            />
                            <FeatureCard 
                                icon={<BarChart className="text-emerald-500" size={20} />}
                                title="تحليل الأداء"
                                description="تقارير دقيقة توضح نقاط قوتك وضعفك لتركز على ما يهم."
                            />
                            <FeatureCard 
                                icon={<Book className="text-amber-500" size={20} />}
                                title="ملازم شاملة"
                                description="ملخصات وتجميعات محدثة تغنيك عن الكتاب المدرسي."
                            />
                        </div>
                        <div className="lg:w-1/2 text-right">
                            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6 leading-tight">
                                لماذا يختار الطلاب <br/> 
                                <span className="text-indigo-600">منصة المئة</span>؟
                            </h2>
                            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                                نحن لا نقدم مجرد دورات، بل نقدم نظاماً بيئياً متكاملاً يضمن لك الفهم العميق والتدريب المستمر. من خلال تقنيات الذكاء الاصطناعي، نقوم بتخصيص مسار التعلم ليناسب مستواك ويضمن تطورك السريع.
                            </p>
                            <ul className="space-y-4 mb-8">
                                <li className="flex items-center gap-3">
                                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600"><CheckCircle size={14} /></div>
                                    <span className="text-gray-700 font-medium">تحديثات مستمرة للأسئلة حسب قياس</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600"><CheckCircle size={14} /></div>
                                    <span className="text-gray-700 font-medium">ضمان ذهبي لاسترجاع الرسوم</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600"><CheckCircle size={14} /></div>
                                    <span className="text-gray-700 font-medium">دعم فني وأكاديمي طوال أيام الأسبوع</span>
                                </li>
                            </ul>
                            <Link to="/dashboard" className="text-indigo-600 font-bold hover:text-indigo-800 flex items-center gap-2 group">
                                اكتشف المزيد 
                                <ArrowDown className="transform rotate-90 group-hover:translate-x-[-5px] transition-transform" size={20} />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-20 bg-indigo-900 text-white relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">قصص نجاح نعتز بها</h2>
                        <p className="text-indigo-200">انضم لآلاف الطلاب الذين حققوا أحلامهم معنا</p>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-6">
                        <TestimonialCard 
                            name="سارة العتيبي"
                            degree="98% قدرات"
                            text="المنصة غيرت طريقة مذاكرتي تماماً. تحليل نقاط الضعف ساعدني أركز جهدي في المكان الصح."
                            image="https://i.pravatar.cc/100?img=5"
                        />
                        <TestimonialCard 
                            name="فهد الشمري"
                            degree="96% تحصيلي"
                            text="شروحات الفيزياء والكيمياء بسطت لي المعلومات بشكل عجيب. شكراً لكل القائمين على المنصة."
                            image="https://i.pravatar.cc/100?img=11"
                        />
                        <TestimonialCard 
                            name="نورة السالم"
                            degree="99% قدرات"
                            text="اختبارات المحاكاة كانت مطابقة جداً للاختبار الحقيقي، دخلت الاختبار وأنا واثقة جداً."
                            image="https://i.pravatar.cc/100?img=9"
                        />
                    </div>
                </div>
                {/* Decorative Circles */}
                <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-500 opacity-10 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>
            </section>
        </div>
    );
};

// Helper Components

const OrganicCard = ({ title, subtitle, icon, color, link, shape }: any) => {
    const shapes: any = {
        blob1: "30% 70% 70% 30% / 30% 30% 70% 70%",
        blob2: "60% 40% 30% 70% / 60% 30% 70% 40%",
        blob3: "40% 60% 70% 30% / 40% 70% 30% 60%",
        blob4: "50% 50% 20% 80% / 25% 80% 20% 75%"
    };

    const colors: any = {
        blue: "bg-[#2563eb]",
        orange: "bg-[#f97316]",
        indigo: "bg-[#4f46e5]",
        emerald: "bg-[#10b981]"
    };

    return (
        <Link to={link} className="group block h-full max-w-[240px] mx-auto">
            <div 
                className={`w-full aspect-square ${colors[color]} text-white flex flex-col items-center justify-center shadow-xl transition-all transform group-hover:scale-105 group-hover:rotate-1`}
                style={{ borderRadius: shapes[shape] }}
            >
                <div className="mb-3 bg-white/20 p-3 rounded-full backdrop-blur-sm group-hover:bg-white/30 transition-colors">
                    {icon}
                </div>
                <h3 className="text-lg font-bold tracking-wide drop-shadow-md mb-1">{title}</h3>
                <p className="text-white/90 text-[10px] font-medium px-6 text-center">{subtitle}</p>
            </div>
        </Link>
    );
};

const FeatureCard = ({ icon, title, description }: any) => (
    <Card className="p-6 border border-gray-100 hover:shadow-lg transition-shadow flex flex-col gap-3 h-full">
        <div className="w-9 h-9 bg-gray-50 rounded-xl flex items-center justify-center mb-2">
            {icon}
        </div>
        <h3 className="font-bold text-gray-900 text-lg">{title}</h3>
        <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
    </Card>
);

const TestimonialCard = ({ name, degree, text, image }: any) => (
    <div className="bg-white/10 backdrop-blur-md border border-white/10 p-6 rounded-2xl">
        <div className="flex items-center gap-4 mb-4">
            <img src={image} alt={name} className="w-12 h-12 rounded-full border-2 border-amber-400" />
            <div>
                <h4 className="font-bold">{name}</h4>
                <span className="text-amber-400 text-xs font-bold">{degree}</span>
            </div>
        </div>
        <p className="text-indigo-100 text-sm leading-relaxed italic">"{text}"</p>
        <div className="flex gap-1 text-amber-400 mt-4">
            {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
        </div>
    </div>
);
