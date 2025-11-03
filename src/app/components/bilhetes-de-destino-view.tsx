import { Card } from "@/app/components/ui/card";
import { cn } from "@/app/lib/utils";
import { BilheteDestino } from "../lib/cartas-jogo";
import {BordaDaCartaView} from "./borda-carta-view";

type BilhetesDestinoProps = {
  bilheteDestino: BilheteDestino;
  size?: "sm" | "md" | "lg" | "responsive";
  orientacao?: "vertical" | "horizontal";
};

export const BilhetesDestinoView = ({
  bilheteDestino,
  size = "md",
  orientacao = "vertical",
}: BilhetesDestinoProps) => {

  return (
    <BordaDaCartaView size={size} orientacao={orientacao}>

      <Card
        className="relative font-serif bg-foreground h-full w-full border-none bg-bilhete-destino rounded-lg
         overflow-hidden flex flex-col justify-between transition-all duration-300">
        <div className="flex items-center justify-center inset-0 h-full bg-gradient-to-b rounded-lg  text-center mb-2">
          <h2 className="text-[10px] md:text-sm text-gray-800 drop-shadow-sm">
            {bilheteDestino.Origem}
          </h2>
          <img
            src="/assets/path-sem-fundo.png"
            className="absolute inset-0 max-w-[100px] w-full h-full max-h-[140px] opacity-70 object-contain mx-auto"
            alt="Fundo de rota de bilhete de destino"
          />
        </div>

        <div className="flex items-center relative inset-0 h-full bg-gradient-to-b rounded-lg ">
        </div>

        <div className="absolute inset-0 flex items-center justify-center z-20">
          
          <div className="bg-primary text-white w-6 h-6 md:w-8 md:h-8 
                          flex items-center justify-center rounded-full border-2 border-yellow-400 
                          text-[10px] md:text-sm font-bold shadow-lg">
            {bilheteDestino.Pontos}
          </div>
        </div>

        <div className="text-center mt-2">
          <h2 className="text-[10px] md:text-sm text-gray-800 drop-shadow-sm">
            {bilheteDestino.Destino}
          </h2>
        </div>

      </Card>
    </BordaDaCartaView>
  );
};
