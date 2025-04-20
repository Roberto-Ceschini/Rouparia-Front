import { useAuth } from "@/contexts/authContext";

export default function SairButton(){
    const {logout} = useAuth(); //Pega a função de logout do context
    return (
        <button className="bg-laranja text-white p-1 cursor-pointer hover:bg-laranja-hover px-8 rounded-lg font-poppins-regular" onClick={logout}>Sair</button>
    );
}