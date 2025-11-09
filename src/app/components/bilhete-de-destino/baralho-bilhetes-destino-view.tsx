import BaralhoView from "@/app/components/baralho-view";
import BilheteDestinoView from "@/app/components/bilhete-de-destino/bilhete-de-destino-view";
import { BilheteDestino } from "@/app/lib/cartas-jogo";

type BaralhoCartasVagaoViewProps = {
    bilhetes : BilheteDestino[];
    idBilheteExposto : string | null;
    idsBilhetesDestacados : string[];
    baralhoClicavel : boolean;
    handleComprarBilheteDestino : (bilhete: BilheteDestino) => void; 
}

export const BaralhoBilhetesDestinoView = ({bilhetes, idBilheteExposto, idsBilhetesDestacados, baralhoClicavel, 
    handleComprarBilheteDestino: handleComprarBilheteDestinoBaralho} : BaralhoCartasVagaoViewProps) => {

    return (
        <div className="mt-5 relative w-full flex justify-center">
            <BaralhoView
                cartas={bilhetes}
                angleStep={5}
                offsetXStep={7}
                renderizarCarta={(bilhete: BilheteDestino) => {
                const id : string = bilhete.Id;
                const bilheteEstaExposto : boolean  = idBilheteExposto === id;
                const bilheteEstaDestacado : boolean = idsBilhetesDestacados.includes(id);
                return (
                    <div key={id} className="relative w-full flex justify-center">

                        <BilheteDestinoView
                        key={id}
                        bilheteDestino={bilhete}
                        expostoInicialmente={bilheteEstaExposto}
                        orientacao="vertical"
                        size="md"
                        clicavel={baralhoClicavel}
                        onClick={() => handleComprarBilheteDestinoBaralho(bilhete)}
                        destacar={bilheteEstaDestacado}
                        />

                    </div>
                );
                }}
            />
        </div>
    )
}