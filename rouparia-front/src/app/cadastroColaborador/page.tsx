"use client"
import HeaderHistoricoColaborador from "@/components/HeaderHistoricoColaborador";
import TabelaColaboradores from "@/components/TabelaColaboradores";
import api from "@/services/axios";
import { Colaborador } from "@/types/colaborador";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

export default function CadastroColaborador(){

    const [colaboradoresOriginais, setColaboradoresOriginais] = useState<Colaborador[] | []>([]);
    const [colaboradoresFiltrados, setColaboradoresFiltrados] = useState<Colaborador[] | []>([]); // Estado que controla os colaboradores

    const [textoBusca, setTextoBusca] = useState("");

    const pesquisar = (texto: string) => {
        const textoFormatado = texto.toLowerCase();
      
        if (textoFormatado.trim() === "") {
          setColaboradoresFiltrados(colaboradoresOriginais);
          return;
        }
      
        let filtradas = colaboradoresOriginais.filter((a) =>
            a.numero.toString().includes(textoFormatado)
        );

        if (filtradas.length === 0) {
            filtradas = colaboradoresOriginais.filter((a) =>
                a.nome.toLowerCase().includes(textoFormatado)
            );
          }
      
        if (filtradas.length === 0) {
          filtradas = colaboradoresOriginais.filter((a) =>
            a.area?.nome.toLowerCase().includes(textoFormatado)
          );
        }
      
        if (filtradas.length === 0) {
          filtradas = colaboradoresOriginais.filter((a) =>
            a.vinculo?.nome.toLowerCase().includes(textoFormatado)
          );
        }
      
        setColaboradoresFiltrados(filtradas);
      };
      

    const fetchColaboradores = async () => {
        try {
            const response = await api.get("/colaborador/ordenados");
            if (response.data) return response.data;
        } catch (error) {
            alert(`Erro ao carregar colaboradores, recarregue a página\n${error}`);
        }
    }

    useEffect(() => {
        const carregarDados = async () => {
            const colaboradores = await fetchColaboradores();
            if (colaboradores) {
                setColaboradoresOriginais(colaboradores)
                setColaboradoresFiltrados(colaboradores)
            }; 
        }

        carregarDados()
    }, []);

    return(
        <div className="flex flex-col w-[100vw] h-[100vh] items-center overflow-y-auto">
            {/* Header */}
            <HeaderHistoricoColaborador tipo="gerenciamento colaborador" />
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
                <TabelaColaboradores colaboradores={colaboradoresFiltrados}/>
            </div>
        </div>
    );
}