import { Colaborador } from "@/types/colaborador";
import ServiceButton from "./ServiceButton";
import SvgSetaVoltar from "./SvgSetaVoltar";
import Link from "next/link";
import { use, useEffect, useState } from "react";
import api from "@/services/axios";

interface CardColaboradorProps {
    colaborador: Colaborador | null;
}

//Função que capitaliza a primeira letra de uma string
const capitalize = (s: string) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export default function CardColaborador({ colaborador }: CardColaboradorProps) {

    //Pega o último registro do colaborador
    const lastRegistro = colaborador?.registros?.length ? colaborador.registros[colaborador.registros.length - 1] : null;
    //Estado que controla o envio do formulário
    const [submitting, setSubmitting] = useState(false);

    

    //Formata a data, transforma a data para mostrar a hora e o dia locais (Brasília)
    const formatData = (data: string) => {
        const dataLocal = new Date(data).toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });;
        const dataSplit = dataLocal.split('-');
        return `${dataSplit}`;
    }

    const entregar = async () => {
        try {
            console.log('entregou');
            setSubmitting(true);
            const response = await api.post('/registro', {
                colaborador_id: colaborador?.id,
                status: 'entregou'
            });
            console.log(response);
            setSubmitting(false);
        } catch (error) {
            setSubmitting(false);
            console.log(error);
        }
    }

    const retirar = async () => {
        try {
            setSubmitting(true);
            const response = await api.post('/registro', {
                colaborador_id: colaborador?.id,
                status: 'retirou'
            });
            console.log(response.data);
            setSubmitting(false);
        } catch (error) {
            setSubmitting(false);
            console.log(error);
        }
    }

    const entregarERetirar = async () => {
        try {
            setSubmitting(true);

            await api.post('/registro', {
                colaborador_id: colaborador?.id,
                status: 'entregou'
            })

            await api.post('/registro', {
                colaborador_id: colaborador?.id,
                status: 'retirou'
            });
        } catch (error) {
            setSubmitting(false);
            console.log(error);
        }
    }

    return (
        //Card do colaborador
        <div className="flex flex-col p-4 justify-evenly w-[80%] bg-cinza-claro shadow-md shadow-gray-900 rounded-xl md:w-[60%] lg:px-16">
            {/**Voltar*/}
            <button className=" w-8 h-8 flex justify-center items-center hover:cursor-pointer"><SvgSetaVoltar /></button>
            {/**Info colaborador*/}
            <h1 className="font-poppins-bold text-xl">{String(colaborador?.numero).padStart(3, '0')} - {colaborador?.nome}</h1>
            <h2>Status: <span className={`${lastRegistro?.status === 'entregou'
                ? 'text-green-300'
                : 'text-red-500'}`}>
                {!lastRegistro
                    ? 'Usuario sem registro'
                    : capitalize(lastRegistro?.status) + ' em ' + formatData(lastRegistro?.data)}</span></h2>

            {/**Acoes*/}
            <div className="flex flex-col h-[30vh] justify-center gap-4">
                <ServiceButton
                    name='Entregar e retirar'
                    color="laranja"
                    textColor="white"
                    hoverColor="laranja-hover" 
                    onClickFunction={entregarERetirar}
                    submitting = {submitting}/>
                <ServiceButton
                    name='Entregar'
                    textColor="white"
                    hoverColor="verde-secundario-hover"
                    onClickFunction={entregar} 
                    submitting = {submitting}/>
                <ServiceButton
                    name='Retirar'
                    color="verde-terciario"
                    textColor="white"
                    hoverColor="verde-terciario-hover" 
                    onClickFunction={retirar}
                    submitting = {submitting}/>
            </div>
            {/**Historico*/}
            <ServiceButton name='Ver histórico' color="white" textColor="black" hoverColor="white-hover" />
        </div>
    );
}