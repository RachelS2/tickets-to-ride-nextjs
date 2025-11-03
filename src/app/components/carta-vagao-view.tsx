// CartaVagaoView.tsx
import { Train } from "lucide-react";
import { cn , pegarHexDaCor } from "@/app/lib/utils";
import { CartaVagao } from "@/app/lib/cartas-jogo";
import { Card } from "./ui/card";
import { BordaDaCartaView } from "./borda-carta-view";

interface CartaVagaoProps {
  cartaVagao: CartaVagao;
  size?: "sm" | "md" | "xl";
}

export const CartaVagaoView = ({ cartaVagao, size = "md" }: CartaVagaoProps) => {
  console.log(cartaVagao.Cor);

  return (
    <BordaDaCartaView>
      <Card
        className={cn("rounded-lg border-gray-300 flex w-full h-full items-center shadow-none justify-center", pegarHexDaCor(cartaVagao.Cor),
          cartaVagao.Cor === "Branco" ? "border border-gray-300" : "border-none"
        )}
      >
        <Train
          className={cn(
            size === "sm" ? "w-6 h-6" : size === "md" ? "w-8 h-7" : "w-10 h-10",
            cartaVagao.Cor === "Branco" ?  "text-black" : "text-white"
          )}
        />
      </Card>
    </BordaDaCartaView>
  );
};
