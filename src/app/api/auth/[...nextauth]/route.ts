import NextAuth from "next-auth" // Para autenticar o usuário
import{authOptions} from "@/lib/auth"

const handler = NextAuth(authOptions) // Para autenticar o usuário

export { handler as GET, handler as POST };