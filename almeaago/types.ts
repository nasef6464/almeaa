
export enum Role {
    STUDENT = 'student',
    TEACHER = 'teacher',
    ADMIN = 'admin'
}

export interface SyllabusItem {
    id: string;
    title: string;
    duration: string;
    isCompleted?: boolean;
}

export interface Course {
    id: string;
    title: string;
    thumbnail: string;
    instructor: string;
    price: number;
    currency: string;
    duration: number; // hours
    level: 'Beginner' | 'Intermediate' | 'Advanced';
    rating: number;
    progress: number; // 0-100
    category: string;
    features: string[];
    description?: string;
    instructorBio?: string;
    syllabus?: SyllabusItem[];
    lessons?: any[]; // Keeping for backward compatibility if needed, though syllabus replaces it mostly
}

export interface ScheduleItem {
    id: string;
    day: string;
    subject: string;
    duration: string;
    status: 'completed' | 'in-progress' | 'upcoming';
    isLive?: boolean;
}

export interface SkillGap {
    section?: string;
    skill: string;
    mastery: number; // 0-100 percentage
    status: 'weak' | 'average' | 'strong';
    recommendation?: string; // Action text like "Additional test available"
}

export interface QuizResult {
    quizId: string;
    quizTitle: string;
    score: number; // percentage
    correctAnswers: number;
    wrongAnswers: number;
    unanswered: number;
    timeSpent: string;
    date: string;
    skillsAnalysis: SkillGap[];
}

export interface QuizHistoryItem {
    id: string;
    title: string;
    questionCount: number;
    courseName: string;
    passMark: number;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    firstAttempt: {
        score: number;
        time: string;
        date: string;
    };
    bestAttempt: {
        score: number;
        time: string;
        date: string;
    };
    improvement: number; // percentage change
    status: 'passed' | 'failed';
    skillsAnalysis: SkillGap[]; // For the detail view
}

export interface User {
    id: string;
    name: string;
    avatar: string;
    role: Role;
    points: number;
    badges: string[];
}

export interface FavoriteQuestion {
    id: string;
    courseId: string;
    courseTitle: string;
    quizTitle: string;
    text: string;
    imageUrl?: string;
    videoUrl?: string; // YouTube Embed URL
    options: string[];
    correctOptionIndex: number;
    userSelectedOptionIndex?: number;
    explanation?: string;
    dateAdded: string;
}

// AI Learning Path Types
export interface LearningRecommendation {
    id: string;
    type: 'lesson' | 'quiz' | 'flashcard';
    title: string;
    duration: string; // e.g., "15 دقيقة"
    reason: string; // AI generated reason
    skillTargeted: string;
    priority: 'high' | 'medium' | 'low';
    actionLabel: string;
    link: string;
}
