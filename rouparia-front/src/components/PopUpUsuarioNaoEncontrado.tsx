import SvgInterrogacao from "./SvgInterrogacao";

interface PopUpUsuarioNaoEncontradoProps {
    numero: number;
    handleTogglePopUp: () => void;
}
export default function PopUpUsuarioNaoEncontrado({ numero, handleTogglePopUp }: PopUpUsuarioNaoEncontradoProps) {
    return (

        <div className="absolute z-10 inset-0 bg-black/50 flex justify-center items-center">
            {/**PopUp de usuário não encontrado*/}
            <div className="motion-preset-pop bg-white w-[80%] rounded-md flex flex-col items-center shadow-lg">
                <div className="flex flex-col items-center p-4">
                    <SvgInterrogacao />
                    <p className="text-lg font-poppins-regular text-vermelho mb-4">Não encontrado</p>
                    <p className="text-lg font-poppins-semiBold">Usuário com número {numero} não encontrado</p>
                    <p className="text-sm font- mt-2">Verifique se o número do colaborador está correto</p>
                </div>
                <button
                    onClick={handleTogglePopUp}
                    className="mt-4 w-[100%] font-poppins-regular px-4 py-2 bg-vermelho rounded-b-md text-white hover:bg-vermelho-hover transition">
                    Continuar
                </button>
            </div>
        </div>
    );
}
