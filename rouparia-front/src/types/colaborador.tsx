import { Area } from "./area";
import { Registro } from "./registro";

export type Colaborador = {
  id: number;
  numero: number;
  nome: string;
  area_id?: number | null;
  area?: Area | null;
  registros: Registro[];
};