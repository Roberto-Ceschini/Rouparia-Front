"use client";

import { Colaborador } from "@/types/colaborador"; // ajuste o caminho conforme sua estrutura
import { Registro } from "@/types/registro"; // ajuste o caminho conforme sua estrutura
import LinhaTabela from "./ColunaTabela";
import ColunaTabela from "./ColunaTabela";
import { ColaboradorSimples } from "@/types/colaboradorSimplificado";

interface TabelaRegistrosProps {
    colaborador: ColaboradorSimples;
}

//Formata a data, transforma a data para mostrar a hora e o dia locais (Brasília)
const formatData = (data: string) => {
    const dataLocal = new Date(data).toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });
    const dataSplit = dataLocal.split('-');
    return `${dataSplit}`;
}

export default function TabelaRegistros({ colaborador }: TabelaRegistrosProps) {
    const registros: Registro[] = colaborador.registros;

    if (registros.length === 0) return (
        <p>Colaborador {colaborador.nome} sem Registros</p>
    )

    return (
        <>
            <table className="hidden md:table w-[80vw]">
                <thead className="sticky top-[10vh]">
                    <tr className="bg-[#F2F2F2] shadow-md rounded-l-xl rounded-r-xl">
                        <th className="px-4 py-2 font-poppins-semiBold rounded-l-xl">Número</th>
                        <th className="px-4 py-2 font-poppins-semiBold	">Nome</th>
                        <th className="px-4 py-2 font-poppins-semiBold	">Área</th>
                        <th className="px-4 py-2 font-poppins-semiBold	">Vínculo</th>
                        <th className="px-4 py-2 font-poppins-semiBold	">Status</th>
                        <th className="px-4 py-2 font-poppins-semiBold	">Quantidade</th>
                        <th className="px-4 py-2 font-poppins-semiBold rounded-r-xl	">Data</th>
                    </tr>
                </thead>
                <tbody className="overflow-y-auto">
                    {registros.map((registro) => (
                        <tr key={registro.id} className="hover:bg-verde-secundario-hover/30 shadow-md shadow-verde-terciario-hover/50 rounded-l-xl rounded-r-xl">
                            <ColunaTabela conteudo={String(colaborador?.numero).padStart(3, '0')} coluna="numero" />
                            <ColunaTabela conteudo={colaborador.nome} coluna="nome" />
                            <ColunaTabela conteudo={colaborador.area || "N/A"} coluna="area" />
                            <ColunaTabela conteudo={colaborador.vinculo || "N/A"} coluna="vinculo" />
                            <ColunaTabela conteudo={registro.status} coluna="status" />
                            <ColunaTabela conteudo={registro.quantidade} coluna="quantidade" />
                            <ColunaTabela conteudo={formatData(registro.data)} coluna="data" />
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Versão Mobile (cards empilhados) */}
            <div className="md:hidden space-y-4 w-[90vw] mx-auto">
                {registros.map((registro) => (
                    <div
                        key={registro.id}
                        className="bg-white p-4 rounded-xl shadow-md shadow-verde-terciario-hover/50"
                    >
                        <p className="font-poppins-semiBold text-base text-[#188038] mb-2">
                            {String(colaborador?.numero).padStart(3, "0")} - {colaborador.nome}
                        </p>

                        <div className="text-sm space-y-1">
                            <div><strong>Área:</strong> {colaborador.area || "N/A"}</div>
                            <div><strong>Vínculo:</strong> {colaborador.vinculo || "N/A"}</div>
                            <div>
                                <strong>Status:</strong>{" "}
                                <span className={registro.status === "Retirou" ? "text-red-500" : "text-gray-500"}>
                                    {registro.status}
                                </span>
                            </div>
                            <div><strong>Quantidade:</strong> {registro.quantidade}</div>
                            <div><strong>Data:</strong> {formatData(registro.data)}</div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
