import { Card } from "@/app/components/ui/card";
import { cn } from "@/app/lib/utils";
import { CartaMaiorCaminhoContinuo } from "../lib/cartas-jogo";

type MaiorCaminhoContinuoProps = {
  maiorCaminhoContinuo: CartaMaiorCaminhoContinuo;
  size?: "sm" | "md" | "lg" | "responsive";
};


export const MaiorCaminhoContinuoView = ({
  maiorCaminhoContinuo,
  size = "md",
}: MaiorCaminhoContinuoProps) => {
  return (
    <div className="relative flex flex-col items-center justify-center bg-white p-1 shadow">

      <Card
        className={cn(
          "relative font-serif bg-foreground aspect-[2.5/4] border-none bg-bilhete-destino rounded-lg overflow-hidden flex flex-col justify-between transition-all duration-300",
          // tamanhos fixos
          size === "sm" && "w-[70px]",
          size === "md" && "w-[90px]",
          size === "lg" && "w-[110px]",
          // modo responsivo
          size === "responsive" &&
            "w-[60px] sm:w-[80px] md:w-[100px] lg:w-[120px] xl:w-[140px]"
        )}
      >

        <div className="text-center mt-2">
          <h2 className="text-[10px] md:text-sm text-gray-800 drop-shadow-sm">
            {maiorCaminhoContinuo.Destino}
          </h2>
        </div>

        <div className="text-center items-center mb-2">
          <h2 className="text-[10px] md:text-sm text-gray-800 drop-shadow-sm">
            {maiorCaminhoContinuo.Origem}
          </h2>
        </div>

        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="bg-primary text-white w-6 h-6 md:w-8 md:h-8 
                      flex items-center justify-center rounded-full border-2 border-yellow-400 
                      text-[10px] md:text-lg font-bold shadow-lg">
            {maiorCaminhoContinuo.Pontos}
          </div>
        </div>

      </Card>
    </div>
  );
};
