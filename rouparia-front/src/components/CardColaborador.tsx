import { Colaborador } from "@/types/colaborador";
import ServiceButton from "./ServiceButton";
import SvgSetaVoltar from "./SvgSetaVoltar";
import Link from "next/link";
import { use, useEffect, useState } from "react";
import api from "@/services/axios";
import path from "path";
import { Registro } from "@/types/registro";

interface CardColaboradorProps {
    colaborador: Colaborador | null;
    setColaborador: (value: Colaborador | null) => void;
    setMostrarPopUpNaoAutorizado: (value: number) => void;
    setBotaoClicado: (value: string) => void;
    setMostrarPopUpSucesso: (value: boolean) => void;
}

//Função que capitaliza a primeira letra de uma string
const capitalize = (s: string) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}

export default function CardColaborador({ colaborador, setMostrarPopUpNaoAutorizado, setColaborador, setBotaoClicado, setMostrarPopUpSucesso }: CardColaboradorProps) {

    // Pegamos o último registro Válido desse colaborador
    const ultimoRegistro: Registro | null = colaborador?.registros ?? null;
    //Estado que controla o envio do formulário
    const [submitting, setSubmitting] = useState(false);
    const [quantidadeEntregar, setQuantidadeEntregar] = useState (1);
    const [quantidadeRetirar, setQuantidadeRetirar] = useState (1);

    //Formata a data, transforma a data para mostrar a hora e o dia locais (Brasília)
    const formatData = (data: string) => {
        const dataLocal = new Date(data).toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });
        const dataSplit = dataLocal.split('-');
        return `${dataSplit}`;
    }

    const somarEntrega = ()=>{
        setQuantidadeEntregar (prev=>prev+1);
    }
    const subtrairEntrega = ()=>{
        if (quantidadeEntregar > 1) setQuantidadeEntregar (prev=>prev-1);
    }
    const somarRetirada = ()=>{
        setQuantidadeRetirar (prev=>prev+1);
    }

    const subtrairRetirada = ()=>{
        if (quantidadeRetirar > 1) setQuantidadeRetirar (prev=>prev-1);
    }
    

    const entregar = async () => {

        console.log("ESTOU ENTREGANDO")
        try {
            setBotaoClicado('entregar');
            setSubmitting(true);
            console.log("ID COLABORADOR", colaborador?.id)
            const response = await api.post('/registro', {
                colaborador_id: colaborador?.id,
                status: 'entregou',
                quantidade: quantidadeEntregar
            });
            if (response.data.message === 'error') {
                setSubmitting(false);
                const errorCode = response.data.code
                setMostrarPopUpNaoAutorizado(errorCode);
            } else {
                setSubmitting(false);
                setMostrarPopUpSucesso(true);
            }
            console.log(response);
            setSubmitting(false);
        } catch (error) {
            setSubmitting(false);
            console.log(error);
        }
    }

    const entregaExtra = async () => {

        console.log("ESTOU ENTREGANDO")
        try {
            setBotaoClicado('entregar');
            setSubmitting(true);
            console.log("ID COLABORADOR", colaborador?.id)
            const response = await api.post('/registro', {
                colaborador_id: colaborador?.id,
                status: 'entrega extra',
                quantidade: quantidadeEntregar
            });
            if (response.data.message === 'error') {
                setSubmitting(false);
                const errorCode = response.data.code
                setMostrarPopUpNaoAutorizado(errorCode);
            } else {
                setSubmitting(false);
                setMostrarPopUpSucesso(true);
            }
            console.log(response);
            setSubmitting(false);
        } catch (error) {
            setSubmitting(false);
            console.log(error);
        }
    }

    const retirar = async () => {
        try {
            setBotaoClicado('retirar');
            setSubmitting(true);
            const response = await api.post('/registro', {
                colaborador_id: colaborador?.id,
                status: 'retirou',
                quantidade: quantidadeRetirar

            });
            console.log(response.data);
            if (response.data.message === 'error') {
                setSubmitting(false);
                const errorCode = response.data.code
                setMostrarPopUpNaoAutorizado(errorCode);
            } else {
                setSubmitting(false);
                setMostrarPopUpSucesso(true);
            }
        } catch (error) {
            setSubmitting(false);
            console.log(error);
        }
    }

    const entregarERetirar = async () => {

        setBotaoClicado('entregar e retirar');
        setSubmitting(true);
        try {
            await entregar();

        } catch (error) {
            if (!error) console.log("É NUM TEVE ERRO")
            console.log(error)
        }

        try {
            await retirar();
        } catch (error) {
            console.log(error)
        }
    }

    return (
        //Card do colaborador
        <div className="flex flex-col p-4 justify-evenly w-[80%] bg-cinza-claro shadow-md shadow-gray-900 rounded-xl md:w-[60%] lg:px-16">

            {/**Voltar*/}
            <button className=" w-8 h-8 flex justify-center items-center hover:cursor-pointer" onClick={() => { setColaborador(null) }}><SvgSetaVoltar /></button>

            {/**Info colaborador*/}
            <h1 className="font-poppins-bold text-xl">{String(colaborador?.numero).padStart(3, '0')} - {colaborador?.nome}</h1>
            <h2>Status: <span className={`${ultimoRegistro?.status === 'entregou'
                ? 'text-verde-terciario'
                : 'text-vermelho'}`}>
                {!ultimoRegistro
                    ? 'Usuario sem registro'
                    : capitalize(ultimoRegistro?.status) + ' em ' + formatData(ultimoRegistro?.data)}</span></h2>

            {/**Acoes*/}
            <div className="flex flex-col h-[30vh] justify-center gap-4">
                <ServiceButton
                    name='Entregar e retirar'
                    color="laranja"
                    textColor="white"
                    hoverColor="laranja-hover"
                    onClickFunction={entregarERetirar}
                    submitting={submitting} />
                <ServiceButton
                    name='Entregar'
                    textColor="white"
                    hoverColor="verde-secundario-hover"
                    onClickFunction={entregar}
                    submitting={submitting} />
                <ServiceButton
                    name='Retirar'
                    color="verde-terciario"
                    textColor="white"
                    hoverColor="verde-terciario-hover"
                    onClickFunction={retirar}
                    submitting={submitting} />
                <ServiceButton
                    name='Entrega extra'
                    color="verde-primario"
                    textColor="white"
                    hoverColor="verde-terciario-hover"
                    onClickFunction={entregaExtra}
                    submitting={submitting} />
            </div>

            <div className="flex flex-row">
            <button className="border-2 border-red-500 p-1" onClick={subtrairEntrega}>
                -
            </button>
            <button>
                Quantidade Entrega: {quantidadeEntregar}
            </button>
            <button className="border-2 border-red-500 p-1" onClick={somarEntrega}>
                +
            </button>
            </div>
            <div className="flex flex-row">
            <button className="border-2 border-red-500 p-1" onClick={subtrairRetirada}>
                -
            </button>
            <button>
                Quantidade Retirada: {quantidadeRetirar}
            </button>
            <button className="border-2 border-red-500 p-1" onClick={somarRetirada}>
                +
            </button>
            </div>
            {/**Historico*/}
            <Link
                href={`/historicoColaborador/${colaborador?.id}`}
                className='bg-white text-black flex justify-center items-center w-[100%] py-1.5 rounded-md font-poppins-regular hover:cursor-pointer shadow-neutral-900 shadow-sm'>
                Ver histórico
            </Link>

        </div>
    );
}