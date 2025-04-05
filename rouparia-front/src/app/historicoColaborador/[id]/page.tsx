"use client";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import api from "@/services/axios";
import HeaderHistorico from "@/components/HeaderHistoricoColaborador";
import HeaderHistoricoColaborador from "@/components/HeaderHistoricoColaborador";
import TabelaRegistros from "@/components/TabelaRegistros";
import { Colaborador } from "@/types/colaborador";

export default function HistoricoColaborador() {
  const params = useParams();
  const searchParams = useSearchParams();

  const id = params.id;
  const nome = searchParams.get('nome');
  const numero = searchParams.get('numero');
  const area = searchParams.get('area');
  const vinculo = searchParams.get('vinculo');

  const [colaborador, setColaborador] = useState<Colaborador | null>(null);

  // Função para carregar o colaborador a partir do id
  const fecthRegistros = async () => {
    try {
      const response = await api.get(`/colaborador/id/${id}`);
      console.log(response.data);
      if (response.data) {
        setColaborador(response.data);
      }
    } catch (error) {
      console.log("Erro ao buscar colaborador:", error);
    }
  };

  // Carrega o colaborador ao abrir a página
  useEffect(() => {
    fecthRegistros();
  }, [id]);

  // Aguarda o carregamento do colaborador antes de renderizar
  if (!colaborador) {
    return <p>Carregando...</p>;
  }

  //Pagina principal
  return (
    //Body
    <div className="flex flex-col w-[100vw] h-[100vh] items-center">
      <HeaderHistoricoColaborador />
      <div className="mt-10 w-[100%] flex justify-center">
        <TabelaRegistros colaborador={colaborador}/> 
      </div>
    </div>
  );
}
