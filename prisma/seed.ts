/**
 * Database Seed Script
 * 
 * Run with: npm run db:seed
 * 
 * This script populates the database with initial data for development.
 */

import { PrismaClient, UserRole } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...\n');

  // Create super admin user
  const superAdminPassword = await bcrypt.hash('superadmin123', 10);
  const superAdmin = await prisma.user.upsert({
    where: { email: 'superadmin@example.com' },
    update: {},
    create: {
      email: 'superadmin@example.com',
      name: 'Super Admin',
      password: superAdminPassword,
      role: UserRole.SUPER_ADMIN,
    },
  });
  console.log('✅ Created super admin:', superAdmin.email);

  // Create school admin user
  const schoolAdminPassword = await bcrypt.hash('schooladmin123', 10);
  const schoolAdmin = await prisma.user.upsert({
    where: { email: 'schooladmin@example.com' },
    update: {},
    create: {
      email: 'schooladmin@example.com',
      name: 'School Administrator',
      password: schoolAdminPassword,
      role: UserRole.SCHOOL_ADMIN,
    },
  });
  console.log('✅ Created school admin:', schoolAdmin.email);

  // Create trainer user
  const trainerPassword = await bcrypt.hash('trainer123', 10);
  const trainer = await prisma.user.upsert({
    where: { email: 'trainer@example.com' },
    update: {},
    create: {
      email: 'trainer@example.com',
      name: 'Training Instructor',
      password: trainerPassword,
      role: UserRole.TRAINER,
    },
  });
  console.log('✅ Created trainer:', trainer.email);

  // Create student user
  const studentPassword = await bcrypt.hash('student123', 10);
  const student = await prisma.user.upsert({
    where: { email: 'student@example.com' },
    update: {},
    create: {
      email: 'student@example.com',
      name: 'Test Student',
      password: studentPassword,
      role: UserRole.STUDENT,
    },
  });
  console.log('✅ Created student:', student.email);

  console.log('\n🎉 Database seeded successfully!');
  console.log('\n📝 Test Credentials:');
  console.log('   Super Admin:  superadmin@example.com / superadmin123');
  console.log('   School Admin: schooladmin@example.com / schooladmin123');
  console.log('   Trainer:      trainer@example.com / trainer123');
  console.log('   Student:      student@example.com / student123');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ Error seeding database:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
