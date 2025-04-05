import { Registro } from "./registro";

export type ColaboradorSimples = {
    numero: number;
    nome: string;
    area: string;
    vinculo: string;
    registros: Registro[];
};