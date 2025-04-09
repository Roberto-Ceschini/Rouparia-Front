import { Colaborador } from "@/types/colaborador";
import ServiceButton from "./ServiceButton";
import SvgSetaVoltar from "./SvgSetaVoltar";
import Link from "next/link";
import { use, useEffect, useState } from "react";
import api from "@/services/axios";
import path from "path";
import { Registro } from "@/types/registro";
import SvgButtonPlus from "./SvgButtonPlus";
import SvgButtonMenos from "./SvgButtonMenos";
import SubtrairButton from "./SubtrairButton";
import SomarButton from "./SomarButton";
import { useRouter } from "next/navigation";
import { useColaboradorContext } from "@/contexts/colaboradorContext";

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
    const router = useRouter();
    
    const ultimoRegistro: Registro | null = colaborador?.registros ?? null;
    //Estado que controla o envio do formulário
    const [submitting, setSubmitting] = useState(false);
    const [quantidadeEntregar, setQuantidadeEntregar] = useState(1);
    const [quantidadeRetirar, setQuantidadeRetirar] = useState(1);

    //Formata a data, transforma a data para mostrar a hora e o dia locais (Brasília)
    const formatData = (data: string) => {
        const dataLocal = new Date(data).toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });
        const dataSplit = dataLocal.split('-');
        return `${dataSplit}`;
    }

    const somarEntrega = () => {
        setQuantidadeEntregar(prev => prev + 1);
    }
    const subtrairEntrega = () => {
        if (quantidadeEntregar > 1) setQuantidadeEntregar(prev => prev - 1);
    }
    const somarRetirada = () => {
        setQuantidadeRetirar(prev => prev + 1);
    }

    const subtrairRetirada = () => {
        if (quantidadeRetirar > 1) setQuantidadeRetirar(prev => prev - 1);
    }


    const entregar = async () => {

        try {
            setBotaoClicado('entregar');
            setSubmitting(true);
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
            setSubmitting(false);
        } catch (error) {
            setSubmitting(false);
        }
    }

    const entregaExtra = async () => {

        try {
            setBotaoClicado('entregar');
            setSubmitting(true);
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
            setSubmitting(false);
        } catch (error) {
            setSubmitting(false);
            alert(error);
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
            alert(error);
        }
    }

    const entregarERetirar = async () => {

        setBotaoClicado('entregar e retirar');
        setSubmitting(true);
        try {
            await entregar();

        } catch (error) {
            alert(error)
        }

        try {
            await retirar();
        } catch (error) {
            alert(error)
        }
    }

    const verHistorico = ()=>{
        router.push(`/historicoColaborador/${colaborador?.id}`);
    }

    const {setColaboradorContext} = useColaboradorContext();

    const voltar = () =>{
        setColaboradorContext ({
            nome: null,
            numero: null,
            area: null,
            vinculo: null,
        })
        setColaborador(null);
    }

    //TESTES

    return (
        //Card do colaborador
        <div className="flex flex-col p-4 5xl:p-2 justify-evenly w-[90%] bg-cinza-claro shadow-md shadow-gray-900 rounded-xl md:w-[70%] lg:px-16">

            {/**Voltar*/}
            <button className=" w-8 h-8 flex justify-center items-center hover:cursor-pointer" onClick={() => voltar()}><SvgSetaVoltar /></button>

            {/**Info colaborador*/}
            <h1 className="font-poppins-bold text-xl">{String(colaborador?.numero).padStart(3, '0')} - {colaborador?.nome}</h1>
            <h2>Último status: <span className={`${ultimoRegistro?.status === 'entregou'
                ? 'text-verde-terciario'
                : 'text-vermelho'}`}>
                {!ultimoRegistro
                    ? 'Usuario sem registro'
                    : capitalize(ultimoRegistro?.status) + ` ${ultimoRegistro.quantidade === 1 ?
                     `${ultimoRegistro.quantidade} uniforme` : `${ultimoRegistro.quantidade} uniformes`}` 
                     + ' em ' 
                     + formatData(ultimoRegistro?.data)}
                     </span></h2>

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

            {/*Selecionar quantidade entregue*/}
            <div className="flex flex-row items-center font-semibold justify-between">
                <p>Quantidade Entregue:</p>
                <div className="flex flex-row items-center max-w-[40%] w-[25%] justify-between">
                    <SubtrairButton onClick={subtrairEntrega} />
                    <p>{quantidadeEntregar}</p>
                    <SomarButton onClick={somarEntrega} />
                </div>
            </div>
            
            {/*Selecionar quantidade Retirada*/}
            <div className="flex flex-row items-center font-semibold mt-1.5 mb-3 justify-between">
                <p>Quantidade Retirada:</p>
                <div className="flex flex-row items-center max-w-[40%] w-[25%] justify-between">
                    <SubtrairButton onClick={subtrairRetirada} />
                    <p>{quantidadeRetirar}</p>
                    <SomarButton onClick={somarRetirada} />
                </div>
            </div>

            {/**Historico*/}
            <button
                onClick={verHistorico}
                className='bg-white text-black border border-gray-200 flex justify-center items-center w-[100%] py-1.5 rounded-md font-poppins-regular hover:cursor-pointer'>
                Ver histórico
            </button>

        </div>
    );
}