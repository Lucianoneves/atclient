import Image from "next/image";
import Grupo613 from '../assets/Group 613.svg'


export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center  min-h[calc(100vh-80px)] ">
      
        <Image 
        src={Grupo613}
        alt="Imagem hero da pagina"
        width={600}
        
        />
     
      </main>
  );
}
