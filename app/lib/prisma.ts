import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

function createPrismaClient() {
  const client = new PrismaClient();
  
  // Auto-initialize database (for serverless environments like Vercel)
  if (process.env.VERCEL || !process.env.DATABASE_URL?.includes('dev.db')) {
    // Will be initialized lazily
  }
  
  return client;
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
