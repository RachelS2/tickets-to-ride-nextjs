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
import { BilheteDestino, CartaVagao } from "@/app/lib/cartas-jogo";
import {OpcoesDeJogada} from "@/app/lib/utils"

const GamePage: React.FC = () => {
  const jogo: Jogo = usarJogo();
  if (!jogo.foiIniciado()) {
    notFound();
  }
  const router = useRouter();

  // pega o baralho inicial do jogo (copia para estado local)
  const [baralhoLocal, setBaralhoLocal] = useState<BilheteDestino[]>(jogo.pegarBilhetesDeDestino(5));

  const [rodada, setRodada] = useState<number>(jogo.rodadaAtual());

  // controle se o baralho pode ser clicado (após executar a jogada comprar-bilhetes)
  const [baralhoBilhetesClicavel, setBaralhoBilhetesClicavel] = useState<boolean>(false);
  const [jogada, setJogada] = useState<OpcoesDeJogada>("ocupar-rota");

  const [jogador, setJogador] = useState({ atual: jogo.pegaJogadores()[0] });
  const [bilheteNoTopo, setBilheteTopoBaralho] = useState<BilheteDestino | null>(baralhoLocal[0] ?? null);

  const cartaMaiorCaminhoContinuo = jogo.pegaCartaMaiorCaminhoContinuo();

  // ids de animação/revelação de cartas
  const [revealedId, setRevealedId] = useState<string | null>(null);
  const [animandoId, setAnimandoId] = useState<string | null>(null);

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const handleExecutarJogada = () => {
    if (jogada === "comprar-bilhete") {
      setBaralhoBilhetesClicavel(true);
    } else {
      setBaralhoBilhetesClicavel(false);
      // implementar outras jogadas aqui...
    }
  };

  const removerBilheteDestinoBaralho = (bilhete: BilheteDestino) => {
    console.log("Baralho antes de comprar:");
    baralhoLocal.forEach((bilhete, i) => {
      console.log(`${i + 1}. ${bilhete.Origem} → ${bilhete.Destino} (${bilhete.Pontos} pts)`);
    });

    const index = baralhoLocal.indexOf(bilhete);
     if (index < 0) throw new Error("Esse bilhete de destino não estava no baralho!");
    
    const novoBaralho = [...baralhoLocal];
    novoBaralho.splice(index, 1); // remove 1 elemento a partir do índice encontrado

    setBaralhoLocal(novoBaralho);

    
    console.log("Baralho depois de comprar:");
    novoBaralho.forEach((bilhete, i) => {
      console.log(`${i + 1}. ${bilhete.Origem} → ${bilhete.Destino} (${bilhete.Pontos} pts)`);
    });
    
    // atualiza bilhete do topo 
    setBilheteTopoBaralho(baralhoLocal[0] ?? null);

  }

  const getBilheteId = (bilhete: BilheteDestino, index?: number) =>
    String((bilhete as any).id ?? `${(bilhete as any).origem ?? (bilhete as any).Origem}-${(bilhete as any).destino ?? (bilhete as any).Destino}-${index ?? ""}`);

  const handleBilheteDestinoOcultoClick = async (bilhete: BilheteDestino, index: number) => {
    if (!baralhoBilhetesClicavel) return;

    const id = getBilheteId(bilhete, index);

    // 1) marcar revelado (faz flip visual)
    setRevealedId(id);
    setAnimandoId(id);

    // aguarda o flip ficar visível
    await sleep(600);

    // 2) remover do baralho — assumimos que jogo.removerBilheteDestinoDoBaralho retorna o novo baralho (ou atualiza internamente)
    // se a API do jogo for diferente, adapte: por exemplo, jogo.removerBilheteDestinoDoBaralho(bilhete); const novo = jogo.pegarBaralho...
    removerBilheteDestinoBaralho(bilhete)

    // pequena espera para a sensação de "movimento para a mão"
    await sleep(300);

    // 3) adiciona ao jogador
    jogador.atual.addBilheteDestino(bilhete);
    // se precisar atualizar o estado do jogador no componente:

    // 4) limpa animação e desabilita clique
    setAnimandoId(null);
    setRevealedId(null);
    setBaralhoBilhetesClicavel(false);
  };

  // caso o baralho do jogo mude fora (por exemplo outras ações), sincronize localmente
  // useEffect(() => {
  //   setBaralhoLocal(jogo.pegarBilhetesDeDestino());
  //   setBilheteTopoBaralho(jogo.pegarBilhetesDeDestino()[0] ?? null);
  // }, [jogo]);

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
                cartas={baralhoLocal.slice(0, 5)}
                angleStep={10}
                offsetXStep={20}
                // renderizarCarta recebe bilhete e index — passamos expostoInicialmente conforme revealedId
                renderizarCarta={(bilhete: BilheteDestino, idx: number) => {
                  const id = getBilheteId(bilhete, idx);
                  const isRevealed = revealedId === id;
                  const isAnimating = animandoId === id;
                  return (
                    <div key={id} className="relative w-full flex justify-center">

                        <BilheteDestinoView
                          bilheteDestino={bilhete}
                          expostoInicialmente={isRevealed}
                          orientacao="vertical"
                          size="md"
                          clickable={baralhoBilhetesClicavel}
                          onClick={() => handleBilheteDestinoOcultoClick(bilhete, idx)}
                        />
                        {isAnimating && (
                          <div className="absolute inset-0 pointer-events-none rounded-md ring-2 ring-offset-2 ring-primary/40" />
                        )}
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
            <SumarioJogadorView jogador={jogador.atual} jogada={jogada} setJogada={setJogada} onExecutarJogada={handleExecutarJogada}/>
          </div>

      </div>
    </div>
    </div>
  );
};

export default GamePage;
