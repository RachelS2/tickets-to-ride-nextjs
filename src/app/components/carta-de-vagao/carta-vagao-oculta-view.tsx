// CartaVagaoOcultaView.tsx
import { CartaOcultaView } from "./carta-oculta-view";

interface CartaVagaoOcultaProps {
  size?: "sm" | "md" | "lg" | "responsive";
}

export const CartaVagaoOcultaView = ({ size = "md" }: CartaVagaoOcultaProps) => {
  return (
     <CartaOcultaView size={size} corFundo="rgba(255, 238, 205, 0.95)">

      <div
        className="flex flex-col items-center justify-center w-full h-full gap-0 text-white font-bold text-xs"
        style={{
          // backgroundImage: `url("assets/trem-bg-cartas-vagao.png")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          borderRadius: "8px",
          
        }}
      >
      </div>
    </CartaOcultaView>
  );
};
