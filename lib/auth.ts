import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';
import bcrypt from 'bcryptjs';
import { authConfig } from './auth.config';
import { prisma } from '@/app/db';

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Missing credentials');
        }

        console.log('🔐 Attempting login for:', credentials.email);

        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email as string },
            include: {
              student: true,
              trainer: true,
              schoolAdmin: true,
              supervisor: true,
            },
          });

          console.log('👤 User found:', user ? 'Yes' : 'No');

          if (!user) {
            throw new Error('User not found');
          }

          if (!user.password) {
            console.log('❌ User has no password (likely OAuth)');
            throw new Error('Please sign in with Google');
          }

          const isPasswordValid = await bcrypt.compare(
            credentials.password as string,
            user.password
          );

          console.log('🔑 Password valid:', isPasswordValid);

          if (!isPasswordValid) {
            throw new Error('Invalid password');
          }

          // Return user data for session
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            student: user.student,
            trainer: user.trainer,
            schoolAdmin: user.schoolAdmin,
            supervisor: user.supervisor,
            image: user.image,
          };
        } catch (error: any) {
          console.error('❌ Auth error:', error.message);
          throw error;
        }
      },
    }),
  ],
});
