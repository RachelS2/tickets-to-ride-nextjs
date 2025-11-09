import React from "react";

import { CartaOcultaView } from "../carta-de-vagao/carta-oculta-view";

export const BilheteDestinoOculto: React.FC<{
  size?: "sm" | "md" | "lg" | "responsive";
  orientacao?: "vertical" | "horizontal";
 
}> = ({ size = "md", orientacao = "vertical"}) => {

  return (
    <CartaOcultaView size={size} orientacao={orientacao}>
        <div className="flex flex-col items-center justify-center gap-0">
            {"TICKET".split("").map((ch, i) => (
              <span
                key={i}
                className="font-extrabold text-white text-xs leading-none tracking-wider"
                // sombra leve no texto para se destacar
                style={{ textShadow: "0 1px 0 rgba(0,0,0,0.25)" }}
              >
                {ch}
              </span>
            ))}
        </div>
     </CartaOcultaView>
  );
};

