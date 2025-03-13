"use client"
import { useParams } from "next/navigation"

export default function HistoricoColaborador(){

    const {id} = useParams()
    return(
        <div>
            <p> Bem vindo colaborador {id} </p>
        </div>
    )
}