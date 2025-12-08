// CartaVagaoOcultaView.tsx
import { CartaOcultaView } from "../carta-oculta-view";

interface CartaVagaoOcultaProps {
  size?: "sm" | "md" | "lg" | "responsive";
}

export const CartaVagaoOcultaView = ({ size = "md" }: { size?: "sm" | "md" | "lg" | "responsive" }) => {
  return (
    // note a barra inicial — se arquivo estiver em public/assets/trem-bg-cartas-vagao.png
    <CartaOcultaView size={size} corFundo="bg-vermelho-custom" img_url="/assets/trem-bg-cartas-vagao.png" imgObjectFit="cover" 
    imgAlt="Verso do vagão" />
  );
};

