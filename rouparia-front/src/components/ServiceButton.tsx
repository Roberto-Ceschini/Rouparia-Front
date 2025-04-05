interface ServiceButtonProps {
    name: string;
    textColor?: string;
    color?: string;
    hoverColor?: string;
    submitting?: boolean;
    onClickFunction?: () => void;
}

export default function ServiceButton({ name, onClickFunction=()=>{}, color='verde-secundario', hoverColor, textColor='black', submitting=false }: ServiceButtonProps) {
    const hover = `bg-${hoverColor}`
    return (
        <button
            className={`${color? `bg-${color}` : 'bg-verde-secundario'} text-${textColor} w-[100%] py-1.5 rounded-md font-poppins-regular hover:cursor-pointer hover:${hover} shadow-md shadow-${color} `}
            onClick={onClickFunction}
            disabled={submitting}>
            {name}
        </button>
    );
}