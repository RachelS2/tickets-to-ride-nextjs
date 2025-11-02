// CartaVagaoView.tsx
import { Train } from "lucide-react";
import { cn , pegarHexDaCor } from "@/app/lib/utils";
import { CartaVagao } from "@/app/lib/cartas-jogo";
import { Card } from "./ui/card";

interface CartaVagaoProps {
  cartaVagao: CartaVagao;
  size?: "sm" | "md" | "xl";
}

export const CartaVagaoView = ({ cartaVagao, size = "md" }: CartaVagaoProps) => {
  console.log(cartaVagao.Cor);
  const hexDaCor = pegarHexDaCor(cartaVagao.Cor);

  return (
    <div className="bg-white p-1 shadow border-gray-400">

      <Card
        className={cn(
          "rounded-lg border-gray-300 flex items-center shadow-none justify-center", hexDaCor,
          size === "sm" && "w-[60] h-[100] p-2",
          size === "md" && "w-[75px] h-[115px] p-3",
          size === "xl" && "w-[90px] h-[130px] p-4",
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
    </div>
  );
};
