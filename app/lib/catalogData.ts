// Navigation structure matching almeaago
export const navItems = {
  qudrat: {
    label: 'القدرات',
    children: [
      { id: 'quant', label: 'كمي', href: '/qudrat/quant' },
      { id: 'verbal', label: 'لفظي', href: '/qudrat/verbal' },
      { id: 'packages', label: 'الباقات', href: '/qudrat/packages' }
    ]
  },
  tahsili: {
    label: 'التحصيلي',
    children: [
      { id: 'math', label: 'رياضيات', href: '/tahsili/math' },
      { id: 'physics', label: 'فيزياء', href: '/tahsili/physics' },
      { id: 'chemistry', label: 'كيمياء', href: '/tahsili/chemistry' },
      { id: 'biology', label: 'أحياء', href: '/tahsili/biology' },
      { id: 'offers', label: 'العروض', href: '/tahsili/offers' }
    ]
  }
};

// Types
type VideoLesson = {
  id: string;
  title: string;
  duration: string;
  isLocked: boolean;
};

type Skill = {
  id: string;
  title: string;
  progress: number;
  lessonsCount: number;
  videoLessons: VideoLesson[];
};

type Course = {
  id: string;
  title: string;
  instructor: string;
  rating: number;
  studentsCount: number;
  lessonsCount: number;
  duration: string;
  price: number;
  originalPrice?: number;
  badge: string | null;
  thumbnail: string;
};

type Bank = {
  id: string;
  title: string;
  questionsCount: number;
  updatedAt: string;
};

type Test = {
  id: string;
  title: string;
  questionsCount: number;
  duration: string;
};

type Package = {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  features: string[];
  colorClass: string;
  isPopular: boolean;
};

// Courses data
export const courses: Record<string, Course[]> = {
  quant: [
    {
      id: 'c1',
      title: 'دورة التأسيس الشامل (كمي) 2026',
      instructor: 'أ. محمد العتيبي',
      rating: 4.9,
      studentsCount: 2547,
      lessonsCount: 45,
      duration: '32 ساعة',
      price: 299,
      originalPrice: 450,
      badge: 'الأكثر مبيعاً',
      thumbnail: 'https://placehold.co/600x400/3b82f6/ffffff?text=كمي'
    },
    {
      id: 'c2',
      title: 'دورة المحاكي الذكي (كمي)',
      instructor: 'د. خالد الشمري',
      rating: 4.8,
      studentsCount: 1832,
      lessonsCount: 30,
      duration: '24 ساعة',
      price: 249,
      originalPrice: 350,
      badge: 'جديد',
      thumbnail: 'https://placehold.co/600x400/8b5cf6/ffffff?text=محاكي+كمي'
    }
  ],
  verbal: [
    {
      id: 'c3',
      title: 'التأسيس الشامل (لفظي) 2026',
      instructor: 'أ. أحمد السالم',
      rating: 4.9,
      studentsCount: 2103,
      lessonsCount: 40,
      duration: '28 ساعة',
      price: 299,
      originalPrice: 450,
      badge: 'الأكثر مبيعاً',
      thumbnail: 'https://placehold.co/600x400/10b981/ffffff?text=لفظي'
    }
  ],
  math: [
    {
      id: 'c4',
      title: 'دورة الـ 100% (رياضيات تأسيس 2026)',
      instructor: 'د. عمر الزهراني',
      rating: 5.0,
      studentsCount: 3241,
      lessonsCount: 50,
      duration: '40 ساعة',
      price: 349,
      originalPrice: 500,
      badge: 'الأكثر تقييماً',
      thumbnail: 'https://placehold.co/600x400/f59e0b/ffffff?text=رياضيات'
    }
  ],
  physics: [
    {
      id: 'c5',
      title: 'فيزياء تحصيلي - المنهج الكامل',
      instructor: 'د. فهد القحطاني',
      rating: 4.8,
      studentsCount: 1654,
      lessonsCount: 42,
      duration: '35 ساعة',
      price: 329,
      originalPrice: 450,
      badge: null,
      thumbnail: 'https://placehold.co/600x400/06b6d4/ffffff?text=فيزياء'
    }
  ],
  chemistry: [
    {
      id: 'c6',
      title: 'كيمياء تحصيلي - شرح شامل',
      instructor: 'أ. نورة الدوسري',
      rating: 4.7,
      studentsCount: 1432,
      lessonsCount: 38,
      duration: '30 ساعة',
      price: 299,
      originalPrice: 420,
      badge: null,
      thumbnail: 'https://placehold.co/600x400/ec4899/ffffff?text=كيمياء'
    }
  ],
  biology: [
    {
      id: 'c7',
      title: 'أحياء تحصيلي - التفوق المضمون',
      instructor: 'د. سارة العنزي',
      rating: 4.9,
      studentsCount: 1876,
      lessonsCount: 44,
      duration: '36 ساعة',
      price: 319,
      originalPrice: 450,
      badge: 'موصى به',
      thumbnail: 'https://placehold.co/600x400/22c55e/ffffff?text=أحياء'
    }
  ]
};

