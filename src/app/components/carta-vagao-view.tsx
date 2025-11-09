import { useState, useEffect } from "react";
import { Train } from "lucide-react";
import { cn, pegarHexDaCor } from "@/app/lib/utils";
import { CartaVagao } from "@/app/lib/cartas-jogo";
import { Card } from "./ui/card";
import { BordaDaCartaView } from "./borda-carta-view";
import { CartaVagaoOcultaView } from "./carta-vagao-oculta-view";

interface CartaVagaoProps {
  cartaVagao: CartaVagao;
  size?:"sm" | "md" | "lg" | "responsive";
  expostaInicialmente: boolean;
  clicavel: boolean;
  onClick?: () => void;
  destacar: boolean;
}

export const CartaVagaoView = ({
  cartaVagao,
  size = "md",
  expostaInicialmente,
  clicavel,
  destacar,
  onClick,
}: CartaVagaoProps) => {
  const [exposta, setExposta] = useState(expostaInicialmente);

  useEffect(() => {
    setExposta(expostaInicialmente);
  }, [expostaInicialmente]);

  const handleClick = () => {
    if (!clicavel) return;
    setExposta(true);
    if (onClick) onClick();
  };

  const frente = (
    <Card
      className={cn(
        "rounded-lg flex items-center justify-center shadow-none border-gray-300 transition-all duration-300",
        pegarHexDaCor(cartaVagao.Cor),
        "relative w-full h-full"
      )}
    >
      <Train
        className={cn(
          size === "sm" ? "w-6 h-6" : size === "md" ? "w-8 h-8" : "w-10 h-10",
          cartaVagao.Cor === "Branco" ? "text-black" : "text-white"
        )}
      />
      {destacar && (
        <div className="absolute inset-0 rounded-md ring-2 ring-offset-2 ring-primary/40 pointer-events-none" />
      )}
    </Card>
  );

  const verso = <CartaVagaoOcultaView size={size} />;

  return (
    <BordaDaCartaView>
      <div
        className={cn(
          "relative w-full h-full transition-all duration-300",
          clicavel ? "cursor-pointer" : ""
        )}
        onClick={handleClick}
        role={clicavel ? "button" : undefined}
        tabIndex={clicavel ? 0 : undefined}
      >
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center transition-opacity duration-300",
            exposta ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
          aria-hidden={!exposta}
        >
          {frente}
        </div>

        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center transition-opacity duration-300",
            !exposta ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
          aria-hidden={exposta}
        >
          {verso}
        </div>
      </div>
    </BordaDaCartaView>
  );
};
