import { PrismaClient } from "@prisma/client";

const primsaClientSingleton = () => {
    return new PrismaClient
}

declare global {
    var prismaGlobal: undefined | ReturnType<typeof primsaClientSingleton>
}

const prisma = globalThis.prismaGlobal ?? primsaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma