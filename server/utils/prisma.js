import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

if(process.env.NODE_ENV === "production") global.prismadb = prisma;

export default prisma;