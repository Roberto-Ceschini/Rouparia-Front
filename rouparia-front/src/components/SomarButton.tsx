import SvgButtonPlus from "./SvgButtonPlus";
interface props {
    onClick: ()=>void;
}
export default function SomarButton({onClick}: props) {
    return (
        <button className=" p-2 rounded-full bg-verde-primario-hover cursor-pointer items-center justify-center" onClick={onClick}>
            <SvgButtonPlus />
        </button>
    )
}