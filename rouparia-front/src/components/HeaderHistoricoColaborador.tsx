"use client"
import Link from "next/link";
import SairButton from "./SairButton";
import SvgSetaVoltarBranca from "./SvgSetaVoltarBranca";
import { useRouter } from "next/navigation";
import { useColaboradorContext } from "@/contexts/colaboradorContext";
import SvgUsuarioIcon from "./SvgUsuarioIcon";
import ButtonCadastrarExcluir from "./ButtonCadastrarExcluir";
import { text } from "stream/consumers";

interface props {
    tipo: 'pendencias' | 'historico' | 'cadastro' | 'excluir' | 'home'
}

export default function HeaderHistoricoColaborador({ tipo }: props) {
    const router = useRouter();

    const titulo = ["Registro de pendências", "Registro do colaborador", "Cadastro do colaborador", "Excluir colaborador", "Home"]

    const mostrarTitulo = () => {

        switch (tipo) {
            case 'pendencias': {
                return titulo[0]
            }

            case 'historico': {
                return titulo[1]
            }

            case 'cadastro': {
                return titulo[2]
            }

            case 'excluir': {
                return titulo[3]
            }

            case 'home': {
                return titulo[4]
            }
        }
    }

    const voltar = () => {
        if (tipo !== 'home') router.back();
        else return;
    }

    const cadastrar = () => {
        router.push('/cadastrarColaborador')
    }

    const excluir = () => {
        router.push('/excluirColaborador')
    }

    return (
        <div className={`flex sticky top-0 flex-row justify-between py-6 px-3 md:px-8 items-center w-[100vw] h-[10vh] bg-verde-primario`}>
            <div className="flex flex-row justify-around md:w-[40%]">
                <button onClick={voltar} className="group cursor-pointer"><SvgSetaVoltarBranca className="fill-cinza-claro group-hover:fill-laranja-hover" /></button>
                <button className="cursor-pointer group" onClick={() => router.replace('/home')}><h1 className="hidden group-hover:text-laranja-hover lg:flex font-bold text-cinza-claro text-2xl text-center md:text-start">{mostrarTitulo()}</h1></button>
            </div>

            {(tipo === 'pendencias' || tipo === 'cadastro' || tipo === 'excluir' || tipo==='home') && (
                <>
                    <ButtonCadastrarExcluir onClick={cadastrar} texto="Cadastrar" />
                    <ButtonCadastrarExcluir onClick={excluir} texto="Excluir" />
                </>
            )}
            {tipo === 'home' &&  <Link href={'/pendencias'}className="bg-laranja text-white p-1 px-8 rounded-lg font-poppins-regular hover:bg-laranja-hover">Pendencias</Link> }
            <SairButton />
        </div>
    );
}
