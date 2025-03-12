import { ErrorMessage, Field } from "formik";
import SvgCaixaEmail from "./svg/SvgCaixaEmail";
import SvgCadeado from "./svg/SvgCadeado";

interface FormInputProps {
    name: string;
    placeholder: string;
    label: string;
}

const inputIcons = [SvgCaixaEmail, SvgCadeado];

export default function FormInput({ name, placeholder, label }: FormInputProps) {

    return (
        <div className='flex flex-col gap-1'>
            <label htmlFor="email" className="text-verde-primario font-poppins-regular">{label}</label>
            <div className="relative">
                <Field
                    name={name}
                    type={name}
                    placeholder={placeholder}	
                    className="bg-[#F6F6F6] rounded-md pl-9 py-1.5 w-[100%]"  // Adiciona padding à esquerda para o ícone
                />
                {name === 'email' ? inputIcons[0]() : inputIcons[1]()}
            </div>
            <p className='text-red-500 text-sm'><ErrorMessage name={name} /></p>
        </div>
    );
}