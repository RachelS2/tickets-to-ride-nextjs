import { Train } from "lucide-react";
import { cn } from "@/app/lib/utils";
import { CartaVagao, CoresCartaVagao } from "@/app/lib/cartas-jogo";

interface CartaVagaoProps {
  color: CoresCartaVagao;
  size?: "sm" | "md";
}

const colorClasses = {
  red: "bg-red-500",
  green: "bg-green-500",
  blue: "bg-cyan-500",
  yellow: "bg-yellow-400",
  black: "bg-gray-800",
  gray: "bg-gray-400",
};

export const CartaVagaoView = ({ color, size = "md" }: CartaVagaoProps) => {
  return (
    <div
      className={cn(
        "rounded-lg flex items-center justify-center",
        colorClasses[color],
        size === "sm" ? "w-12 h-16 p-2" : "w-16 h-20 p-3"
      )}
    >
      <Train className={cn("text-white", size === "sm" ? "w-6 h-6" : "w-8 h-8")} />
    </div>
  );
};
