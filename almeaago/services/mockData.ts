
import { Course, ScheduleItem, SkillGap, QuizResult, User, Role, QuizHistoryItem, FavoriteQuestion } from '../types';

export const currentUser: User = {
    id: 'u1',
    name: 'ناصف أحمد',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    role: Role.STUDENT,
    points: 1250,
    badges: ['Math Whiz', 'Weekly Top Performer']
};

export const navigationMenu = [
    {
        id: 'main',
        label: 'الرئيسية',
        link: '/',
        iconName: 'home'
    },
    {
        id: 'qudrat',
        label: 'القدرات',
        link: '/category/qudrat',
        iconName: 'grid',
        children: [
            { id: 'quant', label: 'الكمي', link: '/category/qudrat/quant' },
            { id: 'verbal', label: 'اللفظي', link: '/category/qudrat/verbal' },
            { id: 'packages', label: 'عروض باقات القدرات', link: '/category/qudrat/packages' }
        ]
    },
    {
        id: 'tahsili',
        label: 'التحصيلي',
        link: '/category/tahsili',
        iconName: 'book-open',
        children: [
            { id: 'math', label: 'الرياضيات', link: '/category/tahsili/math' },
            { id: 'physics', label: 'الفيزياء', link: '/category/tahsili/physics' },
            { id: 'biology', label: 'الاحياء', link: '/category/tahsili/biology' },
            { id: 'chemistry', label: 'الكيمياء', link: '/category/tahsili/chemistry' },
            { id: 'offers', label: 'عروض وباقات التحصيلي', link: '/category/tahsili/offers' }
        ]
    },
    {
        id: 'tests',
        label: 'اختبارات',
        link: '/tests',
        iconName: 'file-text',
        children: [
            { id: 'test_self', label: 'اختبر نفسك', link: '/quiz' },
            { id: 'prev_tests', label: 'اختبارات سابقة', link: '/quizzes' }
        ]
    },
    {
        id: 'blog',
        label: 'المدونة',
        link: '/blog',
        iconName: 'book'
    },
    {
        id: 'others',
        label: 'اقسام اخرى',
        link: '/others',
        iconName: 'layout-grid'
    }
];

