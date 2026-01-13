import 'next-auth';
import type { Parent, SchoolAdmin, Student, Supervisor, Trainer } from '@/app/generated/prisma';

declare module 'next-auth' {
  interface User {
    id: string;
    email: string;
    name: string;
    role: string;
    student?: Student | null;
    trainer?: Trainer | null;
    schoolAdmin?: SchoolAdmin | null;
    supervisor?: Supervisor | null;
    parent?: Parent | null;
  }

  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      role: string;
      student?: Student | null;
      trainer?: Trainer | null;
      schoolAdmin?: SchoolAdmin | null;
      supervisor?: Supervisor | null;
      parent?: Parent | null;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    email: string;
    name: string;
    role: string;
  }
}
