'use client' // Para usar o hook useSession

import  Link from "next/link"; 
import { FiUser, FiLogOut, FiLoader, FiLock } from "react-icons/fi";
import {  signIn, signOut, useSession } from "next-auth/react";

export  function Header() { // Para mostrar o header da página de login
   const {status, data} = useSession()

   console.log(data)

  async function handleLogin() {  // Para fazer o login do usuário
    await signIn() 
  }

  async function handleLogout() {  // Para fazer o logout do usuário
    await signOut() 
  }

  return ( // Para mostrar o header da página de login
    <header className="w-full h-20 flex items-center px-2 py-4 bg-white h-20 shadow-sm">
      <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
        <Link href="/">
        <h1 className="text-2xl font-bold  pl-1 hover:tracking-widest duration-500">
            <span className="text-blue-500">Controle</span> de Atendimento
        </h1>
        </Link>



        {status === "loading" && ( // Para mostrar o spinner de loading quando o usuário está carregando
          <button  className="animate-spin"> 
            <FiLoader size={25} color="#4b5563" />
          </button>
        )}
        {status === "unauthenticated" && ( // Para mostrar o botão de login para logar o usuário
          <button onClick={handleLogin}> 
            <FiLock size={25} color="#4b5563" />
          </button>
        )}

        {status === "authenticated" &&( // Para mostrar o botão de logout para deslogar o usuário
           <div className="flex  items-baseline gap-4">
           <Link href="/dashboard">
            <FiUser  size={25} color="#4b5563" />
            </Link>

             <button onClick={handleLogout}>
            <FiLogOut  size={25} color="#4b5563" />
            </button>
           </div>   
      )}
        </div>  
    </header>
    )
    }
  
        


      