export const courses: Course[] = [
    {
        id: 'c1',
        title: 'الفيزياء التطبيقية - الميكانيكا والكهرباء', 
        thumbnail: 'https://picsum.photos/seed/physics/400/250',
        instructor: 'د. فاطمة العلي',
        price: 249,
        currency: 'ر.س',
        duration: 38,
        level: 'Intermediate',
        rating: 4.8,
        progress: 0,
        category: 'العلوم',
        features: ['تجارب افتراضية', 'حل المسائل التفاعلي'],
        description: 'دورة متقدمة تغطي أساسيات الميكانيكا الكلاسيكية والكهرباء والمغناطيسية مع تطبيقات عملية.',
        instructorBio: 'دكتوراة في الفيزياء من جامعة الملك سعود، خبرة 15 عاماً في التدريس الأكاديمي.',
        syllabus: [
            { id: 'l1', title: 'مقدمة في المتجهات', duration: '45 دقيقة' },
            { id: 'l2', title: 'قوانين نيوتن للحركة', duration: '60 دقيقة' },
            { id: 'l3', title: 'الشغل والطاقة', duration: '50 دقيقة' }
        ]
    },
    {
        id: 'c2',
        title: 'القدرات والتحصيلي - دورة التدريبات',
        thumbnail: 'https://picsum.photos/seed/math/400/250',
        instructor: 'أ. أحمد السالم',
        price: 199,
        currency: 'ر.س',
        duration: 73,
        level: 'Advanced',
        rating: 4.9,
        progress: 65,
        category: 'قدرات',
        features: ['73 درس', '73 اختبار', 'AI Powered Feedback'],
        description: 'برنامج تدريبي مكثف يغطي جميع أقسام اختبار القدرات والتحصيلي مع التركيز على استراتيجيات الحل السريع.',
        instructorBio: 'مؤسس منصة المئة، درب أكثر من 50 ألف طالب وحقق طلابه درجات عليا.',
        syllabus: [
            { id: 'l1', title: 'استراتيجيات الحل الذكي', duration: '30 دقيقة', isCompleted: true },
            { id: 'l2', title: 'التناظر اللفظي المتقدم', duration: '45 دقيقة', isCompleted: true },
            { id: 'l3', title: 'الهندسة والرسوم البيانية', duration: '60 دقيقة', isCompleted: false }
        ],
        lessons: [
            { id: 'l1', title: 'استراتيجيات الحل الذكي', duration: '30 دقيقة', isCompleted: true },
            { id: 'l2', title: 'التناظر اللفظي المتقدم', duration: '45 دقيقة', isCompleted: true },
            { id: 'l3', title: 'الهندسة والرسوم البيانية', duration: '60 دقيقة', isCompleted: false }
        ]
    },
    {
        id: 'c_bio',
        title: 'تحصيلي احياء 2025',
        thumbnail: 'https://placehold.co/400x250/2563eb/ffffff?text=Biology',
        instructor: 'أ. السيد عاشور',
        price: 150,
        currency: 'ر.س',
        duration: 40,
        level: 'Intermediate',
        rating: 5.0,
        progress: 0,
        category: 'التحصيلي',
        features: ['تدريب مكثف', 'أحدث التجميعات'],
        description: 'شرح شامل لمنهج الأحياء للمرحلة الثانوية مع التركيز على نقاط التركيز في اختبار التحصيلي.',
        instructorBio: 'معلم خبير في الأحياء، مؤلف كتاب "المختصر في الأحياء".',
        syllabus: [
            { id: 'l1', title: 'تصنيف الكائنات الحية', duration: '40 دقيقة' },
            { id: 'l2', title: 'تركيب الخلية ووظائفها', duration: '55 دقيقة' },
            { id: 'l3', title: 'الوراثة الجزيئية', duration: '60 دقيقة' }
        ]
    },
    {
        id: 'c_phys',
        title: 'تحصيلي فيزياء 2025',
        thumbnail: 'https://placehold.co/400x250/ea580c/ffffff?text=Physics',
        instructor: 'أ. خاطر محمد',
        price: 150,
        currency: 'ر.س',
        duration: 45,
        level: 'Intermediate',
        rating: 5.0,
        progress: 3,
        category: 'التحصيلي',
        features: ['تدريب مكثف', 'شرح مبسط'],
        description: 'تبسيط مفاهيم الفيزياء المعقدة وحل التجميعات السابقة بطرق مبتكرة.',
        instructorBio: 'ماجستير في طرق تدريس العلوم، متخصص في تبسيط الفيزياء.',
        syllabus: [
            { id: 'l1', title: 'علم الفيزياء والقياس', duration: '35 دقيقة', isCompleted: true },
            { id: 'l2', title: 'الحركة في خط مستقيم', duration: '50 دقيقة', isCompleted: false },
            { id: 'l3', title: 'المقذوفات والحركة الدائرية', duration: '55 دقيقة', isCompleted: false }
        ]
    },
    {
        id: 'c_quant',
        title: 'التأسيس الشامل (قدرات كمي)',
        thumbnail: 'https://placehold.co/400x250/3b82f6/ffffff?text=Qudrat+Quant',
        instructor: 'أ. ناصف أحمد',
        price: 200,
        currency: 'ر.س',
        duration: 50,
        level: 'Beginner',
        rating: 5.0,
        progress: 8,
        category: 'القدرات',
        features: ['تأسيس', 'تدريب', 'اختبارات محاكية'],
        description: 'الدورة الأساسية لكل طالب يبدأ رحلة القدرات. تأسيس من الصفر في الحساب والجبر والهندسة.',
        instructorBio: 'خبرة 20 عاماً في تدريس الرياضيات، أسلوب شيق ومبسط.',
        syllabus: [
            { id: 'l1', title: 'أساسيات الجمع والطرح', duration: '25 دقيقة', isCompleted: true },
            { id: 'l2', title: 'جدول الضرب والقسمة المطولة', duration: '40 دقيقة', isCompleted: false },
            { id: 'l3', title: 'الكسور والعمليات عليها', duration: '50 دقيقة', isCompleted: false }
        ]
    },
    {
        id: 'c_verbal',
        title: 'التأسيس القدرات اللفظي',
        thumbnail: 'https://placehold.co/400x250/f59e0b/ffffff?text=Qudrat+Verbal',
        instructor: 'أ. أحمد عادل سالم',
        price: 180,
        currency: 'ر.س',
        duration: 40,
        level: 'Beginner',
        rating: 4.9,
        progress: 0,
        category: 'القدرات',
        features: ['تأسيس', 'نماذج 2025', 'شرح تفاعلي'],
        description: 'شرح شامل لمهارات القسم اللفظي: التناظر، إكمال الجمل، استيعاب المقروء، والخطأ السياقي.',
        instructorBio: 'معلم لغة عربية متخصص في القدرات اللفظي، شارك في تأليف العديد من الكتب.',
        syllabus: [
            { id: 'l1', title: 'مقدمة التناظر اللفظي', duration: '30 دقيقة', isCompleted: false },
            { id: 'l2', title: 'فنيات استيعاب المقروء', duration: '45 دقيقة', isCompleted: false },
            { id: 'l3', title: 'الخطأ السياقي والمفردة الشاذة', duration: '40 دقيقة', isCompleted: false }
        ]
    }
];

