"use client";

import { createContext, ReactNode, useContext, useEffect, useReducer, useState } from "react";

type Colaborador = {
  numero: string | null;
  nome: string | null;
  area: string | null;
  vinculo: string | null;
};

type ColaboradorContextType = {
  colaborador_context: Colaborador;
  setColaboradorContext: (dados: Partial<Colaborador>) => void;
};

const ColaboradorContext = createContext<ColaboradorContextType | undefined>(undefined);

export const ColaboradorProvider = ({ children }: { children: ReactNode }) => {
  const [colaborador_context, setColaborador] = useState<Colaborador>({
    numero: null,
    nome: null,
    area: null,
    vinculo: null,
  });

  const setColaboradorContext = (dados: Partial<Colaborador>) => {
    setColaborador((prev) => ({ ...prev, ...dados }));
  };

  //TESTES
  useEffect(()=>{
    console.log("COLABORADR\n", colaborador_context);
  }, [colaborador_context])

  return (
    <ColaboradorContext.Provider value={{ colaborador_context, setColaboradorContext }}>
      {children}
    </ColaboradorContext.Provider>
  );
};

export const useColaboradorContext = () => {
  const context = useContext(ColaboradorContext);
  if (!context) {
    throw new Error("useColaboradorContext deve ser usado dentro de um ColaboradorProvider");
  }
  return context;
};
