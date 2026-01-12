import { PrismaClient } from './generated/prisma';

/**
 * Prisma Client Singleton
 * 
 * This ensures we only instantiate Prisma Client once in development
 * to avoid exhausting database connections during hot reloading.
 * 
 * In production, a new instance is created for each deployment.
 */

// Define the global type for TypeScript
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Create the Prisma Client instance
export const prisma = globalForPrisma.prisma ?? new PrismaClient();

// In development, save the instance to prevent hot reload issues
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

// Graceful shutdown handler
if (process.env.NODE_ENV === 'production') {
  process.on('beforeExit', async () => {
    await prisma.$disconnect();
  });
}

export default prisma;
