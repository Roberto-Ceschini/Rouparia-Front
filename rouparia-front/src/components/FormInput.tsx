import { ErrorMessage, Field } from "formik";
import SvgCaixaEmail from "./SvgCaixaEmail";
import SvgCadeado from "./SvgCadeado";

interface FormInputProps {
    name: string; //Nome do input
    placeholder: string; //Texto que aparece dentro do input
    label: string; //Texto que aparece acima do input
    isErrorVisible?: boolean; //Se o erro é visivel ou não
    obrigatorio?: boolean;
    isArea?: boolean;
}

//Array que contem os icones dos inputs
const inputIcons = [SvgCaixaEmail, SvgCadeado];

export default function FormInput({ name, placeholder, label, isErrorVisible = true, obrigatorio = false }: FormInputProps) {

    return (
        <div className='flex flex-col gap-1'>
            <label htmlFor="email" className="text-verde-primario font-poppins-regular text-base">
                {label}
                {obrigatorio && <span className="text-red-500"> *</span>}
            </label>
            <div className="relative">
                <Field
                    name={name}
                    type={name}
                    placeholder={placeholder}
                    className={`bg-[#F6F6F6] rounded-md ${name === 'password' ? 'pl-9' : name === 'email' ? 'pl-9' : 'pl-3'} py-1.5 w-[100%] text-sm`}
                >
                    
                </Field>
                {name === 'email' ? inputIcons[0]() : name === 'password' ? inputIcons[1]() : '' }
            </div>
            {isErrorVisible && (
                <p className='text-vermelho text-sm'><ErrorMessage name={name} /></p>
            )}
        </div>
    );
}