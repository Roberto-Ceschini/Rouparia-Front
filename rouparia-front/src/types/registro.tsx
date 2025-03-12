import { Colaborador } from "./colaborador";

export type Registro = {
  id: number;
  data: string; // Pode ser Date se você for manipular como objeto Date no front
  status: string;
  colaborador_id: number;
  colaborador: Colaborador;
};
