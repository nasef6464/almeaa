# 🎯 خطة العمل التنفيذية - منصة المئة

## 📋 القرار: ماذا نفعل الآن؟

بناءً على التحليل الشامل، إليك الخطة التنفيذية المقترحة:

---

## 🚀 المرحلة الأولى: الإصلاحات العاجلة (3-5 أيام)

### يوم 1: إصلاح صفحة Admin Login

**المشكلة:** `/admin/login` تعطي 404 رغم وجود الملف

**خطوات الحل:**
```bash
# 1. مسح الكاش
rm -rf .next

# 2. إعادة البناء
npm run build

# 3. اختبار محلي
npm run dev

# 4. التحقق من الصفحة
http://localhost:3000/admin/login
```

**الناتج المتوقع:**
- ✅ صفحة Login تعمل
- ✅ Redirect بعد تسجيل الدخول يعمل

---

### يوم 2-3: ملء الصفحات الفارغة

**الصفحات المطلوبة (16 صفحة):**

```typescript
// Template للصفحات الفارغة:
export default function PlaceholderPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="text-6xl mb-4">🚧</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          قريباً
        </h1>
        <p className="text-gray-600">
          هذه الصفحة قيد التطوير
        </p>
        <div className="mt-6">
          <a 
            href="/dashboard"
            className="text-blue-600 hover:underline"
          >
            ← العودة للوحة التحكم
          </a>
        </div>
      </div>
    </div>
  );
}
```

**القائمة:**
- [ ] `/dashboard/admin/questions`
- [ ] `/dashboard/admin/videos`
- [ ] `/dashboard/admin/courses`
- [ ] `/dashboard/trainer`
- [ ] `/dashboard/parent`
- [ ] `/dashboard/parent/children`
- [ ] `/dashboard/parent/payments`
- [ ] `/dashboard/supervisor`
- [ ] `/dashboard/my-courses`
- [ ] `/dashboard/tests`
- [ ] `/dashboard/saher`
- [ ] `/dashboard/users`
- [ ] `/dashboard/reports`

---

### يوم 4-5: تحسين UI العام

**المطلوب:**
1. توحيد التصميم:
   - استخدام نفس الألوان
   - استخدام نفس المسافات
   - استخدام نفس الخطوط

2. إضافة Loading States:
```typescript
// Loading Component
export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );
}
```

3. Error Handling:
```typescript
// Error Component
export function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
      <p className="text-sm">{message}</p>
    </div>
  );
}
```

---

## 🎯 المرحلة الثانية: نظام الاختبارات (أسبوع 1)

### الأهداف:
1. ✅ صفحة بدء الاختبار
2. ✅ مشغل الاختبار التفاعلي
3. ✅ Timer Component
4. ✅ صفحة النتائج

### الملفات المطلوبة:

#### 1. صفحة بدء الاختبار
```typescript
// app/dashboard/tests/[testId]/start/page.tsx
export default async function TestStartPage({ params }) {
  const test = await prisma.test.findUnique({
    where: { id: params.testId },
    include: { questions: true }
  });

  return (
    <div className="max-w-2xl mx-auto py-12">
      <h1 className="text-3xl font-bold mb-4">{test.title}</h1>
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="space-y-4">
          <InfoRow label="عدد الأسئلة" value={test.questions.length} />
          <InfoRow label="المدة" value={test.timeLimit + " دقيقة"} />
          <InfoRow label="الدرجة الكلية" value={test.questions.length} />
        </div>
        
        <button className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg">
          ابدأ الاختبار
        </button>
      </div>
    </div>
  );
}
```

#### 2. مشغل الاختبار
```typescript
// app/dashboard/tests/[testId]/take/page.tsx
'use client';

export default function TestPlayerPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(3600); // 60 min

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Timer */}
      <TestHeader timeLeft={timeLeft} />
      
      {/* Question */}
      <QuestionCard 
        question={questions[currentQuestion]}
        answer={answers[currentQuestion]}
        onChange={(value) => handleAnswer(currentQuestion, value)}
      />
      
      {/* Navigation */}
      <QuestionNavigation
        total={questions.length}
        current={currentQuestion}
        onNavigate={setCurrentQuestion}
      />
      
      {/* Submit Button */}
      <SubmitButton onSubmit={handleSubmit} />
    </div>
  );
}
```

