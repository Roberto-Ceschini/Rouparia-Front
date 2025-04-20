import { FileChartColumnIncreasingIcon, Settings, User } from "lucide-react";
import SvgUsuarioIcon from "./SvgUsuarioIcon";

interface props {
    onClick: () => void;
}
export default function ButtonCadastrarExcluir({ onClick}: props) {

    return (
        <button className="group cursor-pointer text-cinza-claro text-lg font-semibold gap-1.5 flex items-center flex-row hover:text-laranja-hover" onClick={onClick}>
            <Settings/>
            Gerenciar
        </button>
    )

}