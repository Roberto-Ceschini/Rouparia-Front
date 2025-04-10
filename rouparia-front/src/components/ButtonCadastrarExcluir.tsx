import SvgUsuarioIcon from "./SvgUsuarioIcon";

interface props {
    onClick: () => void;
    texto: "Cadastrar" | "Excluir";
}
export default function ButtonCadastrarExcluir({ onClick, texto }: props) {

    return (
        <button className="group cursor-pointer text-cinza-claro text-lg font-semibold gap-1.5 flex items-center flex-row hover:text-laranja-hover" onClick={onClick}>
            <SvgUsuarioIcon className="fill-current group-hover:fill-laranja-hover" />
            {texto}
        </button>
    )

}