import React from "react";
import { cn } from "@/app/lib/utils";

interface CartaOcultaProps {
  size?: "sm" | "md" | "lg" | "responsive";
  orientacao?: "vertical" | "horizontal";
  /** Cor de fundo do bilhete (ex: "bg-bilhete-destino-oculto" ou "bg-[#8B4513]") */
  corFundo?: string;
  /** Cor do retângulo central */
  corCentro?: string;
  /** Cor do círculo superior */
  corCirculo?: string;
  /** Children que serão renderizados dentro do retângulo central */
  children?: React.ReactNode;
  img_url?: string;
}

/**
 * Componente genérico de "carta oculta" (verso do bilhete)
 * - Aceita cores customizadas
 * - Aceita children para o conteúdo interno (texto, ícone, etc)
 */
export const CartaOcultaView: React.FC<CartaOcultaProps> = ({
  size = "md",
  orientacao = "vertical",
  corFundo = "bg-bilhete-destino-oculto",
  corCentro = "rgba(255, 238, 205, 0.95)",
  corCirculo = "white",
  children,
  img_url
}) => {
  const ehHorizontal = orientacao === "horizontal";

  return (
    <div
      className={cn(
        "relative flex rounded-[6px] items-center justify-center w-full h-full overflow-hidden",
        corFundo
      )}
    >
        {/* Retângulo central com conteúdo */}
        <div
            className={cn(
            "relative z-10 flex items-center justify-center rounded-[6px] select-none",
            ehHorizontal ? "w-1/3 h-[68%]" : "w-[46%] h-[68%]"
            )}
            style={{ background: corCentro }}
            aria-hidden
        >
            {children}
        </div>

        {/* Círculo superior */}
        <div
            className="absolute -top-3 z-20 flex items-center justify-center"
            style={{ left: "50%", transform: "translateX(-50%)" }}
            aria-hidden
        >
                <div
                className="rounded-full"
                style={{
                    width: 26,
                    height: 26,
                    background: corCirculo,
                    boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
                }}
                />
        </div>

        {/* Sombras e borda */}
        <div
            className="absolute inset-0 pointer-events-none rounded-[8px]"
            style={{
            boxShadow:
                "inset 0 -14px 30px -10px rgba(0,0,0,0.35), 0 6px 18px rgba(0,0,0,0.25)",
            }}
            aria-hidden
        />
    </div>
  );
};
