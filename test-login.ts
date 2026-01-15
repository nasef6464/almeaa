import prisma from './app/db';
import bcrypt from 'bcryptjs';

async function testLogin() {
  console.log('\n🧪 Testing Login System...\n');

  const testEmail = 'admin@almeaa.com';
  const testPassword = 'AdminPass@2024';

  // 1. Find user
  const user = await prisma.user.findUnique({
    where: { email: testEmail }
  });

  if (!user) {
    console.log('❌ User not found!');
    return;
  }

  console.log('✅ User found:');
  console.log('   Email:', user.email);
  console.log('   Name:', user.name);
  console.log('   Role:', user.role);
  console.log('   Password Hash:', user.password.substring(0, 20) + '...');

  // 2. Test password with bcryptjs
  console.log('\n🔐 Testing password with bcryptjs...');
  const isValidBcryptjs = await bcrypt.compare(testPassword, user.password);
  console.log('   bcryptjs result:', isValidBcryptjs ? '✅ VALID' : '❌ INVALID');

  // 3. Test password with bcrypt (if available)
  try {
    const bcryptNative = await import('bcrypt');
    console.log('\n🔐 Testing password with bcrypt...');
    const isValidBcrypt = await bcryptNative.default.compare(testPassword, user.password);
    console.log('   bcrypt result:', isValidBcrypt ? '✅ VALID' : '❌ INVALID');
  } catch (e) {
    console.log('\n⚠️ bcrypt not available (OK - using bcryptjs)');
  }

  // 4. Test creating new hash
  console.log('\n🔧 Creating fresh hash test...');
  const freshHash = await bcrypt.hash(testPassword, 10);
  const freshTest = await bcrypt.compare(testPassword, freshHash);
  console.log('   Fresh hash test:', freshTest ? '✅ VALID' : '❌ INVALID');

  await prisma.$disconnect();
}

testLogin().catch(console.error);
