"use client";
import { ColaboradorSimples } from "@/types/colaboradorSimplificado";
import { Pencil, PlusIcon, Trash } from "lucide-react";
import { useState } from "react";
import PopUpExcluir from "./PopUpExcluir";
import { Colaborador } from "@/types/colaborador";
import PopUpCadastrarColaborador from "./popUpCadastrarColaborador";

interface TabelaColaboradoresProps {
  colaboradores: Colaborador[];
}

export default function TabelaColaboradores({colaboradores}: TabelaColaboradoresProps) {

    const [isModalExcluirOpen, setIsModalExcluirOpen] = useState(false);
    const [isModalAdicionarOpen, setIsModalAdicionarOpen] = useState(false);
    const [colaborador, setColaborador] = useState<Colaborador | null>(null);
    const [tipo, setTipo] = useState<'editar' | 'cadastrar' | null>(null);

    const onEditar = async (colaborador: Colaborador) => {
        setIsModalAdicionarOpen(true);
        setColaborador(colaborador);
        setTipo('editar');
        return;
    }


    const onExcluir = async (colaborador: Colaborador) => {
        setIsModalExcluirOpen(true);
        setColaborador(colaborador);
        return;
    }

    const onAdicionar = async () => {
        setIsModalAdicionarOpen(true);
        setTipo('cadastrar');
        return;
    }
  if (!colaboradores || colaboradores.length === 0) {
    return (
      <p className="text-center text-gray-500">
        Nenhum colaborador cadastrado
      </p>
    );
  }

  return (
    <>
    {(isModalExcluirOpen && colaborador) && <PopUpExcluir 
    handleTogglePopUp={()=>setIsModalExcluirOpen(false)} 
    colaborador={colaborador} />}

    {isModalAdicionarOpen && <PopUpCadastrarColaborador 
    tipo={tipo} 
    handleTogglePopUp={()=>setIsModalAdicionarOpen(false)} 
    colaborador={colaborador ? colaborador: null}/>}

    <table className="w-[80vw] mx-auto mt-6 border border-gray-200 rounded-xl overflow-hidden">
      <thead>
        <tr className="bg-[#F2F2F2] text-left">
          <th className="px-4 py-3 font-poppins-semiBold">Número</th>
          <th className="px-4 py-3 font-poppins-semiBold">Nome</th>
          <th className="px-4 py-3 font-poppins-semiBold">Área</th>
          <th className="px-4 py-3 font-poppins-semiBold">Vínculo</th>
          <th className="px-4 py-3 font-poppins-semiBold">Pendências</th>
          <th className="px-4 py-3 font-poppins-semiBold">
            Ações
            <button
              onClick={() => onAdicionar()}
              className="ml-2 text-verde-primario hover:text-verde-primario-hover cursor-pointer"
              title="Adicionar"
            >
              <PlusIcon size={20} />
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        {colaboradores.map((colaborador) => (
          <tr
            key={colaborador.numero}
            className="border-t border-gray-200 hover:bg-verde-secundario-hover/30"
          >
            <td className="px-4 py-2">{String(colaborador?.numero).padStart(3, '0')}</td>
            <td className="px-4 py-2">{colaborador.nome}</td>
            <td className="px-4 py-2">{colaborador.area?.nome}</td>
            <td className="px-4 py-2">{colaborador.vinculo?.nome}</td>
            <td className="px-4 py-2">{colaborador.qtd_pendente}</td>
            <td className="px-4 py-2 flex gap-3">
              <button
                onClick={() => onEditar(colaborador)}
                className="text-blue-600 hover:text-blue-800 cursor-pointer"
                title="Editar"
              >
                <Pencil size={20} />
              </button>
              <button
                onClick={() => onExcluir(colaborador)}
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
