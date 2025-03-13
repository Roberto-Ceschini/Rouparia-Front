"use client";

import { Colaborador } from "@/types/colaborador"; // ajuste o caminho conforme sua estrutura
import { Registro } from "@/types/registro"; // ajuste o caminho conforme sua estrutura

interface TabelaRegistrosProps {
  colaborador: Colaborador;
}

export default function TabelaRegistros({ colaborador }: TabelaRegistrosProps) {
  const registros: Registro[] = colaborador.registros;

  return (
    <table className="min-w-full border-collapse">
      <thead>
        <tr>
          <th className="border px-4 py-2">Número</th>
          <th className="border px-4 py-2">Nome</th>
          <th className="border px-4 py-2">Área</th>
          <th className="border px-4 py-2">Status</th>
          <th className="border px-4 py-2">Data</th>
        </tr>
      </thead>
      <tbody>
        {registros.map((registro) => (
          <tr key={registro.id} className="hover:bg-verde-secundario-hover/30">
            <td className="border px-4 py-2">{colaborador.numero}</td>
            <td className="border px-4 py-2">{colaborador.nome}</td>
            <td className="border px-4 py-2">
              {colaborador.area?.nome || "N/A"}
            </td>
            <td className="border px-4 py-2">{registro.status}</td>
            <td className="border px-4 py-2">{registro.data}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
