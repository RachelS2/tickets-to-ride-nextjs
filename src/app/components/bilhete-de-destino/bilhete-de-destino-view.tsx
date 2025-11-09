import React from "react";
import { cn } from "@/app/lib/utils";
import { Card } from "@/app/components/ui/card";
import { BilheteDestino } from "@/app/lib/cartas-jogo";
import { BilheteDestinoOculto } from "./bilhete-de-destino-oculto-view";
import CartaView from "../carta-view";

export type BilhetesDestinoProps = {
  bilheteDestino: BilheteDestino;
  size?: "sm" | "md" | "lg" | "responsive";
  orientacao?: "vertical" | "horizontal";
  /** se true -> mostra a face exposta; se false -> mostra verso (oculto) */
  expostoInicialmente?: boolean;
  clicavel?: boolean;
  /** notifica pai quando selecionado */
  onClick?: () => void;
  destacar?: boolean;
};

export const BilheteDestinoView: React.FC<BilhetesDestinoProps> = ({
  bilheteDestino,
  size = "md",
  orientacao = "vertical",
  expostoInicialmente = true,
  clicavel = false,
  destacar = false,
  onClick,
}) => {
  const ladoComumClasses =
    "relative font-serif h-full w-full border-none rounded-lg overflow-hidden transition-all duration-300 ease-in-out";

  const frente = (
    <Card
      className={cn(
        ladoComumClasses,
        "relative font-serif bg-foreground h-full w-full border-none bg-bilhete-destino rounded-lg overflow-hidden flex flex-col transition-all duration-300"
      )}
      aria-label={`Bilhete destino ${bilheteDestino.Origem} → ${bilheteDestino.Destino}`}
    >
      <div className="flex flex-col items-center ">
        <div className="h-8 md:h-10 flex items-center justify-center pt-1">
          <h2 className="text-[10px] md:text-sm text-gray-800 text-center line-clamp-2">
            {bilheteDestino.Origem}
          </h2>
        </div>

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

        <div className="h-10 md:h-12 flex items-center justify-center pb-2 ">
          <h2 className="text-[10px]  md:text-sm text-gray-800 text-center line-clamp-2">
            {bilheteDestino.Destino}
          </h2>
        </div>
      </div>
    </Card>
  );

  const verso = <BilheteDestinoOculto size={size} orientacao={orientacao} />;

  return (
    <CartaView
      size={size}
      orientacao={orientacao}
      expostoInicialmente={expostoInicialmente}
      clicavel={clicavel}
      destacar={destacar}
      onClick={onClick}
      childrenOculta={verso}
      childrenExposta={frente}
    />
  );
};

export default BilheteDestinoView;
