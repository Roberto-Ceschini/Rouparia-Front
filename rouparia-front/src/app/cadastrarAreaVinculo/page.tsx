"use client";
import HeaderHistoricoColaborador from "@/components/HeaderHistoricoColaborador";
import api from "@/services/axios";
import { use, useEffect, useState } from "react";
import TabelaAreas from "@/components/TabelaArea";
import { Area } from "@/types/area";
import PopUpCadastrarArea from "@/components/popUpCadastrarArea";
import { useSearchParams } from "next/navigation";

export default function CadastrarAreaVinculo() {
  const [isErrorVisible, setIsErrorVisible] = useState(true);
  const [areas, setAreas] = useState<[] | Area[]>([]); // Áreas que serão exibidas no dropDown
  const [isModalOpen, setIsModalOpen] = useState(false);

  const useParams= useSearchParams();
  const tipo = useParams.get('tipo');

  // Função para mostrar o erro por 4 segundos

  const fetchAreas = async () => {
    try {
      const response = await api.get("/area");
      if (response.data) return response.data;
    } catch (error) {
      alert(`Erro ao carregar áreas, recarregue a página\n${error}`);
    }
  }

  const fetchVinculos = async () => {
    try { 
      const response = await api.get("/vinculo");
      if (response.data) return response.data;
    }
    catch (error) {
      alert(`Erro ao carregar vínculos, recarregue a página\n${error}`);
    }
  }

  useEffect(() => {
    const carregarDados = async () => {
      if (tipo === 'area') {
        const areasData = await fetchAreas();
        if (areasData) setAreas(areasData);
      }
      else if (tipo === 'vinculo') {
      const areasData = await fetchVinculos();
      if (areasData) setAreas(areasData);
    };
  }

    carregarDados()
  }, []);

  return (
    <div className="flex flex-col w-[100vw] h-[100vh] items-center">
      {/* Header */}
      <HeaderHistoricoColaborador tipo="cadastro" />

      {/* Conteúdo principal */}
      <div className="flex w-full justify-center overflow-y-auto">
        {isModalOpen && (<PopUpCadastrarArea setIsModalOpen={setIsModalOpen} tipo={tipo}/>)}
          <TabelaAreas areas={areas} setIsModalOpen={setIsModalOpen} tipo={tipo}/>
        </div>
      </div>
  );
}
