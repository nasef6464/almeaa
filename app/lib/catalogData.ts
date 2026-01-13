// Shared catalog/navigation data inspired by almeaago mock data
// Keep lightweight to avoid pulling the legacy project runtime.
import type { LucideIcon } from 'lucide-react';
import { BookOpen, FileText, Grid, Home, LayoutGrid, MonitorPlay } from 'lucide-react';

export type NavItem = {
  id: string;
  label: string;
  href: string;
  icon?: LucideIcon;
  children?: { id: string; label: string; href: string }[];
};

export const navItems: NavItem[] = [
  { id: 'home', label: 'الرئيسية', href: '/', icon: Home },
  {
    id: 'qudrat',
    label: 'القدرات',
    href: '/qudrat',
    icon: Grid,
    children: [
      { id: 'quant', label: 'القدرات (كمي)', href: '/qudrat/quant' },
      { id: 'verbal', label: 'القدرات (لفظي)', href: '/qudrat/verbal' },
      { id: 'packages', label: 'باقات وعروض القدرات', href: '/qudrat/packages' },
    ],
  },
  {
    id: 'tahsili',
    label: 'التحصيلي',
    href: '/tahsili',
    icon: BookOpen,
    children: [
      { id: 'math', label: 'الرياضيات', href: '/tahsili/math' },
      { id: 'physics', label: 'الفيزياء', href: '/tahsili/physics' },
      { id: 'biology', label: 'الأحياء', href: '/tahsili/biology' },
      { id: 'chemistry', label: 'الكيمياء', href: '/tahsili/chemistry' },
      { id: 'offers', label: 'عروض وباقات التحصيلي', href: '/tahsili/offers' },
    ],
  },
  {
    id: 'tests',
    label: 'اختبارات',
    href: '/dashboard/tests',
    icon: FileText,
    children: [
      { id: 'self', label: 'اختبر نفسك', href: '/dashboard/tests' },
      { id: 'history', label: 'اختبارات سابقة', href: '/dashboard/tests?filter=history' },
    ],
  },
  { id: 'blog', label: 'المدونة', href: '/blog', icon: BookOpen },
  { id: 'others', label: 'أقسام أخرى', href: '/#sections', icon: LayoutGrid },
];

export type Course = {
  id: string;
  title: string;
  thumbnail: string;
  instructor: string;
  price: number;
  rating: number;
  category: 'quant' | 'verbal' | 'tahsili';
  badge?: string;
};

export const qudratCourses: Course[] = [
  {
    id: 'quant-pro',
    title: 'Quant Pro',
    thumbnail: 'https://placehold.co/600x360/2563eb/ffffff?text=Quant+Pro',
    instructor: 'أ. ناصف أحمد',
    price: 250,
    rating: 4.9,
    category: 'quant',
    badge: 'القسم الكمي',
  },
  {
    id: 'qudrat-quant',
    title: 'Qudrat Quant',
    thumbnail: 'https://placehold.co/600x360/3b82f6/ffffff?text=Qudrat+Quant',
    instructor: 'أ. ناصف أحمد',
    price: 200,
    rating: 5,
    category: 'quant',
    badge: 'القسم الكمي',
  },
  {
    id: 'qudrat-verbal',
    title: 'التأسيس القدرات اللفظي',
    thumbnail: 'https://placehold.co/600x360/f59e0b/ffffff?text=Qudrat+Verbal',
    instructor: 'أ. أحمد عادل',
    price: 180,
    rating: 4.9,
    category: 'verbal',
    badge: 'القسم اللفظي',
  },
  {
    id: 'tahsili-math',
    title: 'الرياضيات (تحصيلي) - شامل',
    thumbnail: 'https://placehold.co/600x360/111827/ffffff?text=Math',
    instructor: 'د. محمد علي',
    price: 220,
    rating: 4.9,
    category: 'tahsili',
    badge: 'الرياضيات',
  },
  {
    id: 'tahsili-physics',
    title: 'الفيزياء (تحصيلي) - شامل',
    thumbnail: 'https://placehold.co/600x360/ea580c/ffffff?text=Physics',
    instructor: 'د. أحمد السعيد',
    price: 210,
    rating: 4.8,
    category: 'tahsili',
    badge: 'الفيزياء',
  },
  {
    id: 'tahsili-chem',
    title: 'الكيمياء (تحصيلي) - مكثف',
    thumbnail: 'https://placehold.co/600x360/9333ea/ffffff?text=Chemistry',
    instructor: 'أ. سامي',
    price: 200,
    rating: 4.7,
    category: 'tahsili',
    badge: 'الكيمياء',
  },
  {
    id: 'tahsili-bio',
    title: 'الأحياء (تحصيلي) - 2025',
    thumbnail: 'https://placehold.co/600x360/10b981/ffffff?text=Biology',
    instructor: 'أ. السيد عاشور',
    price: 190,
    rating: 5,
    category: 'tahsili',
    badge: 'الأحياء',
  },
];

