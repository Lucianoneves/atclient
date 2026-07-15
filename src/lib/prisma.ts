import { PrismaClient } from '../generated/prisma/client' 


let   prisma:PrismaClient | undefined  


if(process.env.NODE_ENV !== 'production') { // Para evitar que se crie uma instância desnecessaria do PrismaClient em produção
    prisma = new PrismaClient()
} else {
    let globalWithPrisma = global as typeof globalThis & { // Para evitar que se crie uma instância desnecessaria do PrismaClient em produção
         prisma: PrismaClient;    
    }
    if(!globalWithPrisma.prisma) { // Para evitar que se crie uma instância desnecessaria do PrismaClient em produção 
        globalWithPrisma.prisma = new PrismaClient()
    }
    prisma = globalWithPrisma.prisma
}

export default prisma