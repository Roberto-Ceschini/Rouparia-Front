import SairButton from "./SairButton";
import SvgSetaVoltarBranca from "./SvgSetaVoltarBranca";

export default function HeaderHistoricoColaborador() {
    return (
        <div className="flex flex-row justify-between px-8 items-center w-[100vw] h-[10vh] bg-verde-primario">
            <div className="flex w-[30%] justify-between">
                <SvgSetaVoltarBranca />
                <h1 className="font-bold text-cinza-claro">Registro do Colaborador</h1>
            </div>
            <SairButton />
        </div>
    );
}