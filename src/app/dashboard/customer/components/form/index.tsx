"use client" // Para usar o hook useForm

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/input"



const schema = z.object({
    name: z.string().min(1, { message: "Nome é obrigatório" }),
    email: z.string().email({ message: "Email é obrigatório" }), //
    phone: z.string().refine((value) => { // Verifica se o telefone está no formato (DD) 99999-9999 ou (DD) 99999 9999
        return /^(?:\d{2})\d{2}?\d{9}$/.test(value) || /^\d{2}\s?\d{9}$/.test(value) // Verifica se o telefone está no formato (DD) 99999-9999 ou (DD) 99999 9999
       
    }, {
        message: " O  numerode telefone deve estar (DD) 99999-9999"
    }),
    address: z.string(),
})

type FormData = z.infer<typeof schema> // Tipo para os dados do formulário



export function NewCustomerForm() { // Componente de formulário para criar um novo cliente
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({// useForm é um hook para gerenciar o formulário e o zodResolver é um resolver para validar os dados do formulário
        resolver: zodResolver(schema),
    })


        function  handleRegisterCustomer(data: FormData){ // Função para cadastrar um novo cliente
            console.log(data)

        }


    return (
        <form className="flex flex-col gap-4 mt-6" onSubmit={handleSubmit(handleRegisterCustomer)}> {/* Formulário para cadastrar um novo cliente */}
            <label className=" mb-1text-lg font-medium">Nome completo</label>
            <Input /* Input para o nome completo do cliente */
                type="text"
                name="name"
                placeholder="Digite o nome completo do cliente"
                error={errors.name?.message}
                register={register}
            />

            <section className="flex gap-2 mt-2 flex-col sm:flex-row my-2">
                <div className="flex-1">
                    <label className=" mb-1text-lg font-medium">Tekefone</label>
                    <Input
                        type="text"
                        name="phone"
                        placeholder="Digite o telefone do cliente"
                        error={errors.phone?.message}
                        register={register}
                    />
                </div>


                <div className="flex-1"> {/* Div para o email */}
                    <label className=" mb-1text-lg font-medium">Email</label>
                    <Input
                        type="text"
                        name="email"
                        placeholder="Digite o email do cliente"
                        error={errors.email?.message}
                        register={register}
                    />
                </div>

                    </section>

                <div className="flex-1"> {/* Div para o email */}
                    <label className=" mb-1 text-lg font-medium">Endereço</label>
                    <Input
                        type="text"
                        name="address"
                        placeholder="Digite o endereço do cliente"
                        error={errors.address?.message}
                        register={register}
                    />
                </div>

            <button type="submit" className="bg-blue-500 text-white px-4 h-11 rounded font-bold">Cadastrar</button>

        </form>
    )
}