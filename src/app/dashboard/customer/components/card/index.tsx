


export function CustomerCard() {
    return (

        <article className="flex flex-col bg-gray-100 border-2 p-2 rounded-lg gap-2 hover:scale-105 duration-300"> {/* hover:scale-105 duration-300 é para animação de escala */}
            <h2>
                <a className=" font-bold">Nome:</a> Luciano
                </h2>
                <p>  <a className=" font-bold">Email:</a> luciano@gmail.com </p>
                <p>  <a className=" font-bold">Telefone:</a> (11) 99999-9999 </p>
                <button className="bg-red-500 text-white px-4  rounded self-start cursor-pointer">
                    Deletar
                </button>
        </article> 
    )
}