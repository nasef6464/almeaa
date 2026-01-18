import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

console.log('DATABASE_URL:', process.env.DATABASE_URL?.substring(0, 30) + '...');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function verifyAccounts() {
  console.log('🔍 Verifying demo accounts in database...\n');

  try {
    const users = await prisma.user.findMany({
      where: {
        email: {
          in: [
            'admin@test.com',
            'student@test.com',
            'trainer@test.com',
            'parent@test.com'
          ]
        }
      },
      include: {
        student: true,
        trainer: true,
        parent: true,
        supervisor: true,
        schoolAdmin: true,
      }
    });

    console.log('📊 Found accounts:', users.length);
    console.log('━'.repeat(60));

    for (const user of users) {
      console.log(`\n✅ ${user.email}`);
      console.log(`   Name: ${user.name}`);
      console.log(`   Role: ${user.role}`);
      console.log(`   Phone: ${user.phone || 'N/A'}`);
      console.log(`   Active: ${user.isActive ? 'Yes' : 'No'}`);
      console.log(`   Email Verified: ${user.emailVerified ? 'Yes' : 'No'}`);
      console.log(`   Has Password: ${user.password ? 'Yes' : 'No'}`);
      
      if (user.student) {
        console.log(`   📚 Student Info:`);
        console.log(`      Grade: ${user.student.grade || 'N/A'}`);
        console.log(`      DOB: ${user.student.dateOfBirth || 'N/A'}`);
      }
      
      if (user.trainer) {
        console.log(`   👨‍🏫 Trainer Info:`);
        console.log(`      Specialization: ${user.trainer.specialization || 'N/A'}`);
        console.log(`      Bio: ${user.trainer.bio || 'N/A'}`);
      }
      
      if (user.parent) {
        console.log(`   👪 Parent Account: Yes`);
      }
    }

    console.log('\n' + '━'.repeat(60));
    console.log('\n📋 Login Credentials Summary:');
    console.log('━'.repeat(60));
    console.log('👨‍💼 Admin:   admin@test.com   / admin123');
    console.log('👨‍🎓 Student: student@test.com / student123');
    console.log('👨‍🏫 Trainer: trainer@test.com / trainer123');
    console.log('👪 Parent:  parent@test.com  / parent123');
    console.log('━'.repeat(60));

    // Check total users in database
    const totalUsers = await prisma.user.count();
    console.log(`\n📈 Total users in database: ${totalUsers}`);

    // Check if registration API is working by checking recent users
    const recentUsers = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
      select: {
        email: true,
        name: true,
        role: true,
        createdAt: true,
      }
    });

    console.log('\n🆕 Recent 5 users:');
    recentUsers.forEach((u, i) => {
      console.log(`   ${i + 1}. ${u.email} (${u.role}) - ${u.createdAt.toLocaleString()}`);
    });

  } catch (error: any) {
    console.error('❌ Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

verifyAccounts();
