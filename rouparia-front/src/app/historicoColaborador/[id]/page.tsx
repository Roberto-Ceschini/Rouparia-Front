"use client";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import api from "@/services/axios";
import HeaderHistoricoColaborador from "@/components/HeaderHistoricoColaborador";
import TabelaRegistros from "@/components/TabelaRegistros";
import { ColaboradorSimples } from "@/types/colaboradorSimplificado";
import { Registro } from "@/types/registro";

export default function HistoricoColaborador() {
  //Pegar dados da Url
  const params = useParams(); //Esse cara pega o []
  const searchParams = useSearchParams(); //Esse cara pega as querys

  //Parametros da URL
  const id = params.id;
  const nome = searchParams.get('nome');
  const numero = searchParams.get('numero');
  const area = searchParams.get('area');
  const vinculo = searchParams.get('vinculo');

  //Paginacao
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [nextPage, setNextPage] = useState<number | null>(null);
  const [prevPage, setPrevPage] = useState<number | null> (null);
  const limite = 15;

  //Colaborador
  const [colaborador, setColaborador] = useState<ColaboradorSimples | null>(null);

  //TESTES 
  useEffect(() => {
    console.log("COABORADOR", colaborador);
  }, [colaborador]);


  //PAGINACAO
  const mudarPagina = (pagina: number | null)=>{
    console.log("pagine", pagina)
    if (pagina) setPaginaAtual (pagina);
    else return;
  }


  // Função para carregar o colaborador a partir do id
  const fecthRegistros = async () => {
    try {
      const response = await api.get(`/colaborador/registros/${id}?page=${paginaAtual}&limit=${limite}`);
      console.log("Resposta", response)
      console.log(response.data);
      if (response.data) {
        const colaborador = {
          nome: String(nome),
          numero: Number(numero),
          area: String(area),
          vinculo: String(vinculo),
          registros: response.data.registros as Registro[]
        }
        setColaborador(colaborador);
        setTotalPages(response.data.totalPages);
        setNextPage(response.data.nextPage);
        setPrevPage(response.data.prevPage);
        setPaginaAtual(response.data.currentPage);
      }
    } catch (error) {
      console.log("Erro ao buscar Registros:", error);
    }
  };

  // Carrega o colaborador ao abrir a página e ao mudar de pagina
  useEffect(() => {
    fecthRegistros();
  }, [id, paginaAtual]);

  // Aguarda o carregamento do colaborador antes de renderizar
  if (!colaborador) {
    return <p>Carregando...</p>;
  }

  //Pagina principal
  return (
    //Body
    <div className="flex flex-col w-[100vw] h-[100vh] items-center">
      {/**Header*/}
      <HeaderHistoricoColaborador />
  
      {/**Tabela de Registros*/}
      <div className="mt-10 w-[100%] flex justify-center">
        <TabelaRegistros colaborador={colaborador} />
      </div>

      {/**Mudar de pagina */}
      <div className="flex flex-row mt-4 gap-4">
        <button className="font-bold cursor-pointer" onClick={()=>mudarPagina(prevPage)}>{'<'}</button>
        <p>Página {paginaAtual} de {totalPages}</p>
        <button className="font-bold cursor-pointer" onClick={()=>mudarPagina (nextPage)}>{'>'}</button>
      </div>
    </div>
  );
}
