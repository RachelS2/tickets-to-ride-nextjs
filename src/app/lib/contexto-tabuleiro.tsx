'use client';
import { createContext, useContext, useRef } from "react";
import { Tabuleiro } from "@/app/lib/tabuleiro";

const TabuleiroContexto = createContext<Tabuleiro | null>(null);

export const ProvedorTabuleiro = ({ children }: { children: React.ReactNode }) => {
  const refTabuleiro = useRef<Tabuleiro | null>(null);
  if (!refTabuleiro.current) refTabuleiro.current = new Tabuleiro([]);

  return (
    <TabuleiroContexto.Provider value={refTabuleiro.current}>
      {children}
    </TabuleiroContexto.Provider>
  );
};

export const usarTabuleiro = () => {
  const tabuleiro = useContext(TabuleiroContexto);
  if (!tabuleiro) throw new Error("usarTabuleiro deve ser usado com um ProvedorTabuleiro");
  return tabuleiro;
};