export const schedule: ScheduleItem[] = [
    { id: 's1', day: 'السبت', subject: 'الرياضيات', duration: '3 ساعات', status: 'completed' },
    { id: 's2', day: 'الأحد', subject: 'الفيزياء', duration: '2.5 ساعة', status: 'completed' },
    { id: 's3', day: 'الاثنين', subject: 'الكيمياء', duration: '2 ساعة', status: 'in-progress', isLive: true },
    { id: 's4', day: 'الثلاثاء', subject: 'الرياضيات', duration: '3 ساعات', status: 'upcoming' },
    { id: 's5', day: 'الأربعاء', subject: 'مراجعة شاملة', duration: '4 ساعات', status: 'upcoming' },
];

export const skillsData: SkillGap[] = [
    { 
        skill: 'الكسور العشرية', 
        mastery: 45, 
        status: 'weak', 
        recommendation: 'اختبار إضافي متاح' 
    },
    { 
        skill: 'المعادلات التربيعية', 
        mastery: 62, 
        status: 'average', 
        recommendation: 'مراجعة الدروس' 
    },
    { 
        skill: 'الهندسة المستوية', 
        mastery: 71, 
        status: 'strong', 
        recommendation: 'تمارين إضافية' 
    }
];

export const recentQuizResult: QuizResult = {
    quizId: 'q1',
    quizTitle: 'اختبار نموذج 1',
    score: 5, 
    correctAnswers: 3,
    wrongAnswers: 9,
    unanswered: 48,
    timeSpent: '00:00:52',
    date: '2025-01-25',
    skillsAnalysis: [
        { skill: 'تطبيقات على النسبة', mastery: 0, status: 'weak', section: 'عمليات حسابية' },
        { skill: 'تطبيقات الأعداد الصحيحة', mastery: 50, status: 'average', section: 'عمليات حسابية' },
        { skill: 'الهندسة', mastery: 11, status: 'weak', section: 'هندسة' }
    ]
};

