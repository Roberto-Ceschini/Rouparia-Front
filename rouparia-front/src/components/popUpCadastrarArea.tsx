import { Form, Formik } from "formik";
import * as Yup from "yup";
import FormInput from "./FormInput";
import api from "@/services/axios";
import SubmitButton from "./SubmitButton";
import { useState } from "react";
import { X } from "lucide-react";

interface Props {
  setIsModalOpen: (isOpen: boolean) => void;
  tipo: string | null
}
export default function PopUpCadastrarArea({setIsModalOpen, tipo}: Props) {
     const [isErrorVisible, setIsErrorVisible] = useState(true);

     const handleShowError = () => {
        setTimeout(() => {
          setIsErrorVisible((prev) => !prev);
        }, 4000);
      };
    // Função para cadastrar a área
  const cadastrarArea = async (values: any) => {
    try {
      const response = await api.post("/area", values);
      if (response) {
        alert(`✅ Área cadastrada com sucesso!\n\nNome: ${response.data.nome}`);
      }
    } catch (error: any) {
      alert(
        `❌ Erro ${error.response?.status || ""} ao cadastrar área:\n${error.response?.data?.message || error.message}`
      );
    }finally {
        setIsModalOpen(false);
        window.location.reload(); // Fecha o modal após o cadastro
    }
  };

      // Função para cadastrar a área
      const cadastrarVinculo = async (values: any) => {
        try {
          const response = await api.post("/vinculo", values);
          if (response) {
            alert(`✅ Vínculo cadastrado com sucesso!\n\nNome: ${response.data.nome}`);
          }
        } catch (error: any) {
          alert(
            `❌ Erro ${error.response?.status || ""} ao cadastrar vínculo:\n${error.response?.data?.message || error.message}`
          );
        }finally {
            setIsModalOpen(false); // Fecha o modal após o cadastro
            window.location.reload(); 
        }
      };

  
    return(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
        <div className="bg-white rounded-xl shadow-lg p-6 w-[90vw] max-w-md relative">
          {/* Botão de fechar */}
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-red-500 cursor-pointer"
            onClick={() => setIsModalOpen(false)}
          >
            <X size={20} />
          </button>

          <h2 className="text-xl font-semibold mb-4 text-[#188038]">{tipo === 'area' ? 'Cadastrar Nova Área' : 'Cadastrar Novo Vínculo'}</h2>

          <Formik
            initialValues={{ nome: "" }}
            validationSchema={Yup.object({
              nome: Yup.string()
                .required("Por favor, digite o nome da área.")
                .min(1, "Nome muito curto."),
            })}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(false);
              if (tipo === 'area') cadastrarArea(values);
              else if (tipo === 'vinculo') cadastrarVinculo(values);
              setIsErrorVisible(false); // Oculta o erro após o envio
            }}
          >
            <Form className="flex flex-col gap-4">
              {tipo === 'area'? (<FormInput
                name="nome"
                placeholder="Ex: Produção"
                label="Nome da Área"
                obrigatorio={true}
                isErrorVisible={isErrorVisible}
              />): (<FormInput
                name="nome"
                placeholder="Ex: Pesquisador"
                label="Nome do Vínculo"
                obrigatorio={true}
                isErrorVisible={isErrorVisible}
              />)}

              <SubmitButton
                name="Cadastrar"
                setIsErrorVisible={setIsErrorVisible}
                handleShowError={handleShowError}
              />
            </Form>
          </Formik>
        </div>
      </div>
    );
  }