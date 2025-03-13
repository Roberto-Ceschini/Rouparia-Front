import { Colaborador } from "@/types/colaborador";
import SvgInterrogacao from "./SvgInterrogacao";
import { useState } from "react";

interface PopUpNaoAutorizadoProps {
    colaborador: Colaborador | null;
    handleTogglePopUp: () => void;
}
export default function PopUpNaoAutorizado ({colaborador, handleTogglePopUp}: PopUpNaoAutorizadoProps) {

    //Pega o último registro do colaborador
    const lastRegistro = colaborador?.registros?.length ? colaborador.registros[colaborador.registros.length - 1] : null;

    //Formata a data, transforma a data para mostrar a hora e o dia locais (Brasília)
    const formatData = (data: string) => {
        const dataLocal = new Date(data).toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });;
        const dataSplit = dataLocal.split('-');
        return `${dataSplit}`;
    }
    return (
        <div className="absolute z-10 inset-0 bg-black/50 flex justify-center items-center">
                    {/**PopUp de usuário não encontrado*/}
                    <div className="bg-white w-[80%] rounded-md flex flex-col items-center shadow-lg">
                        <div className="flex flex-col items-center p-4">
                            <SvgInterrogacao />
                            <p className="text-lg font-poppins-regular text-vermelho mb-4">Não Autorizado</p>
                            <p className="text-lg font-poppins-semiBold">{String(colaborador?.numero).padStart(3, '0')} - {colaborador?.nome}</p>
                            <p className="text-sm font- mt-2">Status: <span className="text-vermelho">Não entregue desde {lastRegistro && formatData(lastRegistro?.data).split(',')[0]}</span></p>
                            <p className="text-sm font- mt-2">Verifique o histórico ou o registro de assinaturas</p>
                        </div>
                        <button
                            onClick={handleTogglePopUp}
                            className="mt-4 w-[100%] font-poppins-regular px-4 py-2 bg-vermelho rounded-b-md text-white hover:bg-vermelho-hover transition">
                            Continuar
                        </button>
                    </div>
                </div>
    );
}