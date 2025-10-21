import { Train, Ticket, CreditCard } from "lucide-react";
import { CartaVagao, CoresCartaVagao } from "@/app/lib/cartas-jogo";
import { Jogador } from "../lib/jogador";
import { CartaVagaoView } from "./carta-vagao";

interface SumarioJogadorProps {
  jogador: Jogador;
  foiEliminado?: boolean;
}

export const SumarioJogador = ({
  jogador, 
  foiEliminado: isEliminated = false,
}: SumarioJogadorProps) => {
  const nome = jogador.pegarNome();
  const corDoTrem = jogador.pegarCorDoTrem();
  const qtdeTrens = jogador['QtdeTrens'];
  const qtdeBilhetesDestino = jogador['BilhetesDestinoMaos']?.length || 0;
  const qtdeCartasVagao = jogador['CartasVagaoMaos']?.length || 0;

  return (
    <div className="flex flex-col items-center gap-2 p-4 border-r last:border-r-0 border-border">
      <div className={isEliminated ? "opacity-50" : ""}>
        <CartaVagaoView color={corDoTrem} size="sm" />
      </div>
      <p className="font-semibold text-sm">Jogador Atual: {nome}</p>
      <div className="flex items-center gap-1 text-xs">
        <Train className="w-4 h-4" />
          <span>Você tem {qtdeTrens} trens!</span>
      </div>
      <div className="flex items-center gap-1 text-xs">
        <Ticket className="w-4 h-4" />
        <span>{qtdeBilhetesDestino}Bilhetes de Destino</span>
      </div>
      <div className="flex items-center gap-1 text-xs">
        <CreditCard className="w-4 h-4" />
        <span>{qtdeCartasVagao}Cartas de Vagão</span>
      </div>
    </div>
  );
};
