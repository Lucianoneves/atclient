import { FiTrash2, FiFile } from "react-icons/fi"

export function TicketItem(){ // Para mostrar o item da tabela de chamados
    return (
        <>
            <tr className=" border-b-2 border-b-slate-200 h-16 last:border-b-0 bg-slate-100 hover:bg-gray-200duration-300"> {/* Linha da tabela */} 
                <td className="text-left hidden sm:table-cell pl-1"> {/* Coluna da tabela */} 
                    Mercado Silva
                </td>
                <td className="text-left  hidden sm:table-cell">
                    02/07/2026
                </td>
                <td className="text-left">
                    <span className="bg-green-500 text-white px-2 py-1 rounded">
                        Aberto
                    </span>
                </td>
                <td className="text-left">
                    <button className="mr-3">
                        <FiTrash2  size={24} color="#dc2626"/>
                    </button>
                    <button className="mr-3">
                        <FiFile  size={24} color="#3b82f6"/>
                    </button>
                </td>
            </tr>
        </>
        
    )
}