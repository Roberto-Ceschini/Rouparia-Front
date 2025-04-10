"use client"
import HeaderHistoricoColaborador from "@/components/HeaderHistoricoColaborador";
import TabelaRegistrosPendentes from "@/components/TabelaRegistrosPendentes";
import api from "@/services/axios";
import { ColaboradorSimples } from "@/types/colaboradorSimplificado";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";

export default function Pendencias() {

    //-------------------VARIAVEIS--------------------

    //Rota
    const router = useRouter()

    //Paginacao
    const [paginaAtual, setPaginaAtual] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [nextPage, setNextPage] = useState<number | null>(null);
    const [prevPage, setPrevPage] = useState<number | null>(null);
    const limite = 3;

    //colaborador
    const [colaboradores, setColaboradores] = useState<ColaboradorSimples[] | []>([]);

    //TESTES 
    useEffect(() => {
        console.log("COABORADORES\n", colaboradores)
    }, [colaboradores])

    //----------------FUNCOES-------------------

    //PAGINACAO
    const mudarPagina = (pagina: number | null) => {
        if (pagina) setPaginaAtual(pagina);
        else return;
    }

    const fetchPendecias = async () => {
        try {
            const response = await api.get(`/colaborador/pendentes?page=${paginaAtual}&limit=${limite}`);
            console.log(response)
            if (response) {
                const colaboradoresFormatados = formatarColaboradores(response.data.colaboradores);
                setColaboradores(colaboradoresFormatados);
                setTotalPages(response.data.totalPages);
                setNextPage(response.data.nextPage);
                setPrevPage(response.data.prevPage);
                setPaginaAtual(response.data.currentPage);
            }
            return response;
        } catch (error) {
            alert(error);
        }
    }

    const formatarColaboradores = (colaboradores: any[]): ColaboradorSimples[] => {
        return colaboradores.map(colaborador => ({
            id: colaborador.id,
            numero: colaborador.numero,
            nome: colaborador.nome,
            area: colaborador.area?.nome || '', // Extrai o nome da área
            vinculo: colaborador.vinculo?.nome || '', // Extrai o nome do vínculo
            registros: colaborador.registros.map((registro: any) => ({
                data: registro.data,
                status: registro.status,
                quantidade: registro.quantidade
            }))
        }));
    };

    const verHistorico = (idColaborador: string) => {
        router.push(`/historicoColaborador/${idColaborador}`);
    }

    //-------------------CARREGAR INFORMACOES------------------
    useEffect(() => {

        const buscarPendencias = async () => {
            await fetchPendecias()
        }

        buscarPendencias();
    }, [paginaAtual])

    if (!colaboradores) return (
        <p className="flex self-center">Carregando...</p>
    )
    //PAGINA
    return (

        <div className="flex flex-col w-[100vw] h-[100vh] items-center overflow-y-auto">

            {/**Header*/}
            <HeaderHistoricoColaborador isPendencias={true} />

            {/**Tabela*/}
            <div className="mt-10 w-[100%] flex justify-center">
                <TabelaRegistrosPendentes colaboradores={colaboradores} />
            </div>

            {/**Mudar de pagina */}
            <div className="flex flex-row mt-4 gap-4 pb-2">
                <button className="font-bold cursor-pointer" onClick={() => mudarPagina(prevPage)}>{'<'}</button>
                <p>Página {paginaAtual} de {totalPages}</p>
                <button className="font-bold cursor-pointer" onClick={() => mudarPagina(nextPage)}>{'>'}</button>
            </div>
        </div>
    );
}