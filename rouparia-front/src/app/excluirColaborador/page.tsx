"use client";
import FormInput from "@/components/FormInput";
import FormInputSelect from "@/components/FormInputSelect";
import HeaderHistoricoColaborador from "@/components/HeaderHistoricoColaborador";
import PopUpExcluir from "@/components/PopUpExcluir";
import SubmitButton from "@/components/SubmitButton";
import { ColaboradorProvider } from "@/contexts/colaboradorContext";
import api from "@/services/axios";
import { Area } from "@/types/area";
import { Colaborador } from "@/types/colaborador";
import { Vinculo } from "@/types/vinculo";
import { Form, Formik } from "formik";
import { useEffect, useRef, useState } from "react";
import * as Yup from "yup";

export default function ExcluirColaborador() {

 //------------VARIAVEIS----------
  const [isErrorVisible, setIsErrorVisible] = useState(true); //Estado que controla a visibilidade do erro
  const [mostrarPopUpExcluir, setMostrarPopUpExcluir] = useState(false) //Estado que controla a visibilidade do PopUp de exclusao
  const [colaborador, setColaborador] = useState<null|Colaborador>(null)

  //-------------FUNCOES----------
  //Função que mostra o erro e depois de 4 segundos esconde
  const handleShowError = () => {
    setTimeout(() => {
      setIsErrorVisible((prev) => !prev);
    }, 4000);
  };

  const buscarColaborador = async (numero: string)=>{
    try{
        const response = await api.get(`/colaborador/numero/${numero}`);
        if(response.data){
            setColaborador(response.data); 
            handleTogglePopUpExcluir()
        };
    }catch(error:any){
        alert (`Erro ${error.response.data.statusCode} ao buscar colaborador:\n\n${error.response.data.message}`);
    }
  }

  const handleTogglePopUpExcluir = () => {
    setMostrarPopUpExcluir(prev=>!prev);
  }

  return (
    <div className="flex flex-col w-[100vw] h-[100vh] items-center">
        {mostrarPopUpExcluir && <PopUpExcluir handleTogglePopUp={handleTogglePopUpExcluir} colaborador={colaborador}/>}
      {/**Header*/}
      <HeaderHistoricoColaborador tipo="excluir" />

      {/**Conteudo principal*/}
      <div className="flex border-2 w-[100%] h-[100%] justify-center items-center">
        {/**Caixa Formulario*/}
        <div className="flex flex-col p-2 gap-4 justify-evenly w-[80%] bg-verde-terciario rounded-xl lg:py-8 md:w-[30%] lg:px-16">
          {/**Texto Login*/}
          <h1 className="font-bold text-center font-poppins-semi-bold text-xl md:text-2xl">
            Excluir Colaborador
          </h1>
          {/**Formulario*/}
          <Formik
            initialValues={{
              numero: undefined
            }}
            validationSchema={Yup.object({
              numero: Yup.number()
                .typeError("Por favor, digite um número válido!")
                .required("Por favor, digite o número do colaborador!")
            })}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                setSubmitting(false); //Desabilita o botão de submit
                if (values.numero) buscarColaborador(values.numero); //Busca o colaborador
              }, 400);
            }}
          >
            <Form className="flex flex-col gap-4">

              {/**N do colaborador*/}
              <FormInput
                name="numero"
                placeholder="Exemplo: 001"
                label="Número"
                obrigatorio={true}
                isErrorVisible={isErrorVisible}
              />

              {/**Submit*/}
              <SubmitButton
                name="Excluir"
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
