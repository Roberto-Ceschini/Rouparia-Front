// app/cadastrarAreaVinculo/page.tsx
import { Suspense } from "react";
import CadastrarAreaVinculo from "./cadastrarAreaVinculo";

export default function Page() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <CadastrarAreaVinculo />
    </Suspense>
  );
}
