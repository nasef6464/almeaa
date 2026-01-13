import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    console.log('🌱 بدء إضافة البيانات...');

    // حذف البيانات القديمة
    await sql`DELETE FROM catalog_packages`;
    await sql`DELETE FROM catalog_sim_tests`;
    await sql`DELETE FROM catalog_question_banks`;
    await sql`DELETE FROM catalog_video_lessons`;
    await sql`DELETE FROM catalog_skills`;
    await sql`DELETE FROM catalog_courses`;

    // إضافة الدورات
    await sql`
      INSERT INTO catalog_courses (id, category, title, instructor, rating, "studentsCount", "lessonsCount", duration, price, "originalPrice", badge, "order", "isPublished", "createdAt", "updatedAt") VALUES
      ('course_1', 'QUDRAT_QUANT', 'دورة القدرات الكمي - المستوى المتقدم', 'د. أحمد السالم', 4.8, 1250, 42, 15, 299, 499, 'الأكثر مبيعاً', 1, true, NOW(), NOW()),
      ('course_2', 'QUDRAT_QUANT', 'القدرات الكمي - كورس تأسيسي', 'أ. محمد الغامدي', 4.9, 890, 35, 12, 249, 399, NULL, 2, true, NOW(), NOW()),
      ('course_3', 'QUDRAT_VERBAL', 'القدرات اللفظي - شامل', 'د. فاطمة العتيبي', 4.7, 720, 38, 14, 279, 449, NULL, 3, true, NOW(), NOW()),
      ('course_4', 'TAHSILI_MATH', 'التحصيلي - الرياضيات الشاملة', 'د. خالد المطيري', 4.9, 1100, 48, 18, 349, 549, 'جديد', 4, true, NOW(), NOW()),
      ('course_5', 'TAHSILI_PHYSICS', 'التحصيلي - الفيزياء الكاملة', 'د. سارة القحطاني', 4.8, 950, 45, 16, 329, 519, NULL, 5, true, NOW(), NOW()),
      ('course_6', 'TAHSILI_CHEMISTRY', 'التحصيلي - الكيمياء المتقدمة', 'أ. نورة الدوسري', 4.7, 680, 40, 15, 319, 499, NULL, 6, true, NOW(), NOW()),
      ('course_7', 'TAHSILI_BIOLOGY', 'التحصيلي - الأحياء الشاملة', 'د. عبدالله الشهري', 4.8, 740, 42, 14, 299, 479, NULL, 7, true, NOW(), NOW())
    `;

    // إضافة المهارات
    await sql`
      INSERT INTO catalog_skills (id, category, title, progress, "lessonsCount", "order", "isPublished", "createdAt", "updatedAt") VALUES
      ('skill_1', 'QUDRAT_QUANT', 'الأعداد والعمليات', 75, 12, 1, true, NOW(), NOW()),
      ('skill_2', 'QUDRAT_QUANT', 'الهندسة والقياس', 60, 15, 2, true, NOW(), NOW()),
      ('skill_3', 'QUDRAT_QUANT', 'الجبر', 45, 18, 3, true, NOW(), NOW()),
      ('skill_4', 'QUDRAT_VERBAL', 'التناظر اللفظي', 70, 16, 1, true, NOW(), NOW()),
      ('skill_5', 'QUDRAT_VERBAL', 'الخطأ السياقي', 65, 12, 2, true, NOW(), NOW()),
      ('skill_6', 'QUDRAT_VERBAL', 'استيعاب المقروء', 50, 20, 3, true, NOW(), NOW()),
      ('skill_7', 'TAHSILI_MATH', 'الدوال', 60, 18, 1, true, NOW(), NOW()),
      ('skill_8', 'TAHSILI_PHYSICS', 'الحركة', 75, 14, 1, true, NOW(), NOW()),
      ('skill_9', 'TAHSILI_CHEMISTRY', 'التفاعلات الكيميائية', 70, 15, 1, true, NOW(), NOW()),
      ('skill_10', 'TAHSILI_BIOLOGY', 'الخلية والوراثة', 80, 14, 1, true, NOW(), NOW())
    `;

    // إضافة دروس الفيديو
    await sql`
      INSERT INTO catalog_video_lessons (id, "skillId", title, duration, "isLocked", "order", "createdAt", "updatedAt") VALUES
      ('video_1_1', 'skill_1', 'الدرس 1: الأعداد والعمليات', '12:30', false, 1, NOW(), NOW()),
      ('video_1_2', 'skill_1', 'الدرس 2: الأعداد والعمليات', '15:45', false, 2, NOW(), NOW()),
      ('video_1_3', 'skill_1', 'الدرس 3: الأعداد والعمليات', '18:20', true, 3, NOW(), NOW())
    `;

    // إضافة بنوك الأسئلة
    await sql`
      INSERT INTO catalog_question_banks (id, category, title, "questionsCount", "order", "isPublished", "createdAt", "updatedAt") VALUES
      ('bank_1', 'QUDRAT_QUANT', 'بنك الأعداد والعمليات', 250, 1, true, NOW(), NOW()),
      ('bank_2', 'QUDRAT_QUANT', 'بنك الهندسة', 180, 2, true, NOW(), NOW()),
      ('bank_3', 'QUDRAT_VERBAL', 'بنك التناظر اللفظي', 300, 1, true, NOW(), NOW()),
      ('bank_4', 'TAHSILI_MATH', 'بنك أسئلة الدوال', 280, 1, true, NOW(), NOW()),
      ('bank_5', 'TAHSILI_PHYSICS', 'بنك الحركة والقوى', 260, 1, true, NOW(), NOW())
    `;

    // إضافة الاختبارات
    await sql`
      INSERT INTO catalog_sim_tests (id, category, title, "questionsCount", duration, "order", "isPublished", "createdAt", "updatedAt") VALUES
      ('test_1', 'QUDRAT_QUANT', 'اختبار تجريبي 1 - القدرات الكمي', 52, 50, 1, true, NOW(), NOW()),
      ('test_2', 'QUDRAT_VERBAL', 'اختبار تجريبي 1 - القدرات اللفظي', 68, 60, 1, true, NOW(), NOW()),
      ('test_3', 'TAHSILI_MATH', 'اختبار محاكي 1 - الرياضيات', 40, 45, 1, true, NOW(), NOW())
    `;

    // إضافة الباقات
    await sql`
      INSERT INTO catalog_packages (id, type, title, description, price, "originalPrice", features, "isPopular", "colorClass", "order", "isPublished", "createdAt", "updatedAt") VALUES
      ('pkg_1', 'QUDRAT', 'الباقة الشاملة', 'تحضير كامل للقدرات', 499, 799, '["جميع دورات القدرات","بنوك أسئلة شاملة","اختبارات محاكية","متابعة مباشرة","دعم فني"]', true, 'blue', 1, true, NOW(), NOW()),
      ('pkg_2', 'QUDRAT', 'باقة التأسيس', 'الأساسيات للبدء', 249, 399, '["دورة واحدة","بنك أسئلة أساسي","اختبارات محدودة","دعم فني"]', false, 'purple', 2, true, NOW(), NOW()),
      ('pkg_3', 'TAHSILI', 'الباقة الشاملة', 'تحضير كامل لجميع المواد', 699, 1099, '["جميع دورات التحصيلي","بنوك شاملة","خرائط ذهنية","متابعة شخصية"]', true, 'blue', 1, true, NOW(), NOW())
    `;

    return NextResponse.json({ 
      success: true, 
      message: '✅ تم إضافة جميع البيانات بنجاح!'
    });
  } catch (error: any) {
    console.error('Error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}
