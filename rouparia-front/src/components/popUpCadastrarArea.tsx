import { Form, Formik } from "formik";
import * as Yup from "yup";
import FormInput from "./FormInput";
import api from "@/services/axios";
import SubmitButton from "./SubmitButton";
import { useState } from "react";
import { X } from "lucide-react";
import { Area } from "@/types/area";
import { Vinculo } from "@/types/vinculo";

interface Props {
  setIsModalOpen: (isOpen: boolean) => void;
  operacao: 'cadastrar area' | 'cadastrar vinculo' | 'editar area' | 'editar vinculo' | null;
  areaVinculo: Area | Vinculo | null; // Adicionei o colaborador_id como opcional
}
export default function PopUpCadastrarArea({setIsModalOpen, operacao, areaVinculo}: Props) {
     const [isErrorVisible, setIsErrorVisible] = useState(true);

     const titulo = ["Cadastrar Nova Área", "Cadastrar Novo Vínculo", "Editar Área", "Editar Vínculo"];

     const mostrarTitulo = () => {
      switch (operacao) {
        case "cadastrar area": {
          return titulo[0];
        }
  
        case "cadastrar vinculo": {
          return titulo[1];
        }
  
        case "editar area": {
          return titulo[2];
        }

        case "editar vinculo": {
          return titulo[3];
        }
      }
    }

     const handleShowError = () => {
        setTimeout(() => {
          setIsErrorVisible((prev) => !prev);
        }, 4000);
      };
    // Função para cadastrar a área
  const cadastrarArea = async (values: any) => {
    try {
      await api.post("/area", values);
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
          await api.post("/vinculo", values);
        } catch (error: any) {
          alert(
            `❌ Erro ${error.response?.status || ""} ao cadastrar vínculo:\n${error.response?.data?.message || error.message}`
          );
        }finally {
            setIsModalOpen(false); // Fecha o modal após o cadastro
            window.location.reload(); 
        }
      };

      const editarArea = async (values: any) => {
        try {
          await api.patch(`/area/${areaVinculo?.id}`, values);
        } catch (error: any) {
          alert(
            `❌ Erro ${error.response?.status || ""} ao editaar área:\n${error.response?.data?.message || error.message}`
          );
        }finally {
            setIsModalOpen(false); // Fecha o modal após o cadastro
            window.location.reload(); 
        }
      }

      const editarVinculo = async (values: any) => {
        try {
          await api.patch(`/vinculo/${areaVinculo?.id}`, values);
        } catch (error: any) {
          alert(
            `❌ Erro ${error.response?.status || ""} ao editar vínculo:\n${error.response?.data?.message || error.message}`
          );
        }finally {
            setIsModalOpen(false); // Fecha o modal após o cadastro
            window.location.reload(); 
        }
      }

  
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

          <h2 className="text-xl font-semibold mb-4 text-[#188038]">{mostrarTitulo()}</h2>

          <Formik
            initialValues={{ nome: areaVinculo?.nome || "" }}
            validationSchema={Yup.object({
              nome: Yup.string()
                .required("Por favor, preencha este campo.")
                .min(1, "Nome muito curto."),
            })}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(false);
              if (operacao === 'cadastrar area') cadastrarArea(values);
              else if (operacao === 'cadastrar vinculo') cadastrarVinculo(values);
              else if (operacao === 'editar area') editarArea(values);
              else if (operacao === 'editar vinculo') editarVinculo(values);
              setIsErrorVisible(false); // Oculta o erro após o envio
            }}
          >
            <Form className="flex flex-col gap-4">
              {(operacao === 'cadastrar area' || operacao === 'editar area') ? (<FormInput
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
                name={String(mostrarTitulo())}
                setIsErrorVisible={setIsErrorVisible}
                handleShowError={handleShowError}
              />
            </Form>
          </Formik>
        </div>
      </div>
    );
  }