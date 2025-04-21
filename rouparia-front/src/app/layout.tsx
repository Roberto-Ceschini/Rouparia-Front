// app/layout.tsx ou app/rootLayout.tsx (se estiver com nome customizado)
import { AuthProvider } from "@/contexts/authContext";
import "./globals.css";
import { ColaboradorProvider } from "@/contexts/colaboradorContext"; // Ajusta o caminho conforme sua pasta
import ObserverProvider from "@/contexts/ObserverProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <AuthProvider>
        <ObserverProvider> 
          <ColaboradorProvider>{children}</ColaboradorProvider>
          </ObserverProvider> 
        </AuthProvider>
      </body>
    </html>
  );
}
