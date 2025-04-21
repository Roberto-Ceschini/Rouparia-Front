
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
interface SubmitButtonProps {
    name: string;
    setIsErrorVisible: (value: boolean) => void;
    handleShowError: () => void;
    disable?: boolean;

}

export default function SubmitButton({ disable = false, name, setIsErrorVisible, handleShowError }: SubmitButtonProps) {
    return (
        <>
            {disable
                ?
                <DotLottieReact
                    src="assets/animations/LoadingPng.lottie"
                    backgroundColor='transparent'
                    loop
                    autoplay
                />
                :
                <button
                    type="submit"
                    disabled={disable}
                    className='bg-laranja py-1.5 rounded-md text-white font-semibold mt-6 hover:cursor-pointer hover:bg-laranja-hover disabled:bg-laranja-hover'
                    onClick={() => {
                        setIsErrorVisible(true)
                        handleShowError()
                    }}>
                        {name}
                    </button>
            }
        </>
    )
}