/**
 * Database Seed Script
 * 
 * Run with: npm run db:seed
 * 
 * This script populates the database with initial data for development.
 */

import { PrismaClient, UserRole } from '../app/generated/prisma';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...\n');

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Admin User',
      role: UserRole.ADMIN,
    },
  });
  console.log('✅ Created admin user:', admin.email);

  // Create regular user
  const userPassword = await bcrypt.hash('user123', 10);
  const user = await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      email: 'user@example.com',
      name: 'Regular User',
      role: UserRole.USER,
    },
  });
  console.log('✅ Created regular user:', user.email);

  // Create moderator user
  const modPassword = await bcrypt.hash('mod123', 10);
  const moderator = await prisma.user.upsert({
    where: { email: 'mod@example.com' },
    update: {},
    create: {
      email: 'mod@example.com',
      name: 'Moderator User',
      role: UserRole.MODERATOR,
    },
  });
  console.log('✅ Created moderator user:', moderator.email);

  console.log('\n🎉 Database seeded successfully!');
  console.log('\n📝 Test Credentials:');
  console.log('   Admin:     admin@example.com / admin123');
  console.log('   User:      user@example.com / user123');
  console.log('   Moderator: mod@example.com / mod123');
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