// Skills data
export const skills: Record<string, Skill[]> = {
  quant: [
    { id: 's1', title: 'الجبر والمعادلات', progress: 75, lessonsCount: 12, videoLessons: [
      { id: 'v1', title: 'مقدمة في الجبر', duration: '15:30', isLocked: false },
      { id: 'v2', title: 'حل المعادلات الخطية', duration: '18:45', isLocked: false },
      { id: 'v3', title: 'المعادلات التربيعية', duration: '22:10', isLocked: true }
    ]},
    { id: 's2', title: 'الهندسة والقياس', progress: 60, lessonsCount: 10, videoLessons: [
      { id: 'v4', title: 'المثلثات', duration: '16:20', isLocked: false },
      { id: 'v5', title: 'الدوائر', duration: '14:55', isLocked: true }
    ]},
    { id: 's3', title: 'الإحصاء والاحتمالات', progress: 45, lessonsCount: 8, videoLessons: [] },
    { id: 's4', title: 'المنطق الرياضي', progress: 30, lessonsCount: 6, videoLessons: [] }
  ],
  verbal: [
    { id: 's5', title: 'التناظر اللفظي', progress: 80, lessonsCount: 15, videoLessons: [
      { id: 'v6', title: 'العلاقات المكانية', duration: '12:30', isLocked: false },
      { id: 'v7', title: 'العلاقات السببية', duration: '14:20', isLocked: false }
    ]},
    { id: 's6', title: 'إكمال الجمل', progress: 65, lessonsCount: 12, videoLessons: [] },
    { id: 's7', title: 'الخطأ السياقي', progress: 50, lessonsCount: 10, videoLessons: [] }
  ],
  math: [
    { id: 's8', title: 'التفاضل والتكامل', progress: 70, lessonsCount: 18, videoLessons: [] },
    { id: 's9', title: 'المتجهات والهندسة الفراغية', progress: 55, lessonsCount: 14, videoLessons: [] },
    { id: 's10', title: 'المصفوفات', progress: 40, lessonsCount: 10, videoLessons: [] }
  ],
  physics: [
    { id: 's11', title: 'الميكانيكا', progress: 68, lessonsCount: 16, videoLessons: [] },
    { id: 's12', title: 'الكهرباء والمغناطيسية', progress: 52, lessonsCount: 14, videoLessons: [] },
    { id: 's13', title: 'الضوء والأمواج', progress: 45, lessonsCount: 12, videoLessons: [] }
  ],
  chemistry: [
    { id: 's14', title: 'الكيمياء العضوية', progress: 72, lessonsCount: 15, videoLessons: [] },
    { id: 's15', title: 'الكيمياء الفيزيائية', progress: 60, lessonsCount: 13, videoLessons: [] }
  ],
  biology: [
    { id: 's16', title: 'علم الوراثة', progress: 78, lessonsCount: 14, videoLessons: [] },
    { id: 's17', title: 'التشريح والفسيولوجيا', progress: 63, lessonsCount: 16, videoLessons: [] }
  ]
};

// Question Banks
export const banks: Record<string, Bank[]> = {
  quant: [
    { id: 'b1', title: 'بنك الأسئلة الكمي المتقدم', questionsCount: 850, updatedAt: '2025-01-20' },
    { id: 'b2', title: 'تجميعات القدرات الكمي 5 سنوات', questionsCount: 1200, updatedAt: '2025-01-18' }
  ],
  verbal: [
    { id: 'b3', title: 'بنك اللفظي الشامل', questionsCount: 920, updatedAt: '2025-01-19' },
    { id: 'b4', title: 'تجميعات اللفظي 5 سنوات', questionsCount: 1100, updatedAt: '2025-01-17' }
  ],
  math: [
    { id: 'b5', title: 'بنك الرياضيات', questionsCount: 1500, updatedAt: '2025-01-22' }
  ],
  physics: [
    { id: 'b6', title: 'بنك الفيزياء', questionsCount: 980, updatedAt: '2025-01-21' }
  ],
  chemistry: [
    { id: 'b7', title: 'بنك الكيمياء', questionsCount: 890, updatedAt: '2025-01-20' }
  ],
  biology: [
    { id: 'b8', title: 'بنك الأحياء', questionsCount: 1050, updatedAt: '2025-01-19' }
  ]
};

