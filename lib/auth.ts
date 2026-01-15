import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { authConfig } from './auth.config';
import { prisma } from '@/app/db';

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
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

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
          include: {
            student: true,
            trainer: true,
            schoolAdmin: true,
            supervisor: true,
          },
        });

        if (!user) {
          throw new Error('User not found');
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

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
        };
      },
    }),
  ],
});
