import React, { useEffect, useState } from "react";
import { cn } from "@/app/lib/utils";
import { BordaDaCartaView } from "./borda-carta-view";

export type CartaProps = {
  size?: "sm" | "md" | "lg" | "responsive";
  orientacao?: "vertical" | "horizontal";
  /** se true -> mostra a face exposta; se false -> mostra verso (oculto) */
  expostoInicialmente: boolean;
  clicavel: boolean;
  /** notifica pai quando selecionado */
  onClick?: () => void; 
  destacar? : boolean;
  childrenOculta?: React.ReactNode;
  childrenExposta?: React.ReactNode;
};

/** Componente integrado: mostra verso quando expostoInicialmente = false, 
    senão mostra a face com as informações da carta. */
export const CartaView = ({
  size = "md",
  orientacao = "vertical",
  expostoInicialmente = true,
  clicavel = false,
  destacar = false,
  childrenOculta,
  childrenExposta,
  onClick,
}: CartaProps) => {

  const ladoComumClasses =
    "relative font-serif h-full w-full border-none rounded-lg overflow-hidden transition-all duration-300 ease-in-out";
  
  const [estaExposto, setExposicao] = useState<boolean>(expostoInicialmente);
  useEffect(() => {
    setExposicao(expostoInicialmente);
  }, [expostoInicialmente]);

  const handleClick = () => {
    if (!clicavel) return;
    setExposicao(true); // revela a carta 
    if (onClick) onClick(); 
  };

  return (
    <BordaDaCartaView size={size} orientacao={orientacao}>
      <div className={cn("relative w-full h-full", clicavel ? "cursor-pointer" : null)}  onClick={handleClick} role={clicavel ? "button" : undefined} tabIndex={clicavel ? 0 : undefined}
      onKeyDown={(e) => {
        if (!clicavel) return;
        if (e.key === "Enter" || e.key === " ") handleClick();
      }}
      aria-pressed={estaExposto}>

        <div
          className={cn(
            "absolute inset-0  flex items-center justify-center",
            !estaExposto
              ? "opacity-100 scale-100 pointer-events-auto"
              : "opacity-0 scale-90 pointer-events-none",
            "transition-opacity duration-300"
          )}
          aria-hidden={estaExposto}
        >
          <div className={cn(ladoComumClasses, "bg-transparent")}>
            {childrenOculta}
          </div>
        </div>

        {/* Frente (exposta) */}
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
          {childrenExposta}
        </div>
      </div>  {destacar && (
                          <div className="absolute inset-0 pointer-events-none rounded-md ring-2 ring-offset-2 ring-primary/40" />
                        )}
    </BordaDaCartaView> 
  ); 
};

export default CartaView;
