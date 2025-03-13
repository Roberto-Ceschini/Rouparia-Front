"use client"
import api from "@/services/axios";
import { Colaborador } from "@/types/colaborador";
import { useParams } from "next/navigation"
import { useState } from "react";

export default function HistoricoColaborador(){

    const {id} = useParams();

    const [colaborador, setColaborador] = useState<Colaborador | null>(null);

    const fetchColaborador = async () => {
        try {
          const response = await api.get(`colaborador/${id}`);
          console.log(response);
          if (response) {
            const colaborador = response.data;
          }
        } catch (error) {
          console.log(error);
        }
      }
    return(
        <div>
            <p> Bem vindo colaborador {id} </p>
        </div>
    )
}