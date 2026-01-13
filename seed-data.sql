-- إضافة الدورات
INSERT INTO "catalog_courses" (id, category, title, instructor, rating, "studentsCount", "lessonsCount", duration, price, "originalPrice", badge, "order", "isPublished", "createdAt", "updatedAt") VALUES
('course_1', 'QUDRAT_QUANT', 'دورة القدرات الكمي - المستوى المتقدم', 'د. أحمد السالم', 4.8, 1250, 42, 15, 299, 499, 'الأكثر مبيعاً', 1, true, NOW(), NOW()),
('course_2', 'QUDRAT_QUANT', 'القدرات الكمي - كورس تأسيسي', 'أ. محمد الغامدي', 4.9, 890, 35, 12, 249, 399, NULL, 2, true, NOW(), NOW()),
('course_3', 'QUDRAT_VERBAL', 'القدرات اللفظي - شامل', 'د. فاطمة العتيبي', 4.7, 720, 38, 14, 279, 449, NULL, 3, true, NOW(), NOW()),
('course_4', 'TAHSILI_MATH', 'التحصيلي - الرياضيات الشاملة', 'د. خالد المطيري', 4.9, 1100, 48, 18, 349, 549, 'جديد', 4, true, NOW(), NOW()),
('course_5', 'TAHSILI_PHYSICS', 'التحصيلي - الفيزياء الكاملة', 'د. سارة القحطاني', 4.8, 950, 45, 16, 329, 519, NULL, 5, true, NOW(), NOW()),
('course_6', 'TAHSILI_CHEMISTRY', 'التحصيلي - الكيمياء المتقدمة', 'أ. نورة الدوسري', 4.7, 680, 40, 15, 319, 499, NULL, 6, true, NOW(), NOW()),
('course_7', 'TAHSILI_BIOLOGY', 'التحصيلي - الأحياء الشاملة', 'د. عبدالله الشهري', 4.8, 740, 42, 14, 299, 479, NULL, 7, true, NOW(), NOW());

-- إضافة المهارات
INSERT INTO "catalog_skills" (id, category, title, progress, "lessonsCount", "order", "isPublished", "createdAt", "updatedAt") VALUES
('skill_1', 'QUDRAT_QUANT', 'الأعداد والعمليات', 75, 12, 1, true, NOW(), NOW()),
('skill_2', 'QUDRAT_QUANT', 'الهندسة والقياس', 60, 15, 2, true, NOW(), NOW()),
('skill_3', 'QUDRAT_QUANT', 'الجبر', 45, 18, 3, true, NOW(), NOW()),
('skill_4', 'QUDRAT_VERBAL', 'التناظر اللفظي', 70, 16, 1, true, NOW(), NOW()),
('skill_5', 'QUDRAT_VERBAL', 'الخطأ السياقي', 65, 12, 2, true, NOW(), NOW()),
('skill_6', 'QUDRAT_VERBAL', 'استيعاب المقروء', 50, 20, 3, true, NOW(), NOW()),
('skill_7', 'TAHSILI_MATH', 'الدوال', 60, 18, 1, true, NOW(), NOW()),
('skill_8', 'TAHSILI_MATH', 'الهندسة التحليلية', 55, 15, 2, true, NOW(), NOW()),
('skill_9', 'TAHSILI_PHYSICS', 'الحركة', 75, 14, 1, true, NOW(), NOW()),
('skill_10', 'TAHSILI_PHYSICS', 'القوى والطاقة', 65, 16, 2, true, NOW(), NOW()),
('skill_11', 'TAHSILI_CHEMISTRY', 'التفاعلات الكيميائية', 70, 15, 1, true, NOW(), NOW()),
('skill_12', 'TAHSILI_CHEMISTRY', 'الكيمياء العضوية', 60, 14, 2, true, NOW(), NOW()),
('skill_13', 'TAHSILI_BIOLOGY', 'الخلية والوراثة', 80, 14, 1, true, NOW(), NOW()),
('skill_14', 'TAHSILI_BIOLOGY', 'أجهزة الجسم', 70, 16, 2, true, NOW(), NOW());

