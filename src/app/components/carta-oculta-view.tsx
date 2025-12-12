import React, { useState } from "react";
import { cn } from "@/app/lib/utils";

import Image from "next/image";

type CommonProps = {
  orientacao?: "vertical" | "horizontal";
  corFundo?: string;
  corCentro?: string;
  corCirculo?: string;
  imgObjectFit?: React.CSSProperties["objectFit"];
  imgAlt?: string;
};

/**
 * Discriminated union:
 * - ModoImagem: tem img_url e proíbe children
 * - ModoConteudo: aceita children e não tem img_url
 */
export type CartaOcultaProps =
  | (CommonProps & { img_url: string; children?: never })
  | (CommonProps & { img_url?: undefined; children?: React.ReactNode });

export const CartaOcultaView: React.FC<CartaOcultaProps> = (props) => {
  const {
    orientacao = "vertical",
    corFundo = "bg-bilhete-destino-oculto",
    corCentro = "rgba(255, 238, 205, 0.95)",
    corCirculo = "white",
    imgAlt = "Carta",
  } = props as CommonProps;

  const ehHorizontal = orientacao === "horizontal";
  const modoImagem = typeof (props as any).img_url === "string";
  const img_url = (props as any).img_url as string | undefined;
  const children = (props as any).children as React.ReactNode | undefined;

  const [imgError, setImgError] = useState<boolean>(false);

  if (process.env.NODE_ENV !== "production") {
    if (modoImagem && children) {
      console.warn(
        "CartaOcultaView: você passou img_url e children ao mesmo tempo. children será ignorado."
      );
    }
  }

  return (
    <div
      className={cn(
        "relative flex rounded-[6px] items-center justify-center w-full h-full overflow-hidden",
        corFundo
      )}
    >
      {modoImagem ? (
        <>
          {/* imagem central */}
          {!imgError && (
            <div className="relative w-full h-full">
              <Image
                src={img_url!}
                alt={imgAlt}
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
          )}

          {/* Fallback visual em caso de erro  */}
          {imgError && (
            <div className="flex flex-col items-center justify-center w-full h-full text-center px-2">
              <div className="text-xs text-white/80">Imagem indisponível</div>
            </div>
          )}
        </>
      ) : (
        // MODO CONTEÚDO: mantém retângulo central, círculo e children
        <>
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

          <div
            className="absolute inset-0 pointer-events-none rounded-[8px]"
            style={{
              boxShadow:
                "inset 0 -14px 30px -10px rgba(0,0,0,0.35), 0 6px 18px rgba(0,0,0,0.25)",
            }}
            aria-hidden
          />
        </>
      )}
    </div>
  );
};
