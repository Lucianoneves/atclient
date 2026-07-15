import { DefaultSession } from "next-auth"; 

declare module "next-auth" { /* declaração de módulo para o next-auth */
    interface Session { // Interface para o session
        user: { // Interface para o user
            id: string
        } & DefaultSession["user"]
    }
}
