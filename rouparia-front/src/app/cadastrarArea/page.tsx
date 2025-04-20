"use client";
import FormInput from "@/components/FormInput";
import HeaderHistoricoColaborador from "@/components/HeaderHistoricoColaborador";
import SubmitButton from "@/components/SubmitButton";
import api from "@/services/axios";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { use, useEffect, useState } from "react";
import TabelaAreas from "@/components/TabelaArea";
import { Area } from "@/types/area";
import PopUpCadastrarArea from "@/components/popUpCadastrarArea";

export default function CadastrarArea() {
  const [isErrorVisible, setIsErrorVisible] = useState(true);
  const [areas, setAreas] = useState<[] | Area[]>([]); // Áreas que serão exibidas no dropDown
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Função para mostrar o erro por 4 segundos

  const fetchAreas = async () => {
    try {
      const response = await api.get("/area");
      if (response.data) return response.data;
    } catch (error) {
      alert(`Erro ao carregar áreas, recarregue a página\n${error}`);
    }
  }

  useEffect(() => {
    const carregarAreas = async () => {
      const areasData = await fetchAreas();
      if (areasData) setAreas(areasData);
    };

    carregarAreas()
  }, []);

  return (
    <div className="flex flex-col w-[100vw] h-[100vh] items-center">
      {/* Header */}
      <HeaderHistoricoColaborador tipo="cadastro" />

      {/* Conteúdo principal */}
      <div className="flex w-full justify-center overflow-y-auto">
        {isModalOpen && (<PopUpCadastrarArea setIsModalOpen={setIsModalOpen} />)}
          <TabelaAreas areas={areas} setIsModalOpen={setIsModalOpen}/>
        </div>
      </div>
  );
}
