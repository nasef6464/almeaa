import bcrypt from 'bcryptjs';
import { prisma } from '../app/db';

async function main() {
  console.log('🌱 Starting to seed admin users...');

  // Hash passwords
  const adminPassword = await bcrypt.hash('AdminPass@2024', 10);
  const managerPassword = await bcrypt.hash('ManagerPass@2024', 10);

  try {
    // Delete existing users if they exist
    await prisma.user.deleteMany({
      where: {
        email: {
          in: ['admin@almeaa.com', 'manager@almeaa.com'],
        },
      },
    });

    // Create admin user
    const adminUser = await prisma.user.create({
      data: {
        email: 'admin@almeaa.com',
        name: 'Admin User',
        password: adminPassword,
        role: 'ADMIN',
        isActive: true,
        emailVerified: true,
      },
    });

    console.log('✅ Admin user created:', adminUser.email);

    // Create manager user
    const managerUser = await prisma.user.create({
      data: {
        email: 'manager@almeaa.com',
        name: 'Manager User',
        password: managerPassword,
        role: 'ADMIN',
        isActive: true,
        emailVerified: true,
      },
    });

    console.log('✅ Manager user created:', managerUser.email);

    console.log('\n📋 Demo Accounts:');
    console.log('─'.repeat(50));
    console.log('Email: admin@almeaa.com');
    console.log('Password: AdminPass@2024');
    console.log('─'.repeat(50));
    console.log('Email: manager@almeaa.com');
    console.log('Password: ManagerPass@2024');
    console.log('─'.repeat(50));
    console.log('\n✨ Seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
