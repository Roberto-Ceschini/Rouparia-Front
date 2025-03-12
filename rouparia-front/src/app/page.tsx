"use client"
import React from 'react';
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from 'yup';
import SvgCaixaEmail from '@/components/svg/SvgCaixaEmail';
import FormInput from '@/components/FormInput';

export default function Home() {
  return (

    //Body
    <div className="flex w-[100vw] h-[100vh] border-2 bg-verde-primario justify-center items-center">

      {/**Caixa Formulario*/}
     <div className="flex flex-col p-2 justify-evenly w-[80%] h-[50%] bg-verde-terciario rounded-xl">

      {/**Texto Login*/}
      <h1 className="font-bold text-center font-poppins-semi-bold text-xl">Login</h1>

      {/**Formulario*/}
      <Formik
       initialValues={{  
        email: '',
        password: '',}}
       validationSchema={Yup.object({
         email: Yup.string().email('Endereço de email inválido!').required('Email é obrigatório!'),
         password: Yup.string().required('Senha é obrigatória'),

       })}
       onSubmit={(values, { setSubmitting }) => {
         setTimeout(() => {
           alert(JSON.stringify(values, null, 2));
           setSubmitting(false);
         }, 400);
       }}
     >
          <Form className='flex flex-col gap-4'>

            {/**Email*/}
            <FormInput
              name='email'
              placeholder='rouparia@gmail.com'
              label='Email' />

             <FormInput
              name='password'
              placeholder='********'
              label='Senha' />

         <button type="submit" className='bg-laranja py-1.5 rounded-md text-white font-semibold mt-6 hover:cursor-pointer hover:bg-laranja-hover'>Login</button>
       </Form>
     </Formik>
     </div>
     </div>
  );
}