export const quizHistory: QuizHistoryItem[] = [
    {
        id: 'qh1',
        title: 'اختبار (1) مهارات أساسية قبل البدء',
        questionCount: 20,
        courseName: 'التأسيس الشامل ( كمي ) 2026',
        passMark: 90,
        difficulty: 'Easy',
        firstAttempt: { score: 10, time: '0:01:31', date: '20-11-2025' },
        bestAttempt: { score: 10, time: '0:01:31', date: '20-11-2025' },
        improvement: 0,
        status: 'failed',
        skillsAnalysis: [
            { section: 'عمليات حسابية', skill: 'تطبيقات على النسبة', mastery: 0, status: 'weak' },
            { section: 'عمليات حسابية', skill: 'تطبيقات الأعداد الصحيحة', mastery: 0, status: 'weak' },
            { section: 'عمليات حسابية', skill: 'التناسب الطردي والعكسي والمركب', mastery: 0, status: 'weak' },
            { section: 'عمليات حسابية', skill: 'مقارنة الكسور', mastery: 0, status: 'weak' },
            { section: 'عمليات حسابية', skill: 'جمع وطرح الكسور العشرية', mastery: 0, status: 'weak' },
            { section: 'جبر', skill: 'مقدمة في الجذور', mastery: 0, status: 'weak' },
            { section: 'تحليل وإحصاء', skill: 'مبدأ العد والاحتمالات', mastery: 0, status: 'weak' },
        ]
    },
    {
        id: 'qh2',
        title: 'اختبار نموذج 1',
        questionCount: 60,
        courseName: 'التدريبات والنماذج ( كمي ) 2026',
        passMark: 85,
        difficulty: 'Medium',
        firstAttempt: { score: 0, time: '0:00:22', date: '19-09-2025' },
        bestAttempt: { score: 0, time: '0:00:22', date: '19-09-2025' },
        improvement: 0,
        status: 'failed',
        skillsAnalysis: [
            { section: 'جبر', skill: 'المعادلات', mastery: 10, status: 'weak' },
            { section: 'هندسة', skill: 'المثلثات', mastery: 5, status: 'weak' }
        ]
    },
    {
        id: 'qh3',
        title: 'اختبار (1) علي مقدمة التناظر اللفظي',
        questionCount: 5,
        courseName: 'التأسيس الشامل ( لفظي ) 2026',
        passMark: 85,
        difficulty: 'Hard',
        firstAttempt: { score: 40, time: '0:00:29', date: '15-11-2025' },
        bestAttempt: { score: 40, time: '0:00:29', date: '15-11-2025' },
        improvement: 0,
        status: 'failed',
        skillsAnalysis: [
            { section: 'تناظر لفظي', skill: 'علاقات مكانية', mastery: 40, status: 'average' }
        ]
    }
];

export const favoriteQuestions: FavoriteQuestion[] = [
    {
        id: 'fq1',
        courseId: 'c_math_100',
        courseTitle: 'دورة الـ 100 % ( رياضيات تأسيس 2026 )',
        quizTitle: 'اختبار المنطق الرياضي',
        text: 'المعاكس الإيجابي للعبارة ~p → q هو ........',
        imageUrl: 'https://placehold.co/600x200/f3f4f6/1f2937?text=~p+%E2%86%92+q+%3F',
        videoUrl: 'https://www.youtube.com/embed/M5QGkOGZubQ', 
        options: ['A', 'B', 'C', 'D'],
        correctOptionIndex: 1, 
        userSelectedOptionIndex: 3, 
        dateAdded: '2025-01-25'
    },
    {
        id: 'fq2',
        courseId: 'c_quant_2026',
        courseTitle: 'دورة التأسيس الشامل ( كمي ) 2026',
        quizTitle: 'اختبار نموذج 1',
        text: 'إذا كان س = ٨ × ٧ ... (١٠) فما قيمة س؟',
        videoUrl: 'https://www.youtube.com/embed/e6rglsLy1Ys', 
        options: ['٥٦', '٤٢', '١٥', '٤٨'],
        correctOptionIndex: 0,
        userSelectedOptionIndex: 0,
        dateAdded: '2025-01-20'
    }
];

export const saherUpcomingTests = [
    { id: 1, title: 'اختبار ساهر - الرياضيات', date: '2025-01-25' },
    { id: 2, title: 'اختبار الكيمياء - الفصل الخامس', date: '2025-01-27' },
    { id: 3, title: 'تقييم نهائي - الفيزياء', date: '2025-01-30' }
];

export const myRequests = [
    {
        id: 'req_1',
        courseName: 'القدرات والتحصيلي - دورة التدريبات',
        orderDate: '25-01-2025',
        price: 199,
        status: 'completed', 
        paymentMethod: 'Visa ending 4242'
    },
    {
        id: 'req_2',
        courseName: 'تحصيلي فيزياء 2025',
        orderDate: '15-01-2025',
        price: 150,
        status: 'pending',
        paymentMethod: 'Bank Transfer'
    }
];

export const certificates = [
    {
        id: 'cert_1',
        courseName: 'دورة التأسيس الشامل ( كمي )',
        issueDate: '2024-12-15',
        grade: 'ممتاز',
        url: '#'
    }
];

