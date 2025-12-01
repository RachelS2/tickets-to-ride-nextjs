"use client";

import { createContext, useContext, useState } from "react";
import { Jogo } from "./jogo";

type ContextoJogoTipo = {
  jogo: Jogo;
  resetarJogo: () => void;
};

const ContextoJogo = createContext<ContextoJogoTipo | null>(null);

export const ProvedorJogo = ({ children }: { children: React.ReactNode }) => {
  const [jogo, setJogo] = useState<Jogo>(() => new Jogo());

  function resetarJogo() {
    setJogo(new Jogo());
  }

  return (
    <ContextoJogo.Provider value={{ jogo, resetarJogo }}>
      {children}
    </ContextoJogo.Provider>
  );
};

export function usarJogo() {
  const ctx = useContext(ContextoJogo);
  if (!ctx) throw new Error("usarJogo deve ser usado com um ProvedorJogo");
  return ctx;
}