-- إضافة دروس الفيديو
INSERT INTO "catalog_video_lessons" (id, "skillId", title, duration, "isLocked", "order", "createdAt", "updatedAt") VALUES
('video_1_1', 'skill_1', 'الدرس 1: الأعداد والعمليات', '12:30', false, 1, NOW(), NOW()),
('video_1_2', 'skill_1', 'الدرس 2: الأعداد والعمليات', '15:45', false, 2, NOW(), NOW()),
('video_1_3', 'skill_1', 'الدرس 3: الأعداد والعمليات', '18:20', true, 3, NOW(), NOW()),
('video_2_1', 'skill_2', 'الدرس 1: الهندسة والقياس', '14:15', false, 1, NOW(), NOW()),
('video_2_2', 'skill_2', 'الدرس 2: الهندسة والقياس', '16:30', false, 2, NOW(), NOW()),
('video_2_3', 'skill_2', 'الدرس 3: الهندسة والقياس', '19:45', true, 3, NOW(), NOW()),
('video_3_1', 'skill_3', 'الدرس 1: الجبر', '13:10', false, 1, NOW(), NOW()),
('video_3_2', 'skill_3', 'الدرس 2: الجبر', '17:25', false, 2, NOW(), NOW()),
('video_4_1', 'skill_4', 'الدرس 1: التناظر اللفظي', '11:50', false, 1, NOW(), NOW()),
('video_4_2', 'skill_4', 'الدرس 2: التناظر اللفظي', '14:35', false, 2, NOW(), NOW());

-- إضافة بنوك الأسئلة
INSERT INTO "catalog_question_banks" (id, category, title, "questionsCount", "order", "isPublished", "createdAt", "updatedAt") VALUES
('bank_1', 'QUDRAT_QUANT', 'بنك الأعداد والعمليات', 250, 1, true, NOW(), NOW()),
('bank_2', 'QUDRAT_QUANT', 'بنك الهندسة', 180, 2, true, NOW(), NOW()),
('bank_3', 'QUDRAT_QUANT', 'بنك الجبر', 220, 3, true, NOW(), NOW()),
('bank_4', 'QUDRAT_VERBAL', 'بنك التناظر اللفظي', 300, 1, true, NOW(), NOW()),
('bank_5', 'QUDRAT_VERBAL', 'بنك الخطأ السياقي', 200, 2, true, NOW(), NOW()),
('bank_6', 'QUDRAT_VERBAL', 'بنك استيعاب المقروء', 180, 3, true, NOW(), NOW()),
('bank_7', 'TAHSILI_MATH', 'بنك أسئلة الدوال', 280, 1, true, NOW(), NOW()),
('bank_8', 'TAHSILI_MATH', 'بنك الهندسة التحليلية', 240, 2, true, NOW(), NOW()),
('bank_9', 'TAHSILI_PHYSICS', 'بنك الحركة والقوى', 260, 1, true, NOW(), NOW()),
('bank_10', 'TAHSILI_PHYSICS', 'بنك الكهرباء', 220, 2, true, NOW(), NOW()),
('bank_11', 'TAHSILI_CHEMISTRY', 'بنك التفاعلات', 240, 1, true, NOW(), NOW()),
('bank_12', 'TAHSILI_CHEMISTRY', 'بنك الكيمياء العضوية', 200, 2, true, NOW(), NOW()),
('bank_13', 'TAHSILI_BIOLOGY', 'بنك الخلية والوراثة', 270, 1, true, NOW(), NOW()),
('bank_14', 'TAHSILI_BIOLOGY', 'بنك أجهزة الجسم', 230, 2, true, NOW(), NOW());

