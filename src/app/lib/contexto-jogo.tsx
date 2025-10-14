'use client';
import { createContext, useContext, useRef } from "react";
import { Jogo } from "@/app/lib/jogo";

const ContextoJogo = createContext<Jogo | null>(null);

export const ProvedorJogo = ({ children }: { children: React.ReactNode }) => {
  const refJogo = useRef<Jogo | null>(null);
  if (!refJogo.current) refJogo.current = new Jogo();

  return (
    <ContextoJogo.Provider value={refJogo.current}>
      {children}
    </ContextoJogo.Provider>
  );
};

export const usarJogo = () => {
  const tabuleiro = useContext(ContextoJogo);
  if (!tabuleiro) throw new Error("usarJogo deve ser usado com um ProvedorJogo");
  return tabuleiro;
};