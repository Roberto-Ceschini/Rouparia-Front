interface SubmitButtonProps {
    name: string;

}

export default function SubmitButton({ name }: SubmitButtonProps) {
    return (
        <button
         type="submit" 
         className='bg-laranja py-1.5 rounded-md text-white font-semibold mt-6 hover:cursor-pointer hover:bg-laranja-hover'>{name}</button>
    )
}