import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    console.log('🌱 Starting database seed...');

    // إنشاء دورات القدرات والتحصيلي
    const courses = [
      {
        category: 'QUDRAT_QUANT',
        title: 'دورة القدرات الكمي - المستوى المتقدم',
        instructor: 'د. أحمد السالم',
        rating: 4.8,
        studentsCount: 1250,
        lessonsCount: 42,
        duration: 15,
        price: 299,
        originalPrice: 499,
        badge: 'الأكثر مبيعاً',
        order: 1
      },
      {
        category: 'QUDRAT_QUANT',
        title: 'القدرات الكمي - كورس تأسيسي',
        instructor: 'أ. محمد الغامدي',
        rating: 4.9,
        studentsCount: 890,
        lessonsCount: 35,
        duration: 12,
        price: 249,
        originalPrice: 399,
        order: 2
      },
      {
        category: 'QUDRAT_VERBAL',
        title: 'القدرات اللفظي - شامل',
        instructor: 'د. فاطمة العتيبي',
        rating: 4.7,
        studentsCount: 720,
        lessonsCount: 38,
        duration: 14,
        price: 279,
        originalPrice: 449,
        order: 3
      },
      {
        category: 'TAHSILI_MATH',
        title: 'التحصيلي - الرياضيات الشاملة',
        instructor: 'د. خالد المطيري',
        rating: 4.9,
        studentsCount: 1100,
        lessonsCount: 48,
        duration: 18,
        price: 349,
        originalPrice: 549,
        badge: 'جديد',
        order: 4
      },
      {
        category: 'TAHSILI_PHYSICS',
        title: 'التحصيلي - الفيزياء الكاملة',
        instructor: 'د. سارة القحطاني',
        rating: 4.8,
        studentsCount: 950,
        lessonsCount: 45,
        duration: 16,
        price: 329,
        originalPrice: 519,
        order: 5
      },
      {
        category: 'TAHSILI_CHEMISTRY',
        title: 'التحصيلي - الكيمياء المتقدمة',
        instructor: 'أ. نورة الدوسري',
        rating: 4.7,
        studentsCount: 680,
        lessonsCount: 40,
        duration: 15,
        price: 319,
        originalPrice: 499,
        order: 6
      },
      {
        category: 'TAHSILI_BIOLOGY',
        title: 'التحصيلي - الأحياء الشاملة',
        instructor: 'د. عبدالله الشهري',
        rating: 4.8,
        studentsCount: 740,
        lessonsCount: 42,
        duration: 14,
        price: 299,
        originalPrice: 479,
        order: 7
      }
    ];

    await prisma.catalogCourse.deleteMany({});
    await prisma.catalogCourse.createMany({ data: courses });
    console.log(`✅ Seeded ${courses.length} courses`);

    // إنشاء المهارات
    const skills = [
      // القدرات الكمي
      { category: 'QUDRAT_QUANT', title: 'الأعداد والعمليات', progress: 75, lessonsCount: 12, order: 1 },
      { category: 'QUDRAT_QUANT', title: 'الهندسة والقياس', progress: 60, lessonsCount: 15, order: 2 },
      { category: 'QUDRAT_QUANT', title: 'الجبر', progress: 45, lessonsCount: 18, order: 3 },
      { category: 'QUDRAT_QUANT', title: 'الإحصاء والاحتمالات', progress: 80, lessonsCount: 10, order: 4 },
      { category: 'QUDRAT_QUANT', title: 'التناسب والتطبيقات', progress: 55, lessonsCount: 14, order: 5 },

      // القدرات اللفظي
      { category: 'QUDRAT_VERBAL', title: 'التناظر اللفظي', progress: 70, lessonsCount: 16, order: 1 },
      { category: 'QUDRAT_VERBAL', title: 'الخطأ السياقي', progress: 65, lessonsCount: 12, order: 2 },
      { category: 'QUDRAT_VERBAL', title: 'استيعاب المقروء', progress: 50, lessonsCount: 20, order: 3 },
      { category: 'QUDRAT_VERBAL', title: 'إكمال الجمل', progress: 85, lessonsCount: 14, order: 4 },
      { category: 'QUDRAT_VERBAL', title: 'الارتباط والاختلاف', progress: 40, lessonsCount: 10, order: 5 },

      // التحصيلي
      { category: 'TAHSILI_MATH', title: 'الدوال', progress: 60, lessonsCount: 18, order: 1 },
      { category: 'TAHSILI_MATH', title: 'الهندسة التحليلية', progress: 55, lessonsCount: 15, order: 2 },
      { category: 'TAHSILI_PHYSICS', title: 'الحركة', progress: 75, lessonsCount: 14, order: 1 },
      { category: 'TAHSILI_PHYSICS', title: 'القوى', progress: 65, lessonsCount: 16, order: 2 },
      { category: 'TAHSILI_CHEMISTRY', title: 'التفاعلات الكيميائية', progress: 70, lessonsCount: 15, order: 1 },
      { category: 'TAHSILI_BIOLOGY', title: 'الخلية', progress: 80, lessonsCount: 14, order: 1 }
    ];

    await prisma.catalogSkill.deleteMany({});
    await prisma.catalogSkill.createMany({ data: skills });
    console.log(`✅ Seeded ${skills.length} skills`);

    // إنشاء بنوك الأسئلة
    const questionBanks = [
      { category: 'QUDRAT_QUANT', title: 'بنك الأعداد والعمليات', questionsCount: 250, order: 1 },
      { category: 'QUDRAT_QUANT', title: 'بنك الهندسة', questionsCount: 180, order: 2 },
      { category: 'QUDRAT_VERBAL', title: 'بنك التناظر اللفظي', questionsCount: 300, order: 1 },
      { category: 'QUDRAT_VERBAL', title: 'بنك الخطأ السياقي', questionsCount: 200, order: 2 },
      { category: 'TAHSILI_MATH', title: 'بنك أسئلة الدوال', questionsCount: 280, order: 1 },
      { category: 'TAHSILI_PHYSICS', title: 'بنك الحركة والقوى', questionsCount: 260, order: 1 },
      { category: 'TAHSILI_CHEMISTRY', title: 'بنك التفاعلات', questionsCount: 240, order: 1 },
      { category: 'TAHSILI_BIOLOGY', title: 'بنك الخلية والوراثة', questionsCount: 270, order: 1 }
    ];

    await prisma.catalogQuestionBank.deleteMany({});
    await prisma.catalogQuestionBank.createMany({ data: questionBanks });
    console.log(`✅ Seeded ${questionBanks.length} question banks`);

    // إنشاء الاختبارات المحاكية
    const simTests = [
      { category: 'QUDRAT_QUANT', title: 'اختبار تجريبي 1 - القدرات الكمي', questionsCount: 52, duration: 50, order: 1 },
      { category: 'QUDRAT_VERBAL', title: 'اختبار تجريبي 1 - القدرات اللفظي', questionsCount: 68, duration: 60, order: 1 },
      { category: 'TAHSILI_MATH', title: 'اختبار محاكي 1 - الرياضيات', questionsCount: 40, duration: 45, order: 1 },
      { category: 'TAHSILI_PHYSICS', title: 'اختبار محاكي 1 - الفيزياء', questionsCount: 30, duration: 35, order: 1 },
      { category: 'TAHSILI_CHEMISTRY', title: 'اختبار محاكي 1 - الكيمياء', questionsCount: 30, duration: 35, order: 1 },
      { category: 'TAHSILI_BIOLOGY', title: 'اختبار محاكي 1 - الأحياء', questionsCount: 30, duration: 35, order: 1 }
    ];

    await prisma.catalogSimTest.deleteMany({});
    await prisma.catalogSimTest.createMany({ data: simTests });
    console.log(`✅ Seeded ${simTests.length} simulation tests`);

    // إنشاء الباقات
    const packages = [
      {
        type: 'QUDRAT',
        title: 'الباقة الشاملة',
        description: 'تحضير كامل للقدرات الكمي واللفظي',
        price: 499,
        originalPrice: 799,
        features: ['جميع دورات القدرات الكمي واللفظي', 'بنوك أسئلة شاملة (أكثر من 2000 سؤال)', 'اختبارات محاكية مع التصحيح الفوري', 'متابعة مباشرة مع المدربين', 'دعم فني على مدار الساعة'],
        isPopular: true,
        colorClass: 'blue',
        order: 1
      },
      {
        type: 'QUDRAT',
        title: 'باقة التأسيس',
        description: 'الأساسيات للبدء في التحضير',
        price: 249,
        originalPrice: 399,
        features: ['دورة واحدة من اختيارك', 'بنك أسئلة أساسي (500 سؤال)', 'اختبارات تجريبية محدودة', 'دعم فني عبر البريد'],
        colorClass: 'purple',
        order: 2
      },
      {
        type: 'TAHSILI',
        title: 'الباقة الشاملة',
        description: 'تحضير كامل لجميع المواد',
        price: 699,
        originalPrice: 1099,
        features: ['جميع دورات التحصيلي (رياضيات، فيزياء، كيمياء، أحياء)', 'بنوك أسئلة شاملة لكل مادة', 'اختبارات محاكية كاملة', 'خرائط ذهنية وملخصات', 'متابعة شخصية'],
        isPopular: true,
        colorClass: 'blue',
        order: 1
      }
    ];

    await prisma.catalogPackage.deleteMany({});
    await prisma.catalogPackage.createMany({ data: packages });
    console.log(`✅ Seeded ${packages.length} packages`);

    return NextResponse.json({ 
      success: true,
      message: '✅ قاعدة البيانات تم تهيئتها بنجاح',
      counts: {
        courses: courses.length,
        skills: skills.length,
        questionBanks: questionBanks.length,
        simTests: simTests.length,
        packages: packages.length
      }
    });
  } catch (error) {
    console.error('Error seeding database:', error);
    return NextResponse.json({ 
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
