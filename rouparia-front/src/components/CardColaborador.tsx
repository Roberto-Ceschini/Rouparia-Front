import { Colaborador } from "@/types/colaborador";

interface CardColaboradorProps {
    colaborador: Colaborador | null;
}

export default function CardColaborador({colaborador}: CardColaboradorProps) {

    const lastRegistro = colaborador?.registros[colaborador?.registros.length - 1];
    return (
        <div className="flex flex-col p-2 justify-evenly w-[80%] h-[50%] bg-verde-terciario rounded-xl md:w-[60%] lg:px-16">
            {/**Colaborador*/}
            <h1 className="font-poppins-bold text-xl">{String(colaborador?.numero).padStart(3, '0')} - {colaborador?.nome}</h1>
            <h2>Status: {lastRegistro?.data}</h2>

            {/**Acoes*/}
            <button className='bg-laranja py-1.5 rounded-md text-white font-semibold mt-6 hover:cursor-pointer hover:bg-laranja-hover'>
                Entregar e retirar
            </button>
            <button className='bg-laranja py-1.5 rounded-md text-white font-semibold mt-6 hover:cursor-pointer hover:bg-laranja-hover'>
                Entregar e retirar
            </button>
            <button className='bg-laranja py-1.5 rounded-md text-white font-semibold mt-6 hover:cursor-pointer hover:bg-laranja-hover'>
                Entregar e retirar
            </button>

        </div>
    );
}