 import { Container } from "@/components/container"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"


import Link from "next/link"
import { CustomerCard } from "./components/card"
import { NewCustomerForm } from "./components/form" // Componente de formulário para cadastrar um novo cliente



export default async function Customer() { // Página para listar os clientes

    const session = await getServerSession(authOptions)

    if(!session || !session.user)  { // Para redirecionar o usuário para a página de login se não estiver autenticado
      return redirect("/")
    }


    return (
        <Container>
            <main>
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Meus Clientes</h1> 
                    <Link  href="/dashboard/customer/new" className="bg-blue-500 text-white px-4 py-2 rounded">
                        Novo Cliente
                    </Link>
                </div>

                <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mt-2"> 
                    <CustomerCard />     

                    <CustomerCard />

                    <CustomerCard />                    
                </section>
            </main>
        </Container>
    )
} 