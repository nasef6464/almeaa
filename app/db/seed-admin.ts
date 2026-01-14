import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 بدء إضافة المستخدمين الإداريين...');

  // حذف المستخدمين الموجودين
  await prisma.user.deleteMany({
    where: {
      email: {
        in: ['admin@almeaa.com', 'trainer@almeaa.com']
      }
    }
  });

  // إنشاء المستخدم الإداري
  const adminPassword = await bcrypt.hash('almeaa2026', 10);
  const admin = await prisma.user.create({
    data: {
      email: 'admin@almeaa.com',
      name: 'المدير العام',
      password: adminPassword,
      role: 'SUPER_ADMIN',
      isActive: true,
    },
  });
  console.log('✅ تم إنشاء المدير العام:', admin.email);

  // إنشاء المدرب
  const trainerPassword = await bcrypt.hash('trainer2026', 10);
  const trainer = await prisma.user.create({
    data: {
      email: 'trainer@almeaa.com',
      name: 'محمد أحمد - مدرب',
      password: trainerPassword,
      role: 'TRAINER',
      isActive: true,
      trainer: {
        create: {
          bio: 'مدرب معتمد مع خبرة 8 سنوات في التدريس',
          specialization: 'القدرات الكمي والتحصيلي',
          revenueShare: 70,
          isVerified: true,
        },
      },
    },
  });
  console.log('✅ تم إنشاء المدرب:', trainer.email);

  console.log('✨ تم الانتهاء من إضافة المستخدمين بنجاح!');
}

main()
  .catch((e) => {
    console.error('❌ خطأ:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
