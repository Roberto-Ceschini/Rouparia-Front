"use client"
import CardColaborador from "@/components/CardColaborador";
import FormInput from "@/components/FormInput";
import PopUpUsuarioNaoEncontrado from "@/components/PopUpUsuarioNaoEncontrado";
import SubmitButton from "@/components/SubmitButton";
import api from "@/services/axios";
import { Colaborador } from "@/types/colaborador";
import axios from "axios";
import { Form, Formik } from "formik";
import { use, useEffect, useState } from "react";
import * as Yup from 'yup';

export default function Home() {

  const [colaborador, setColaborador] = useState<Colaborador | null>(null);//Estado que controla o colaborador

  const [mostrarPopUp, setMostrarPopUp] = useState(false);//Estado que controla a visibilidade do popUp de usuário não encontrado
  const[nColaborador, setNColaborador] = useState(0);//Estado que controla o número do colaborador

  const [isErrorVisible, setIsErrorVisible] = useState(true);//Estado que controla a visibilidade do erro

  //Função que mostra o erro e depois de 4 segundos esconde
  const handleShowError = () => {
    setTimeout(() => {
      setIsErrorVisible(prev => !prev);
    }, 4000);
  }

  //Função que busca o colaborador pelo número
  const fetchColaborador = async (nColaborador: number) => {
    setNColaborador(nColaborador);
    console.log("entrei aqui!")
    try {
      const response = await api.get(`colaborador/numero/${nColaborador}`);
      console.log(response);
      if (response) {
        const colaborador = response.data;
        setColaborador(colaborador);
      }
    } catch (error) {
      console.log(error);
      setMostrarPopUp(true);
    }
  }

  return (

    <div className="flex flex-col md:flex-row">
      {/**PopUp de usuário não encontrado*/}
      {mostrarPopUp && <PopUpUsuarioNaoEncontrado numero={nColaborador} handleTogglePopUp={() => setMostrarPopUp(false)} />}
      {/**Background Verde*/}
      <div className="flex w-[100vw] h-[100vh] bg-verde-primario justify-center items-center md:w-[50vw]">
        {!colaborador ? (
        <>
        {/**Caixa Formulario*/}
        <div className="flex flex-col p-2 justify-evenly w-[80%] h-[50%] bg-verde-terciario rounded-xl md:w-[60%] lg:px-16 lg:py-20">
          {/**Texto Login*/}
          <h1 className="font-bold text-center font-poppins-semi-bold text-xl md:text-2xl">Digite o número do colaborador</h1>
          {/**Formulario*/}
          <Formik
            initialValues={{
              nColaborador: '',
            }}
            validationSchema={Yup.object({
              nColaborador: Yup.number().typeError('Por favor, digite um número válido!').required('Por favor, digite o número do colaborador!'),

            })}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                fetchColaborador(Number(values.nColaborador));//Busca o colaborador
                setSubmitting(false);//Desabilita o botão de submit
              }, 400);
            }}
          >
            <Form className='flex flex-col gap-4'>
              {/**N do colaborador*/}
              <FormInput
                name='nColaborador'
                placeholder='Exemplo: 001'
                label='N° do colaborador'
                isErrorVisible={isErrorVisible}
              />

              {/**Submit*/}
              <SubmitButton name='Pesquisar' setIsErrorVisible={setIsErrorVisible} handleShowError={handleShowError} />
            </Form>
          </Formik>
        </div></>
        ) : (<CardColaborador colaborador={colaborador}/>)}
      </div>

      {/**Background Branco*/}
      <div className="hidden md:flex w-[50vw] h-[100vh] justify-center items-center">
      {colaborador && <CardColaborador colaborador={colaborador}/>}
      </div>
      </div>
  );
}