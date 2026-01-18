import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import bcrypt from 'bcryptjs';

console.log('DATABASE_URL:', process.env.DATABASE_URL?.substring(0, 30) + '...');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Creating demo accounts...\n');

  try {
    // Hash passwords
    const adminPassword = await bcrypt.hash('admin123', 10);
    const studentPassword = await bcrypt.hash('student123', 10);
    const trainerPassword = await bcrypt.hash('trainer123', 10);
    const parentPassword = await bcrypt.hash('parent123', 10);

    // 1. Create Admin
    const admin = await prisma.user.upsert({
      where: { email: 'admin@test.com' },
      update: {},
      create: {
        email: 'admin@test.com',
        name: 'مدير النظام',
        password: adminPassword,
        role: 'ADMIN',
        isActive: true,
        emailVerified: new Date(),
      },
    });
    console.log('✅ Admin created: admin@test.com / admin123');

    // 2. Create Student
    const studentUser = await prisma.user.upsert({
      where: { email: 'student@test.com' },
      update: {},
      create: {
        email: 'student@test.com',
        name: 'محمد أحمد',
        password: studentPassword,
        role: 'STUDENT',
        isActive: true,
        emailVerified: new Date(),
      },
    });

    const student = await prisma.student.upsert({
      where: { userId: studentUser.id },
      update: {},
      create: {
        userId: studentUser.id,
        grade: 'Grade 10',
      },
    });
    console.log('✅ Student created: student@test.com / student123');

    // 3. Create Trainer
    const trainer = await prisma.user.upsert({
      where: { email: 'trainer@test.com' },
      update: {},
      create: {
        email: 'trainer@test.com',
        name: 'أستاذ علي',
        password: trainerPassword,
        role: 'TRAINER',
        isActive: true,
        emailVerified: new Date(),
      },
    });
    console.log('✅ Trainer created: trainer@test.com / trainer123');

    // 4. Create Parent
    const parent = await prisma.user.upsert({
      where: { email: 'parent@test.com' },
      update: {},
      create: {
        email: 'parent@test.com',
        name: 'ولي أمر',
        password: parentPassword,
        role: 'PARENT',
        isActive: true,
        emailVerified: new Date(),
      },
    });
    console.log('✅ Parent created: parent@test.com / parent123');

    console.log('\n🎉 All demo accounts created successfully!');
    console.log('\n📋 Login Credentials:');
    console.log('━'.repeat(60));
    console.log('👨‍💼 Admin:   admin@test.com   / admin123');
    console.log('👨‍🎓 Student: student@test.com / student123');
    console.log('👨‍🏫 Trainer: trainer@test.com / trainer123');
    console.log('👪 Parent:  parent@test.com  / parent123');
    console.log('━'.repeat(60));
  } catch (error: any) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
