"use client"

import { SessionProvider, SessionProviderProps } from "next-auth/react"



export const AuthProvider = ({ children}: SessionProviderProps) => { /* => é uma função que retorna um componente */
    return(
        <SessionProvider>
            {children}
        </SessionProvider>
    )
 
} 