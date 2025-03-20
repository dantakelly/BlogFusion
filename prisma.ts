import {PrismaClient} from "@prisma/client"

const globalForPrisma = globalThis as unknown as {prisma: PrismaClient}

const prisma = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma

export default prisma; 
// if prisma is not a default export ensure to wrap it {prisma} when calling it anywhere in the codebase