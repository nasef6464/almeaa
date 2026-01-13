// Simple seed script using direct Prisma
import 'dotenv/config';

async function main() {
  const { PrismaClient } = await import('@prisma/client');
  const prisma = new PrismaClient();

  console.log('🌱 Starting database seed...\n');

  try {
    // إنشاء الدورات
    console.log('📚 Seeding courses...');
    await prisma.catalogCourse.deleteMany({});
    
    const courses = [
      { category: 'QUDRAT_QUANT', title: 'دورة القدرات الكمي - المستوى المتقدم', instructor: 'د. أحمد السالم', rating: 4.8, studentsCount: 1250, lessonsCount: 42, duration: 15, price: 299, originalPrice: 499, badge: 'الأكثر مبيعاً', order: 1 },
      { category: 'QUDRAT_QUANT', title: 'القدرات الكمي - كورس تأسيسي', instructor: 'أ. محمد الغامدي', rating: 4.9, studentsCount: 890, lessonsCount: 35, duration: 12, price: 249, originalPrice: 399, order: 2 },
      { category: 'QUDRAT_VERBAL', title: 'القدرات اللفظي - شامل', instructor: 'د. فاطمة العتيبي', rating: 4.7, studentsCount: 720, lessonsCount: 38, duration: 14, price: 279, originalPrice: 449, order: 3 },
      { category: 'TAHSILI_MATH', title: 'التحصيلي - الرياضيات الشاملة', instructor: 'د. خالد المطيري', rating: 4.9, studentsCount: 1100, lessonsCount: 48, duration: 18, price: 349, originalPrice: 549, badge: 'جديد', order: 4 },
      { category: 'TAHSILI_PHYSICS', title: 'التحصيلي - الفيزياء الكاملة', instructor: 'د. سارة القحطاني', rating: 4.8, studentsCount: 950, lessonsCount: 45, duration: 16, price: 329, originalPrice: 519, order: 5 },
      { category: 'TAHSILI_CHEMISTRY', title: 'التحصيلي - الكيمياء المتقدمة', instructor: 'أ. نورة الدوسري', rating: 4.7, studentsCount: 680, lessonsCount: 40, duration: 15, price: 319, originalPrice: 499, order: 6 },
      { category: 'TAHSILI_BIOLOGY', title: 'التحصيلي - الأحياء الشاملة', instructor: 'د. عبدالله الشهري', rating: 4.8, studentsCount: 740, lessonsCount: 42, duration: 14, price: 299, originalPrice: 479, order: 7 }
    ];
    
    await prisma.catalogCourse.createMany({ data: courses });
    console.log(`✅ Seeded ${courses.length} courses`);

    // إنشاء المهارات
    console.log('🎯 Seeding skills...');
    await prisma.catalogSkill.deleteMany({});
    
    const skills = [
      { category: 'QUDRAT_QUANT', title: 'الأعداد والعمليات', progress: 75, lessonsCount: 12, order: 1 },
      { category: 'QUDRAT_QUANT', title: 'الهندسة والقياس', progress: 60, lessonsCount: 15, order: 2 },
      { category: 'QUDRAT_VERBAL', title: 'التناظر اللفظي', progress: 70, lessonsCount: 16, order: 1 },
      { category: 'QUDRAT_VERBAL', title: 'الخطأ السياقي', progress: 65, lessonsCount: 12, order: 2 },
      { category: 'TAHSILI_MATH', title: 'الدوال', progress: 60, lessonsCount: 18, order: 1 },
      { category: 'TAHSILI_PHYSICS', title: 'الحركة', progress: 75, lessonsCount: 14, order: 1 },
      { category: 'TAHSILI_CHEMISTRY', title: 'التفاعلات الكيميائية', progress: 70, lessonsCount: 15, order: 1 },
      { category: 'TAHSILI_BIOLOGY', title: 'الخلية', progress: 80, lessonsCount: 14, order: 1 }
    ];
    
    await prisma.catalogSkill.createMany({ data: skills });
    console.log(`✅ Seeded ${skills.length} skills`);

    // إنشاء بنوك الأسئلة
    console.log('📝 Seeding question banks...');
    await prisma.catalogQuestionBank.deleteMany({});
    
    const banks = [
      { category: 'QUDRAT_QUANT', title: 'بنك الأعداد والعمليات', questionsCount: 250, order: 1 },
      { category: 'QUDRAT_VERBAL', title: 'بنك التناظر اللفظي', questionsCount: 300, order: 1 },
      { category: 'TAHSILI_MATH', title: 'بنك أسئلة الدوال', questionsCount: 280, order: 1 },
      { category: 'TAHSILI_PHYSICS', title: 'بنك الحركة والقوى', questionsCount: 260, order: 1 }
    ];
    
    await prisma.catalogQuestionBank.createMany({ data: banks });
    console.log(`✅ Seeded ${banks.length} question banks`);

    // إنشاء الاختبارات
    console.log('🎓 Seeding simulation tests...');
    await prisma.catalogSimTest.deleteMany({});
    
    const tests = [
      { category: 'QUDRAT_QUANT', title: 'اختبار تجريبي 1 - القدرات الكمي', questionsCount: 52, duration: 50, order: 1 },
      { category: 'QUDRAT_VERBAL', title: 'اختبار تجريبي 1 - القدرات اللفظي', questionsCount: 68, duration: 60, order: 1 },
      { category: 'TAHSILI_MATH', title: 'اختبار محاكي 1 - الرياضيات', questionsCount: 40, duration: 45, order: 1 }
    ];
    
    await prisma.catalogSimTest.createMany({ data: tests });
    console.log(`✅ Seeded ${tests.length} simulation tests`);

    // إنشاء الباقات
    console.log('📦 Seeding packages...');
    await prisma.catalogPackage.deleteMany({});
    
    const packages = [
      { type: 'QUDRAT', title: 'الباقة الشاملة', description: 'تحضير كامل للقدرات', price: 499, originalPrice: 799, features: ['جميع دورات القدرات', 'بنوك أسئلة شاملة', 'اختبارات محاكية', 'متابعة مباشرة', 'دعم فني'], isPopular: true, colorClass: 'blue', order: 1 },
      { type: 'QUDRAT', title: 'باقة التأسيس', description: 'الأساسيات للبدء', price: 249, originalPrice: 399, features: ['دورة واحدة', 'بنك أسئلة أساسي', 'اختبارات محدودة'], colorClass: 'purple', order: 2 },
      { type: 'TAHSILI', title: 'الباقة الشاملة', description: 'تحضير كامل لجميع المواد', price: 699, originalPrice: 1099, features: ['جميع دورات التحصيلي', 'بنوك شاملة', 'خرائط ذهنية'], isPopular: true, colorClass: 'blue', order: 1 }
    ];
    
    await prisma.catalogPackage.createMany({ data: packages });
    console.log(`✅ Seeded ${packages.length} packages`);

    console.log('\n🎉 Database seeded successfully!');
  } finally {
    await prisma.$disconnect();
  }
}

main().catch(console.error);
