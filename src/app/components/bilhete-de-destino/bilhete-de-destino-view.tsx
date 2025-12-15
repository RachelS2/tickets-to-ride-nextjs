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
  size = "responsive",
  orientacao = "vertical",
  expostoInicialmente = true,
  clicavel = false,
  destacar = false,
  onClick,
}) => {
  const ladoComumClasses =
    "relative font-serif h-full w-full border-none rounded-lg overflow-hidden transition-all duration-300 ease-in-out";
  const tamTextos = "text-[0.4rem]  sm:text-[0.4rem] md:text-[0.5rem] lg:text-[0.675rem] xl:text-[0.8rem]";
  const origemDestinoComum = "text-gray-800 text-center line-clamp-2";
  const frente = (
  <Card
    className={cn(
      ladoComumClasses,
      "relative font-serif bg-bilhete-destino h-full w-full border-none rounded-lg overflow-hidden flex flex-col transition-all duration-300"
    )}
    aria-label={`Bilhete destino ${bilheteDestino.Origem} → ${bilheteDestino.Destino}`}
  >
    {/* Contêiner principal ocupando 100% da altura */}
    <div className="flex flex-col h-full items-center justify-between relative">
      
      {/* Cabeçalho */}
      <div className="h-1/3 flex items-center justify-center w-full">
        <h2 className={cn(tamTextos, origemDestinoComum)}>
          {bilheteDestino.Origem.Nome}
        </h2>
      </div>

      {/* Pontos (centralizado, mas acima visualmente) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <div
          className={cn(
            tamTextos,
            "bg-primary text-white w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 flex items-center justify-center rounded-full border-2 border-yellow-400 font-bold shadow-lg"
          )}
        >
          {bilheteDestino.Pontos}
        </div>
      </div>

      {/* Rodapé */}
      <div className="h-1/3 flex items-center justify-center w-full">
        <h2 className={cn(tamTextos, origemDestinoComum)}>
          {bilheteDestino.Destino.Nome}
        </h2>
      </div>
    </div>
  </Card>
);

  const verso = <BilheteDestinoOculto orientacao={orientacao} />;

  return (
    <CartaView
      size={size}
      orientacao={orientacao}
      expostoInicialmente={expostoInicialmente}
      clicavel={clicavel}
      destacar={destacar}
      clicada={bilheteDestino.objetivoFoiAtingido() ? true: false}
      onClick={onClick}
      childrenOculta={verso}
      childrenExposta={frente}
    />
  );
};

export default BilheteDestinoView;
