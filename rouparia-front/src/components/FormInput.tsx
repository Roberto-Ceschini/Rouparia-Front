import { ErrorMessage, Field } from "formik";
import SvgCaixaEmail from "./SvgCaixaEmail";
import SvgCadeado from "./SvgCadeado";
import { useState } from "react";

interface FormInputProps
 {
    name: string; //Nome do input
    placeholder: string; //Texto que aparece dentro do input
    label: string; //Texto que aparece acima do input
    isErrorVisible?: boolean; //Se o erro é visivel ou não
}

//Array que contem os icones dos inputs
const inputIcons = [SvgCaixaEmail, SvgCadeado];

export default function FormInput({ name, placeholder, label, isErrorVisible = true }: FormInputProps) {

    return (
        <div className='flex flex-col gap-1'>
            <label htmlFor="email" className="text-verde-primario font-poppins-regular text-base">{label}</label>
            <div className="relative">
                <Field
                    name={name}
                    type={name}
                    placeholder={placeholder}	
                    className={`bg-[#F6F6F6] rounded-md ${name === 'nColaborador' ? 'pl-3' : 'pl-9'} py-1.5 w-[100%] text-sm`}
                />
                {name === 'email' ? inputIcons[0]() : name === 'nColaborador' ? '' : inputIcons[1]()}
            </div>
            {isErrorVisible && (
                <p className='text-red-500 text-sm'><ErrorMessage name={name} /></p>
            )}
        </div>
    );
}