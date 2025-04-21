"use client"
import React, { useState } from 'react';
import { Form, Formik } from "formik";
import * as Yup from 'yup';
import FormInput from '@/components/FormInput';
import SubmitButton from '@/components/SubmitButton';
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/authContext';
import Image from 'next/image';

export default function Home() {
  const router = useRouter()
  const {login} = useAuth()//Importa o hook de autenticação

  const [isErrorVisible, setIsErrorVisible] = useState(true);//Estado que controla a visibilidade do erro

  //Função que mostra o erro e depois de 4 segundos esconde
  const handleShowError = () => {
    setTimeout(() => {
      setIsErrorVisible(prev => !prev);
    }, 4000);
  }

  return (
    <div className="flex flex-col lg:flex-row">
      {/**Background Verde*/}
      <div className="flex w-[100vw] h-[100vh] bg-verde-primario justify-center items-center lg:w-[50vw]">
        {/**Caixa Formulario*/}
        <div className="flex flex-col p-2 justify-evenly w-[80%] h-[50%] bg-verde-terciario rounded-xl lg:w-[60%] lg:px-16">
          {/**Texto Login*/}
          <h1 className="font-bold text-center font-poppins-semi-bold text-xl lg:text-2xl">Login</h1>
          {/**Formulario*/}
          <Formik
            initialValues={{
              username: '',
              password: '',
            }}
            validationSchema={Yup.object({
              username: Yup.string().required('Nome de usuário é obrigatório!'),
              password: Yup.string().required('Senha é obrigatória'),
            })}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                login(values.username, values.password).then(() => {
                } ).catch((error) => {
                  setIsErrorVisible(true);
                  handleShowError();
                }
                // Aqui você pode redirecionar o usuário para outra página após o login
                );
                setSubmitting(false);
              }, 400);
            }}
          >
            <Form className='flex flex-col gap-4'>
              {/**Username*/}
              <FormInput
                name='username'
                placeholder='Username'
                label='Nome de usuário' 
                isErrorVisible={isErrorVisible}
                />
              {/**Senha*/}
              <FormInput
                name='password'
                placeholder='********'
                label='Senha'
                isErrorVisible={isErrorVisible} 
                />
              {/**Submit*/}
             <SubmitButton name='Login' setIsErrorVisible={setIsErrorVisible} handleShowError ={handleShowError} />
            </Form>
          </Formik>
        </div>
      </div>
      {/**Background Branco*/}
      <div className="hidden lg:flex w-[50vw] h-[100vh] bg-white justify-center items-center">
          <Image src="/assets/images/logo.png" alt="Logo" width={200} height={100} className="-mb-10"/>
      </div>
    </div>
  );
}
