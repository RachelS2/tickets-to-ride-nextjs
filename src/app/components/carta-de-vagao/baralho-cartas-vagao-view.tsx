import BaralhoView from "@/app/components/baralho-view";
import { CartaVagaoView } from "@/app/components/carta-de-vagao/carta-vagao-view";
import { CartaVagao } from "@/app/lib/cartas-jogo";

type BaralhoCartasVagaoViewProps = {
    cartas : CartaVagao[];
    idCartaExposta : string[];
    idsCartasDestacadas : string[];
    cartasClicaveis : boolean;
    handleComprarCartaVagaoBaralho : (carta: CartaVagao) => void; 
    angleStep?: number;
    offsetXStep?: number;

}

export const BaralhoCartasVagaoView = ({cartas, idCartaExposta, idsCartasDestacadas, cartasClicaveis, handleComprarCartaVagaoBaralho, angleStep=5, offsetXStep=7} : BaralhoCartasVagaoViewProps) => {

    return (
        <div className="mt-10 relative w-full flex justify-center">
            <BaralhoView
            cartas={cartas}
            angleStep={angleStep}
            offsetXStep={offsetXStep}
            renderizarCarta={(carta: CartaVagao) => {
                const id : string = carta.Id;
                const cartaEstaExposta : boolean  = idCartaExposta.includes(id);
                const cartaEstaDestacada : boolean = idsCartasDestacadas.includes(id);
                return (
                <div key={id} className="relative w-full flex justify-center">

                    <CartaVagaoView
                        key={id}
                        cartaVagao={carta}
                        expostoInicialmente={cartaEstaExposta}
                        size="md"
                        clicavel={cartasClicaveis}
                        onClick={() => handleComprarCartaVagaoBaralho(carta)}
                        destacar={cartaEstaDestacada}
                    />

                </div>
                );
            }}
            />
        </div >
    )
}