-- إضافة الاختبارات المحاكية
INSERT INTO "catalog_sim_tests" (id, category, title, "questionsCount", duration, "order", "isPublished", "createdAt", "updatedAt") VALUES
('test_1', 'QUDRAT_QUANT', 'اختبار تجريبي 1 - القدرات الكمي', 52, 50, 1, true, NOW(), NOW()),
('test_2', 'QUDRAT_QUANT', 'اختبار تجريبي 2 - القدرات الكمي', 52, 50, 2, true, NOW(), NOW()),
('test_3', 'QUDRAT_QUANT', 'اختبار تجريبي 3 - القدرات الكمي', 52, 50, 3, true, NOW(), NOW()),
('test_4', 'QUDRAT_VERBAL', 'اختبار تجريبي 1 - القدرات اللفظي', 68, 60, 1, true, NOW(), NOW()),
('test_5', 'QUDRAT_VERBAL', 'اختبار تجريبي 2 - القدرات اللفظي', 68, 60, 2, true, NOW(), NOW()),
('test_6', 'QUDRAT_VERBAL', 'اختبار تجريبي 3 - القدرات اللفظي', 68, 60, 3, true, NOW(), NOW()),
('test_7', 'TAHSILI_MATH', 'اختبار محاكي 1 - الرياضيات', 40, 45, 1, true, NOW(), NOW()),
('test_8', 'TAHSILI_MATH', 'اختبار محاكي 2 - الرياضيات', 40, 45, 2, true, NOW(), NOW()),
('test_9', 'TAHSILI_PHYSICS', 'اختبار محاكي 1 - الفيزياء', 30, 35, 1, true, NOW(), NOW()),
('test_10', 'TAHSILI_PHYSICS', 'اختبار محاكي 2 - الفيزياء', 30, 35, 2, true, NOW(), NOW()),
('test_11', 'TAHSILI_CHEMISTRY', 'اختبار محاكي 1 - الكيمياء', 30, 35, 1, true, NOW(), NOW()),
('test_12', 'TAHSILI_CHEMISTRY', 'اختبار محاكي 2 - الكيمياء', 30, 35, 2, true, NOW(), NOW()),
('test_13', 'TAHSILI_BIOLOGY', 'اختبار محاكي 1 - الأحياء', 30, 35, 1, true, NOW(), NOW()),
('test_14', 'TAHSILI_BIOLOGY', 'اختبار محاكي 2 - الأحياء', 30, 35, 2, true, NOW(), NOW());

-- إضافة الباقات
INSERT INTO "catalog_packages" (id, type, title, description, price, "originalPrice", features, "isPopular", "colorClass", "order", "isPublished", "createdAt", "updatedAt") VALUES
('pkg_1', 'QUDRAT', 'الباقة الشاملة', 'تحضير كامل للقدرات الكمي واللفظي', 499, 799, '["جميع دورات القدرات الكمي واللفظي","بنوك أسئلة شاملة (أكثر من 2000 سؤال)","اختبارات محاكية مع التصحيح الفوري","متابعة مباشرة مع المدربين","دعم فني على مدار الساعة"]', true, 'blue', 1, true, NOW(), NOW()),
('pkg_2', 'QUDRAT', 'باقة التأسيس', 'الأساسيات للبدء في التحضير', 249, 399, '["دورة واحدة من اختيارك","بنك أسئلة أساسي (500 سؤال)","اختبارات تجريبية محدودة","دعم فني عبر البريد"]', false, 'purple', 2, true, NOW(), NOW()),
('pkg_3', 'QUDRAT', 'باقة المحاكي', 'اختبارات محاكية فقط', 149, 249, '["جميع الاختبارات المحاكية","تصحيح فوري مع الشرح","إحصائيات وتقارير مفصلة","صلاحية 3 أشهر"]', false, 'emerald', 3, true, NOW(), NOW()),
('pkg_4', 'TAHSILI', 'الباقة الشاملة', 'تحضير كامل لجميع المواد', 699, 1099, '["جميع دورات التحصيلي (رياضيات، فيزياء، كيمياء، أحياء)","بنوك أسئلة شاملة لكل مادة","اختبارات محاكية كاملة","خرائط ذهنية وملخصات","متابعة شخصية"]', true, 'blue', 1, true, NOW(), NOW()),
('pkg_5', 'TAHSILI', 'باقة مادتين', 'اختر مادتين من اختيارك', 399, 599, '["دورتان من اختيارك","بنوك أسئلة للمادتين","اختبارات تجريبية محدودة","ملخصات مصورة"]', false, 'purple', 2, true, NOW(), NOW()),
('pkg_6', 'TAHSILI', 'باقة المراجعة النهائية', 'مراجعة سريعة قبل الاختبار', 199, 349, '["مراجعات مكثفة لجميع المواد","أهم الأسئلة المتوقعة","اختبار نهائي محاكي","صلاحية شهر واحد"]', false, 'emerald', 3, true, NOW(), NOW());
