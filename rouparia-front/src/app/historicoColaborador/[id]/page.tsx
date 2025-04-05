"use client";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import api from "@/services/axios";
import HeaderHistorico from "@/components/HeaderHistoricoColaborador";
import HeaderHistoricoColaborador from "@/components/HeaderHistoricoColaborador";
import TabelaRegistros from "@/components/TabelaRegistros";
import { Colaborador } from "@/types/colaborador";
import { ColaboradorSimples } from "@/types/colaboradorSimplificado";
import { Registro } from "@/types/registro";

export default function HistoricoColaborador() {
  const params = useParams();
  const searchParams = useSearchParams();

  const id = params.id;
  const nome = searchParams.get('nome');
  const numero = searchParams.get('numero');
  const area = searchParams.get('area');
  const vinculo = searchParams.get('vinculo');
  const paginaAtual = 1;
  const limite = 10;

  const [colaborador, setColaborador] = useState<ColaboradorSimples | null>(null);

  //TESTES 
  useEffect(() => {
    console.log("COABORADOR", colaborador);
  }, [colaborador]);
  

  // Função para carregar o colaborador a partir do id
  const fecthRegistros = async () => {
    try {
      const response = await api.get(`/colaborador/registros/${id}?page=${paginaAtual}&limit=${limite}`);
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
      }
    } catch (error) {
      console.log("Erro ao buscar Registros:", error);
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
