"use client"
import FormInput from "@/components/FormInput";
import HeaderHistoricoColaborador from "@/components/HeaderHistoricoColaborador";
import SubmitButton from "@/components/SubmitButton";
import { Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from 'yup';

export default function CadastrarColaborador() {

    const [isErrorVisible, setIsErrorVisible] = useState(true);//Estado que controla a visibilidade do erro

    //Função que mostra o erro e depois de 4 segundos esconde
    const handleShowError = () => {
        setTimeout(() => {
            setIsErrorVisible(prev => !prev);
        }, 4000);
    }

    const cadastrarColaborador = (values: any) => {

    }

    return (

        //Body
        <div className="flex flex-col w-[100vw] h-[100vh] items-center">

            {/**Header*/}
            <HeaderHistoricoColaborador tipo="cadastro" />

            {/**Conteudo principal*/}
            <div className="flex border-2 w-[100%] h-[100%] justify-center items-center">
                {/**Caixa Formulario*/}
                <div className="flex flex-col p-2 gap-4 justify-evenly w-[80%] bg-verde-terciario rounded-xl md:w-[30%] lg:px-16 lg:py-20">
                    {/**Texto Login*/}
                    <h1 className="font-bold text-center font-poppins-semi-bold text-xl md:text-2xl">Cadastro</h1>
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
                                setSubmitting(false);//Desabilita o botão de submit
                                cadastrarColaborador(values);//Busca o colaborador
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

                              {/**N do colaborador*/}
                              <FormInput
                                name='nColaborador'
                                placeholder='Exemplo: 001'
                                label='N° do colaborador'
                                obrigatorio={true}
                                isErrorVisible={isErrorVisible}
                            />

                              {/**N do colaborador*/}
                              <FormInput
                                name='nColaborador'
                                placeholder='Exemplo: 001'
                                label='N° do colaborador'
                                isErrorVisible={isErrorVisible}
                            />

                              {/**N do colaborador*/}
                              <FormInput
                                name='nColaborador'
                                placeholder='Exemplo: 001'
                                label='N° do colaborador'
                                isErrorVisible={isErrorVisible}
                            />

                            {/**Submit*/}
                            <SubmitButton name='Cadastrar' setIsErrorVisible={setIsErrorVisible} handleShowError={handleShowError} />
                        </Form>
                    </Formik>
                </div>

            </div>
        </div>
    );
}