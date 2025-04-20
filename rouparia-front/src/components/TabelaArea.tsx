"use client";

import api from "@/services/axios";
import { Pencil, PlusIcon, Trash } from "lucide-react";
import { Area } from "@/types/area";

interface TabelaAreasProps {
  areas: Area[];
  setIsModalOpen: (isOpen: boolean) => void;
}

const onEditar = async (area: Area) => {
  return;
};

const onExcluir = async (id: number) => {
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

export default function TabelaAreas({ areas, setIsModalOpen }: TabelaAreasProps) {
  if (!areas || areas.length === 0) {
    return <p className="text-center text-gray-500">Nenhuma área cadastrada</p>;
  }

  return (
    <table className="w-[80vw] mx-auto mt-6 border border-gray-200 rounded-xl overflow-hidden">
      <thead>
        <tr className="bg-[#F2F2F2] text-left">
          <th className="px-4 py-3 font-poppins-semiBold">Nome da Área</th>
          <th className="px-4 py-3 font-poppins-semiBold">
            Ações
            <button
            onClick={() => setIsModalOpen(true)}
              className="text-verde-primario hover:text-verde-primario-hover cursor-pointer"
              title="Excluir"
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
                onClick={() => onExcluir(area.id)}
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
  );
}