#### 3. Timer Component
```typescript
// components/test/Timer.tsx
export function Timer({ seconds, onExpire }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(seconds);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          onExpire();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;

  return (
    <div className={`text-2xl font-bold ${timeLeft < 300 ? 'text-red-600' : 'text-gray-900'}`}>
      {minutes}:{secs.toString().padStart(2, '0')}
    </div>
  );
}
```

#### 4. صفحة النتائج
```typescript
// app/dashboard/tests/[testId]/results/[attemptId]/page.tsx
export default async function TestResultsPage({ params }) {
  const attempt = await prisma.testAttempt.findUnique({
    where: { id: params.attemptId },
    include: { 
      test: true,
      answers: { include: { question: true } }
    }
  });

  const score = calculateScore(attempt);
  const passed = score >= attempt.test.passingScore;

  return (
    <div className="max-w-4xl mx-auto py-12">
      {/* Score Circle */}
      <ScoreCircle score={score} total={100} />
      
      {/* Pass/Fail Message */}
      {passed ? <PassMessage /> : <FailMessage />}
      
      {/* Summary */}
      <ResultsSummary attempt={attempt} />
      
      {/* Review Answers */}
      <AnswersReview answers={attempt.answers} />
    </div>
  );
}
```

---

## 💰 المرحلة الثالثة: النظام المالي (أسبوع 2-3)

### الخطوات:

#### 1. تثبيت المكتبات
```bash
npm install stripe @stripe/stripe-js
npm install paymob
npm install tap-payments
```

#### 2. إعداد Stripe
```typescript
// lib/stripe.ts
import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

// app/api/payment/create-checkout/route.ts
export async function POST(req: Request) {
  const { courseId, userId } = await req.json();
  
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      price_data: {
        currency: 'usd',
        product_data: { name: course.title },
        unit_amount: course.price * 100,
      },
      quantity: 1,
    }],
    mode: 'payment',
    success_url: `${process.env.NEXTAUTH_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXTAUTH_URL}/payment/cancelled`,
  });

  return Response.json({ sessionId: session.id });
}
```

#### 3. صفحة Pricing
```typescript
// app/pricing/page.tsx
export default function PricingPage() {
  const plans = [
    {
      name: 'الباقة الشهرية',
      price: 99,
      features: ['جميع الدورات', 'اختبارات غير محدودة', 'دعم فني']
    },
    // ...
  ];

  return (
    <div className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12">
          اختر الباقة المناسبة
        </h1>
        
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map(plan => (
            <PricingCard key={plan.name} {...plan} />
          ))}
        </div>
      </div>
    </div>
  );
}
```

#### 4. نظام الكوبونات
```typescript
// app/api/coupons/validate/route.ts
export async function POST(req: Request) {
  const { code } = await req.json();
  
  const coupon = await prisma.coupon.findUnique({
    where: { code }
  });

  if (!coupon || coupon.expiresAt < new Date()) {
    return Response.json({ valid: false, error: 'كود غير صالح' });
  }

  if (coupon.usedCount >= coupon.usageLimit) {
    return Response.json({ valid: false, error: 'تم استخدام الكود' });
  }

  return Response.json({ 
    valid: true, 
    discount: coupon.discountValue,
    type: coupon.discountType
  });
}
```

---

## 🧠 المرحلة الرابعة: محرك "ساهر" (أسبوع 4)

### الخوارزمية الأساسية:

