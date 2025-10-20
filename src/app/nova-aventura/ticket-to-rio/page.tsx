'use client'
import React, { useRef } from "react";
import { NomesDeCidades, RotaCidades } from "@/app/lib/cidades";
import Tabuleiro from "@/app/components/tabuleiro";
import { usarJogo } from "@/app/lib/contexto-jogo";

export default function TicketToRioGame() {
  const jogo = usarJogo();
  if (!jogo.foiIniciado()) {
    return <div>Jogo não iniciado ainda!</div>;
  }
  return (
    <div>
      <Tabuleiro />
    </div>
  )
}