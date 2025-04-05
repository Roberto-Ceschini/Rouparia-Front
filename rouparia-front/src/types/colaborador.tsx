import { Area } from "./area";
import { Registro } from "./registro";
import { Vinculo } from "./vinculo";

export type Colaborador = {
  id: number;
  numero: number;
  nome: string;
  area_id?: number | null;
  area?: Area | null;
  vinculo_id?: number | null;
  vinculo?: Vinculo | null;
  registros: Registro | null;
};