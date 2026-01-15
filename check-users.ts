import prisma from './app/db';

async function checkUsers() {
  const users = await prisma.user.findMany({
    select: {
      email: true,
      name: true,
      role: true
    }
  });

  console.log('\n✅ Users in database:\n');
  users.forEach(u => {
    console.log(`📧 ${u.email}`);
    console.log(`👤 ${u.name}`);
    console.log(`🔑 ${u.role}\n`);
  });

  await prisma.$disconnect();
}

checkUsers();
