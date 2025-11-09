import React from "react";
import { Train } from "lucide-react";
import { cn, pegarVarDaCor } from "@/app/lib/utils";
import { CartaVagao } from "@/app/lib/cartas-jogo";
import { Card } from "../ui/card";
import CartaView from "../carta-view";
import { CartaVagaoOcultaView } from "./carta-vagao-oculta-view";

export type CartaVagaoProps = {
  cartaVagao: CartaVagao;
  size?: "sm" | "md" | "lg" | "responsive";
  expostoInicialmente?: boolean;
  clicavel?: boolean;
  onClick?: () => void;
  destacar?: boolean;
};

export const CartaVagaoView: React.FC<CartaVagaoProps> = ({
  cartaVagao,
  size = "md",
  expostoInicialmente = false,
  clicavel = false,
  destacar = false,
  onClick,
}) => {
  const frente = (
    <Card
      className={cn(
        "rounded-lg flex items-center justify-center shadow-none border-gray-300 transition-all duration-300 relative w-full h-full",
        pegarVarDaCor(cartaVagao.Cor)
      )}
      aria-label={`Carta de vagão ${cartaVagao.Cor}`}
    >
      <Train
        className={cn(
          size === "sm" ? "w-6 h-6" : size === "md" ? "w-8 h-8" : "w-10 h-10",
          cartaVagao.Cor === "Branco" ? "text-black" : "text-white"
        )}
      />
    </Card>
  );

  const verso = <CartaVagaoOcultaView size={size} />;

  return (
    <CartaView
      size={size}
      orientacao="vertical"
      expostoInicialmente={expostoInicialmente}
      clicavel={clicavel}
      destacar={destacar}
      onClick={onClick}
      childrenOculta={verso}
      childrenExposta={frente}
    />
  );
};

export default CartaVagaoView;