export const blogPosts = [
    {
        id: 1,
        title: 'كيف تحقق 100% في القدرات؟',
        excerpt: 'استراتيجيات مجربة من طلاب حققوا الدرجة الكاملة في اختبار القدرات العامة.',
        image: 'https://placehold.co/600x400/indigo/white?text=Qudrat+Tips',
        category: 'القدرات',
        date: '2025-01-20',
        author: 'أ. أحمد السالم'
    },
    {
        id: 2,
        title: 'أهم تجميعات التحصيلي لهذا العام',
        excerpt: 'قائمة بأهم الأسئلة التي تكررت في اختبارات التحصيلي للسنوات الخمس الماضية.',
        image: 'https://placehold.co/600x400/emerald/white?text=Tahsili+Guide',
        category: 'التحصيلي',
        date: '2025-01-18',
        author: 'د. فاطمة العلي'
    },
    {
        id: 3,
        title: '5 نصائح لإدارة وقتك أثناء الاختبار',
        excerpt: 'تعلم كيف توزع وقتك بذكاء بين أقسام الاختبار لتضمن الإجابة على كل الأسئلة.',
        image: 'https://placehold.co/600x400/orange/white?text=Time+Management',
        category: 'نصائح عامة',
        date: '2025-01-15',
        author: 'فريق التوجيه'
    }
];

// Qudrat & Tahsili Specific Data
export const mockCourses = {
    quant: [
        courses[4], // Quant course from main list
        {
            id: 'c_quant_adv',
            title: 'المحترف في القدرات الكمي',
            thumbnail: 'https://placehold.co/400x250/1e40af/ffffff?text=Quant+Pro',
            instructor: 'أ. ناصف أحمد',
            price: 250,
            currency: 'ر.س',
            duration: 60,
            level: 'Advanced',
            rating: 4.9,
            progress: 0,
            category: 'القدرات',
            features: ['حل تجميعات 1445', 'استراتيجيات متقدمة'],
            description: 'دورة مكثفة للمحترفين في القدرات الكمي، تركز على المسائل الصعبة واستراتيجيات الحل الذهني.',
            instructorBio: 'مدرب محترف في القدرات.',
            syllabus: [
                { id: 'l1', title: 'استراتيجيات الحل العكسي', duration: '40 دقيقة' },
                { id: 'l2', title: 'التجريب والتقريب', duration: '50 دقيقة' }
            ]
        }
    ],
    verbal: [
        courses[5], // Verbal course from main list
        {
            id: 'c_verbal_master',
            title: 'إتقان اللفظي 2026',
            thumbnail: 'https://placehold.co/400x250/b45309/ffffff?text=Verbal+Master',
            instructor: 'أ. أحمد عادل',
            price: 190,
            currency: 'ر.س',
            duration: 45,
            level: 'Advanced',
            rating: 4.8,
            progress: 0,
            category: 'القدرات',
            features: ['بنك أسئلة ضخم', 'اختبارات تفاعلية'],
            description: 'دورة شاملة لإتقان القسم اللفظي، تغطي التناظر، إكمال الجمل، واستيعاب المقروء.',
            instructorBio: 'خبير في اللغة العربية واختبارات القدرات.',
            syllabus: [
                { id: 'l1', title: 'التناظر: علاقات متقدمة', duration: '35 دقيقة' },
                { id: 'l2', title: 'استيعاب المقروء: نصوص علمية', duration: '55 دقيقة' }
            ]
        }
    ],
    math: [
        {
            id: 'c_tahsili_math',
            title: 'الرياضيات (تحصيلي) - شامل',
            thumbnail: 'https://placehold.co/400x250/2563eb/ffffff?text=Math',
            instructor: 'أ. محمد علي',
            price: 220,
            currency: 'ر.س',
            duration: 55,
            level: 'Intermediate',
            rating: 4.9,
            progress: 0,
            category: 'التحصيلي',
            features: ['شرح تفصيلي', 'ملخصات'],
            description: 'تغطية شاملة لمنهج الرياضيات للمرحلة الثانوية مع التركيز على أسئلة التحصيلي.',
            instructorBio: 'معلم رياضيات ثانوي متميز.',
            syllabus: [
                { id: 'l1', title: 'المصفوفات والمحددات', duration: '45 دقيقة' },
                { id: 'l2', title: 'التفاضل والتكامل', duration: '60 دقيقة' }
            ]
        }
    ],
    physics: [courses[3]], // Physics course from main list
    chemistry: [{
        id: 'c_tahsili_chem',
        title: 'الكيمياء (تحصيلي) - مكثف',
        thumbnail: 'https://placehold.co/400x250/9333ea/ffffff?text=Chemistry',
        instructor: 'أ. سامي',
        price: 200,
        currency: 'ر.س',
        duration: 40,
        level: 'Intermediate',
        rating: 4.7,
        progress: 0,
        category: 'التحصيلي',
        features: ['تأسيس', 'مراجعة'],
        description: 'مراجعة مكثفة للكيمياء، تغطي الكيمياء العامة والعضوية والتحليلية.',
        instructorBio: 'خبير في الكيمياء.',
        syllabus: [
            { id: 'l1', title: 'الجدول الدوري', duration: '30 دقيقة' },
            { id: 'l2', title: 'الروابط الكيميائية', duration: '45 دقيقة' }
        ]
    }],
    biology: [courses[2]] // Biology course from main list
};

