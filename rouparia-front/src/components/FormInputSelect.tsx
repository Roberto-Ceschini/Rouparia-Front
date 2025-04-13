import { ErrorMessage, Field } from "formik";
import SvgCaixaEmail from "./SvgCaixaEmail";
import SvgCadeado from "./SvgCadeado";
import { Area } from "@/types/area";
import { Vinculo } from "@/types/vinculo";

interface FormInputProps {
  name: string; //Nome do input
  placeholder: string; //Texto que aparece dentro do input
  label: string; //Texto que aparece acima do input
  isErrorVisible?: boolean; //Se o erro é visivel ou não
  obrigatorio?: boolean;
  opcoes: Area[] | Vinculo[] | null;
}

//Array que contem os icones dos inputs
const inputIcons = [SvgCaixaEmail, SvgCadeado];
const minuscula = (texto: string) => {
  return texto.toLowerCase()
}

export default function FormInput({
  name,
  placeholder,
  label,
  isErrorVisible = true,
  obrigatorio = false,
  opcoes = []
}: FormInputProps) {
  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor="email"
        className="text-verde-primario font-poppins-regular text-base"
      >
        {label}
        {obrigatorio && <span className="text-red-500"> *</span>}
      </label>
      <div className="relative">
        {opcoes?.length !== 0 && (
        <Field
          name={name}
          component="select"
          className={`bg-[#F6F6F6] rounded-md px-3 py-1.5 w-[100%] text-sm`}
        >
          {opcoes?.map(opcao => (
            
            <option value={opcao.id} key={opcao.id+opcao.nome}>{opcao.nome}</option>
          ))}
        </Field>
        )}
      </div>
      {isErrorVisible && (
        <p className="text-vermelho text-sm">
          <ErrorMessage name={name} />
        </p>
      )}
    </div>
  );
}
