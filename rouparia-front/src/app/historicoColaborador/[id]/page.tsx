"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/services/axios";
import HeaderHistoricoColaborador from "@/components/HeaderHistoricoColaborador";
import TabelaRegistros from "@/components/TabelaRegistros";
import { ColaboradorSimples } from "@/types/colaboradorSimplificado";
import { Registro } from "@/types/registro";
import { useColaboradorContext } from "@/contexts/colaboradorContext";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function HistoricoColaborador() {
  //Pegar dados da Url
  const params = useParams(); //Esse cara pega o []

  //Parametros da URL
  const id = params.id;

  //Paginacao
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [nextPage, setNextPage] = useState<number | null>(null);
  const [prevPage, setPrevPage] = useState<number | null>(null);
  const limite = 15;

  //Colaborador
  const [colaborador, setColaborador] = useState<ColaboradorSimples | null>(null);
  const { colaborador_context } = useColaboradorContext();

   //--------------ANIMCAO--------------
   const [loading, setLoading] = useState(false);

  //TESTES 

  //PAGINACAO
  const mudarPagina = (pagina: number | null) => {
    if (pagina) setPaginaAtual(pagina);
    else return;
  }


  // Função para carregar o colaborador a partir do id
  const fecthRegistros = async () => {
    try {
      setLoading(true)
      const response = await api.get(`/colaborador/registros/${id}?page=${paginaAtual}&limit=${limite}`);
      if (response.data) {
        const colaborador = {
          nome: String(colaborador_context.nome),
          numero: Number(colaborador_context.numero),
          area: String(colaborador_context.area),
          vinculo: String(colaborador_context.vinculo),
          registros: response.data.registros as Registro[]
        }
        setColaborador(colaborador);
        setTotalPages(response.data.totalPages);
        setNextPage(response.data.nextPage);
        setPrevPage(response.data.prevPage);
        setPaginaAtual(response.data.currentPage);
      }
    } catch (error) {
      alert("Erro ao buscar registro! Tente novamente mais tarde")
    }finally{
      setLoading(false);
    }
  };

  // Carrega o colaborador ao abrir a página e ao mudar de pagina
  useEffect(() => {
    fecthRegistros();
  }, [id, paginaAtual]);

  // Aguarda o carregamento do colaborador antes de renderizar
  if (!colaborador) {
    return <div className="flex w-[100vw] h-[100vh] justify-center items-center">
      <DotLottieReact
        src="\assets\animations\AnimBall.lottie"
        loop
        autoplay
        style={{ width: '300px', height: '300px' }}
      />
    </div>
  }

  //Pagina principal
  return (
    //Body
    <div className="flex flex-col w-[100vw] h-[100vh] items-center overflow-y-auto">
      {/**Header*/}
      <HeaderHistoricoColaborador tipo="historico" />

      {loading ? (
        <div className="flex items-center justify-center w-[100vw] h-[100vh]">
         <DotLottieReact
         src="\assets\animations\AnimBall.lottie"
         loop
         autoplay
         style={{ width: '300px', height: '300px' }}
     />
     </div>
      ): (
      <div className="mt-10 w-[100%] flex justify-center">
        <TabelaRegistros colaborador={colaborador} />
      </div>
    )}

      {/**Mudar de pagina */}
      <div className="flex flex-row mt-4 gap-4 pb-2">
        <button className="font-bold cursor-pointer" onClick={() => mudarPagina(prevPage)}>{'<'}</button>
        <p>Página {paginaAtual} de {totalPages}</p>
        <button className="font-bold cursor-pointer" onClick={() => mudarPagina(nextPage)}>{'>'}</button>
      </div>
    </div>
  );
}
