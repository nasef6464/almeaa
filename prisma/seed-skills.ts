/**
 * Seed Script - Sample Skills-Based Content
 * 
 * Creates a sample learning structure:
 * Mathematics → Algebra → Linear Equations → Skills + Questions + Videos
 */

import { prisma } from '../app/db';
import { DifficultyLevel, QuestionType, ContentStatus } from '../app/generated/prisma';

async function main() {
  console.log('🌱 Seeding skills-based content...\n');

  // 1. Create Subject: Mathematics
  const mathSubject = await prisma.subject.upsert({
    where: { name: 'Mathematics' },
    update: {},
    create: {
      name: 'Mathematics',
      description: 'Foundation of logical thinking and problem solving',
      icon: '🔢',
      order: 1,
      status: ContentStatus.PUBLISHED,
    },
  });
  console.log('✅ Subject: Mathematics');

  // 2. Create Category: Algebra
  const algebraCategory = await prisma.category.upsert({
    where: {
      subjectId_name: {
        subjectId: mathSubject.id,
        name: 'Algebra',
      },
    },
    update: {},
    create: {
      subjectId: mathSubject.id,
      name: 'Algebra',
      description: 'Symbols and rules for manipulating symbols',
      order: 1,
      status: ContentStatus.PUBLISHED,
    },
  });
  console.log('✅ Category: Algebra');

  // 3. Create Section: Linear Equations
  const linearSection = await prisma.section.upsert({
    where: {
      categoryId_name: {
        categoryId: algebraCategory.id,
        name: 'Linear Equations',
      },
    },
    update: {},
    create: {
      categoryId: algebraCategory.id,
      name: 'Linear Equations',
      description: 'Equations with variables of first degree',
      order: 1,
      status: ContentStatus.PUBLISHED,
    },
  });
  console.log('✅ Section: Linear Equations');

  // 4. Create Skills
  const skills = [
    {
      name: 'Solving Simple Equations',
      description: 'Solve equations like x + 5 = 10',
      difficultyLevel: DifficultyLevel.BEGINNER,
      order: 1,
    },
    {
      name: 'Solving Two-Step Equations',
      description: 'Solve equations like 2x + 3 = 11',
      difficultyLevel: DifficultyLevel.INTERMEDIATE,
      order: 2,
    },
    {
      name: 'Solving Multi-Step Equations',
      description: 'Solve complex equations with multiple operations',
      difficultyLevel: DifficultyLevel.ADVANCED,
      order: 3,
    },
  ];

  for (const skillData of skills) {
    const skill = await prisma.skill.upsert({
      where: {
        sectionId_name: {
          sectionId: linearSection.id,
          name: skillData.name,
        },
      },
      update: {},
      create: {
        sectionId: linearSection.id,
        ...skillData,
        masteryThreshold: 80,
        status: ContentStatus.PUBLISHED,
      },
    });
    console.log(`✅ Skill: ${skillData.name}`);

    // Create sample questions for each skill
    const questions = [
      {
        question: `What is the value of x in: x + 5 = 10?`,
        type: QuestionType.MULTIPLE_CHOICE,
        options: JSON.stringify(['3', '5', '10', '15']),
        correctAnswer: JSON.stringify('5'),
        explanation: 'Subtract 5 from both sides: x = 10 - 5 = 5',
        points: 1,
      },
      {
        question: `Solve for x: 2x + 3 = 11`,
        type: QuestionType.MULTIPLE_CHOICE,
        options: JSON.stringify(['2', '4', '7', '8']),
        correctAnswer: JSON.stringify('4'),
        explanation: 'Subtract 3: 2x = 8, then divide by 2: x = 4',
        points: 2,
      },
    ];

    for (const qData of questions) {
      await prisma.question.create({
        data: {
          skillId: skill.id,
          difficultyLevel: skillData.difficultyLevel,
          ...qData,
        },
      });
    }

    // Create sample video
    await prisma.video.create({
      data: {
        skillId: skill.id,
        title: `How to: ${skillData.name}`,
        description: `Complete tutorial on ${skillData.name.toLowerCase()}`,
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        thumbnail: 'https://via.placeholder.com/640x360',
        duration: 600, // 10 minutes
        order: 1,
        status: ContentStatus.PUBLISHED,
      },
    });
  }

  console.log('\n✅ Sample questions and videos created');

  // 5. Create test users
  const bcrypt = await import('bcryptjs');

  const studentUser = await prisma.user.upsert({
    where: { email: 'student@example.com' },
    update: {},
    create: {
      email: 'student@example.com',
      name: 'Test Student',
      password: await bcrypt.hash('student123', 10),
      role: 'STUDENT',
      isActive: true,
    },
  });

  const student = await prisma.student.upsert({
    where: { userId: studentUser.id },
    update: {},
    create: {
      userId: studentUser.id,
      grade: 'Grade 9',
    },
  });

  console.log('✅ Test student created: student@example.com / student123');

  // 6. Create sample skill mastery
  const allSkills = await prisma.skill.findMany({
    where: { sectionId: linearSection.id },
  });

  for (const skill of allSkills) {
    await prisma.studentSkillMastery.create({
      data: {
        studentId: student.id,
        skillId: skill.id,
        masteryScore: Math.random() * 100, // Random score for demo
        attemptsCount: Math.floor(Math.random() * 5) + 1,
        lastAttemptAt: new Date(),
      },
    });
  }

  console.log('✅ Sample skill mastery records created');

  console.log('\n🎉 Seeding completed successfully!');
  console.log('\n📊 Created:');
  console.log('   - 1 Subject (Mathematics)');
  console.log('   - 1 Category (Algebra)');
  console.log('   - 1 Section (Linear Equations)');
  console.log(`   - ${skills.length} Skills`);
  console.log(`   - ${skills.length * 2} Questions`);
  console.log(`   - ${skills.length} Videos`);
  console.log('   - 1 Test Student with skill mastery data');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  });
