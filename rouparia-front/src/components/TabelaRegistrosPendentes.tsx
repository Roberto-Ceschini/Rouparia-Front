"use client";

import { ColaboradorSimples } from "@/types/colaboradorSimplificado";
import ColunaTabela from "./ColunaTabela";

interface TabelaRegistrosProps {
    colaboradores: ColaboradorSimples[];
}

const formatData = (data: string) => {
    const options: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: "America/Sao_Paulo"
    };
    return new Date(data).toLocaleString("pt-BR", options);
}

export default function TabelaRegistros({ colaboradores }: TabelaRegistrosProps) {
    if (!colaboradores || colaboradores.length === 0) {
        return <p>Nenhum colaborador pendente</p>;
    }

    return (
        <>
            {/* Versão Desktop */}
            <table className="hidden lg:table w-[80vw]">
                <thead className="sticky top-[10vh]">
                    <tr className="bg-[#F2F2F2] shadow-md rounded-l-xl rounded-r-xl">
                        <th className="px-4 py-2 font-poppins-semiBold rounded-l-xl">Número</th>
                        <th className="px-4 py-2 font-poppins-semiBold">Nome</th>
                        <th className="px-4 py-2 font-poppins-semiBold">Área</th>
                        <th className="px-4 py-2 font-poppins-semiBold">Vínculo</th>
                        <th className="px-4 py-2 font-poppins-semiBold">Status</th>
                        <th className="px-4 py-2 font-poppins-semiBold">Quantidade</th>
                        <th className="px-4 py-2 font-poppins-semiBold rounded-r-xl">Data</th>
                    </tr>
                </thead>
                <tbody className="overflow-y-auto">
                    {colaboradores.map((colaborador) => {
                        const [registro] = colaborador.registros;
                        return (
                            <tr 
                                key={colaborador.id} 
                                className="hover:bg-verde-secundario-hover/30 shadow-md shadow-verde-terciario-hover/50 rounded-l-xl rounded-r-xl"
                            >
                                <ColunaTabela conteudo={String(colaborador.numero).padStart(3, '0')} coluna="numero" />
                                <ColunaTabela conteudo={colaborador.nome} coluna="nome" />
                                <ColunaTabela conteudo={colaborador.area || "N/A"} coluna="area" />
                                <ColunaTabela conteudo={colaborador.vinculo || "N/A"} coluna="vinculo" />
                                <ColunaTabela conteudo={registro.status} coluna="status" />
                                <ColunaTabela conteudo={registro.quantidade} coluna="quantidade" />
                                <ColunaTabela conteudo={formatData(registro.data)} coluna="data" />
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            {/* Versão Mobile */}
            <div className="lg:hidden space-y-4 w-[90vw] mx-auto">
                {colaboradores.map((colaborador) => {
                    const [registro] = colaborador.registros;
                    return (
                        <div
                            key={colaborador.id}
                            className="bg-white p-4 rounded-xl shadow-md shadow-verde-terciario-hover/50"
                        >
                            <p className="font-poppins-semiBold text-base text-[#188038] mb-2">
                                {String(colaborador.numero).padStart(3, "0")} - {colaborador.nome}
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
                    );
                })}
            </div>
        </>
    );
}