"use client";

import { Pencil, PlusIcon, Trash } from "lucide-react";
import { useState } from "react";
import PopUpExcluir from "./PopUpExcluir";
import { Colaborador } from "@/types/colaborador";
import PopUpCadastrarColaborador from "./popUpCadastrarColaborador";

interface TabelaColaboradoresProps {
  colaboradores: Colaborador[];
}

export default function TabelaColaboradores({
  colaboradores,
}: TabelaColaboradoresProps) {
  const [isModalExcluirOpen, setIsModalExcluirOpen] = useState(false);
  const [isModalAdicionarOpen, setIsModalAdicionarOpen] = useState(false);
  const [colaborador, setColaborador] = useState<Colaborador | null>(null);
  const [tipo, setTipo] = useState<"editar" | "cadastrar" | null>(null);
  const lastNumber = (colaboradores.findLast(() => true)?.numero || 0) + 1; // Pega o último número cadastrado

  const onEditar = async (colaborador: Colaborador) => {
    setIsModalAdicionarOpen(true);
    setColaborador(colaborador);
    setTipo("editar");
    return;
  };

  const onExcluir = async (colaborador: Colaborador) => {
    setIsModalExcluirOpen(true);
    setColaborador(colaborador);
    return;
  };

  const onAdicionar = async () => {
    setIsModalAdicionarOpen(true);
    setTipo("cadastrar");
    return;
  };


  if (!colaboradores || colaboradores.length === 0) {
    return (
      <>
        {isModalAdicionarOpen && (
          <PopUpCadastrarColaborador
            tipo={tipo}
            handleTogglePopUp={() => setIsModalAdicionarOpen(false)}
            colaborador={colaborador ? colaborador : null}
            lastNumber={lastNumber}
          />
        )}
        <button
          onClick={() => onAdicionar()}
          className="ml-2 text-verde-primario flex flex-row hover:text-verde-primario-hover cursor-pointer"
          title="Adicionar"
        >
          Nenhum colaborador cadastrado
          <PlusIcon size={20} />
        </button>
      </>
    );
  }

  return (
    <>
      {isModalExcluirOpen && colaborador && (
        <PopUpExcluir
          handleTogglePopUp={() => setIsModalExcluirOpen(false)}
          colaborador={colaborador}
        />
      )}

      {isModalAdicionarOpen && (
        <PopUpCadastrarColaborador
          tipo={tipo}
          handleTogglePopUp={() => setIsModalAdicionarOpen(false)}
          colaborador={colaborador ? colaborador : null}
          lastNumber={lastNumber}
        />
      )}

      {/* Versão Desktop */}
      <table className="hidden lg:table w-[90vw]">
        <thead className="sticky top-[10vh] xl:top-[9.2vh] text-left">
          <tr className="bg-[#F2F2F2] shadow-md rounded-l-xl rounded-r-xl">
            <th className="px-4 py-2 font-poppins-semiBold">Número</th>
            <th className="px-4 py-2 font-poppins-semiBold">Nome</th>
            <th className="px-4 py-2 font-poppins-semiBold">Área</th>
            <th className="px-4 py-2 font-poppins-semiBold">Vínculo</th>
            <th className="px-4 py-2 font-poppins-semiBold">Pendências</th>
            <th className="px-4 py-2 font-poppins-semiBold">
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
              <td className="px-4 py-2">
                {String(colaborador?.numero).padStart(3, "0")}
              </td>
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

      {/* Versão Mobile */}
      <div className="lg:hidden space-y-4 w-[90vw] mx-auto overflow-y-auto">
        <div className="flex justify-between items-center">
          <h2 className="font-poppins-semiBold text-lg">Colaboradores</h2>
          <button
            onClick={() => onAdicionar()}
            className="text-verde-primario hover:text-verde-primario-hover"
            title="Adicionar"
          >
            <PlusIcon size={24} />
          </button>
        </div>

        {colaboradores.map((colaborador) => (
          <div
            key={colaborador.numero}
            className="bg-white p-4 rounded-xl shadow-md shadow-verde-terciario-hover/50"
          >
            <p className="font-poppins-semiBold text-base text-[#188038] mb-2">
              {String(colaborador.numero).padStart(3, "0")} - {colaborador.nome}
            </p>

            <div className="text-sm space-y-1 mb-2">
              <div><strong>Área:</strong> {colaborador.area?.nome || "N/A"}</div>
              <div><strong>Vínculo:</strong> {colaborador.vinculo?.nome || "N/A"}</div>
              <div><strong>Pendências:</strong> {colaborador.qtd_pendente}</div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => onEditar(colaborador)}
                className="text-blue-600 hover:text-blue-800"
                title="Editar"
              >
                <Pencil size={20} />
              </button>
              <button
                onClick={() => onExcluir(colaborador)}
                className="text-red-600 hover:text-red-800"
                title="Excluir"
              >
                <Trash size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}  