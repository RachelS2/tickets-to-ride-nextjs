'use client';
import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import { ArrowLeft, Train, Trash2, CreditCard } from "lucide-react";
import { useRouter, notFound } from 'next/navigation';
import Tabuleiro from "@/app/components/tabuleiro-view";
import { BilheteDestinoView } from "@/app/components/bilhete-de-destino-view";
import BaralhoView from "@/app/components/baralho-view";
import SumarioJogadorView from "@/app/nova-aventura/ticket-to-rio/sumario-jogador-view";
import { usarJogo } from "@/app/lib/contexto-jogo";
import { Jogo } from "@/app/lib/jogo";
import { BilheteDestino, CartaVagao } from "@/app/lib/cartas-jogo";



const GamePage = () => {
  const Jogo: Jogo = usarJogo();
  if (!Jogo.foiIniciado()) {
    notFound();
  }
  const router = useRouter();

  const [rodada, setRodada] = useState(Jogo.rodadaAtual());

  const baralhoBilhetesDestino : BilheteDestino[] = Jogo.pegarBaralhoBilhetesDestino();
  const [bilheteDestinoTabuleiro, setBilheteDestinoOculto] = useState<{
    topo: BilheteDestino | null;
  }>({
    topo: baralhoBilhetesDestino[0] ?? null,
  });

  const cartaMaiorCaminhoContinuo = Jogo.pegaCartaMaiorCaminhoContinuo();
  function Teste(bilhete: BilheteDestino) {
    setBilheteDestinoOculto({ topo: bilhete })
    console.log(bilheteDestinoTabuleiro.topo);
  }
  return (
    <div className="min-h-screen font-serif  p-1">
      <div className="container mx-auto pt-4 px-4 flex text-center justify-between items-center">
        <Button variant="ghost" onClick={() => router.push("/nova-aventura")}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Sair do Jogo
        </Button>
        <h1 className="text-2xl font-bold text-primary">Rodada {rodada}</h1>
        <div className="w-32" />
      </div>

      <div className="px-4 py-6">

        <div className="grid grid-cols-12 gap-6">
          {/* Left Sidebar */}
          <div className="col-span-2  bg-background space-y-4">
            
            <Card className=" border-none shadow-none">
              <div className="flex flex-col text-white rounded-md justify-center shadow-none text-center items-center bg-vermelho-custom">
                <h2 className="font-semibold md:text-lg sm: text-xs pl-2 pr-2">
                 Maior Caminho Contínuo:
                </h2>
              </div>
            </Card>
            
            <BilheteDestinoView bilheteDestino={cartaMaiorCaminhoContinuo}  size="md" orientacao="horizontal"/>


          <div className="mt-25">
            <BaralhoView
              cartas={baralhoBilhetesDestino.slice(0, 5)}
              angleStep={14}
              offsetXStep={20}
              renderizarCarta={(bilhete: BilheteDestino, index: any) => (
                <Button
                  key={(bilhete as any).id ?? index}
                  className="focus:outline-none bg-transparent p-0"
                  onClick={() =>
                    Teste(bilhete)
                  }
                >
                  <BilheteDestinoView
                    bilheteDestino={bilhete}
                    exposta={false} // <-- mostra o verso
                    orientacao="vertical"
                    size="md"
                  />
                </Button>
              )}
            />

          </div>

          </div>

          <div className="flex flex-row items-center justify-center bg-blue-300 col-span-7">
            <div>
                <Tabuleiro />
              <div className="gap-4 mt-4 justify-center">
                  <Button variant="outline" size="icon" className="w-16 h-16 mr-4 bg-muted">
                    <Trash2 className="w-6 h-6" />
                  </Button>
                  <Button variant="outline" size="icon" className="w-16 h-16 bg-muted">
                    <Train className="w-6 h-6" />
                  </Button>
              </div>
            </div>
  
          </div>

          <div className="col-span-3">
            <SumarioJogadorView/>
          </div>

      </div>
    </div>
    </div>
  );
};

export default GamePage;
