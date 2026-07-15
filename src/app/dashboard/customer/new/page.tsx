import Link from "next/link"

import { Container } from "@/components/container"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { NewCustomerForm } from "../components/form"


export default async function NewCustomer() { // Página para criar um novo cliente
    const session = await getServerSession(authOptions)


    if(!session || !session.user)  { // Para redirecionar o usuário para a página de login se não estiver autenticado
        return redirect("/") // Redireciona para a página de login
      }
    return (
        <Container>
            <main className=" flex flex-col fmt-9 mb-2">
                <div className="flex items-center gap-2">
                    <Link href="/dashboard/customer" className="bg-gray-900 text-white px-4 py-1 rounded">                  
                        Voltar
                    </Link>
                    <h1 className="text-3xl font-bold">Novo Cliente</h1>
                </div>
                <NewCustomerForm /> {/* Componente de formulário para criar um novo cliente */}
            </main>
        </Container>
    )
}