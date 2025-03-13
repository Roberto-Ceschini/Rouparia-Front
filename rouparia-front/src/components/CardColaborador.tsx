import { Colaborador } from "@/types/colaborador";
import ServiceButton from "./ServiceButton";

interface CardColaboradorProps {
    colaborador: Colaborador | null;
}

export default function CardColaborador({colaborador}: CardColaboradorProps) {

    const lastRegistro = colaborador?.registros[colaborador?.registros.length - 1];
    return (
        //Card do colaborador
        <div className="flex flex-col p-4 justify-evenly w-[80%] bg-cinza-claro shadow-md shadow-gray-900 rounded-xl md:w-[60%] lg:px-16">
            {/**Info colaborador*/}
            <h1 className="font-poppins-bold text-xl">{String(colaborador?.numero).padStart(3, '0')} - {colaborador?.nome}</h1>
            <h2>Status: <span className={`${lastRegistro?.status === 'Entregado' ? 'text-green-300' : 'text-red-500' }`}>{lastRegistro?.status} em {lastRegistro?.data}</span></h2>
            {/**Acoes*/}
            <div className="flex flex-col h-[30vh] justify-center gap-4">
                <ServiceButton name='Entregar e retirar' color="laranja" textColor="white"/>
                <ServiceButton name='Entregar' textColor="white" color="verde-secundario"/>
                <ServiceButton name='Retirar' color="verde-terciario" textColor="white" />
            </div>
            <ServiceButton name='Ver histórico' color="white" textColor="black" />
        </div>
    );
}