interface SubmitButtonProps {
    name: string;
    setIsErrorVisible: (value: boolean) => void;
    handleShowError: () => void;

}

export default function SubmitButton({ name, setIsErrorVisible, handleShowError }: SubmitButtonProps) {
    return (
        <button
         type="submit" 
         className='bg-laranja py-1.5 rounded-md text-white font-semibold mt-6 hover:cursor-pointer hover:bg-laranja-hover'
         onClick={()=>{
            setIsErrorVisible(true)
            handleShowError()
        }}>{name}</button>
    )
}