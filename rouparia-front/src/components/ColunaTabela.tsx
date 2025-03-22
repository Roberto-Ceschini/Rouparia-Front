interface props{
    conteudo: string | number;
    coluna: string; 
}
export default function ColunaTabela({conteudo, coluna}: props){

    const formatarEstilo = (coluna: string, conteudo: string | number)=>{
        if (coluna === 'area' || coluna === 'vinculo' || (conteudo === 'entregou' && coluna === 'status')) return 'text-verde-secundario'
        else if (coluna === 'status' && conteudo === 'retirou') return 'text-vermelho'
        else if (coluna === 'data') return 'text-verde-primario'
        return 
    }

    const capitalize = (s: string | number) => {
        if (typeof s !== 'string') return s
        return s.charAt(0).toUpperCase() + s.slice(1)
      }      
    
    return(
        <td className={`px-4 py-2 text-center font-poppins-regular ${formatarEstilo(coluna, conteudo)}`}>{capitalize(conteudo)}</td>
    )
}