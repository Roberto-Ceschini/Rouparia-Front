"use client";
import Link from "next/link";
import SairButton from "./SairButton";
import SvgSetaVoltarBranca from "./SvgSetaVoltarBranca";
import { useRouter } from "next/navigation";
import ButtonCadastrarExcluir from "./ButtonCadastrarExcluir";
import { useState } from "react";
import { useAuth } from "@/contexts/authContext";

interface props {
  tipo:
    | "pendencias"
    | "historico"
    | "cadastro"
    | "gerenciamento"
    | "home"
    | "gerenciamento colaborador"
    | "gerenciamento areas"
    | "gerenciamento vinculos"
}

export default function HeaderHistoricoColaborador({ tipo }: props) {
  const router = useRouter();

  const { role } = useAuth();

  const titulo = [
    "Registro de pendências",
    "Registro do colaborador",
    "Cadastro do colaborador",
    "Painel de gerenciamento",
    "Home",
    "Gerenciamento de colaboradores",
    "Gerenciamento de áreas",
    "Gerenciamento de vínculos",
  ];

  const mostrarTitulo = () => {
    switch (tipo) {
      case "pendencias": {
        return titulo[0];
      }

      case "historico": {
        return titulo[1];
      }

      case "cadastro": {
        return titulo[2];
      }

      case "gerenciamento": {
        return titulo[3];
      }

      case "home": {
        return titulo[4];
      }

      case "gerenciamento colaborador": {
        return titulo[5];
      }
      
      case "gerenciamento areas": {
        return titulo[6];
      }

      case "gerenciamento vinculos": {
        return titulo[7]; 
    }
  }
  };

  const voltar = () => {
    if (tipo !== "home") router.back();
    else return;
  };

  const cadastrar = () => {
    router.push("/cadastros");
  };

  const [menuAberto, setMenuAberto] = useState(false);

  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
  };

  if (role === null) {
    return (
      <div className="flex w-full h-[10vh] bg-verde-primario justify-center items-center">
        <h1 className="text-cinza-claro text-2xl font-bold">Carregando...</h1>
      </div>
    );
  }

  return (
    <>
      {/* Cabeçalho principal */}
      <div
        className={`flex sticky top-0 flex-row justify-between py-6 px-3 lg:px-8 items-center w-full h-[10vh] bg-verde-primario`}
      >
        {/* Parte esquerda (voltar + título) */}
        <div className="flex flex-row justify-around">
          <button onClick={voltar} className="group cursor-pointer">
            <SvgSetaVoltarBranca className="fill-cinza-claro group-hover:fill-laranja-hover" />
          </button>
        </div>
        <button
          className="cursor-pointer group"
          onClick={() => router.replace("/")}
        >
          <h1 className="group-hover:text-laranja-hover lg:flex font-bold text-cinza-claro text-2xl text-center lg:text-start">
            {mostrarTitulo()}
          </h1>
        </button>

        {/* Ícone do Menu Sanduíche (mobile) */}
        <button
          className="lg:hidden text-cinza-claro focus:outline-none"
          onClick={toggleMenu}
          aria-label="Menu"
        >
          {menuAberto ? (
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>

        {/* Menu Desktop (telas grandes) */}
        <div className="hidden lg:flex items-center space-x-4">
          <>
            {role === "admin" && (
              <>
                <Link
                  href={"/pendencias"}
                  className="text-white p-1 px-8 rounded-lg font-poppins-regular cursor-pointer hover:text-laranja-hover"
                >
                  Pendências
                </Link>
                <ButtonCadastrarExcluir onClick={cadastrar} />
              </>
            )}
          </>
          <SairButton />
        </div>
      </div>

      {/* Menu Mobile (aparece quando aberto) */}
      {menuAberto && (
        <div className="lg:hidden fixed top-[10vh] right-0 w-full bg-verde-primario shadow-lg z-50 p-4">
          <div className="flex flex-col space-y-4">
            <>
              {role === "admin" && (
                <>
                  <ButtonCadastrarExcluir
                    onClick={() => {
                      cadastrar();
                      setMenuAberto(false);
                    }}
                  />
                  <Link
                    href={"/pendencias"}
                    className="bg-laranja text-white p-1 px-8 rounded-lg font-poppins-regular cursor-pointer"
                  >
                    Pendencias
                  </Link>
                </>
              )}
            </>
            <div className="flex justify-center">
              <SairButton />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
