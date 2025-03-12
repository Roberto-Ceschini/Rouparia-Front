"use client"
import CardColaborador from "@/components/CardColaborador";
import FormInput from "@/components/FormInput";
import SubmitButton from "@/components/SubmitButton";
import { Colaborador } from "@/types/colaborador";
import { Form, Formik } from "formik";
import { use, useEffect, useState } from "react";
import * as Yup from 'yup';

export default function Home() {

  const [colaborador, setColaborador] = useState<Colaborador | null>(null);//Estado que controla o colaborador

  const [isErrorVisible, setIsErrorVisible] = useState(true);//Estado que controla a visibilidade do erro

  useEffect(() => {
    setColaborador({
      id: 1,
      nome: 'Paloma S. Santana',
      numero: 1,
      area_id: 1,
      registros: [
        { id: 1, data: "2024-03-12", status: "Ativo", colaborador_id: 1, colaborador: { id: 1, numero: 1, nome: "João", area_id: 2, registros: [] } },  
  { id: 2, data: "2024-03-12", status: "Inativo", colaborador_id: 2, colaborador: { id: 2, numero: 2, nome: "Maria", area_id: 3, registros: [] } },  
  { id: 3, data: "2024-03-12", status: "Ativo", colaborador_id: 1, colaborador: { id: 1, numero: 1, nome: "João", area_id: 2, registros: [] } },  
      ]
    });
  }, []);

  //Função que mostra o erro e depois de 4 segundos esconde
  const handleShowError = () => {
    setTimeout(() => {
      setIsErrorVisible(prev => !prev);
    }, 4000);
  }

  return (

    <div className="flex flex-col md:flex-row">
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
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
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