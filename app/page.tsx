import Link from 'next/link';
import { ArrowDown, Book, BookOpen, CheckCircle, Target, Users, Video, BarChart, Star, Zap } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="bg-white text-gray-900 font-sans" dir="rtl">
      <HeroSection />
      <StatsBar />
      <FeaturesGrid />
      <WhyUs />
      <CallToAction />
    </div>
  );
}

function HeroSection() {
  return (
    <section className="relative bg-gradient-to-b from-indigo-50 via-white to-white pt-16 pb-24 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute -top-10 -right-5 w-96 h-96 bg-amber-200 rounded-full mix-blend-multiply blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-20 -left-10 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-10 right-20 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply blur-3xl opacity-20 animate-pulse"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="lg:w-1/2 text-center lg:text-right space-y-6">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-bold border border-blue-100 shadow-sm">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
              </span>
              المنصة الأولى للقدرات والتحصيلي
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-tight">
              حقق <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">المئة</span>
              <br /> في اختباراتك
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              رحلة تعليمية ذكية تجمع بين التدريب المكثف، الشروحات التفاعلية، والتحليل الدقيق لنقاط ضعفك لضمان أعلى الدرجات.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <Link href="/dashboard" className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-white text-lg font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2">
                <Zap size={20} fill="currentColor" />
                ابدأ التدريب مجاناً
              </Link>
              <Link href="/dashboard/my-courses" className="w-full sm:w-auto bg-white text-gray-700 border border-gray-200 text-lg font-bold px-8 py-4 rounded-xl hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
                <BookOpen size={20} />
                تصفح الدورات
              </Link>
            </div>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm text-gray-500 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle size={18} className="text-emerald-500" />
                ضمان تحسن المستوى
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={18} className="text-emerald-500" />
                مدربون معتمدون
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 relative">
            <div className="relative w-full max-w-lg mx-auto">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://img.freepik.com/free-photo/saudi-arab-boy-student-wearing-thobe-holding-tablet_1258-122164.jpg"
                alt="طالب يستخدم المنصة"
                className="w-full h-auto rounded-3xl shadow-2xl border-4 border-white relative z-10"
              />

              <div className="absolute -bottom-6 -right-6 z-20 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/50 max-w-[220px]">
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

              <div className="absolute top-10 -left-10 z-20 bg-white p-3 rounded-2xl shadow-lg animate-pulse">
                <div className="text-amber-500 font-black text-xl">A+</div>
              </div>
              <div className="absolute bottom-20 -left-4 z-0 bg-indigo-600 text-white p-3 rounded-2xl shadow-lg animate-pulse">
                <Book size={24} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatsBar() {
  return (
    <section className="bg-blue-900 text-white py-10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-blue-800 divide-x-reverse">
          <StatBlock value="+50k" label="طالب وطالبة" />
          <StatBlock value="+120" label="دورة تدريبية" />
          <StatBlock value="+5k" label="سؤال وجواب" />
          <StatBlock value="4.9" label="تقييم عام" />
        </div>
      </div>
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#fbbf24 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
    </section>
  );
}

function StatBlock({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="text-3xl md:text-4xl font-black text-amber-400 mb-1">{value}</div>
      <div className="text-blue-200 text-sm font-bold">{label}</div>
    </div>
  );
}

function FeaturesGrid() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">كل ما تحتاجه للتفوق</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">أدوات تعليمية متكاملة تغطي كافة جوانب الاختبارات</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <OrganicCard
            title="اختبر نفسك"
            subtitle="بنوك أسئلة ذكية ومحدثة"
            icon={<Zap size={22} />}
            color="blue"
            link="/dashboard/tests"
          />
          <OrganicCard
            title="المواد الدراسية"
            subtitle="شروحات لجميع المناهج"
            icon={<BookOpen size={22} />}
            color="orange"
            link="/dashboard/my-courses"
          />
          <OrganicCard
            title="القدرات"
            subtitle="تأسيس وتدريب كمي ولفظي"
            icon={<Target size={22} />}
            color="indigo"
            link="/dashboard/saher"
          />
          <OrganicCard
            title="التحصيلي"
            subtitle="تغطية شاملة للمواد العلمية"
            icon={<Book size={22} />}
            color="emerald"
            link="/dashboard/plan"
          />
        </div>
      </div>
    </section>
  );
}

