import { Card } from "@/app/components/ui/card";
import { cn } from "@/app/lib/utils";
import { BilheteDestino } from "../lib/cartas-jogo";

type BordaDaCartaProps = {
  size?: "sm" | "md" | "lg" | "responsive";
  orientacao?: "vertical" | "horizontal";
  children?: React.ReactNode;
};

export const BordaDaCartaView = ({
  size = "md",
  orientacao = "vertical",
  children
}: BordaDaCartaProps) => {
  const ehHorizontal = orientacao === "horizontal";

  return (
    <div className={cn("relative flex items-center justify-center bg-white p-1 shadow", ehHorizontal ? "aspect-[4/2.5]" : "aspect-[2.5/4]", 
          size === "sm" && (ehHorizontal ? "w-full max-w-[120px] h-[70px]" : "w-[70px]"),
          size === "md" && (ehHorizontal ? "w-full max-w-[290px] h-[100px]" : "w-[90px]"),
          size === "lg" && (ehHorizontal ? "w-full max-w-[300px] h-[200px]" : "w-[110px]"),
          size === "responsive" &&
            (ehHorizontal
              ? "w-[120px] sm:w-[120px] md:w-[290px] lg:w-[300px] xl:w-[240px]"
              : "w-[60px] sm:w-[80px] md:w-[100px] lg:w-[120px] xl:w-[140px]"))}>

      {children}        
    </div>
            )
    }