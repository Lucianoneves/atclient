import { Container } from "@/components/container";
import {getServerSession} from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import { TicketItem } from "@/app/dashboard/components/ticket"



export default async function Dashboard() { // Para mostrar a página de dashboard
    const session = await getServerSession(authOptions) // Para pegar a sessão do usuário

  if(!session || !session.user)  { // Para redirecionar o usuário para a página de login se não estiver autenticado
    return redirect("/")
  }
  

 return (
    <Container>
     <main className="mt-9 mb-2">
     <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Link href="/dashboard/new" className="bg-blue-500 px-4 py-1 rounded text-white ">
        Abrir Chamado
        </Link>
        </div>

        <table className="min-w-full my-2"> {/* Tabela de chamados */}
          <thead> {/* Cabeçalho da tabela */}
            <tr> {/* Linha da tabela */}
    
              <th className="text-left p-4">CLIENTE</th>          {/* Coluna da tabela */} 
              <th className="text-left p-4 hidden sm:block">DATA CADASTRO</th>
              <th className="text-left p-4">STATUS</th>
              <th className="text-left p-4">#</th>            
            </tr>
          </thead>
          <tbody> 
            <TicketItem />
           
          </tbody>
        </table>
     </main>
    </Container>
 )

}