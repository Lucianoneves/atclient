

import  {PrismaAdapter} from "@auth/prisma-adapter"
import Google from "next-auth/providers/google"
import { AuthOptions} from 'next-auth'
import prismaClient from './prisma'

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prismaClient),
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID! as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET! as string,
        }),
    ],

    callbacks: { // Callback para agregar  o id do usuario a sessão
        async session({ session, token, user }) {
            session.user = {...session.user, id: user.id} as{
                id: string
                name: string | null
                email: string | null                
            }

          
           
            return session
        },
    },
}