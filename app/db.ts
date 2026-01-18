import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

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

// Create Prisma Client instance
let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  // In production (Vercel), use adapter with connection pool
  const connectionString = process.env.DATABASE_URL || '';
  
  if (!connectionString) {
    throw new Error('DATABASE_URL environment variable is not set');
  }
  
  const pool = new Pool({ 
    connectionString,
    ssl: {
      rejectUnauthorized: false
    }
  });
  const adapter = new PrismaPg(pool);
  prisma = new PrismaClient({ adapter });
} else {
  // In development, reuse existing instance
  if (!globalForPrisma.prisma) {
    const connectionString = process.env.DATABASE_URL || '';
    
    if (!connectionString) {
      console.error('❌ DATABASE_URL is not set!');
      throw new Error('DATABASE_URL environment variable is not set');
    }
    
    console.log('🔌 Connecting to database:', connectionString.substring(0, 30) + '...');
    
    const pool = new Pool({ 
      connectionString,
      ssl: {
        rejectUnauthorized: false
      }
    });
    const adapter = new PrismaPg(pool);
    globalForPrisma.prisma = new PrismaClient({ adapter });
    
    console.log('✅ Prisma Client created successfully');
  }
  prisma = globalForPrisma.prisma;
}

export { prisma };
export default prisma;