```typescript
// services/saher-engine.ts

export class SaherEngine {
  /**
   * حساب نسبة الإتقان للمهارة
   */
  static async calculateMastery(
    studentId: string, 
    skillId: string
  ): Promise<number> {
    const attempts = await prisma.testAttempt.findMany({
      where: {
        studentId,
        test: {
          questions: {
            some: { question: { skillId } }
          }
        }
      },
      include: { answers: true }
    });

    if (attempts.length === 0) return 0;

    // الخوارزمية:
    // 1. حساب نسبة الإجابات الصحيحة
    let totalQuestions = 0;
    let correctAnswers = 0;

    attempts.forEach(attempt => {
      attempt.answers.forEach(answer => {
        totalQuestions++;
        if (answer.isCorrect) correctAnswers++;
      });
    });

    const accuracy = (correctAnswers / totalQuestions) * 100;

    // 2. عامل التحسن (أحدث 3 محاولات)
    const recentAttempts = attempts.slice(-3);
    const improvement = this.calculateImprovement(recentAttempts);

    // 3. النسبة النهائية
    const mastery = (accuracy * 0.7) + (improvement * 0.3);

    // 4. حفظ في قاعدة البيانات
    await prisma.studentSkillMastery.upsert({
      where: {
        studentId_skillId: { studentId, skillId }
      },
      update: { masteryPercentage: mastery },
      create: { studentId, skillId, masteryPercentage: mastery }
    });

    return mastery;
  }

  /**
   * اكتشاف نقاط الضعف
   */
  static async detectWeakSkills(studentId: string): Promise<Skill[]> {
    const masteries = await prisma.studentSkillMastery.findMany({
      where: { 
        studentId,
        masteryPercentage: { lt: 60 } // أقل من 60%
      },
      include: { skill: true },
      orderBy: { masteryPercentage: 'asc' }
    });

    return masteries.map(m => m.skill);
  }

  /**
   * توليد خطة علاجية
   */
  static async generateRecoveryPlan(
    studentId: string,
    weakSkills: string[]
  ): Promise<RecoveryPlan> {
    // 1. إنشاء الخطة
    const plan = await prisma.recoveryPlan.create({
      data: {
        studentId,
        startDate: new Date(),
        targetDate: addDays(new Date(), 30), // شهر واحد
        status: 'ACTIVE'
      }
    });

    // 2. إضافة المهارات
    for (const skillId of weakSkills) {
      await prisma.recoveryPlanSkill.create({
        data: {
          planId: plan.id,
          skillId,
          targetMastery: 80, // الهدف: 80%
          currentMastery: await this.getCurrentMastery(studentId, skillId)
        }
      });

      // 3. إنشاء اختبار تعويضي
      await this.createRecoveryTest(studentId, skillId);
    }

    return plan;
  }

  /**
   * اختيار أسئلة تكيفية
   */
  static async selectAdaptiveQuestions(
    studentId: string,
    skillId: string,
    count: number
  ): Promise<Question[]> {
    const mastery = await this.getCurrentMastery(studentId, skillId);

    // تحديد مستوى الصعوبة المناسب
    let difficulty: DifficultyLevel;
    if (mastery < 40) difficulty = 'BEGINNER';
    else if (mastery < 70) difficulty = 'INTERMEDIATE';
    else difficulty = 'ADVANCED';

    // جلب الأسئلة
    return prisma.question.findMany({
      where: { skillId, difficultyLevel: difficulty },
      take: count,
      orderBy: { createdAt: 'desc' }
    });
  }
}
```

---

## 🎓 المرحلة الخامسة: لوحة المعلم (أسبوع 5-6)

### المكونات الأساسية:

#### 1. صفحة إنشاء دورة
```typescript
// app/dashboard/trainer/courses/new/page.tsx
'use client';

export default function CreateCoursePage() {
  const [course, setCourse] = useState({
    title: '',
    description: '',
    price: 0,
    thumbnail: null
  });

  return (
    <form onSubmit={handleSubmit}>
      <Input label="عنوان الدورة" value={course.title} />
      <Textarea label="الوصف" value={course.description} />
      <Input type="number" label="السعر" value={course.price} />
      <FileUpload label="صورة الدورة" onChange={handleThumbnail} />
      
      <Button type="submit">إنشاء الدورة</Button>
    </form>
  );
}
```

#### 2. رفع الفيديوهات
```typescript
// components/course/VideoUploader.tsx
export function VideoUploader({ courseId }: Props) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (file: File) => {
    setUploading(true);

    // 1. رفع على Cloudflare Stream
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/videos/upload', {
      method: 'POST',
      body: formData
    });

    const { videoId, url } = await response.json();

    // 2. حفظ في قاعدة البيانات
    await fetch('/api/courses/' + courseId + '/videos', {
      method: 'POST',
      body: JSON.stringify({ 
        title: file.name,
        url,
        videoId 
      })
    });

    setUploading(false);
  };

  return (
    <Dropzone onDrop={handleUpload}>
      {uploading ? <LoadingSpinner /> : <UploadIcon />}
    </Dropzone>
  );
}
```

