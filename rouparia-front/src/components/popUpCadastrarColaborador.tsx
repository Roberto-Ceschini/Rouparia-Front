"use client";
import FormInput from "@/components/FormInput";
import FormInputSelect from "@/components/FormInputSelect";
import SubmitButton from "@/components/SubmitButton";
import api from "@/services/axios";
import { Area } from "@/types/area";
import { Colaborador } from "@/types/colaborador";
import { Vinculo } from "@/types/vinculo";
import { Form, Formik } from "formik";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import * as Yup from "yup";

interface Props {
  handleTogglePopUp: (isOpen: boolean) => void;
  tipo: 'cadastrar' | 'editar' | null;
  colaborador?: Colaborador | null; // Adicionei o colaborador_id como opcional
  lastNumber: number; // Adicionei o lastNumber como opcional
}

export default function PopUpCadastrarColaborador({ handleTogglePopUp, tipo, colaborador, lastNumber }: Props) {
  //------------VARIAVEIS----------
  const [isErrorVisible, setIsErrorVisible] = useState(true); //Estado que controla a visibilidade do erro
  const [areas, setAreas] = useState<null | Area[]>(null); //Areas que serao exibidas no dropDown
  const [vinculos, setVinculos] = useState<null | Vinculo[]>(null); //Vinculos que serao exibidas no dropDown

  //-------------FUNCOES----------
  //Função que mostra o erro e depois de 4 segundos esconde
  const handleShowError = () => {
    setTimeout(() => {
      setIsErrorVisible((prev) => !prev);
    }, 4000);
  };

  const fetchAreas = async () => {
    try {
      const response = await api.get("/area");
      if (response.data) setAreas(response.data);
    } catch (error) {
      alert(`Erro ao carregar áreas, recarregue a página\n${error}`);
    }
  };

  const fetchVinculos = async () => {
    try {
      const response = await api.get("/vinculo");
      if (response.data) setVinculos(response.data);
    } catch (error) {
      alert(`Erro ao carregar Vinculos, recarregue a página\n${error}`);
    }
  };

  const cadastrarColaborador = async (values: any) => {
    try {
      const response = await api.post("/colaborador", values);
      const colaborador: Colaborador = response.data;
    
    } catch (error: any) {
      alert(
        `Erro ${error.response.data.statusCode} ao cadastrar colaborador\n\n${error.response.data.message}`
      );
    }finally{
        handleTogglePopUp(false); // Fecha o modal após o cadastro
        window.location.reload(); // Recarrega a página após o cadastro
    }
  };

  const editarColaborador = async (values: any) => {
    try {
        const response = await api.patch(`/colaborador/${colaborador?.id}`, values);
      
      } catch (error: any) {
        alert(
          `Erro ${error.response.data.statusCode} ao editar colaborador\n\n${error.response.data.message}`
        );
      }finally{
          handleTogglePopUp(false); // Fecha o modal após o cadastro
          window.location.reload(); // Recarrega a página após o cadastro
      }
    };
  //Carrega os recursos iniciais da pagina
  useEffect(() => {
    const carregarRecursos = async () => {
      await fetchVinculos();
      await fetchAreas();
    };
    carregarRecursos();
  }, []);

  //----------TESTES----------
  // useEffect(() => {
  //   console.log("VINCULOS", vinculos);
  //   console.log("Areas", areas);
  // }, [vinculos, areas]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-lg p-6 w-[90vw] max-w-md relative">
        {/* Botão de fechar */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 cursor-pointer"
          onClick={() => handleTogglePopUp(false)}
        >
          <X size={20} />
        </button>
        <h1 className="font-bold text-center font-poppins-semi-bold text-xl lg:text-2xl">
          Cadastro
        </h1>
        {/**Formulario*/}
        <Formik
          initialValues={{
            numero: colaborador?.numero || lastNumber,
            nome: colaborador?.nome || "",
            qtd_pendente: colaborador?.qtd_pendente || 0,
            area_id: colaborador?.area_id || undefined,
            vinculo_id: colaborador?.vinculo_id || undefined,
          }}
          validationSchema={Yup.object({
            numero: Yup.number()
              .typeError("Por favor, digite um número válido!")
              .required("Por favor, digite o número do colaborador!"),
            nome: Yup.string()
              .typeError("Por favor, digite uma string válida!")
              .required("Por favor, digite o nome do colaborador!"),
            qtd_pendente: Yup.number().typeError(
              "Por favor, digite um número válido!"
            ),
          })}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              //Verifica se a area esta como undefined, se sim, retorna, automaticamente, a primeira area
              const verificarAreaUndefined = () => {
                if (values.area_id === undefined) {
                  if (areas) return Number(areas[0].id);
                } else return Number(values.area_id);
              };
              //Verifica se o vinculo esta como undefined, se sim, retorna, automaticamente, o primeiro vinculo
              const verificarVinculoUndefined = () => {
                if (values.vinculo_id === undefined) {
                  if (vinculos) return Number(vinculos[0].id);
                } else return Number(values.vinculo_id);
              };
              const formattedValues = {
                ...values,
                numero: Number(values.numero),
                qtd_pendente: Number(values.qtd_pendente),
                area_id: verificarAreaUndefined(),
                vinculo_id: verificarVinculoUndefined(),
              };
              setSubmitting(false); //Desabilita o botão de submit
              if (tipo === 'cadastrar' ) cadastrarColaborador(formattedValues);
              else if (tipo === 'editar') editarColaborador(formattedValues);
              else {
                alert ('Tipo de operação inválido!')
                handleTogglePopUp(false)} //Fecha o modal após o modal
            }, 400);
          }}
        >
          <Form className="flex flex-col gap-4">
            {/**N do colaborador*/}
            <FormInput
              name="numero"
              placeholder="Exemplo: 001"
              label="Número"
              obrigatorio={true}
              isErrorVisible={isErrorVisible}
            />

            {/**Nome*/}
            <FormInput
              name="nome"
              placeholder="Paloma S. Santana"
              label="Nome"
              obrigatorio={true}
              isErrorVisible={isErrorVisible}
            />

            {/**Area*/}
            <FormInputSelect
              name="area_id"
              placeholder="Área"
              label="Área"
              isErrorVisible={isErrorVisible}
              opcoes={areas}
            />

            {/**Vinculo*/}
            <FormInputSelect
              name="vinculo_id"
              placeholder="Estudante"
              label="Vínculo"
              isErrorVisible={isErrorVisible}
              opcoes={vinculos}
            />

            {/**Submit*/}
            <SubmitButton
              name= {tipo === 'cadastrar' ? "Cadastrar" : "Atualizar"}
              setIsErrorVisible={setIsErrorVisible}
              handleShowError={handleShowError}
            />
          </Form>
        </Formik>
      </div>
    </div>
  );
}