// Mock Video Lessons linked to Skills
export const mockVideoLessons = {
    '1': [ // ID of skill (e.g., 'أساسيات الحساب')
        { id: 'v1', title: 'مقدمة في الحساب', duration: '10:00', url: 'https://www.youtube.com/embed/e6rglsLy1Ys' },
        { id: 'v2', title: 'الجمع والطرح الذهني', duration: '15:30', url: 'https://www.youtube.com/embed/M5QGkOGZubQ' }
    ],
    '2': [ // Algebra
        { id: 'v3', title: 'حل المعادلات من الدرجة الأولى', duration: '12:00', url: 'https://www.youtube.com/embed/e6rglsLy1Ys' }
    ]
};

export const mockSkills = {
    quant: [
        { id: 1, title: 'أساسيات الحساب', progress: 80, totalLessons: 10, completed: 8 },
        { id: 2, title: 'الجبر والمعادلات', progress: 45, totalLessons: 15, completed: 6 },
        { id: 3, title: 'الهندسة المستوية', progress: 20, totalLessons: 12, completed: 2 },
        { id: 4, title: 'تحليل البيانات والإحصاء', progress: 0, totalLessons: 8, completed: 0 }
    ],
    verbal: [
        { id: 1, title: 'التناظر اللفظي', progress: 90, totalLessons: 8, completed: 7 },
        { id: 2, title: 'إكمال الجمل', progress: 60, totalLessons: 10, completed: 6 },
        { id: 3, title: 'استيعاب المقروء', progress: 30, totalLessons: 12, completed: 3 }
    ],
    math: [
        { id: 1, title: 'التفاضل والتكامل', progress: 50, totalLessons: 20, completed: 10 },
        { id: 2, title: 'المصفوفات', progress: 10, totalLessons: 8, completed: 1 }
    ],
    physics: [
        { id: 1, title: 'الميكانيكا', progress: 70, totalLessons: 15, completed: 10 },
        { id: 2, title: 'الكهرباء', progress: 30, totalLessons: 12, completed: 4 }
    ],
    chemistry: [
        { id: 1, title: 'الكيمياء العضوية', progress: 40, totalLessons: 14, completed: 5 },
        { id: 2, title: 'الروابط الكيميائية', progress: 20, totalLessons: 10, completed: 2 }
    ],
    biology: [
        { id: 1, title: 'علم الوراثة', progress: 60, totalLessons: 10, completed: 6 },
        { id: 2, title: 'أجهزة الجسم', progress: 80, totalLessons: 12, completed: 10 }
    ]
};

