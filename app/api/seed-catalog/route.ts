import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Clear existing data
    await sql`DELETE FROM catalog_video_lessons`;
    await sql`DELETE FROM catalog_skills`;
    await sql`DELETE FROM catalog_courses`;
    await sql`DELETE FROM catalog_question_banks`;
    await sql`DELETE FROM catalog_sim_tests`;
    await sql`DELETE FROM catalog_packages`;

    // Insert Courses
    await sql`
      INSERT INTO catalog_courses (id, category, title, description, instructor, rating, "studentsCount", "lessonsCount", duration, price, "originalPrice", badge, "order", "isPublished", "createdAt", "updatedAt") VALUES
      ('course_quant_1', 'QUDRAT_QUANT', 'دورة التأسيس الشامل (كمي) 2026', 'دورة شاملة تغطي جميع مهارات القدرات الكمي', 'أ. محمد العتيبي', 4.9, 2547, 45, '32 ساعة', 299, 450, 'الأكثر مبيعاً', 1, true, NOW(), NOW()),
      ('course_quant_2', 'QUDRAT_QUANT', 'دورة المحاكي الذكي (كمي)', 'تدريب مكثف على الاختبارات المحاكية', 'د. خالد الشمري', 4.8, 1832, 30, '24 ساعة', 249, 350, 'جديد', 2, true, NOW(), NOW()),
      ('course_verbal_1', 'QUDRAT_VERBAL', 'التأسيس الشامل (لفظي) 2026', 'دورة شاملة لجميع مهارات القدرات اللفظي', 'أ. أحمد السالم', 4.9, 2103, 40, '28 ساعة', 299, 450, 'الأكثر مبيعاً', 1, true, NOW(), NOW()),
      ('course_math_1', 'TAHSILI_MATH', 'دورة الـ 100% (رياضيات تأسيس 2026)', 'المنهج الكامل للرياضيات التحصيلي', 'د. عمر الزهراني', 5.0, 3241, 50, '40 ساعة', 349, 500, 'الأكثر تقييماً', 1, true, NOW(), NOW()),
      ('course_physics_1', 'TAHSILI_PHYSICS', 'فيزياء تحصيلي - المنهج الكامل', 'شرح شامل لجميع أبواب الفيزياء', 'د. فهد القحطاني', 4.8, 1654, 42, '35 ساعة', 329, 450, NULL, 1, true, NOW(), NOW()),
      ('course_chemistry_1', 'TAHSILI_CHEMISTRY', 'كيمياء تحصيلي - شرح شامل', 'الكيمياء من الصفر حتى الاحتراف', 'أ. نورة الدوسري', 4.7, 1432, 38, '30 ساعة', 299, 420, NULL, 1, true, NOW(), NOW()),
      ('course_biology_1', 'TAHSILI_BIOLOGY', 'أحياء تحصيلي - التفوق المضمون', 'منهج الأحياء كامل بأسلوب مبسط', 'د. سارة العنزي', 4.9, 1876, 44, '36 ساعة', 319, 450, 'موصى به', 1, true, NOW(), NOW())
    `;

    // Insert Skills
    await sql`
      INSERT INTO catalog_skills (id, category, title, progress, "lessonsCount", "order", "createdAt", "updatedAt") VALUES
      ('skill_quant_1', 'QUDRAT_QUANT', 'الجبر والمعادلات', 75, 12, 1, NOW(), NOW()),
      ('skill_quant_2', 'QUDRAT_QUANT', 'الهندسة والقياس', 60, 10, 2, NOW(), NOW()),
      ('skill_quant_3', 'QUDRAT_QUANT', 'الإحصاء والاحتمالات', 45, 8, 3, NOW(), NOW()),
      ('skill_quant_4', 'QUDRAT_QUANT', 'المنطق الرياضي', 30, 6, 4, NOW(), NOW()),
      ('skill_verbal_1', 'QUDRAT_VERBAL', 'التناظر اللفظي', 80, 15, 1, NOW(), NOW()),
      ('skill_verbal_2', 'QUDRAT_VERBAL', 'إكمال الجمل', 65, 12, 2, NOW(), NOW()),
      ('skill_verbal_3', 'QUDRAT_VERBAL', 'الخطأ السياقي', 50, 10, 3, NOW(), NOW()),
      ('skill_math_1', 'TAHSILI_MATH', 'التفاضل والتكامل', 70, 18, 1, NOW(), NOW()),
      ('skill_math_2', 'TAHSILI_MATH', 'المتجهات والهندسة الفراغية', 55, 14, 2, NOW(), NOW()),
      ('skill_math_3', 'TAHSILI_MATH', 'المصفوفات', 40, 10, 3, NOW(), NOW()),
      ('skill_physics_1', 'TAHSILI_PHYSICS', 'الميكانيكا', 68, 16, 1, NOW(), NOW()),
      ('skill_physics_2', 'TAHSILI_PHYSICS', 'الكهرباء والمغناطيسية', 52, 14, 2, NOW(), NOW()),
      ('skill_physics_3', 'TAHSILI_PHYSICS', 'الضوء والأمواج', 45, 12, 3, NOW(), NOW()),
      ('skill_chemistry_1', 'TAHSILI_CHEMISTRY', 'الكيمياء العضوية', 72, 15, 1, NOW(), NOW()),
      ('skill_chemistry_2', 'TAHSILI_CHEMISTRY', 'الكيمياء الفيزيائية', 60, 13, 2, NOW(), NOW()),
      ('skill_biology_1', 'TAHSILI_BIOLOGY', 'علم الوراثة', 78, 14, 1, NOW(), NOW()),
      ('skill_biology_2', 'TAHSILI_BIOLOGY', 'التشريح والفسيولوجيا', 63, 16, 2, NOW(), NOW())
    `;

    // Insert Video Lessons
    await sql`
      INSERT INTO catalog_video_lessons ("skillId", title, duration, "isLocked", "order", "createdAt", "updatedAt") VALUES
      ('skill_quant_1', 'مقدمة في الجبر', '15:30', false, 1, NOW(), NOW()),
      ('skill_quant_1', 'حل المعادلات الخطية', '18:45', false, 2, NOW(), NOW()),
      ('skill_quant_1', 'المعادلات التربيعية', '22:10', true, 3, NOW(), NOW()),
      ('skill_quant_2', 'المثلثات', '16:20', false, 1, NOW(), NOW()),
      ('skill_quant_2', 'الدوائر', '14:55', true, 2, NOW(), NOW()),
      ('skill_verbal_1', 'العلاقات المكانية', '12:30', false, 1, NOW(), NOW()),
      ('skill_verbal_1', 'العلاقات السببية', '14:20', false, 2, NOW(), NOW()),
      ('skill_math_1', 'مقدمة في التفاضل', '20:15', false, 1, NOW(), NOW()),
      ('skill_math_1', 'قواعد الاشتقاق', '25:30', false, 2, NOW(), NOW()),
      ('skill_math_1', 'التكامل المحدود', '18:40', true, 3, NOW(), NOW())
    `;

    // Insert Question Banks
    await sql`
      INSERT INTO catalog_question_banks (id, category, title, "questionsCount", "order", "createdAt", "updatedAt") VALUES
      ('bank_quant_1', 'QUDRAT_QUANT', 'بنك الأسئلة الكمي المتقدم', 850, 1, NOW(), NOW()),
      ('bank_quant_2', 'QUDRAT_QUANT', 'تجميعات القدرات الكمي 5 سنوات', 1200, 2, NOW(), NOW()),
      ('bank_verbal_1', 'QUDRAT_VERBAL', 'بنك اللفظي الشامل', 920, 1, NOW(), NOW()),
      ('bank_verbal_2', 'QUDRAT_VERBAL', 'تجميعات اللفظي 5 سنوات', 1100, 2, NOW(), NOW()),
      ('bank_math_1', 'TAHSILI_MATH', 'بنك الرياضيات الشامل', 1500, 1, NOW(), NOW()),
      ('bank_physics_1', 'TAHSILI_PHYSICS', 'بنك الفيزياء المتكامل', 980, 1, NOW(), NOW()),
      ('bank_chemistry_1', 'TAHSILI_CHEMISTRY', 'بنك الكيمياء', 890, 1, NOW(), NOW()),
      ('bank_biology_1', 'TAHSILI_BIOLOGY', 'بنك الأحياء', 1050, 1, NOW(), NOW())
    `;

    // Insert Simulation Tests
    await sql`
      INSERT INTO catalog_sim_tests (id, category, title, "questionsCount", duration, "order", "createdAt", "updatedAt") VALUES
      ('test_quant_1', 'QUDRAT_QUANT', 'اختبار محاكي كمي - نموذج 1', 40, '60 دقيقة', 1, NOW(), NOW()),
      ('test_quant_2', 'QUDRAT_QUANT', 'اختبار محاكي كمي - نموذج 2', 40, '60 دقيقة', 2, NOW(), NOW()),
      ('test_quant_3', 'QUDRAT_QUANT', 'اختبار محاكي كمي - نموذج 3', 40, '60 دقيقة', 3, NOW(), NOW()),
      ('test_verbal_1', 'QUDRAT_VERBAL', 'اختبار محاكي لفظي - نموذج 1', 40, '60 دقيقة', 1, NOW(), NOW()),
      ('test_verbal_2', 'QUDRAT_VERBAL', 'اختبار محاكي لفظي - نموذج 2', 40, '60 دقيقة', 2, NOW(), NOW()),
      ('test_math_1', 'TAHSILI_MATH', 'اختبار تحصيلي رياضيات - نموذج 1', 50, '90 دقيقة', 1, NOW(), NOW()),
      ('test_math_2', 'TAHSILI_MATH', 'اختبار تحصيلي رياضيات - نموذج 2', 50, '90 دقيقة', 2, NOW(), NOW()),
      ('test_physics_1', 'TAHSILI_PHYSICS', 'اختبار تحصيلي فيزياء', 50, '90 دقيقة', 1, NOW(), NOW()),
      ('test_chemistry_1', 'TAHSILI_CHEMISTRY', 'اختبار تحصيلي كيمياء', 50, '90 دقيقة', 1, NOW(), NOW()),
      ('test_biology_1', 'TAHSILI_BIOLOGY', 'اختبار تحصيلي أحياء', 50, '90 دقيقة', 1, NOW(), NOW())
    `;

    // Insert Packages
    await sql`
      INSERT INTO catalog_packages (id, type, title, description, price, "originalPrice", features, "isPopular", "colorClass", "order", "createdAt", "updatedAt") VALUES
      ('pkg_qudrat_1', 'QUDRAT', 'الباقة الشاملة (قدرات)', 'كل ما تحتاجه للقدرات', 399, 550, '["كمي + لفظي كاملين", "بنك أسئلة شامل", "15 اختبار محاكي", "حصص مباشرة"]', true, 'bg-gradient-to-br from-blue-500 to-indigo-600', 1, NOW(), NOW()),
      ('pkg_qudrat_2', 'QUDRAT', 'باقة الكمي', 'تدريب مكثف على الكمي', 249, 350, '["دورة كمي كاملة", "بنك 850 سؤال", "8 اختبارات محاكية"]', false, 'bg-gradient-to-br from-purple-500 to-pink-600', 2, NOW(), NOW()),
      ('pkg_qudrat_3', 'QUDRAT', 'باقة المحاكي', 'اختبارات محاكية فقط', 99, 150, '["20 اختبار محاكي", "تحليل نقاط الضعف بالذكاء الاصطناعي"]', false, 'bg-gradient-to-br from-emerald-500 to-teal-600', 3, NOW(), NOW()),
      ('pkg_tahsili_1', 'TAHSILI', 'الباقة الشاملة (تحصيلي)', 'جميع المواد كاملة', 499, 650, '["جميع المواد (رياضيات، فيزياء، كيمياء، أحياء)", "بنك أسئلة شامل", "تجميعات 5 سنوات", "حصص مباشرة أسبوعية"]', true, 'bg-gradient-to-br from-emerald-600 to-cyan-600', 1, NOW(), NOW()),
      ('pkg_tahsili_2', 'TAHSILI', 'باقة المواد العلمية', 'اختر مادتين', 299, 400, '["اختر مادتين (مثل فيزياء + كيمياء)", "بنك أسئلة للمادتين", "10 اختبارات محاكية"]', false, 'bg-gradient-to-br from-teal-500 to-green-600', 2, NOW(), NOW()),
      ('pkg_tahsili_3', 'TAHSILI', 'باقة المراجعة النهائية', 'تحضير للاختبار', 150, 200, '["ملخصات مكثفة", "أهم 500 سؤال", "اختبار تجريبي شامل"]', false, 'bg-gradient-to-br from-cyan-500 to-blue-600', 3, NOW(), NOW())
    `;

    return NextResponse.json({ 
      success: true, 
      message: 'تم تعبئة قاعدة البيانات بنجاح!',
      data: {
        courses: 7,
        skills: 17,
        videoLessons: 10,
        questionBanks: 8,
        simTests: 10,
        packages: 6
      }
    });

  } catch (error: any) {
    console.error('Database seed error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
