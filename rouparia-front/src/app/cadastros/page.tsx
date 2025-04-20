'use client';

import Link from 'next/link';
import { UserPlus, MapPin, Link2 } from 'lucide-react'; // Pode usar qualquer SVG, ou importar os seus
import HeaderHistoricoColaborador from '@/components/HeaderHistoricoColaborador';

export default function TelaDeCadastro() {
  const botoes = [
    {
      label: 'Cadastrar Colaborador',
      href: '/cadastroColaborador',
      Icon: UserPlus,
    },
    {
      label: 'Cadastrar Área',
      href: '/cadastrarAreaVinculo?tipo=area',
      Icon: MapPin,
    },
    {
      label: 'Cadastrar Vínculo',
      href: '/cadastrarAreaVinculo?tipo=vinculo',
      Icon: Link2,
    },
  ];

  return (
    <main className="min-h-screen bg-gray-100">
      <HeaderHistoricoColaborador tipo="excluir" />

      {/* Container dos botões */}
      <div className="flex justify-center p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mt-8">
          {botoes.map(({ label, href, Icon }, index) => (
            <Link
              key={index}
              href={href}
              className="flex flex-col items-center justify-center gap-4 p-6 bg-white border-2 border-green-700 rounded-2xl shadow-md hover:bg-green-50 transition cursor-pointer"
            >
              <Icon size={48} className="text-green-700" />
              <span className="text-lg font-semibold text-green-800 text-center">
                {label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
