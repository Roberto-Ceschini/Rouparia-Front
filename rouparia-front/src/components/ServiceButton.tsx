interface ServiceButtonProps {
    name: string;
    textColor?: string;
    color?: string;
    hoverColor?: string;
    submitting?: boolean;
    onClickFunction?: () => void;
}

export default function ServiceButton({ name, onClickFunction=()=>{}, color='verde-secundario', hoverColor, textColor='black', submitting=false }: ServiceButtonProps) {
    return (
        <button
            className={`${color? `bg-${color}` : 'bg-verde-secundario'} text-${textColor} w-[100%] py-1.5 rounded-md font-poppins-regular hover:cursor-pointer hover:bg-${hoverColor} shadow-neutral-900 shadow-sm`}
            onClick={onClickFunction}
            disabled={submitting}>
            {name}
        </button>
    );
}