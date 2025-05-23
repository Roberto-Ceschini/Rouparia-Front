"use client"

import CardColaborador from "@/components/CardColaborador";
import FormInput from "@/components/FormInput";
import HeaderHistoricoColaborador from "@/components/HeaderHistoricoColaborador";
import PopUpNaoAutorizado from "@/components/PopNaoAutorizado";
import PopUpSucesso from "@/components/PopUpSucesso";
import PopUpUsuarioNaoEncontrado from "@/components/PopUpUsuarioNaoEncontrado";
import SubmitButton from "@/components/SubmitButton";
import { useAuth } from "@/contexts/authContext";
import { useColaboradorContext } from "@/contexts/colaboradorContext";
import api from "@/services/axios";
import { Colaborador } from "@/types/colaborador";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import Image from "next/image";
import * as Yup from 'yup';

export default function Home() {

  //Pega o numero do colaborador via context (Pagina de historicos)
  const { setColaboradorContext, colaborador_context } = useColaboradorContext();
  const { token } = useAuth()
  const [loading, setLoading] = useState<boolean>(false)

  const [colaborador, setColaborador] = useState<Colaborador | null>(null);//Estado que controla o colaborador

  //Estados que controlam a visibilidade dos popUps
  const [botaoClicao, setBotaoClicado] = useState(''); //Estado que controla qual o botão clicado
  const [mostrarPopUpSucesso, setMostrarPopUpSucesso] = useState(false);
  const [mostrarPopUpNaoAutorizado, setMostrarPopUpNaoAutorizado] = useState(false);
  const [mostrarPopUpNaoEncontrado, setMostrarPopUpNaoEncontrado] = useState(false);
  const [nColaborador, setNColaborador] = useState(0);//Estado que controla o número do colaborador
  const [errorCode, setErrorCode] = useState(0);

  //Estado que controla o tempo de exibição do erro no formulário
  const [isErrorVisible, setIsErrorVisible] = useState(true);

  //Funcao que controla o popUpNaoAutorizado + erro
  const handlePopUpNaoAutorizado = (errorCode: number) => {
    setErrorCode(errorCode);
    setMostrarPopUpNaoAutorizado(prev => !prev);
  }

  //Função que mostra o erro e depois de 4 segundos esconde
  const handleShowError = () => {
    setTimeout(() => {
      setIsErrorVisible(prev => !prev);
    }, 4000);
  }

  //Função que busca o colaborador pelo número
  const fetchColaborador = async (nColaborador: number) => {
    setNColaborador(nColaborador);
    setLoading(true);
    try {
      const response = await api.get(`colaborador/numero/${nColaborador}`);
      if (response) {
        const colaborador: Colaborador = response.data;
        setColaborador(colaborador);
        setColaboradorContext({
          numero: String(colaborador.numero),
          nome: colaborador.nome,
          area: colaborador.area?.nome,
          vinculo: colaborador.vinculo?.nome
        });
      }
    } catch (error) {
      setMostrarPopUpNaoEncontrado(true);
    } finally {
      setLoading(false)
    }
  }

  //Funcao para redirecionar automaticamente para pagina de busca, após uma mensagem de sucesso!
  const handleTogglePopUpSucesso = () => {
    setMostrarPopUpSucesso(false);
    setColaborador(null);
  }

  const breakpoints = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    "2xl": 1536,
  };

  //Lida com o tamanho da tela
  const [tamanhoTela, setTamanhoTela] = useState<number>(0);
  useEffect(() => {
    const handleResize = () => {
      setTamanhoTela(window.innerWidth);
    };

    // Captura o tamanho inicial da tela
    setTamanhoTela(window.innerWidth);

    // Adiciona o event listener para monitorar mudanças no tamanho da tela
    window.addEventListener("resize", handleResize);

    return () => {
      // Remove o event listener ao desmontar o componente
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  //Verifica se o colaborador tem um numero (Pagina de historicos)
  useEffect(() => {
    if (colaborador_context.numero) fetchColaborador(Number(colaborador_context.numero))
    else return;
  }, [])

  //ANIMACAO
  //Animacao
  const [showComponent, setShowComponent] = useState(true); // controla se o botão tá no DOM
  const [isExiting, setIsExiting] = useState(false);  // controla se ele tá animando a saída

  const teste = true;

  useEffect(() => {
    if (!colaborador) {
      setIsExiting(true); // começa a animação de saída
      // depois de 500ms remove do DOM
      const timeout = setTimeout(() => {
        setShowComponent(false);
      }, 50); // tempo igual ao da animação de saída
      return () => clearTimeout(timeout);
    } else {
      // se voltou a ficar ativo, mostra no DOM e tira a animação de saída
      setShowComponent(true);
      setIsExiting(false);
    }
  }, [colaborador]);

  return (

    <>
      <HeaderHistoricoColaborador tipo="home" />
      <div className="flex flex-col lg:flex-row">
        {/**PopUps*/}
        {mostrarPopUpNaoEncontrado && <PopUpUsuarioNaoEncontrado numero={nColaborador} handleTogglePopUp={() => setMostrarPopUpNaoEncontrado(false)} />}
        {mostrarPopUpNaoAutorizado && <PopUpNaoAutorizado colaborador={colaborador} handleTogglePopUp={() => setMostrarPopUpNaoAutorizado(false)} errorCode={errorCode} />}
        {mostrarPopUpSucesso && <PopUpSucesso colaborador={colaborador} botaoClicado={botaoClicao} handleTogglePopUp={handleTogglePopUpSucesso} />}

        {/**Background Verde*/}
        <div className="flex flex-col w-[100vw] h-[90vh] bg-verde-primario justify-center items-center lg:w-[50vw]">
          {(!colaborador) ? (
            <>
              {/**Caixa Formulario*/}
              <div className="motion-preset-slide-left flex flex-col p-2 justify-evenly w-[80%] h-[50%] bg-verde-terciario rounded-xl lg:w-[60%] lg:px-16 lg:py-20">
                {/**Texto Login*/}
                <h1 className="font-bold text-center font-poppins-semi-bold text-xl lg:text-2xl">Digite o número do colaborador</h1>
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
                      fetchColaborador(Number(values.nColaborador));//Busca o colaborador
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
                    <SubmitButton disable={loading} name='Pesquisar' setIsErrorVisible={setIsErrorVisible} handleShowError={handleShowError} />
                  </Form>
                </Formik>
              </div></>
          ) : (<div className="items-center justify-center flex lg:hidden w-[90%]">
            <CardColaborador
              colaborador={colaborador}
              setColaborador={setColaborador}
              setMostrarPopUpNaoAutorizado={handlePopUpNaoAutorizado}
              setMostrarPopUpSucesso={setMostrarPopUpSucesso}
              setBotaoClicado={setBotaoClicado} />
          </div>)}
        </div>

        {/**Background Branco*/}
        <div className="motion-preset-slide-right hidden lg:flex lg:flex-col w-[50vw] h-[90vh] justify-center items-center">
          <Image src="/assets/images/logo.png" alt="Logo" width={200} height={100} className="-mb-10" />
          {colaborador && <div className={`${isExiting ? 'motion-preset-slide-left' : ''} items-center justify-center flex w-[80%]`}>
            <CardColaborador
              colaborador={colaborador}
              setColaborador={setColaborador}
              setMostrarPopUpNaoAutorizado={handlePopUpNaoAutorizado}
              setMostrarPopUpSucesso={setMostrarPopUpSucesso}
              setBotaoClicado={setBotaoClicado} />
          </div>}
        </div>
      </div>
    </>
  );
}