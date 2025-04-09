import Link from "next/link";
import SairButton from "./SairButton";
import SvgSetaVoltarBranca from "./SvgSetaVoltarBranca";
import {useRouter } from "next/navigation";
import { useColaboradorContext } from "@/contexts/colaboradorContext";

interface props {
    nColaborador: number;
}

export default function HeaderHistoricoColaborador({nColaborador}:props) {
    const router = useRouter();
    console.log("Numero do colaborador", nColaborador);

    const voltar = ()=>{
        router.back();
    }

    return (
        <div className="flex sticky top-0 flex-row justify-between py-6 px-3 md:px-8 items-center w-[100vw] h-[10vh] bg-verde-primario">
            <div className="flex flex-row justify-around md:w-[40%]">
                <button onClick={voltar} className="cursor-pointer"><SvgSetaVoltarBranca /></button>
                <h1 className="font-bold text-cinza-claro text-2xl text-center md:text-start">Registro do Colaborador</h1>
            </div>
            <SairButton />
        </div>
    );
}