function OrganicCard({ title, subtitle, icon, color, link }: { title: string; subtitle: string; icon: React.ReactNode; color: 'blue' | 'orange' | 'indigo' | 'emerald'; link: string }) {
  const colors: Record<typeof color, string> = {
    blue: 'from-blue-500/10 to-blue-100/40 text-blue-700 border-blue-100',
    orange: 'from-amber-500/10 to-amber-100/40 text-amber-700 border-amber-100',
    indigo: 'from-indigo-500/10 to-indigo-100/40 text-indigo-700 border-indigo-100',
    emerald: 'from-emerald-500/10 to-emerald-100/40 text-emerald-700 border-emerald-100',
  };

  return (
    <Link
      href={link}
      className={`group relative overflow-hidden rounded-2xl border bg-gradient-to-br ${colors[color]} p-5 shadow-sm hover:shadow-md transition-all`}
    >
      <div className="w-12 h-12 rounded-xl bg-white/80 flex items-center justify-center text-2xl mb-4 text-current shadow-sm">
        {icon}
      </div>
      <h3 className="font-bold text-lg mb-1">{title}</h3>
      <p className="text-sm text-gray-600">{subtitle}</p>
      <ArrowDown size={16} className="absolute left-4 bottom-4 text-gray-300 group-hover:translate-y-1 transition-transform" />
    </Link>
  );
}

function WhyUs() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FeatureCard icon={<Video className="text-purple-500" size={18} />} title="بث مباشر وتفاعلي" description="احضر الحصص مباشرة وتفاعل مع المعلم." />
            <FeatureCard icon={<Users className="text-blue-500" size={18} />} title="نخبة المعلمين" description="مدربون خبراء في القدرات والتحصيلي." />
            <FeatureCard icon={<BarChart className="text-emerald-500" size={18} />} title="تحليلات دقيقة" description="متابعة فورية للأداء ونقاط الضعف." />
            <FeatureCard icon={<Star className="text-amber-500" size={18} />} title="تجربة ممتازة" description="واجهة عربية مريحة ومتجاوبة." />
          </div>

          <div className="lg:w-1/2 space-y-4 text-right">
            <h3 className="text-3xl font-black text-gray-900 mb-2">لماذا منصة المئة؟</h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              نصمم تجربة تعلم تفاعلية تعتمد على البيانات لتسريع تقدمك في القدرات والتحصيلي. كل ما تحتاجه في مكان واحد: محتوى، اختبارات، تحليل، وخطط علاجية.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Badge text="اختبارات تكيفية" />
              <Badge text="خطط علاجية تلقائية" />
              <Badge text="محتوى محدث دورياً" />
              <Badge text="دعم فني سريع" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition">
      <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center mb-3 text-current">
        {icon}
      </div>
      <h4 className="font-bold text-gray-900 mb-1 text-sm">{title}</h4>
      <p className="text-xs text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}

function Badge({ text }: { text: string }) {
  return <span className="text-sm font-bold bg-blue-50 text-blue-700 px-3 py-1 rounded-full border border-blue-100">{text}</span>;
}

function CallToAction() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-10 text-white shadow-xl flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center lg:text-right">
            <h3 className="text-2xl font-black">ابدأ الآن مع منصة المئة</h3>
            <p className="text-blue-100">تجربة مجانية، اختبارات تكيفية، وخطط علاجية فورية</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/dashboard" className="bg-white text-blue-700 font-bold px-6 py-3 rounded-xl hover:bg-blue-50 shadow">
              ابدأ التدريب
            </Link>
            <Link href="/dashboard/tests" className="bg-white/10 text-white font-bold px-6 py-3 rounded-xl border border-white/30 hover:bg-white/20">
              جرّب اختبار ساهر
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
