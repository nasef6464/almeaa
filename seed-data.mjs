import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 بدء إضافة البيانات...\n');

  try {
    // حذف البيانات القديمة
    await prisma.catalogPackage.deleteMany({});
    await prisma.catalogSimTest.deleteMany({});
    await prisma.catalogQuestionBank.deleteMany({});
    await prisma.catalogVideoLesson.deleteMany({});
    await prisma.catalogSkill.deleteMany({});
    await prisma.catalogCourse.deleteMany({});

    // الدورات
    console.log('📚 إضافة الدورات...');
    const courses = await prisma.catalogCourse.createMany({
      data: [
        { category: 'QUDRAT_QUANT', title: 'دورة القدرات الكمي - المستوى المتقدم', instructor: 'د. أحمد السالم', rating: 4.8, studentsCount: 1250, lessonsCount: 42, duration: 15, price: 299, originalPrice: 499, badge: 'الأكثر مبيعاً', order: 1 },
        { category: 'QUDRAT_QUANT', title: 'القدرات الكمي - كورس تأسيسي', instructor: 'أ. محمد الغامدي', rating: 4.9, studentsCount: 890, lessonsCount: 35, duration: 12, price: 249, originalPrice: 399, order: 2 },
        { category: 'QUDRAT_VERBAL', title: 'القدرات اللفظي - شامل', instructor: 'د. فاطمة العتيبي', rating: 4.7, studentsCount: 720, lessonsCount: 38, duration: 14, price: 279, originalPrice: 449, order: 3 },
        { category: 'TAHSILI_MATH', title: 'التحصيلي - الرياضيات الشاملة', instructor: 'د. خالد المطيري', rating: 4.9, studentsCount: 1100, lessonsCount: 48, duration: 18, price: 349, originalPrice: 549, badge: 'جديد', order: 4 },
        { category: 'TAHSILI_PHYSICS', title: 'التحصيلي - الفيزياء الكاملة', instructor: 'د. سارة القحطاني', rating: 4.8, studentsCount: 950, lessonsCount: 45, duration: 16, price: 329, originalPrice: 519, order: 5 },
        { category: 'TAHSILI_CHEMISTRY', title: 'التحصيلي - الكيمياء المتقدمة', instructor: 'أ. نورة الدوسري', rating: 4.7, studentsCount: 680, lessonsCount: 40, duration: 15, price: 319, originalPrice: 499, order: 6 },
        { category: 'TAHSILI_BIOLOGY', title: 'التحصيلي - الأحياء الشاملة', instructor: 'د. عبدالله الشهري', rating: 4.8, studentsCount: 740, lessonsCount: 42, duration: 14, price: 299, originalPrice: 479, order: 7 }
      ]
    });
    console.log(`✅ تم إضافة ${courses.count} دورة`);

    // المهارات
    console.log('🎯 إضافة المهارات...');
    const createdSkills = [];
    
    const skillsData = [
      { category: 'QUDRAT_QUANT', title: 'الأعداد والعمليات', progress: 75, lessonsCount: 12, order: 1 },
      { category: 'QUDRAT_QUANT', title: 'الهندسة والقياس', progress: 60, lessonsCount: 15, order: 2 },
      { category: 'QUDRAT_QUANT', title: 'الجبر', progress: 45, lessonsCount: 18, order: 3 },
      { category: 'QUDRAT_VERBAL', title: 'التناظر اللفظي', progress: 70, lessonsCount: 16, order: 1 },
      { category: 'QUDRAT_VERBAL', title: 'الخطأ السياقي', progress: 65, lessonsCount: 12, order: 2 },
      { category: 'QUDRAT_VERBAL', title: 'استيعاب المقروء', progress: 50, lessonsCount: 20, order: 3 },
      { category: 'TAHSILI_MATH', title: 'الدوال', progress: 60, lessonsCount: 18, order: 1 },
      { category: 'TAHSILI_MATH', title: 'الهندسة التحليلية', progress: 55, lessonsCount: 15, order: 2 },
      { category: 'TAHSILI_PHYSICS', title: 'الحركة', progress: 75, lessonsCount: 14, order: 1 },
      { category: 'TAHSILI_PHYSICS', title: 'القوى والطاقة', progress: 65, lessonsCount: 16, order: 2 },
      { category: 'TAHSILI_CHEMISTRY', title: 'التفاعلات الكيميائية', progress: 70, lessonsCount: 15, order: 1 },
      { category: 'TAHSILI_CHEMISTRY', title: 'الكيمياء العضوية', progress: 60, lessonsCount: 14, order: 2 },
      { category: 'TAHSILI_BIOLOGY', title: 'الخلية والوراثة', progress: 80, lessonsCount: 14, order: 1 },
      { category: 'TAHSILI_BIOLOGY', title: 'أجهزة الجسم', progress: 70, lessonsCount: 16, order: 2 }
    ];

    for (const skillData of skillsData) {
      const skill = await prisma.catalogSkill.create({ data: skillData });
      createdSkills.push(skill);
    }
    console.log(`✅ تم إضافة ${createdSkills.length} مهارة`);

    // دروس الفيديو
    console.log('🎬 إضافة دروس الفيديو...');
    let videoCount = 0;
    for (const skill of createdSkills.slice(0, 8)) {
      const lessonsToCreate = Math.min(skill.lessonsCount, 5);
      for (let i = 1; i <= lessonsToCreate; i++) {
        await prisma.catalogVideoLesson.create({
          data: {
            skillId: skill.id,
            title: `الدرس ${i}: ${skill.title}`,
            duration: `${Math.floor(Math.random() * 20) + 5}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
            isLocked: i > 2,
            order: i
          }
        });
        videoCount++;
      }
    }
    console.log(`✅ تم إضافة ${videoCount} درس فيديو`);

    // بنوك الأسئلة
    console.log('📝 إضافة بنوك الأسئلة...');
    const banks = await prisma.catalogQuestionBank.createMany({
      data: [
        { category: 'QUDRAT_QUANT', title: 'بنك الأعداد والعمليات', questionsCount: 250, order: 1 },
        { category: 'QUDRAT_QUANT', title: 'بنك الهندسة', questionsCount: 180, order: 2 },
        { category: 'QUDRAT_QUANT', title: 'بنك الجبر', questionsCount: 220, order: 3 },
        { category: 'QUDRAT_VERBAL', title: 'بنك التناظر اللفظي', questionsCount: 300, order: 1 },
        { category: 'QUDRAT_VERBAL', title: 'بنك الخطأ السياقي', questionsCount: 200, order: 2 },
        { category: 'QUDRAT_VERBAL', title: 'بنك استيعاب المقروء', questionsCount: 180, order: 3 },
        { category: 'TAHSILI_MATH', title: 'بنك أسئلة الدوال', questionsCount: 280, order: 1 },
        { category: 'TAHSILI_MATH', title: 'بنك الهندسة التحليلية', questionsCount: 240, order: 2 },
        { category: 'TAHSILI_PHYSICS', title: 'بنك الحركة والقوى', questionsCount: 260, order: 1 },
        { category: 'TAHSILI_PHYSICS', title: 'بنك الكهرباء', questionsCount: 220, order: 2 },
        { category: 'TAHSILI_CHEMISTRY', title: 'بنك التفاعلات', questionsCount: 240, order: 1 },
        { category: 'TAHSILI_CHEMISTRY', title: 'بنك الكيمياء العضوية', questionsCount: 200, order: 2 },
        { category: 'TAHSILI_BIOLOGY', title: 'بنك الخلية والوراثة', questionsCount: 270, order: 1 },
        { category: 'TAHSILI_BIOLOGY', title: 'بنك أجهزة الجسم', questionsCount: 230, order: 2 }
      ]
    });
    console.log(`✅ تم إضافة ${banks.count} بنك أسئلة`);

    // الاختبارات المحاكية
    console.log('🎓 إضافة الاختبارات المحاكية...');
    const tests = await prisma.catalogSimTest.createMany({
      data: [
        { category: 'QUDRAT_QUANT', title: 'اختبار تجريبي 1 - القدرات الكمي', questionsCount: 52, duration: 50, order: 1 },
        { category: 'QUDRAT_QUANT', title: 'اختبار تجريبي 2 - القدرات الكمي', questionsCount: 52, duration: 50, order: 2 },
        { category: 'QUDRAT_QUANT', title: 'اختبار تجريبي 3 - القدرات الكمي', questionsCount: 52, duration: 50, order: 3 },
        { category: 'QUDRAT_VERBAL', title: 'اختبار تجريبي 1 - القدرات اللفظي', questionsCount: 68, duration: 60, order: 1 },
        { category: 'QUDRAT_VERBAL', title: 'اختبار تجريبي 2 - القدرات اللفظي', questionsCount: 68, duration: 60, order: 2 },
        { category: 'QUDRAT_VERBAL', title: 'اختبار تجريبي 3 - القدرات اللفظي', questionsCount: 68, duration: 60, order: 3 },
        { category: 'TAHSILI_MATH', title: 'اختبار محاكي 1 - الرياضيات', questionsCount: 40, duration: 45, order: 1 },
        { category: 'TAHSILI_MATH', title: 'اختبار محاكي 2 - الرياضيات', questionsCount: 40, duration: 45, order: 2 },
        { category: 'TAHSILI_PHYSICS', title: 'اختبار محاكي 1 - الفيزياء', questionsCount: 30, duration: 35, order: 1 },
        { category: 'TAHSILI_PHYSICS', title: 'اختبار محاكي 2 - الفيزياء', questionsCount: 30, duration: 35, order: 2 },
        { category: 'TAHSILI_CHEMISTRY', title: 'اختبار محاكي 1 - الكيمياء', questionsCount: 30, duration: 35, order: 1 },
        { category: 'TAHSILI_CHEMISTRY', title: 'اختبار محاكي 2 - الكيمياء', questionsCount: 30, duration: 35, order: 2 },
        { category: 'TAHSILI_BIOLOGY', title: 'اختبار محاكي 1 - الأحياء', questionsCount: 30, duration: 35, order: 1 },
        { category: 'TAHSILI_BIOLOGY', title: 'اختبار محاكي 2 - الأحياء', questionsCount: 30, duration: 35, order: 2 }
      ]
    });
    console.log(`✅ تم إضافة ${tests.count} اختبار محاكي`);

    // الباقات
    console.log('📦 إضافة الباقات...');
    const packages = await prisma.catalogPackage.createMany({
      data: [
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
          type: 'QUDRAT',
          title: 'باقة المحاكي',
          description: 'اختبارات محاكية فقط',
          price: 149,
          originalPrice: 249,
          features: ['جميع الاختبارات المحاكية', 'تصحيح فوري مع الشرح', 'إحصائيات وتقارير مفصلة', 'صلاحية 3 أشهر'],
          colorClass: 'emerald',
          order: 3
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
        },
        {
          type: 'TAHSILI',
          title: 'باقة مادتين',
          description: 'اختر مادتين من اختيارك',
          price: 399,
          originalPrice: 599,
          features: ['دورتان من اختيارك', 'بنوك أسئلة للمادتين', 'اختبارات تجريبية محدودة', 'ملخصات مصورة'],
          colorClass: 'purple',
          order: 2
        },
        {
          type: 'TAHSILI',
          title: 'باقة المراجعة النهائية',
          description: 'مراجعة سريعة قبل الاختبار',
          price: 199,
          originalPrice: 349,
          features: ['مراجعات مكثفة لجميع المواد', 'أهم الأسئلة المتوقعة', 'اختبار نهائي محاكي', 'صلاحية شهر واحد'],
          colorClass: 'emerald',
          order: 3
        }
      ]
    });
    console.log(`✅ تم إضافة ${packages.count} باقة`);

    console.log('\n🎉 تم إضافة جميع البيانات بنجاح!');
    console.log('\n📊 الملخص:');
    console.log(`   - ${courses.count} دورة`);
    console.log(`   - ${createdSkills.length} مهارة`);
    console.log(`   - ${videoCount} درس فيديو`);
    console.log(`   - ${banks.count} بنك أسئلة`);
    console.log(`   - ${tests.count} اختبار محاكي`);
    console.log(`   - ${packages.count} باقة`);

  } catch (error) {
    console.error('❌ حدث خطأ:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main();
