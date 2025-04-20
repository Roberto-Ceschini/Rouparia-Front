"use client"
import HeaderHistoricoColaborador from "@/components/HeaderHistoricoColaborador";
import TabelaColaboradores from "@/components/TabelaColaboradores";
import api from "@/services/axios";
import { use, useEffect, useState } from "react";

export default function cadastroColaborador(){

    const [colaboradores, setColaboradores] = useState([]); // Estado que controla os colaboradores

    const fetchColaboradores = async () => {
        try {
            const response = await api.get("/colaborador/ordenados");
            if (response.data) return response.data;
        } catch (error) {
            alert(`Erro ao carregar colaboradores, recarregue a página\n${error}`);
        }
    }

    useEffect(() => {
        const carregarDados = async () => {
            const colaboradores = await fetchColaboradores();
            if (colaboradores) setColaboradores(colaboradores); 
        }

        carregarDados()
    }, []);

    return(
        <div className="flex flex-col w-[100vw] h-[100vh] items-center overflow-y-auto">
            {/* Header */}
            <HeaderHistoricoColaborador tipo="gerenciamento colaborador" />

            {/* Conteúdo principal */}
            <div className="mt-10 flex justify-center">
                <TabelaColaboradores colaboradores={colaboradores}/>
            </div>
        </div>
    );
}