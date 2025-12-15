import React from "react";

import { CartaOcultaView } from "../carta-oculta-view";

export const BilheteDestinoOculto: React.FC<{
  orientacao?: "vertical" | "horizontal";
 
}> = ({ orientacao = "vertical"}) => {

  return (
    <CartaOcultaView orientacao={orientacao}>
        <div className="flex flex-col items-center justify-center gap-0 m-2">
            {"TICKET".split("").map((ch, i) => (
              <span
                key={i}
                className="font-extrabold text-white text-[0.187rem]  sm:text-[0.25rem] md:text-[0.375rem] lg:text-[0.5rem] xl:text-[0.625rem] leading-none tracking-wider"
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

