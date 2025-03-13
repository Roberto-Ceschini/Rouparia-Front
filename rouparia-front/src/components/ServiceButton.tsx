interface ServiceButtonProps {
    name: string;
    textColor?: string;
    color?: string;
    hoverColor?: string;
    onClickFunction?: () => void;
}

export default function ServiceButton({ name, onClickFunction  = ()=>{}, color, hoverColor, textColor = 'black' }: ServiceButtonProps) {
    return (
        <button
            className={`bg-${color} text-${textColor}
             w-[100%] py-1.5 rounded-md font-semibold hover:cursor-pointer hover:bg-${hoverColor} shadow-neutral-900 shadow-sm`}
            onClick={onClickFunction}>
            {name}
        </button>
    );
}