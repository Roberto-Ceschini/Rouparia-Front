"use client"
import FormInput from "@/components/FormInput";
import SubmitButton from "@/components/SubmitButton";
import { Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from 'yup';

export default function Home(){

    const [colaborador, setColaborador] = useState (null)

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
               <SubmitButton name='Pesquisar' setIsErrorVisible={setIsErrorVisible} handleShowError={handleShowError}/>
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