import { prisma } from '@/app/db';
import { QudratContent } from '@/components/catalog/QudratContent';
import { PackagesContent } from '@/components/catalog/PackagesContent';
import { CatalogCategory } from '@prisma/client';

type TahsiliSubject = 'math' | 'physics' | 'chemistry' | 'biology' | 'offers';

const categoryMap: Record<string, CatalogCategory> = {
  math: 'TAHSILI_MATH',
  physics: 'TAHSILI_PHYSICS',
  chemistry: 'TAHSILI_CHEMISTRY',
  biology: 'TAHSILI_BIOLOGY',
};

const titles: Record<TahsiliSubject, string> = {
  math: 'التحصيلي - الرياضيات',
  physics: 'التحصيلي - الفيزياء',
  chemistry: 'التحصيلي - الكيمياء',
  biology: 'التحصيلي - الأحياء',
  offers: 'عروض التحصيلي'
};

export default async function TahsiliPage({ params }: { params: { subject: string } }) {
  const subject = params.subject as TahsiliSubject;

  if (subject === 'offers') {
    const packages = await prisma.catalogPackage.findMany({
      where: { type: 'TAHSILI' },
      orderBy: { order: 'asc' }
    });

    const formattedPackages = packages.map(pkg => ({
      id: pkg.id,
      title: pkg.title,
      description: pkg.description,
      price: pkg.price,
      originalPrice: pkg.originalPrice,
      features: Array.isArray(pkg.features) ? pkg.features as string[] : [],
      isPopular: pkg.isPopular,
      colorClass: pkg.colorClass || ''
    }));

    return (
      <div className="bg-gray-50 min-h-screen pb-20" dir="rtl">
        <header className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white py-12 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
            <h1 className="text-4xl font-bold mb-2">{titles[subject]}</h1>
            <p className="text-lg text-emerald-100">اختر الباقة المناسبة لك واحصل على أفضل الأسعار</p>
          </div>
        </header>
        <PackagesContent packages={formattedPackages} type="tahsili" />
      </div>
    );
  }

  const category = categoryMap[subject];

  const [courses, skills, banks, tests] = await Promise.all([
    prisma.catalogCourse.findMany({
      where: { category, isPublished: true },
      orderBy: { order: 'asc' }
    }),
    prisma.catalogSkill.findMany({
      where: { category },
      include: {
        videoLessons: {
          orderBy: { order: 'asc' }
        }
      },
      orderBy: { order: 'asc' }
    }),
    prisma.catalogQuestionBank.findMany({
      where: { category },
      orderBy: { order: 'asc' }
    }),
    prisma.catalogSimTest.findMany({
      where: { category },
      orderBy: { order: 'asc' }
    })
  ]);

  const formattedCourses = courses.map(course => ({
    id: course.id,
    title: course.title,
    instructor: course.instructor,
    rating: course.rating,
    studentsCount: course.studentsCount,
    lessonsCount: course.lessonsCount,
    duration: String(course.duration || '0 ساعة'),
    price: course.price,
    originalPrice: course.originalPrice,
    badge: course.badge
  }));

  const formattedSkills = skills.map(skill => ({
    id: skill.id,
    title: skill.title,
    progress: skill.progress,
    lessonsCount: skill.lessonsCount,
    videoLessons: skill.videoLessons.map(v => ({
      id: v.id,
      title: v.title,
      duration: String(v.duration || '0:00'),
      isLocked: v.isLocked,
      order: v.order
    }))
  }));

  const formattedBanks = banks.map(bank => ({
    id: bank.id,
    title: bank.title,
    questionsCount: bank.questionsCount,
    order: bank.order
  }));

  const formattedTests = tests.map(test => ({
    id: test.id,
    title: test.title,
    questionsCount: test.questionsCount,
    duration: String(test.duration || '0 دقيقة'),
    order: test.order
  }));

  return (
    <div className="bg-gray-50 min-h-screen pb-20" dir="rtl">
      <header className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white py-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl font-bold mb-2">{titles[subject]}</h1>
          <p className="text-lg text-emerald-100">دورات، مهارات، بنوك أسئلة، واختبارات محاكية</p>
        </div>
      </header>

      <QudratContent 
        courses={formattedCourses}
        skills={formattedSkills}
        banks={formattedBanks}
        tests={formattedTests}
      />
    </div>
  );
}
