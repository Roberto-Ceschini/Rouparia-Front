import { Registro } from "./registro";

export type ColaboradorSimples = {
    id?: number;
    numero: number;
    nome: string;
    area: string;
    vinculo: string;
    registros: Registro[];
};