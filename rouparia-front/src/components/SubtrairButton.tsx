import SvgButtonMenos from "./SvgButtonMenos";
interface props {
    onClick: ()=>void;
}
export default function SubtrairButton({onClick}: props) {
    return (
        <button className=" p-2 rounded-full bg-verde-primario-hover cursor-pointer" onClick={onClick}>
            <SvgButtonMenos />
        </button>
    )
}