export type Skill = { id: number; title: string; progress: number; totalLessons: number; completed: number };
export const skillsByCategory: Record<string, Skill[]> = {
  quant: [
    { id: 1, title: 'أساسيات الحساب', progress: 80, totalLessons: 10, completed: 8 },
    { id: 2, title: 'الجبر والمعادلات', progress: 45, totalLessons: 15, completed: 6 },
    { id: 3, title: 'الهندسة المستوية', progress: 20, totalLessons: 12, completed: 2 },
    { id: 4, title: 'تحليل البيانات والإحصاء', progress: 0, totalLessons: 8, completed: 0 },
  ],
  verbal: [
    { id: 1, title: 'التناظر اللفظي', progress: 90, totalLessons: 8, completed: 7 },
    { id: 2, title: 'إكمال الجمل', progress: 60, totalLessons: 10, completed: 6 },
    { id: 3, title: 'استيعاب المقروء', progress: 30, totalLessons: 12, completed: 3 },
  ],
  math: [
    { id: 1, title: 'التفاضل والتكامل', progress: 50, totalLessons: 20, completed: 10 },
    { id: 2, title: 'المصفوفات', progress: 10, totalLessons: 8, completed: 1 },
  ],
  physics: [
    { id: 1, title: 'الميكانيكا', progress: 70, totalLessons: 15, completed: 10 },
    { id: 2, title: 'الكهرباء', progress: 30, totalLessons: 12, completed: 4 },
  ],
  chemistry: [
    { id: 1, title: 'الكيمياء العضوية', progress: 40, totalLessons: 14, completed: 5 },
    { id: 2, title: 'الروابط الكيميائية', progress: 20, totalLessons: 10, completed: 2 },
  ],
  biology: [
    { id: 1, title: 'علم الوراثة', progress: 60, totalLessons: 10, completed: 6 },
    { id: 2, title: 'أجهزة الجسم', progress: 80, totalLessons: 12, completed: 10 },
  ],
};

export type QuestionBank = { id: number; title: string; questions: number; updated?: string };
export const questionBanks: Record<string, QuestionBank[]> = {
  quant: [
    { id: 1, title: 'بنك أسئلة الجبر 2025', questions: 500, updated: '2025-01-10' },
    { id: 2, title: 'تجميعات الهندسة', questions: 300, updated: '2025-01-15' },
  ],
  verbal: [
    { id: 1, title: 'بنك التناظر اللفظي', questions: 600, updated: '2025-01-12' },
    { id: 2, title: 'تجميعات استيعاب المقروء', questions: 250, updated: '2025-01-18' },
  ],
  math: [{ id: 1, title: 'بنك الرياضيات الشامل', questions: 800, updated: '2025-01-20' }],
  physics: [{ id: 1, title: 'بنك الفيزياء الحديثة', questions: 400, updated: '2025-01-22' }],
  chemistry: [{ id: 1, title: 'بنك الكيمياء', questions: 450, updated: '2025-01-19' }],
  biology: [{ id: 1, title: 'بنك الأحياء', questions: 550, updated: '2025-01-21' }],
};

export type SimTest = { id: number; title: string; duration: string; questions: number };
export const simTests: Record<string, SimTest[]> = {
  quant: [
    { id: 1, title: 'اختبار محاكي كمي - نموذج 1', duration: '60 دقيقة', questions: 40 },
    { id: 2, title: 'اختبار محاكي كمي - نموذج 2', duration: '60 دقيقة', questions: 40 },
  ],
  verbal: [{ id: 1, title: 'اختبار محاكي لفظي - نموذج 1', duration: '60 دقيقة', questions: 40 }],
  math: [{ id: 1, title: 'اختبار تحصيلي رياضيات', duration: '60 دقيقة', questions: 40 }],
  physics: [{ id: 1, title: 'اختبار تحصيلي فيزياء', duration: '60 دقيقة', questions: 40 }],
  chemistry: [{ id: 1, title: 'اختبار تحصيلي كيمياء', duration: '60 دقيقة', questions: 40 }],
  biology: [{ id: 1, title: 'اختبار تحصيلي أحياء', duration: '60 دقيقة', questions: 40 }],
};

