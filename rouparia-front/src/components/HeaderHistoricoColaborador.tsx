import Link from "next/link";
import SairButton from "./SairButton";
import SvgSetaVoltarBranca from "./SvgSetaVoltarBranca";
import { useRouter } from "next/navigation";
import { useColaboradorContext } from "@/contexts/colaboradorContext";
import SvgUsuarioIcon from "./SvgUsuarioIcon";
import ButtonCadastrarExcluir from "./ButtonCadastrarExcluir";
import { text } from "stream/consumers";

interface props {
    isPendencias?: boolean
}

export default function HeaderHistoricoColaborador({ isPendencias }: props) {
    const router = useRouter();

    const voltar = () => {
        router.back();
    }

    const cadastrar = () => {
        router.push('/cadastroColaborador')
    }

    const excluir = () => {
        router.push('/excluirColaborador')
    }

    return (
        <div className="flex sticky top-0 flex-row justify-between py-6 px-3 md:px-8 items-center w-[100vw] h-[10vh] bg-verde-primario">
            <div className="flex flex-row justify-around md:w-[40%]">
                <button onClick={voltar} className="group cursor-pointer"><SvgSetaVoltarBranca className="fill-cinza-claro group-hover:fill-laranja-hover" /></button>
                <h1 className="font-bold text-cinza-claro text-2xl text-center md:text-start">{isPendencias ? 'Registro de pendências' : 'Registro do Colaborador'}</h1>
            </div>

            {isPendencias && (
                <>
                    <ButtonCadastrarExcluir onClick={cadastrar} texto="Cadastrar"/>
                    <ButtonCadastrarExcluir onClick={excluir} texto="Excluir"/>
                </>
            )}
            <SairButton />
        </div>
    );
}