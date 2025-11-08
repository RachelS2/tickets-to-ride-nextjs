'use client';
import { useEffect, useState } from "react";
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
import { BilheteDestino, CartaMaiorCaminhoContinuo, CartaVagao } from "@/app/lib/cartas-jogo";
import {OpcoesDeJogada} from "@/app/lib/utils"

const GamePage: React.FC = () => {
  const jogo: Jogo = usarJogo();
  if (!jogo.foiIniciado()) {
    notFound();
  }
  const router = useRouter();
  const cartaMaiorCaminhoContinuo : CartaMaiorCaminhoContinuo = jogo.pegaCartaMaiorCaminhoContinuo();

  const [baralhoBilhetesAtual, setBaralhoBilhetesAtual] = useState<BilheteDestino[]>(jogo.pegarBilhetesDeDestino(5));
  const [rodada, setRodada] = useState<number>(jogo.rodadaAtual());

  
  const [baralhoBilhetesClicavel, setBaralhoBilhetesClicavel] = useState<boolean>(false); // controla se o baralho de bilhetes pode ser clicado (após executar a jogada comprar-bilhetes)
  const [jogada, setJogada] = useState<OpcoesDeJogada>("ocupar-rota"); // pega a jogada escolhida pelo jogador
  const [botaoExecutarClicado, setBotaoExecutarClicado] = useState<boolean>(false); // controla se o botão de executar jogada foi clicado
  const [jogador, setJogador] = useState({ atual: jogo.pegaJogadores()[0] });
  const [executouJogadaPrincipal, setExecutouJogadaPrincipal] = useState<boolean>(false);


  // ids de animação/revelação de cartas
  const [idBilheteExposto, setRevealedId] = useState<string | null>(null); // id do bilhete q esta exposto 
  const [bilhetesDestacadosId, setAnimandoId] = useState<string[]>([]);
  const [qtdeBilhetesComprados, setQtdeBilhetesComprados] = useState<number>(0); 

  useEffect(() => {
  if (qtdeBilhetesComprados >= 3) {
    setAnimandoId([]);
    setRevealedId(null);
    setBaralhoBilhetesClicavel(false);
    setExecutouJogadaPrincipal(true);
  }
}, [qtdeBilhetesComprados]);

  useEffect(() => {
    if (botaoExecutarClicado) {
      setTimeout(() => setBotaoExecutarClicado(false), 0);
    }
  }, [botaoExecutarClicado]);


  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const removerBilheteDestinoBaralho = (bilhete: BilheteDestino) => {
    console.log("Baralho antes de comprar:");
    baralhoBilhetesAtual.forEach((bilhete, i) => {
      console.log(`${i + 1}. ${bilhete.Origem} → ${bilhete.Destino} (${bilhete.Pontos} pts)`);
    });

    const index : number = baralhoBilhetesAtual.indexOf(bilhete);
    if (index < 0) throw new Error("Esse bilhete de destino não estava no baralho!");
    
    const novoBaralho = [...baralhoBilhetesAtual];
    novoBaralho.splice(index, 1); // remove 1 elemento do baralho a partir do índice encontrado

    setBaralhoBilhetesAtual(novoBaralho);

    console.log("Baralho depois de comprar:");
    novoBaralho.forEach((bilhete, i) => {
      console.log(`${i + 1}. ${bilhete.Origem} → ${bilhete.Destino} (${bilhete.Pontos} pts)`);
    });
  }

  const handleComprarBilheteDestino = async (bilhete: BilheteDestino) => {
    if (!baralhoBilhetesClicavel) return;

    // tira destaque do baralho
    setAnimandoId([]);

    const id = bilhete.Id;

    setRevealedId(id); 
    setAnimandoId([id]); 

    await sleep(600);

    removerBilheteDestinoBaralho(bilhete);

    await sleep(300);

    jogador.atual.addBilheteDestino(bilhete);

    console.log("O jogador já comprou " + qtdeBilhetesComprados + " bilhetes!")
    const novoTotal = qtdeBilhetesComprados + 1;
    setQtdeBilhetesComprados(novoTotal);

    // se ainda pode comprar mais bilhetes e há baralho, mantém o fluxo
    if ((novoTotal < 3) && (baralhoBilhetesAtual.length > 0)) {
      console.log("entrou - preparar próxima compra");
      setJogada("comprar-bilhete");
      setAnimandoId(baralhoBilhetesAtual.map(b => b.Id));
    }
  };

  // Função usada pelo SumarioJogadorView quando o botão "EXECUTAR JOGADA" é clicado
  const handleExecutarJogadaFromChild = () => {
    
    if (jogada === "comprar-bilhete" && qtdeBilhetesComprados < 3 && baralhoBilhetesAtual.length > 0) {
      const idsAgora = baralhoBilhetesAtual.map(b => b.Id);
      console.log("EXECUTAR JOGADA clicado - ids agora:", idsAgora, "jogada:", jogada);
      setBaralhoBilhetesClicavel(true);
      setAnimandoId(idsAgora);
      
    }

    else {

    }

    setBotaoExecutarClicado(true);
  };

  return (
    <div className="min-h-screen font-serif p-1">
      <div className="container mx-auto pt-4 px-4 flex text-center justify-between items-center">
        <Button className="hover:bg-vermelho-custom" variant="ghost" onClick={() => router.push("/nova-aventura")}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Sair do Jogo
        </Button>
        <h1 className="text-2xl font-bold text-primary">Rodada {rodada}</h1>
        <div className="w-32" />
      </div>

      <div className="px-3 py-6">
        <div className="grid grid-cols-12 gap-3">
          {/* Left Sidebar */}
          <div className="col-span-2 bg-background space-y-4 overflow-hidden">

            <BilheteDestinoView bilheteDestino={cartaMaiorCaminhoContinuo} size="md" orientacao="horizontal" />

            <div className="mt-10 relative w-full flex justify-center">
              <BaralhoView
                cartas={baralhoBilhetesAtual.slice(0, 5)}
                angleStep={10}
                offsetXStep={20}
                renderizarCarta={(bilhete: BilheteDestino) => {
                  const id : string = bilhete.Id;
                  const bilheteEstaExposto : boolean  = idBilheteExposto === id;
                  const bilheteEstaDestacado : boolean = bilhetesDestacadosId.includes(id);
                  return (
                    <div key={id} className="relative w-full flex justify-center">

                        <BilheteDestinoView
                          bilheteDestino={bilhete}
                          expostoInicialmente={bilheteEstaExposto}
                          orientacao="vertical"
                          size="md"
                          clicavel={baralhoBilhetesClicavel}
                          onClick={() => handleComprarBilheteDestino(bilhete)}
                          destacar={bilheteEstaDestacado}
                        />

                    </div>
                  );
                }}
              />
            </div>
          </div>

          <div className="flex flex-row items-center justify-center bg-blue-300 col-span-7">
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

          <div className="col-span-3">
            <SumarioJogadorView
              rodada={rodada}
              jogador={jogador.atual}
              jogada={jogada}
              setJogada={setJogada}
              onExecutarJogada={handleExecutarJogadaFromChild}
              executouJogadaPrincipal={executouJogadaPrincipal}
            />
          </div>

      </div>
    </div>
    </div>
  );
};

export default GamePage;
