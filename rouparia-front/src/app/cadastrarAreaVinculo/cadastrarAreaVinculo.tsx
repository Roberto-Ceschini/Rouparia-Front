"use client";
import HeaderHistoricoColaborador from "@/components/HeaderHistoricoColaborador";
import api from "@/services/axios";
import { Suspense, useEffect, useState } from "react";
import TabelaAreas from "@/components/TabelaArea";
import { Area } from "@/types/area";
import { Search } from "lucide-react";
import { useSearchParams } from "next/navigation";

export default function CadastrarAreaVinculo() {
  //------------VARIAVEIS----------
  const [areasOriginais, setAreasOriginais] = useState<[] | Area[]>([]); // Áreas que serão exibidas no dropDown
  const [areasFiltradas, setAreasFiltradas] = useState<[] | Area[]>([]);
  const [textoBusca, setTextoBusca] = useState("");

  const useParams = useSearchParams();
  const tipo = useParams.get("tipo");

  const pesquisar = (texto: string) => {
    const textoFormatado = texto.toLowerCase();

    if (textoFormatado.trim() === "") {
      setAreasFiltradas(areasOriginais); // Aqui você deve ter salvo as áreas originais em algum lugar
      return;
    }

    const filtradas = areasOriginais.filter((a) =>
      a.nome.toLowerCase().includes(textoFormatado)
    );

    setAreasFiltradas(filtradas);
  };


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
        if (areasData) {
          setAreasOriginais(areasData)
          setAreasFiltradas(areasData);
        };
      }
      else if (tipo === 'vinculo') {
        const areasData = await fetchVinculos();
        if (areasData) {
          setAreasOriginais(areasData)
          setAreasFiltradas(areasData);
        };
      };
    }

    carregarDados()
  }, []);

  return (
    <div className="flex flex-col w-[100vw] h-[100vh] items-center overflow-y-auto">
      {/* Header */}
      <HeaderHistoricoColaborador tipo={tipo === 'area' ? 'gerenciamento areas' : 'gerenciamento vinculos'} />

      <div className="border-2 w-[40vw] h-[5vh] mt-10 border-laranja-hover cursor-pointer items-center px-4 py-2 flex flex-row rounded-2xl">
        <input
          type="text"
          placeholder="Pesquisar"
          className="w-full h-full outline-none border-none text-base"
          value={textoBusca}
          onChange={(e) => {
            const novoTexto = e.target.value;
            setTextoBusca(novoTexto);
            pesquisar(novoTexto);
          }}
        />
        <Search />
      </div>

      {/* Conteúdo principal */}
      <div className="mt-10 flex justify-center">
        <TabelaAreas areas={areasFiltradas} tipo={tipo} />
      </div>
    </div>
  );
}
