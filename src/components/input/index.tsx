"use client"

import { UseFormRegister, FieldValues, RegisterOptions } from "react-hook-form"

interface InputProps { // Interface para as props do componente Input
    type: string
    placeholder: string
    name: string
    error?: string // Mensagem de erro para o campo
    rules?: RegisterOptions // Regras para validar o campo
    register: UseFormRegister<any> // Hook para registrar o campo no formulário
}

export  function Input ({name, type, placeholder, error, rules, register}:InputProps) {
    return (
        <>
        <input 
         className="w-full px-2 border-2 border-gray-300 rounded-md"
         placeholder={placeholder} 
         type={type}
         {...register(name, rules)}
         id={name}
        /> 
        {error && <p className="text-red-500 text-sm">{error}</p>} {/* Mensagem de erro para o campo */}
        </>
    )
}