"use client";

import api from "@/services/axios";
import { Pencil, PlusIcon, Trash } from "lucide-react";
import { Area } from "@/types/area";
import { Vinculo } from "@/types/vinculo";
import { useEffect, useState } from "react";
import PopUpCadastrarArea from "./popUpCadastrarArea";

interface TabelaAreasProps {
  areas: Area[];
  tipo: string | null;
}

export default function TabelaAreas({ areas, tipo }: TabelaAreasProps) {
 const [isModalOpen, setIsModalOpen] = useState(false);
  const [operacao, setOperacao] = useState<'cadastrar area' | 'cadastrar vinculo' | 'editar area' | 'editar vinculo' | null>(null);
  const [areaVinculo, setAreaVinculo] = useState<Area | Vinculo | null>(null); 
  
  const onEditar = async (areaVinculo: Area) => {
    setIsModalOpen(true);
    setAreaVinculo(areaVinculo);
    setOperacao(tipo === 'area' ? 'editar area' : 'editar vinculo');
    return;
  };
  
  const onCadastrar = async () => {
    setIsModalOpen(true);
    setOperacao(tipo === 'area' ? 'cadastrar area' : 'cadastrar vinculo');
    return;
  }
  const onExcluirArea = async (id: number) => {
    if (confirm("Tem certeza que deseja excluir esta área?")) {
      try {
        await api.delete(`/area/${id}`);
        alert("Área excluída com sucesso!");
        window.location.reload();
      } catch (error: any) {
        alert(
          `Erro ao excluir a área: ${
            error.response?.data?.message || error.message
          }`
        );
      }
    }
  };
  
  const onExcluirVinculo = async (id: number) => {
    if (confirm("Tem certeza que deseja excluir este vínculo?")) {
      try {
        await api.delete(`/vinculo/${id}`);
        alert("Vínculo excluída com sucesso!");
        window.location.reload();
      } catch (error: any) {
        alert(
          `Erro ao excluir a vínculo: ${
            error.response?.data?.message || error.message
          }`
        );
      }
    }
  };

  if (!areas || areas.length === 0) {
    return <p className="text-center text-gray-500">{tipo === 'area' ? 'Nenhuma área cadastrada' : 'Nenhum vínculo cadastrado'}</p>;
  }

  return (
    <>
    {(isModalOpen && operacao) && <PopUpCadastrarArea setIsModalOpen={setIsModalOpen} operacao={operacao} areaVinculo={areaVinculo}/>}
    <table className="w-[80vw] mx-auto mt-6 border border-gray-200 rounded-xl overflow-hidden">
      <thead>
        <tr className="bg-[#F2F2F2] text-left">
          <th className="px-4 py-3 font-poppins-semiBold">{tipo === 'area' ? 'Nome da Área' : 'Nome do Vínculo'}</th>
          <th className="px-4 py-3 font-poppins-semiBold">
            Ações
            <button
            onClick={() => onCadastrar()}
              className="text-verde-primario hover:text-verde-primario-hover cursor-pointer"
              title="Adicionar"
            >
              <PlusIcon size={20} />
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        {areas.map((area) => (
          <tr
            key={area.id}
            className="border-t border-gray-200 hover:bg-verde-secundario-hover/30"
          >
            <td className="px-4 py-2">{area.nome}</td>
            <td className="px-4 py-2 flex gap-3">
              <button
                onClick={() => onEditar(area)}
                className="text-blue-600 hover:text-blue-800 cursor-pointer"
                title="Editar"
              >
                <Pencil size={20} />
              </button>
              <button
                onClick={() => {tipo === 'area'? onExcluirArea(area.id) : onExcluirVinculo(area.id)} }
                className="text-red-600 hover:text-red-800 cursor-pointer"
                title="Excluir"
              >
                <Trash size={20} />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </>
  );
}
