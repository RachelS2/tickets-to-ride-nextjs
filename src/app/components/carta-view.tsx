import React, { useEffect, useState } from "react";
import { cn } from "@/app/lib/utils";
import { BordaDaCartaView } from "./borda-carta-view";

export type CartaProps = {
  size?: "sm" | "md" | "lg" | "responsive";
  orientacao?: "vertical" | "horizontal";
  expostoInicialmente: boolean;
  clicavel: boolean;
  onClick?: () => void;
  destacar?: boolean;
  childrenOculta?: React.ReactNode;
  childrenExposta?: React.ReactNode;
  clicada?: boolean;
};

export const CartaView = ({
  size = "md",
  orientacao = "vertical",
  expostoInicialmente = true,
  clicavel = false,
  destacar = false,
  clicada = false,
  childrenOculta,
  childrenExposta,
  onClick,
  // setCartaClicadada,
}: CartaProps) => {
  const [estaExposto, setExposicao] = useState<boolean>(expostoInicialmente);

  useEffect(() => {
    setExposicao(expostoInicialmente);
  }, [expostoInicialmente]);

  const handleClick = () => {
    if (!clicavel) return;

    // Revela a carta
    setExposicao(true);

    // Executa comando
    if (onClick) onClick();
  };

  const ladoComumClasses =
    "relative font-serif h-full w-full border-none rounded-lg overflow-hidden transition-all duration-300 ease-in-out";

  return (
    <BordaDaCartaView size={size} orientacao={orientacao}>
      <div
        className={cn(
          "relative w-full h-full",
          clicavel ? "cursor-pointer" : null,
          clicada ? "opacity-20" : "opacity-100", // carta clicada = mais opaca
          "transition-opacity duration-300"
        )}
        onClick={handleClick}
        role={clicavel ? "button" : undefined}
        tabIndex={clicavel ? 0 : undefined}
        onKeyDown={(e) => {
          if (!clicavel) return;
          if (e.key === "Enter" || e.key === " ") handleClick();
        }}
        aria-pressed={estaExposto}
      >
        {/* Verso (oculta) */}
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center",
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

        {/* Destaque (desativado se a carta já foi clicada) */}
        {destacar && !clicada && (
          <div className="absolute inset-0 pointer-events-none rounded-md ring-2 ring-offset-2 ring-primary/40" />
        )}
      </div>
    </BordaDaCartaView>
  );
};

export default CartaView;
