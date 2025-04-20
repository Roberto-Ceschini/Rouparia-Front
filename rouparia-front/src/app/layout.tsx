// app/layout.tsx ou app/rootLayout.tsx (se estiver com nome customizado)
import { AuthProvider } from "@/contexts/authContext";
import "./globals.css";
import { ColaboradorProvider } from "@/contexts/colaboradorContext"; // Ajusta o caminho conforme sua pasta

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <AuthProvider>
          <ColaboradorProvider>{children}</ColaboradorProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
