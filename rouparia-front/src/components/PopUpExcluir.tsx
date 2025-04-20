import { Colaborador } from "@/types/colaborador";
import SvgSucesso from "./SvgSucesso";
import { useEffect } from "react";
import api from "@/services/axios";
import SvgInterrogacao from "./SvgInterrogacao";

interface PopUpExcluirProps {
    handleTogglePopUp: () => void;
    colaborador: Colaborador | null;
}

const mensagens = ["Uniforme Entregue", "Uniforme Retirado", "Uniforme Entregue e Retirado"];

export default function PopUpExcluir({ handleTogglePopUp, colaborador }: PopUpExcluirProps) {

    const excluirColaborador = async (numero: string) => {
        try {
            await api.delete(`/colaborador/numero/${numero}`);
            handleTogglePopUp()
            window.location.reload()
        } catch (error: any) {
            alert(`Erro ${error.response.data.statusCode} ao excluir colaborador\n\n${error.response.data.message}`);
        }
    }
    return (

        <div className="absolute z-10 inset-0 bg-black/50 flex justify-center items-center">
            {/**PopUp de usuário não encontrado*/}
            <div className="bg-white w-[80%] rounded-md flex flex-col items-center shadow-lg">
                <div className="flex flex-col items-center p-4 pb-0">
                    <SvgInterrogacao />
                    <div>
                    <p className="text-lg mt-2">Tem certeza que deseja exlcuir o colaborador:</p>
                    <p className="text-lg mt-3 font-poppins-semiBold">{String(colaborador?.numero).padStart(3, '0')} - {colaborador?.nome}</p>
                    <p className="text-base font-poppins-semiRegular"><span className="font-bold">Área:</span> {String(colaborador?.area?.nome)}</p>
                    <p className="text-base font-poppins-semiRegular"><span className="font-bold">Vínculo:</span> {String(colaborador?.vinculo?.nome)}</p>
                    <p className="text-base font-poppins-semiRegular"><span className="font-bold">Pendências:</span> {colaborador?.qtd_pendente}</p>
                    </div>
                </div>
                <div className="flex flex-row w-[100%]">
                <button
                        onClick={handleTogglePopUp}
                        className="mt-4 w-[100%] font-poppins-regular cursor-pointer px-4 py-2 bg-verde-primario rounded-bl-md text-white hover:bg-verde-primario-hover transition">
                        Cancelar
                    </button>
                    <button
                        onClick={()=>excluirColaborador(String(colaborador?.numero))}
                        className="mt-4 w-[100%] cursor-pointer font-poppins-regular px-4 py-2 bg-vermelho rounded-br-md text-white hover:bg-vermelho-hover transition">
                        Excluir
                    </button>
                </div>
            </div>
        </div>
    )
}