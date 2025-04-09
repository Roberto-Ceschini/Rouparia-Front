import { Colaborador } from "@/types/colaborador";
import SvgSucesso from "./SvgSucesso";
import { useEffect } from "react";

interface PopUpSucessoProps {
    handleTogglePopUp: () => void;
    colaborador: Colaborador | null;
    botaoClicado: string;
}

const mensagens = ["Uniforme Entregue", "Uniforme Retirado", "Uniforme Entregue e Retirado"];

export default function PopUpSucesso({ handleTogglePopUp, colaborador, botaoClicado }: PopUpSucessoProps) {
    useEffect(()=>{
        console.log("BOTAO: ", botaoClicado)
    }, [botaoClicado])
    return (

        <div className="absolute z-10 inset-0 bg-black/50 flex justify-center items-center">
            {/**PopUp de usuário não encontrado*/}
            <div className="bg-white w-[80%] rounded-md flex flex-col items-center shadow-lg">
                <div className="flex flex-col items-center p-4">
                    <SvgSucesso />
                    <p className="text-lg font-poppins-semiBold">{String(colaborador?.numero).padStart(3, '0')} - {colaborador?.nome}</p>
                    <p className="text-sm font- mt-2">Status: <span className="text-verde-primario">{
                        botaoClicado === 'entregar'
                            ? mensagens[0]
                            : botaoClicado === 'retirar'
                                ? mensagens[1]
                                : mensagens[2]}</span></p>
                </div>
                <button
                    onClick={handleTogglePopUp}
                    className="mt-4 w-[100%] font-poppins-regular px-4 py-2 bg-verde-primario rounded-b-md text-white hover:bg-verde-primario-hover transition">
                    Continuar
                </button>
            </div>
        </div>
    )
}