import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Starting CMS Seeding...\n');

  // Find the math category
  const mathCategory = await prisma.category.findFirst({
    where: {
      name: {
        contains: 'رياضيات'
      }
    }
  });

  if (!mathCategory) {
    console.log('⚠️ No math category found. Creating one...');
    const subject = await prisma.subject.findFirst();
    if (subject) {
      const newCategory = await prisma.category.create({
        data: {
          subjectId: subject.id,
          name: 'الرياضيات',
          description: 'مادة الرياضيات للتحصيلي',
          order: 1
        }
      });
      console.log('✅ Math category created:', newCategory.name);
    } else {
      console.log('❌ No subject found, cannot create category');
      return;
    }
  }

  const categoryId = mathCategory?.id || '';

  // 1. Create Flashcards Module
  console.log('\n📇 Creating Flashcards Module...');
  const flashcardsModule = await prisma.sectionModule.create({
    data: {
      categoryId,
      title: 'البطاقات الذكية',
      description: 'بطاقات تعليمية تفاعلية لحفظ القوانين والمفاهيم',
      type: 'FLASHCARDS',
      icon: 'CreditCard',
      color: 'purple',
      order: 1,
      items: {
        create: [
          {
            title: 'مساحة الدائرة',
            frontText: 'ما هي مساحة الدائرة؟',
            backText: 'المساحة = ط نق²\n\nحيث:\nط = 3.14\nنق = نصف القطر',
            order: 1
          },
          {
            title: 'نظرية فيثاغورس',
            frontText: 'ما هي نظرية فيثاغورس؟',
            backText: 'في المثلث القائم:\nأ² + ب² = ج²\n\nحيث ج هو الوتر',
            order: 2
          },
          {
            title: 'حجم المكعب',
            frontText: 'ما هو حجم المكعب؟',
            backText: 'الحجم = طول الضلع³\n\nمثال: إذا كان الضلع = 5 سم\nالحجم = 5³ = 125 سم³',
            order: 3
          },
          {
            title: 'قانون المساحة الجانبية للأسطوانة',
            frontText: 'كيف نحسب المساحة الجانبية للأسطوانة؟',
            backText: 'المساحة الجانبية = 2 × ط × نق × ع\n\nحيث:\nنق = نصف قطر القاعدة\nع = الارتفاع',
            order: 4
          },
          {
            title: 'محيط المستطيل',
            frontText: 'ما هو محيط المستطيل؟',
            backText: 'المحيط = 2 × (الطول + العرض)\n\nأو\nالمحيط = 2ل + 2ع',
            order: 5
          }
        ]
      }
    }
  });
  console.log('✅ Flashcards Module Created:', flashcardsModule.title);

  // 2. Create Past Papers Module
  console.log('\n📄 Creating Past Papers Module...');
  const pastPapersModule = await prisma.sectionModule.create({
    data: {
      categoryId,
      title: 'تجميعات 1445هـ',
      description: 'نماذج اختبارات الأعوام السابقة مع الحلول',
      type: 'PAST_PAPERS',
      icon: 'FileText',
      color: 'blue',
      order: 2,
      items: {
        create: [
          {
            title: 'تجميع رياضيات - الفترة الأولى',
            description: 'تجميع أسئلة الفترة الأولى 1445هـ - 60 سؤال',
            fileUrl: '/uploads/past-papers/math-1445-p1.pdf',
            fileName: 'تجميع_رياضيات_1445_فترة1.pdf',
            fileSize: '2.4 MB',
            order: 1
          },
          {
            title: 'تجميع رياضيات - الفترة الثانية',
            description: 'تجميع أسئلة الفترة الثانية 1445هـ - 55 سؤال',
            fileUrl: '/uploads/past-papers/math-1445-p2.pdf',
            fileName: 'تجميع_رياضيات_1445_فترة2.pdf',
            fileSize: '2.1 MB',
            order: 2
          },
          {
            title: 'حلول تجميعات 1445هـ كاملة',
            description: 'حلول مفصلة لجميع تجميعات عام 1445هـ',
            fileUrl: '/uploads/past-papers/math-1445-solutions.pdf',
            fileName: 'حلول_تجميعات_1445.pdf',
            fileSize: '5.8 MB',
            order: 3
          }
        ]
      }
    }
  });
  console.log('✅ Past Papers Module Created:', pastPapersModule.title);

  // 3. Create Downloads Module
  console.log('\n📥 Creating Downloads Module...');
  const downloadsModule = await prisma.sectionModule.create({
    data: {
      categoryId,
      title: 'الملازم والملخصات',
      description: 'ملفات PDF للتحميل - ملخصات وشروحات مركزة',
      type: 'DOWNLOADS',
      icon: 'FileDown',
      color: 'green',
      order: 3,
      items: {
        create: [
          {
            title: 'ملزمة الهندسة الشاملة',
            description: 'ملخص كامل لقوانين الهندسة مع أمثلة محلولة - 42 صفحة',
            fileUrl: '/uploads/downloads/geometry-summary.pdf',
            fileName: 'ملزمة_الهندسة_الشاملة.pdf',
            fileSize: '3.2 MB',
            order: 1
          },
          {
            title: 'ملخص الجبر - القوانين الأساسية',
            description: 'جميع قوانين الجبر المطلوبة للاختبار - 28 صفحة',
            fileUrl: '/uploads/downloads/algebra-essentials.pdf',
            fileName: 'ملخص_الجبر_الأساسي.pdf',
            fileSize: '1.8 MB',
            order: 2
          },
          {
            title: 'مجموعة الرسوم البيانية',
            description: 'دليل شامل لتحليل وفهم الرسوم البيانية - 35 صفحة',
            fileUrl: '/uploads/downloads/graphs-guide.pdf',
            fileName: 'دليل_الرسوم_البيانية.pdf',
            fileSize: '4.5 MB',
            order: 3
          }
        ]
      }
    }
  });
  console.log('✅ Downloads Module Created:', downloadsModule.title);

  // 4. Create Skills Module
  console.log('\n🎯 Creating Skills Module...');
  const skillsModule = await prisma.sectionModule.create({
    data: {
      categoryId,
      title: 'المسار الذكي',
      description: 'تدريب تكيفي على المهارات الضعيفة',
      type: 'SKILLS',
      icon: 'Target',
      color: 'amber',
      order: 4,
      items: {
        create: [
          {
            title: 'تشخيص المهارات',
            description: 'اختبار تشخيصي لتحديد نقاط القوة والضعف',
            videoUrl: '/videos/diagnostic-intro.mp4',
            duration: '5:30',
            order: 1
          }
        ]
      }
    }
  });
  console.log('✅ Skills Module Created:', skillsModule.title);

  console.log('\n🎉 CMS Seeding Complete!');
  console.log('\n📊 Summary:');
  console.log(`- ${flashcardsModule.title}: 5 flashcards`);
  console.log(`- ${pastPapersModule.title}: 3 PDF files`);
  console.log(`- ${downloadsModule.title}: 3 PDF files`);
  console.log(`- ${skillsModule.title}: 1 diagnostic test`);
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