export type PackageItem = { id: string; title: string; price: number; originalPrice: number; features: string[]; color: string; popular?: boolean };
export const qudratPackages: PackageItem[] = [
  {
    id: 'p1',
    title: 'الباقة الشاملة (قدرات)',
    price: 399,
    originalPrice: 500,
    features: ['جميع دورات الكمي واللفظي', 'بنك أسئلة مفتوح', 'اختبارات محاكية لا محدودة', 'جلسات بث مباشر'],
    color: 'bg-indigo-600',
    popular: true,
  },
  {
    id: 'p2',
    title: 'باقة التأسيس',
    price: 250,
    originalPrice: 350,
    features: ['دورة التأسيس كمي', 'دورة التأسيس لفظي', '5 اختبارات محاكية'],
    color: 'bg-blue-500',
  },
  {
    id: 'p3',
    title: 'باقة المحاكي',
    price: 99,
    originalPrice: 150,
    features: ['20 اختبار محاكي', 'تحليل نقاط الضعف بالذكاء الاصطناعي'],
    color: 'bg-emerald-500',
  },
];

export const tahsiliPackages: PackageItem[] = [
  {
    id: 'tp1',
    title: 'الباقة الشاملة (تحصيلي)',
    price: 499,
    originalPrice: 650,
    features: ['جميع المواد العلمية', 'بنك أسئلة شامل', 'تجميعات 5 سنوات', 'حصص مباشرة أسبوعية'],
    color: 'bg-emerald-600',
    popular: true,
  },
  {
    id: 'tp2',
    title: 'باقة المواد العلمية',
    price: 299,
    originalPrice: 400,
    features: ['اختر مادتين (مثل فيزياء + كيمياء)', 'بنك أسئلة للمادتين', '10 اختبارات محاكية'],
    color: 'bg-teal-500',
  },
  {
    id: 'tp3',
    title: 'باقة المراجعة النهائية',
    price: 150,
    originalPrice: 200,
    features: ['ملخصات مكثفة', 'أهم 500 سؤال', 'اختبار تجريبي شامل'],
    color: 'bg-cyan-500',
  },
];

export type VideoLesson = { id: string; title: string; duration: string; url: string };
export const videoLessons: Record<string, VideoLesson[]> = {
  '1': [
    { id: 'v1', title: 'مقدمة في الحساب', duration: '10:00', url: 'https://www.youtube.com/embed/e6rglsLy1Ys' },
    { id: 'v2', title: 'الجمع والطرح الذهني', duration: '15:30', url: 'https://www.youtube.com/embed/M5QGkOGZubQ' },
  ],
  '2': [{ id: 'v3', title: 'حل المعادلات من الدرجة الأولى', duration: '12:00', url: 'https://www.youtube.com/embed/e6rglsLy1Ys' }],
};

export const tahsiliSubjects = [
  { id: 'math', label: 'الرياضيات', color: 'from-blue-500 to-blue-700', subtitle: 'تفاضل، تكامل، جبر' },
  { id: 'physics', label: 'الفيزياء', color: 'from-orange-500 to-orange-700', subtitle: 'ميكانيكا، كهرباء، حديثة' },
  { id: 'chemistry', label: 'الكيمياء', color: 'from-purple-500 to-purple-700', subtitle: 'عضوية، تحليلية، نووية' },
  { id: 'biology', label: 'الأحياء', color: 'from-emerald-500 to-emerald-700', subtitle: 'نبات، حيوان، وراثة' },
];

export const qudratTabs = [
  { key: 'courses', label: 'الدورات', icon: MonitorPlay },
  { key: 'skills', label: 'المهارات (فيديو)', icon: BookOpen },
  { key: 'banks', label: 'أحدث البنوك', icon: FileText },
  { key: 'tests', label: 'الاختبارات المحاكية', icon: FileText },
] as const;

export const tahsiliTabs = [
  { key: 'courses', label: 'الدورات', icon: MonitorPlay },
  { key: 'skills', label: 'المهارات', icon: BookOpen },
  { key: 'banks', label: 'بنوك الأسئلة', icon: FileText },
  { key: 'tests', label: 'اختبارات محاكية', icon: FileText },
] as const;
