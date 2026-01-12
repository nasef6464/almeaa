import { NextResponse } from 'next/server';

/**
 * Health Check Endpoint
 * 
 * Tests application and database connectivity.
 * Returns 200 OK if healthy, with database status.
 * 
 * @route GET /api/health
 * @returns {object} { status: "ok", db: "ok" | "down" | "not-configured", timestamp, error? }
 */
export async function GET() {
  const timestamp = new Date().toISOString();

  // Check if database is configured
  if (!process.env.DATABASE_URL) {
    return NextResponse.json(
      {
        status: 'ok',
        db: 'not-configured',
        timestamp,
        environment: process.env.NODE_ENV,
        message: 'DATABASE_URL not set. See docs/NEON_SETUP.md',
      },
      { status: 200 }
    );
  }

  try {
    // Dynamically import prisma only if database is configured
    const { prisma } = await import('@/app/db');
    
    // Test database connection with a simple query
    await prisma.$queryRaw`SELECT 1`;

    return NextResponse.json(
      {
        status: 'ok',
        db: 'ok',
        timestamp,
        environment: process.env.NODE_ENV,
      },
      { status: 200 }
    );
  } catch (error) {
    // Log full error server-side for debugging
    console.error('Health check failed:', error);

    // Return safe error message to client (no secrets)
    const errorMessage =
      error instanceof Error
        ? error.message.includes('connect')
          ? 'Database connection failed'
          : 'Database query failed'
        : 'Unknown database error';

    return NextResponse.json(
      {
        status: 'ok',
        db: 'down',
        timestamp,
        environment: process.env.NODE_ENV,
        error: errorMessage,
      },
      { status: 200 }
    );
  }
}
