/**
 * Database Seed Script
 * 
 * Run with: node prisma/seed-catalog.mjs
 */

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...\n');

  // Create super admin user
  const superAdminPassword = await bcrypt.hash('superadmin123', 10);
  const superAdmin = await prisma.user.upsert({
    where: { email: 'superadmin@example.com' },
    update: {},
    create: {
      email: 'superadmin@example.com',
      name: 'Super Admin',
      password: superAdminPassword,
      role: 'SUPER_ADMIN',
    },
  });
  console.log('✅ Created super admin:', superAdmin.email);

  // Create student user
  const studentPassword = await bcrypt.hash('student123', 10);
  const student = await prisma.user.upsert({
    where: { email: 'student@example.com' },
    update: {},
    create: {
      email: 'student@example.com',
      name: 'Test Student',
      password: studentPassword,
      role: 'STUDENT',
    },
  });
  console.log('✅ Created student:', student.email);

  // =============================================================================
  // Seed Catalog Data (Qudrat & Tahsili)
  // =============================================================================

  console.log('\n📚 Seeding catalog courses...');
  
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

  for (const course of courses) {
    await prisma.catalogCourse.create({ data: course });
  }
  console.log(`✅ Seeded ${courses.length} courses`);

  // Seed skills
  console.log('🎯 Seeding catalog skills...');

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

    // التحصيلي - الرياضيات
    { category: 'TAHSILI_MATH', title: 'الدوال', progress: 60, lessonsCount: 18, order: 1 },
    { category: 'TAHSILI_MATH', title: 'الهندسة التحليلية', progress: 55, lessonsCount: 15, order: 2 },
    { category: 'TAHSILI_MATH', title: 'حساب المثلثات', progress: 70, lessonsCount: 16, order: 3 },
    { category: 'TAHSILI_MATH', title: 'المتجهات', progress: 45, lessonsCount: 12, order: 4 },
    { category: 'TAHSILI_MATH', title: 'التفاضل والتكامل', progress: 35, lessonsCount: 20, order: 5 },

    // التحصيلي - الفيزياء
    { category: 'TAHSILI_PHYSICS', title: 'الحركة', progress: 75, lessonsCount: 14, order: 1 },
    { category: 'TAHSILI_PHYSICS', title: 'القوى', progress: 65, lessonsCount: 16, order: 2 },
    { category: 'TAHSILI_PHYSICS', title: 'الطاقة', progress: 80, lessonsCount: 12, order: 3 },
    { category: 'TAHSILI_PHYSICS', title: 'الكهرباء', progress: 50, lessonsCount: 18, order: 4 },
    { category: 'TAHSILI_PHYSICS', title: 'المغناطيسية', progress: 40, lessonsCount: 10, order: 5 },

    // التحصيلي - الكيمياء
    { category: 'TAHSILI_CHEMISTRY', title: 'التفاعلات الكيميائية', progress: 70, lessonsCount: 15, order: 1 },
    { category: 'TAHSILI_CHEMISTRY', title: 'الروابط الكيميائية', progress: 60, lessonsCount: 14, order: 2 },
    { category: 'TAHSILI_CHEMISTRY', title: 'الحموض والقواعد', progress: 55, lessonsCount: 12, order: 3 },
    { category: 'TAHSILI_CHEMISTRY', title: 'الكيمياء العضوية', progress: 45, lessonsCount: 18, order: 4 },
    { category: 'TAHSILI_CHEMISTRY', title: 'الكيمياء الكهربائية', progress: 65, lessonsCount: 11, order: 5 },

    // التحصيلي - الأحياء
    { category: 'TAHSILI_BIOLOGY', title: 'الخلية', progress: 80, lessonsCount: 14, order: 1 },
    { category: 'TAHSILI_BIOLOGY', title: 'الوراثة', progress: 70, lessonsCount: 16, order: 2 },
    { category: 'TAHSILI_BIOLOGY', title: 'التنوع الحيوي', progress: 60, lessonsCount: 12, order: 3 },
    { category: 'TAHSILI_BIOLOGY', title: 'أجهزة الجسم', progress: 50, lessonsCount: 18, order: 4 },
    { category: 'TAHSILI_BIOLOGY', title: 'البيئة', progress: 75, lessonsCount: 10, order: 5 }
  ];

  for (const skill of skills) {
    await prisma.catalogSkill.create({ data: skill });
  }
  console.log(`✅ Seeded ${skills.length} skills`);

  // Seed question banks
  console.log('📝 Seeding question banks...');

  const questionBanks = [
    { category: 'QUDRAT_QUANT', title: 'بنك الأعداد والعمليات', questionsCount: 250, order: 1 },
    { category: 'QUDRAT_QUANT', title: 'بنك الهندسة', questionsCount: 180, order: 2 },
    { category: 'QUDRAT_QUANT', title: 'بنك الجبر', questionsCount: 220, order: 3 },
    { category: 'QUDRAT_QUANT', title: 'بنك الإحصاء', questionsCount: 150, order: 4 },
    
    { category: 'QUDRAT_VERBAL', title: 'بنك التناظر اللفظي', questionsCount: 300, order: 1 },
    { category: 'QUDRAT_VERBAL', title: 'بنك الخطأ السياقي', questionsCount: 200, order: 2 },
    { category: 'QUDRAT_VERBAL', title: 'بنك استيعاب المقروء', questionsCount: 180, order: 3 },
    { category: 'QUDRAT_VERBAL', title: 'بنك إكمال الجمل', questionsCount: 220, order: 4 },

    { category: 'TAHSILI_MATH', title: 'بنك أسئلة الدوال', questionsCount: 280, order: 1 },
    { category: 'TAHSILI_MATH', title: 'بنك الهندسة التحليلية', questionsCount: 240, order: 2 },
    { category: 'TAHSILI_MATH', title: 'بنك حساب المثلثات', questionsCount: 200, order: 3 },

    { category: 'TAHSILI_PHYSICS', title: 'بنك الحركة والقوى', questionsCount: 260, order: 1 },
    { category: 'TAHSILI_PHYSICS', title: 'بنك الطاقة', questionsCount: 180, order: 2 },
    { category: 'TAHSILI_PHYSICS', title: 'بنك الكهرباء والمغناطيسية', questionsCount: 220, order: 3 },

    { category: 'TAHSILI_CHEMISTRY', title: 'بنك التفاعلات', questionsCount: 240, order: 1 },
    { category: 'TAHSILI_CHEMISTRY', title: 'بنك الكيمياء العضوية', questionsCount: 200, order: 2 },

    { category: 'TAHSILI_BIOLOGY', title: 'بنك الخلية والوراثة', questionsCount: 270, order: 1 },
    { category: 'TAHSILI_BIOLOGY', title: 'بنك أجهزة الجسم', questionsCount: 230, order: 2 }
  ];

  for (const bank of questionBanks) {
    await prisma.catalogQuestionBank.create({ data: bank });
  }
  console.log(`✅ Seeded ${questionBanks.length} question banks`);

  // Seed simulation tests
  console.log('🎓 Seeding simulation tests...');

  const simTests = [
    { category: 'QUDRAT_QUANT', title: 'اختبار تجريبي 1 - القدرات الكمي', questionsCount: 52, duration: 50, order: 1 },
    { category: 'QUDRAT_QUANT', title: 'اختبار تجريبي 2 - القدرات الكمي', questionsCount: 52, duration: 50, order: 2 },
    { category: 'QUDRAT_QUANT', title: 'اختبار تجريبي 3 - القدرات الكمي', questionsCount: 52, duration: 50, order: 3 },
    
    { category: 'QUDRAT_VERBAL', title: 'اختبار تجريبي 1 - القدرات اللفظي', questionsCount: 68, duration: 60, order: 1 },
    { category: 'QUDRAT_VERBAL', title: 'اختبار تجريبي 2 - القدرات اللفظي', questionsCount: 68, duration: 60, order: 2 },
    { category: 'QUDRAT_VERBAL', title: 'اختبار تجريبي 3 - القدرات اللفظي', questionsCount: 68, duration: 60, order: 3 },

    { category: 'TAHSILI_MATH', title: 'اختبار محاكي 1 - الرياضيات', questionsCount: 40, duration: 45, order: 1 },
    { category: 'TAHSILI_MATH', title: 'اختبار محاكي 2 - الرياضيات', questionsCount: 40, duration: 45, order: 2 },
    { category: 'TAHSILI_MATH', title: 'اختبار محاكي 3 - الرياضيات', questionsCount: 40, duration: 45, order: 3 },

    { category: 'TAHSILI_PHYSICS', title: 'اختبار محاكي 1 - الفيزياء', questionsCount: 30, duration: 35, order: 1 },
    { category: 'TAHSILI_PHYSICS', title: 'اختبار محاكي 2 - الفيزياء', questionsCount: 30, duration: 35, order: 2 },

    { category: 'TAHSILI_CHEMISTRY', title: 'اختبار محاكي 1 - الكيمياء', questionsCount: 30, duration: 35, order: 1 },
    { category: 'TAHSILI_CHEMISTRY', title: 'اختبار محاكي 2 - الكيمياء', questionsCount: 30, duration: 35, order: 2 },

    { category: 'TAHSILI_BIOLOGY', title: 'اختبار محاكي 1 - الأحياء', questionsCount: 30, duration: 35, order: 1 },
    { category: 'TAHSILI_BIOLOGY', title: 'اختبار محاكي 2 - الأحياء', questionsCount: 30, duration: 35, order: 2 }
  ];

  for (const test of simTests) {
    await prisma.catalogSimTest.create({ data: test });
  }
  console.log(`✅ Seeded ${simTests.length} simulation tests`);

  // Seed packages
  console.log('📦 Seeding packages...');

  const packages = [
    {
      type: 'QUDRAT',
      title: 'الباقة الشاملة',
      description: 'تحضير كامل للقدرات الكمي واللفظي',
      price: 499,
      originalPrice: 799,
      features: JSON.stringify([
        'جميع دورات القدرات الكمي واللفظي',
        'بنوك أسئلة شاملة (أكثر من 2000 سؤال)',
        'اختبارات محاكية مع التصحيح الفوري',
        'متابعة مباشرة مع المدربين',
        'دعم فني على مدار الساعة'
      ]),
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
      features: JSON.stringify([
        'دورة واحدة من اختيارك',
        'بنك أسئلة أساسي (500 سؤال)',
        'اختبارات تجريبية محدودة',
        'دعم فني عبر البريد'
      ]),
      colorClass: 'purple',
      order: 2
    },
    {
      type: 'QUDRAT',
      title: 'باقة المحاكي',
      description: 'اختبارات محاكية فقط',
      price: 149,
      originalPrice: 249,
      features: JSON.stringify([
        'جميع الاختبارات المحاكية',
        'تصحيح فوري مع الشرح',
        'إحصائيات وتقارير مفصلة',
        'صلاحية 3 أشهر'
      ]),
      colorClass: 'emerald',
      order: 3
    },
    {
      type: 'TAHSILI',
      title: 'الباقة الشاملة',
      description: 'تحضير كامل لجميع المواد',
      price: 699,
      originalPrice: 1099,
      features: JSON.stringify([
        'جميع دورات التحصيلي (رياضيات، فيزياء، كيمياء، أحياء)',
        'بنوك أسئلة شاملة لكل مادة',
        'اختبارات محاكية كاملة',
        'خرائط ذهنية وملخصات',
        'متابعة شخصية'
      ]),
      isPopular: true,
      colorClass: 'blue',
      order: 1
    },
    {
      type: 'TAHSILI',
      title: 'باقة مادتين',
      description: 'اختر مادتين من اختيارك',
      price: 399,
      originalPrice: 599,
      features: JSON.stringify([
        'دورتان من اختيارك',
        'بنوك أسئلة للمادتين',
        'اختبارات تجريبية محدودة',
        'ملخصات مصورة'
      ]),
      colorClass: 'purple',
      order: 2
    },
    {
      type: 'TAHSILI',
      title: 'باقة المراجعة النهائية',
      description: 'مراجعة سريعة قبل الاختبار',
      price: 199,
      originalPrice: 349,
      features: JSON.stringify([
        'مراجعات مكثفة لجميع المواد',
        'أهم الأسئلة المتوقعة',
        'اختبار نهائي محاكي',
        'صلاحية شهر واحد'
      ]),
      colorClass: 'emerald',
      order: 3
    }
  ];

  for (const pkg of packages) {
    await prisma.catalogPackage.create({ data: pkg });
  }
  console.log(`✅ Seeded ${packages.length} packages`);

  console.log('\n🎉 Database seeded successfully!');
  console.log('\n📝 Test Credentials:');
  console.log('   Super Admin:  superadmin@example.com / superadmin123');
  console.log('   Student:      student@example.com / student123');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
