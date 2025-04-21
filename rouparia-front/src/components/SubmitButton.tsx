

import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useEffect, useState } from 'react';

interface SubmitButtonProps {
    name: string;
    setIsErrorVisible: (value: boolean) => void;
    handleShowError: () => void;
    disable?: boolean;

}

export default function SubmitButton({ disable = false, name, setIsErrorVisible, handleShowError }: SubmitButtonProps) {
    const [showButton, setShowButton] = useState(true); // controla se o botão tá no DOM
    const [isExiting, setIsExiting] = useState(false);  // controla se ele tá animando a saída
  
    useEffect(() => {
      if (disable) {
        setIsExiting(true); // começa a animação de saída
        // depois de 500ms remove do DOM
        const timeout = setTimeout(() => {
          setShowButton(false);
        }, 300); // tempo igual ao da animação de saída
        return () => clearTimeout(timeout);
      } else {
        // se voltou a ficar ativo, mostra no DOM e tira a animação de saída
        setShowButton(true);
        setIsExiting(false);
      }
    }, [disable]);

    return (
        <>
          {disable ? (
            <DotLottieReact
              src="assets/animations/LoadingPng.lottie"
              backgroundColor="transparent"
              loop
              autoplay
            />
          ) : (
            <button
              type="submit"
              disabled={disable}
              className={`${isExiting ? 'motion-opacity-out-0' : 'motion-opacity-in-0'} bg-laranja py-1.5 rounded-md text-white font-semibold mt-6 hover:cursor-pointer hover:bg-laranja-hover disabled:bg-laranja-hover`}
              onClick={() => {
                setIsErrorVisible(true);
                handleShowError();
              }}
            >
              {name}
            </button>
          )}
        </>
      );
    }