#### 3. المحفظة المالية
```typescript
// app/dashboard/trainer/wallet/page.tsx
export default async function WalletPage() {
  const trainer = await getTrainer();
  
  const earnings = await prisma.payment.aggregate({
    where: { 
      course: { trainerId: trainer.id },
      status: 'COMPLETED'
    },
    _sum: { amount: true }
  });

  const balance = earnings._sum.amount * (trainer.revenueShare / 100);

  return (
    <div>
      <BalanceCard balance={balance} />
      <WithdrawButton />
      <TransactionHistory trainerId={trainer.id} />
    </div>
  );
}
```

---

## 📦 المرحلة السادسة: CMS الكامل (أسبوع 7)

### لوحة إدارة المحتوى:

```typescript
// app/dashboard/admin/content/page.tsx
export default function ContentManagementPage() {
  return (
    <div>
      <Header>
        <Button onClick={() => setShowModal(true)}>
          إضافة وحدة جديدة
        </Button>
      </Header>

      <ModulesList>
        {modules.map(module => (
          <ModuleCard
            key={module.id}
            {...module}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onToggle={handleToggle}
          />
        ))}
      </ModulesList>

      <CreateModuleModal 
        show={showModal}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
}
```

---

## 🎬 المرحلة السابعة: مشغل الفيديو (أسبوع 8)

```typescript
// components/video/VideoPlayer.tsx
import Plyr from 'plyr-react';

export function VideoPlayer({ videoUrl, onProgress }: Props) {
  const playerRef = useRef<Plyr>(null);

  const handleTimeUpdate = (event: PlyrEvent) => {
    const currentTime = event.detail.plyr.currentTime;
    const duration = event.detail.plyr.duration;
    const progress = (currentTime / duration) * 100;

    // حفظ التقدم كل 10 ثواني
    if (Math.floor(currentTime) % 10 === 0) {
      onProgress(progress);
    }
  };

  return (
    <Plyr
      ref={playerRef}
      source={{ type: 'video', sources: [{ src: videoUrl }] }}
      options={{
        controls: ['play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen'],
        speed: { selected: 1, options: [0.5, 0.75, 1, 1.25, 1.5, 2] }
      }}
      onTimeUpdate={handleTimeUpdate}
    />
  );
}
```

---

## ✅ Checklist النهائية

### Week 1:
- [ ] إصلاح `/admin/login`
- [ ] ملء الصفحات الفارغة
- [ ] تحسين UI
- [ ] بدء نظام الاختبارات

### Week 2-3:
- [ ] إكمال نظام الاختبارات
- [ ] تكامل Stripe
- [ ] تكامل Paymob
- [ ] صفحة Pricing
- [ ] نظام الكوبونات

### Week 4:
- [ ] محرك "ساهر" الأساسي
- [ ] تتبع الإتقان
- [ ] اكتشاف نقاط الضعف
- [ ] الخطط العلاجية

### Week 5-6:
- [ ] لوحة المعلم
- [ ] رفع الفيديوهات
- [ ] المحفظة المالية
- [ ] إدارة الطلاب

### Week 7:
- [ ] CMS الكامل
- [ ] رفع الملفات
- [ ] إدارة المحتوى

### Week 8:
- [ ] مشغل الفيديو
- [ ] Bookmarks
- [ ] تتبع التقدم

---

## 🎯 القرار: ماذا نبدأ؟

**الخيار 1: البدء بالإصلاحات الفورية (موصى به)**
```
✅ إصلاح admin/login
✅ ملء الصفحات
✅ تحسين UI
```

**الخيار 2: البدء بنظام الاختبارات (لو السابق جاهز)**
```
✅ Test Player
✅ Timer
✅ Results Page
```

**الخيار 3: البدء بالنظام المالي (لو الاختبارات جاهزة)**
```
✅ Stripe Integration
✅ Pricing Page
✅ Checkout Flow
```

---

**🚀 هل نبدأ بالخيار 1 الآن؟**

