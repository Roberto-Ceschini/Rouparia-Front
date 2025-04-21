// context/AuthContext.tsx
"use client";
import { createContext, use, useContext, useEffect, useState } from "react";
import axios from "axios";

import { usePathname, useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import api from "@/services/axios";

interface JwtPayload {
  id: string;
  username: string;
  roles: string;
  iat: number;
  exp: number;
}

interface AuthContextType {
  token: string | null;
  login: (username: string, senha: string) => Promise<void>;
  logout: () => void;
  role: string | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: any) => {
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState <boolean>(false);

  const router = useRouter();
  const pathname = usePathname();

  // useEffect(() => {
  //   const savedToken = localStorage.getItem("token");
  //   if (savedToken) setToken(savedToken);
  //   try {
  //     if (savedToken) {
  //       const decoded = jwtDecode<JwtPayload>(savedToken);
  //       console.log("Decoded JWT:", decoded.username); // Log do token decodificado
  //       if (decoded) setRole(decoded.roles);
  //     }
  //   } catch (err) {
  //     console.error("Token inválido");
  //     logout(); // opcional: desloga se o token for inválido
  //   }
  // }, []);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) setToken(savedToken);
    else {
      pathname !== "/login" && router.replace("/login"); // Redireciona para a página de login se não houver token
    }
    try {
      if (savedToken) {
        const decoded = jwtDecode<JwtPayload>(savedToken);
        if (decoded) setRole(decoded.roles);
      }
    } catch (err) {
      console.error("Token inválido");
      logout(); // opcional: desloga se o token for inválido
    }

  }, [token]);

  const login = async (username: string, senha: string) => {
    try {
      setLoading(true);
      const response = await api.post("/auth/login", {
        username: username,
        password: senha,
      });
      const token = response.data.acess_token;
      localStorage.setItem("token", token);
      setToken(token);
      router.replace("/"); // Redireciona para a página inicial após o login
    } catch (error) {
      console.error("Erro ao fazer login:", error); // Log do err
      alert("Falha ao fazer login. Verifique suas credenciais.");
    } finally{
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ loading, token, login, logout, role }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