// Simulation Tests
export const tests: Record<string, Test[]> = {
  quant: [
    { id: 't1', title: 'اختبار محاكي كمي - نموذج 1', questionsCount: 40, duration: '60 دقيقة' },
    { id: 't2', title: 'اختبار محاكي كمي - نموذج 2', questionsCount: 40, duration: '60 دقيقة' },
    { id: 't3', title: 'اختبار محاكي كمي - نموذج 3', questionsCount: 40, duration: '60 دقيقة' }
  ],
  verbal: [
    { id: 't4', title: 'اختبار محاكي لفظي - نموذج 1', questionsCount: 40, duration: '60 دقيقة' },
    { id: 't5', title: 'اختبار محاكي لفظي - نموذج 2', questionsCount: 40, duration: '60 دقيقة' }
  ],
  math: [
    { id: 't6', title: 'اختبار تحصيلي رياضيات - نموذج 1', questionsCount: 50, duration: '90 دقيقة' },
    { id: 't7', title: 'اختبار تحصيلي رياضيات - نموذج 2', questionsCount: 50, duration: '90 دقيقة' }
  ],
  physics: [
    { id: 't8', title: 'اختبار تحصيلي فيزياء', questionsCount: 50, duration: '90 دقيقة' }
  ],
  chemistry: [
    { id: 't9', title: 'اختبار تحصيلي كيمياء', questionsCount: 50, duration: '90 دقيقة' }
  ],
  biology: [
    { id: 't10', title: 'اختبار تحصيلي أحياء', questionsCount: 50, duration: '90 دقيقة' }
  ]
};

// Packages
export const packages: { qudrat: Package[]; tahsili: Package[] } = {
  qudrat: [
    {
      id: 'p1',
      title: 'الباقة الشاملة (قدرات)',
      price: 399,
      originalPrice: 550,
      features: ['كمي + لفظي كاملين', 'بنك أسئلة شامل', '15 اختبار محاكي', 'حصص مباشرة'],
      colorClass: 'bg-gradient-to-br from-blue-500 to-indigo-600',
      isPopular: true
    },
    {
      id: 'p2',
      title: 'باقة الكمي',
      price: 249,
      originalPrice: 350,
      features: ['دورة كمي كاملة', 'بنك 850 سؤال', '8 اختبارات محاكية'],
      colorClass: 'bg-gradient-to-br from-purple-500 to-pink-600',
      isPopular: false
    },
    {
      id: 'p3',
      title: 'باقة المحاكي',
      price: 99,
      originalPrice: 150,
      features: ['20 اختبار محاكي', 'تحليل نقاط الضعف بالذكاء الاصطناعي'],
      colorClass: 'bg-gradient-to-br from-emerald-500 to-teal-600',
      isPopular: false
    }
  ],
  tahsili: [
    {
      id: 'tp1',
      title: 'الباقة الشاملة (تحصيلي)',
      price: 499,
      originalPrice: 650,
      features: ['جميع المواد (رياضيات، فيزياء، كيمياء، أحياء)', 'بنك أسئلة شامل', 'تجميعات 5 سنوات', 'حصص مباشرة أسبوعية'],
      colorClass: 'bg-gradient-to-br from-emerald-600 to-cyan-600',
      isPopular: true
    },
    {
      id: 'tp2',
      title: 'باقة المواد العلمية',
      price: 299,
      originalPrice: 400,
      features: ['اختر مادتين (مثل فيزياء + كيمياء)', 'بنك أسئلة للمادتين', '10 اختبارات محاكية'],
      colorClass: 'bg-gradient-to-br from-teal-500 to-green-600',
      isPopular: false
    },
    {
      id: 'tp3',
      title: 'باقة المراجعة النهائية',
      price: 150,
      originalPrice: 200,
      features: ['ملخصات مكثفة', 'أهم 500 سؤال', 'اختبار تجريبي شامل'],
      colorClass: 'bg-gradient-to-br from-cyan-500 to-blue-600',
      isPopular: false
    }
  ]
};