export const mockQuestionBanks = {
    quant: [
        { id: 1, title: 'بنك أسئلة الجبر 2025', questions: 500, updated: '2025-01-10' },
        { id: 2, title: 'تجميعات الهندسة', questions: 300, updated: '2025-01-15' }
    ],
    verbal: [
        { id: 1, title: 'بنك التناظر اللفظي', questions: 600, updated: '2025-01-12' },
        { id: 2, title: 'تجميعات استيعاب المقروء', questions: 250, updated: '2025-01-18' }
    ],
    math: [{ id: 1, title: 'بنك الرياضيات الشامل', questions: 800, updated: '2025-01-20' }],
    physics: [{ id: 1, title: 'بنك الفيزياء الحديثة', questions: 400, updated: '2025-01-22' }],
    chemistry: [{ id: 1, title: 'بنك الكيمياء', questions: 450, updated: '2025-01-19' }],
    biology: [{ id: 1, title: 'بنك الأحياء', questions: 550, updated: '2025-01-21' }]
};

export const mockSimTests = {
    quant: [
        { id: 1, title: 'اختبار محاكي كمي - نموذج 1', duration: '60 دقيقة', questions: 40 },
        { id: 2, title: 'اختبار محاكي كمي - نموذج 2', duration: '60 دقيقة', questions: 40 }
    ],
    verbal: [
        { id: 1, title: 'اختبار محاكي لفظي - نموذج 1', duration: '60 دقيقة', questions: 40 }
    ],
    math: [{ id: 1, title: 'اختبار تحصيلي رياضيات', duration: '60 دقيقة', questions: 40 }],
    physics: [{ id: 1, title: 'اختبار تحصيلي فيزياء', duration: '60 دقيقة', questions: 40 }],
    chemistry: [{ id: 1, title: 'اختبار تحصيلي كيمياء', duration: '60 دقيقة', questions: 40 }],
    biology: [{ id: 1, title: 'اختبار تحصيلي أحياء', duration: '60 دقيقة', questions: 40 }]
};

export const mockPackages = [
    {
        id: 'p1',
        title: 'الباقة الشاملة (قدرات)',
        price: 399,
        originalPrice: 500,
        features: ['جميع دورات الكمي واللفظي', 'بنك أسئلة مفتوح', 'اختبارات محاكية لا محدودة', 'جلسات بث مباشر'],
        color: 'bg-indigo-600',
        popular: true
    },
    {
        id: 'p2',
        title: 'باقة التأسيس',
        price: 250,
        originalPrice: 350,
        features: ['دورة التأسيس كمي', 'دورة التأسيس لفظي', '5 اختبارات محاكية'],
        color: 'bg-blue-500',
        popular: false
    },
    {
        id: 'p3',
        title: 'باقة المحاكي',
        price: 99,
        originalPrice: 150,
        features: ['20 اختبار محاكي', 'تحليل نقاط الضعف بالذكاء الاصطناعي'],
        color: 'bg-emerald-500',
        popular: false
    }
];

export const mockTahsiliPackages = [
    {
        id: 'tp1',
        title: 'الباقة الشاملة (تحصيلي)',
        price: 499,
        originalPrice: 650,
        features: ['جميع المواد (رياضيات، فيزياء، كيمياء، أحياء)', 'بنك أسئلة شامل', 'تجميعات 5 سنوات', 'حصص مباشرة أسبوعية'],
        color: 'bg-emerald-600',
        popular: true
    },
    {
        id: 'tp2',
        title: 'باقة المواد العلمية',
        price: 299,
        originalPrice: 400,
        features: ['اختر مادتين (مثل فيزياء + كيمياء)', 'بنك أسئلة للمادتين', '10 اختبارات محاكية'],
        color: 'bg-teal-500',
        popular: false
    },
    {
        id: 'tp3',
        title: 'باقة المراجعة النهائية',
        price: 150,
        originalPrice: 200,
        features: ['ملخصات مكثفة', 'أهم 500 سؤال', 'اختبار تجريبي شامل'],
        color: 'bg-cyan-500',
        popular: false
    }
];

// Helper to find a course by ID across all lists
export const findCourseById = (id: string): any => {
    // Check main courses list
    let course = courses.find(c => c.id === id);
    if (course) return course;

    // Check mockCourses structure
    for (const key in mockCourses) {
        // @ts-ignore
        const list = mockCourses[key];
        course = list.find((c: any) => c.id === id);
        if (course) return course;
    }
    return null;
};
