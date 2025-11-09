import React, { useEffect, useState } from "react";
import { cn } from "@/app/lib/utils"; // ajuste o caminho se necessário
import { BordaDaCartaView } from "../borda-carta-view";
import {Card} from "@/app/components/ui/card"; // ajuste import se o seu Card estiver em outro lugar
import { BilheteDestino } from "../../lib/cartas-jogo";
import { BilheteDestinoOculto } from "./bilhete-de-destino-oculto-view";
import {CartaProps, CartaView} from "../carta-view"

export type BilhetesDestinoProps = {
  bilheteDestino: BilheteDestino;
  cartaProps: CartaProps
};



/** Componente integrado: mostra verso (TicketBack) quando expostoInicialmente = false, 
    senão mostra a face com as informações do bilhete. */
export const BilheteDestinoView = ({
  bilheteDestino,
  cartaProps
}: BilhetesDestinoProps & { expostoInicialmente?: boolean }) => {

  const ladoComumClasses =
    "relative font-serif h-full w-full border-none rounded-lg overflow-hidden transition-all duration-300 ease-in-out";
  
  const expostoInicialmente : boolean = cartaProps.expostoInicialmente;
  const clicavel : boolean = cartaProps.clicavel;
  const onClick = cartaProps.onClick
  const size = cartaProps.size? cartaProps.size : "md"
  const orientacao = cartaProps.orientacao? cartaProps.orientacao : "vertical"

  const childrenOculta = (
              <div className={cn(ladoComumClasses, "bg-transparent")}>
            <BilheteDestinoOculto size={size} orientacao={orientacao} />
          </div>
        </div>
  )
  return (
      <CartaView>
        
      </CartaView>
          <div className={cn(ladoComumClasses, "bg-transparent")}>
            <BilheteDestinoOculto size={size} orientacao={orientacao} />
          </div>
        </div>

        {/* Frente (exposto) */}
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center",
            estaExposto
              ? "opacity-100 scale-100 pointer-events-auto"
              : "opacity-0 scale-90 pointer-events-none",
            "transition-all duration-300"
          )}
          aria-hidden={!estaExposto}
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
              <h2 className="text-[10px] md:text-sm text-gray-800 text-center line-clamp-2">
                {bilheteDestino.Origem}
              </h2>
            </div>

            {/* 2. Área do meio (cresce e centraliza o círculo) */}
            <div className="flex-1 flex items-center justify-center pt-1 pb-1">
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
              <h2 className="text-[10px]  md:text-sm text-gray-800 text-center line-clamp-2">
                {bilheteDestino.Destino}
              </h2>
            </div>
          </Card>
        </div>
      </div>  {destacar && (
                          <div className="absolute inset-0 pointer-events-none rounded-md ring-2 ring-offset-2 ring-primary/40" />
                        )}
    </BordaDaCartaView> 
  ); 
};

export default BilheteDestinoView;
