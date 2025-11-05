import React from "react";
import { cn } from "@/app/lib/utils"; // ajuste o caminho se necessário
import { BordaDaCartaView } from "./borda-carta-view";
import {Card} from "@/app/components/ui/card"; // ajuste import se o seu Card estiver em outro lugar
import { BilheteDestino } from "../lib/cartas-jogo";


type BilhetesDestinoProps = {
  bilheteDestino: BilheteDestino;
  size?: "sm" | "md" | "lg" | "responsive";
  orientacao?: "vertical" | "horizontal";
  /** se true -> mostra a face exposta; se false -> mostra verso (oculto) */
  exposta?: boolean;
};

/** Verso da carta, conteúdo oculto*/
const BilheteDestinoOculto: React.FC<{
  size?: "sm" | "md" | "lg" | "responsive";
  orientacao?: "vertical" | "horizontal";
 
}> = ({ size = "md", orientacao = "vertical"}) => {
  const ehHorizontal = orientacao === "horizontal";

  return (
    <div className="relative flex items-center bg-bilhete-destino-oculto justify-center w-full h-full overflow-hidden">
      {/* Fundo gradiente marrom */}
      <div
        className={cn(
          "absolute inset-1 rounded-[8px] shadow-inner bg-bilhete-destino-oculto",
          ehHorizontal ? "aspect-[4/2.5] w-full" : "aspect-[2.5/4] w-full"
        )}
      />

      {/* Retângulo claro central com texto vertical */}
      <div
        className={cn(
          "relative z-10 flex items-center justify-center rounded-[6px] select-none",
          ehHorizontal ? "w-1/3 h-[68%]" : "w-[46%] h-[68%]"
        )}
        style={{ background: "rgba(255, 238, 205, 0.95)" }}
        aria-hidden
      >
        <div className="flex flex-col items-center justify-center gap-0">
            {"TICKET".split("").map((ch, i) => (
              <span
                key={i}
                className="font-extrabold text-white text-xs leading-none tracking-wider"
                // sombra leve no texto para se destacar
                style={{ textShadow: "0 1px 0 rgba(0,0,0,0.25)" }}
              >
                {ch}
              </span>
            ))}
        </div>
      </div>

      {/* Circulo */}
      <div
        className="absolute -top-3 z-20 flex items-center justify-center"
        style={{ left: "50%", transform: "translateX(-50%)" }}
        aria-hidden
      >
        <div
          className="rounded-full"
          style={{
            width: 26,
            height: 26,
            background: "white",
            boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
          }}
        />
      </div>

      <div
        className="absolute inset-0 pointer-events-none rounded-[8px]"
        style={{
          boxShadow:
            "inset 0 -14px 30px -10px rgba(0,0,0,0.35), 0 6px 18px rgba(0,0,0,0.25)",
        }}
        aria-hidden
      />
    </div>
  );
};

/** Componente integrado: mostra verso (TicketBack) quando exposta = false, 
    senão mostra a face com as informações do bilhete. */
export const BilheteDestinoView = ({
  bilheteDestino,
  size = "md",
  orientacao = "vertical",
  exposta = true,
}: BilhetesDestinoProps & { exposta?: boolean }) => {
  // classes de animação para transição entre frente/verso
  const ladoComumClasses =
    "relative font-serif h-full w-full border-none rounded-lg overflow-hidden transition-all duration-300 ease-in-out";

  return (
    <BordaDaCartaView size={size} orientacao={orientacao}>
      <div className="relative w-full h-full">
        {/* Verso (oculto) */}
        <div
          className={cn(
            "absolute inset-0  flex items-center justify-center",
            !exposta
              ? "opacity-100 scale-100 pointer-events-auto"
              : "opacity-0 scale-90 pointer-events-none",
            "transition-opacity duration-300"
          )}
          aria-hidden={exposta}
        >
          <div className={cn(ladoComumClasses, "bg-transparent")}>
            <BilheteDestinoOculto size={size} orientacao={orientacao} />
          </div>
        </div>

        {/* Frente (exposta) */}
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center",
            exposta
              ? "opacity-100 scale-100 pointer-events-auto"
              : "opacity-0 scale-90 pointer-events-none",
            "transition-all duration-300"
          )}
          aria-hidden={!exposta}
        >
          <Card
            className={cn(
              ladoComumClasses,
              "relative font-serif bg-foreground h-full w-full border-none bg-bilhete-destino rounded-lg overflow-hidden flex flex-col transition-all duration-300"
            )}
            aria-label={`Bilhete destino ${bilheteDestino.Origem} → ${bilheteDestino.Destino}`}
          >
            {/* 1. Área fixa de Origem (altura fixa para evitar variação entre cartas) */}
            <div className="h-8 md:h-10 flex items-center justify-center pt-2">
              <h2 className="text-[10px] md:text-sm text-gray-800 text-center">
                {bilheteDestino.Origem}
              </h2>
            </div>

            {/* 2. Área do meio (cresce e centraliza o círculo) */}
            <div className="flex-1 flex items-center justify-center">
              <div
                className="bg-primary text-white w-6 h-6 md:w-8 md:h-8 
                          flex items-center justify-center rounded-full border-2 border-yellow-400 
                          text-[10px] md:text-sm font-bold shadow-lg"
                role="status"
                aria-label={`${bilheteDestino.Pontos} pontos`}
              >
                {bilheteDestino.Pontos}
              </div>
            </div>

            {/* 3. Área fixa do Destino (altura fixa também) */}
            <div className="h-10 md:h-12 flex items-center justify-center pb-2">
              <h2 className="md:text-sm text-gray-800 text-center line-clamp-2">
                {bilheteDestino.Destino}
              </h2>
            </div>
          </Card>
        </div>
      </div>
    </BordaDaCartaView>
  );
};

export default BilheteDestinoView;
