"use client";
import FormInput from "@/components/FormInput";
import FormInputSelect from "@/components/FormInputSelect";
import HeaderHistoricoColaborador from "@/components/HeaderHistoricoColaborador";
import SubmitButton from "@/components/SubmitButton";
import api from "@/services/axios";
import { Area } from "@/types/area";
import { Vinculo } from "@/types/vinculo";
import { Form, Formik } from "formik";
import { useEffect, useRef, useState } from "react";
import * as Yup from "yup";

export default function CadastrarColaborador() {

 //------------VARIAVEIS----------
  const [isErrorVisible, setIsErrorVisible] = useState(true); //Estado que controla a visibilidade do erro
  const [areas, setAreas] = useState <null | Area[]> (null) //Areas que serao exibidas no dropDown
  const [vinculos, setVinculos] = useState <null | Vinculo[]>(null) //Vinculos que serao exibidas no dropDown

  //-------------FUNCOES----------
  //Função que mostra o erro e depois de 4 segundos esconde
  const handleShowError = () => {
    setTimeout(() => {
      setIsErrorVisible((prev) => !prev);
    }, 4000);
  };

  const fetchAreas = async ()=>{
    try{
        const response = await api.get('/area');
        if (response.data) setAreas (response.data);
    }catch(error){
        alert (`Erro ao carregar áreas, recarregue a página\n${error}`);
    }
  }

  const fetchVinculos = async ()=>{
    try{
        const response = await api.get ('/vinculo')
        if (response.data) setVinculos(response.data);
    }catch(error){
        alert (`Erro ao carregar Vinculos, recarregue a página\n${error}`);
    }
  }

  const cadastrarColaborador = (values: any) => {};

  //Carrega os recursos iniciais da pagina
  useEffect (()=>{

    const carregarRecursos = async ()=>{
        await fetchVinculos();
        await fetchAreas ();
    }
    carregarRecursos();

  }, [])

  return (
    //Body
    <div className="flex flex-col w-[100vw] h-[100vh] items-center">
      {/**Header*/}
      <HeaderHistoricoColaborador tipo="cadastro" />

      {/**Conteudo principal*/}
      <div className="flex border-2 w-[100%] h-[100%] justify-center items-center">
        {/**Caixa Formulario*/}
        <div className="flex flex-col p-2 gap-4 justify-evenly w-[80%] bg-verde-terciario rounded-xl lg:py-8 md:w-[30%] lg:px-16">
          {/**Texto Login*/}
          <h1 className="font-bold text-center font-poppins-semi-bold text-xl md:text-2xl">
            Cadastro
          </h1>
          {/**Formulario*/}
          <Formik
            initialValues={{
              nColaborador: "",
            }}
            validationSchema={Yup.object({
              nColaborador: Yup.number()
                .typeError("Por favor, digite um número válido!")
                .required("Por favor, digite o número do colaborador!"),
                nome: Yup.string()
                .typeError("Por favor, digite uma string válida!")
                .required("Por favor, digite o nome do colaborador!"),
                quantidaadePendente: Yup.number()
                .typeError("Por favor, digite um número válido!")
            })}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                setSubmitting(false); //Desabilita o botão de submit
                cadastrarColaborador(values); //Busca o colaborador
              }, 400);
            }}
          >
            <Form className="flex flex-col gap-4">

              {/**N do colaborador*/}
              <FormInput
                name="nColaborador"
                placeholder="Exemplo: 001"
                label="Número"
                obrigatorio={true}
                isErrorVisible={isErrorVisible}
              />

              {/**Nome*/}
              <FormInput
                name="nome"
                placeholder="Paloma S. Santana"
                label="Nome"
                obrigatorio={true}
                isErrorVisible={isErrorVisible}
              />

              {/**Area*/}
              <FormInputSelect
                name="area"
                placeholder="Produção"
                label="Área"
                isErrorVisible={isErrorVisible}
                opcoes ={areas}
                
              />

              {/**Vinculo*/}
              <FormInputSelect
                name="vinculo"
                placeholder="Estudante"
                label="Vínculo"
                isErrorVisible={isErrorVisible}
                opcoes={vinculos}
              />

                {/**Quantidade pendente*/}
              <FormInput
                name="quantidadePendente"
                placeholder="0"
                label="Quantidade Pendente"
                isErrorVisible={isErrorVisible}
              />

              {/**Submit*/}
              <SubmitButton
                name="Cadastrar"
                setIsErrorVisible={setIsErrorVisible}
                handleShowError={handleShowError}
              />
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}
