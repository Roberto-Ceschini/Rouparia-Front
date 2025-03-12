"use client"
import React, { useEffect, useState } from 'react';
import { Form, Formik } from "formik";
import * as Yup from 'yup';
import FormInput from '@/components/FormInput';
import SubmitButton from '@/components/SubmitButton';
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  
  const [isErrorVisible, setIsErrorVisible] = useState(true);

  //Função que mostra o erro e depois de 4 segundos esconde
  const handleShowError = () => {
    setTimeout(() => {
      setIsErrorVisible(prev => !prev);
    }, 4000);
  }

  return (
    <>
    {/**Background Verde*/}
    <div className="flex w-[100vw] h-[100vh] bg-verde-primario justify-center items-center md:w-[50vw]">
      {/**Caixa Formulario*/}
      <div className="flex flex-col p-2 justify-evenly w-[80%] h-[50%] bg-verde-terciario rounded-xl md:w-[60%] lg:px-16">
        {/**Texto Login*/}
        <h1 className="font-bold text-center font-poppins-semi-bold text-xl md:text-2xl">Login</h1>
        {/**Formulario*/}
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={Yup.object({
            email: Yup.string().email('Endereço de email inválido!').required('Email é obrigatório!'),
            password: Yup.string().required('Senha é obrigatória'),

          })}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);

            router.replace('/home');
          }}
        >
          <Form className='flex flex-col gap-4'>
            {/**Email*/}
            <FormInput
              name='email'
              placeholder='rouparia@gmail.com'
              label='Email' 
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
    <div className="flex w-[50vw] h-[100vh] border-2 bg-white justify-center items-center">
          {/**Imagem*/}
    </div>
    </>
  );
}
