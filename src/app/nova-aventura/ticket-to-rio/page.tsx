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
  const [idBilheteExposto, setRevealedId] = useState<string | null>(null);
  const [bilhetesDestacadosId, setAnimandoId] = useState<string[]>([]);


  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const handleExecutarJogada = async () => {
    if (jogada === "comprar-bilhete") {
      setBaralhoBilhetesClicavel(true);
      const ids = baralhoLocal.map((b, i) => getBilheteId(b));
      console.log(ids)
      setAnimandoId(ids); //Destaca todos os bilhetes de destino
    } 
    else {
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

  const getBilheteId = (bilhete: BilheteDestino) => {
    const origem = (bilhete as any)?.origem ?? (bilhete as any)?.Origem ?? "unknown-origem";
    const destino = (bilhete as any)?.destino ?? (bilhete as any)?.Destino ?? "unknown-destino";
    return `${String(origem)}-${String(destino)}`;
  };

  const handleComprarBilheteDestino = async (bilhete: BilheteDestino, index: number) => {
    if (!baralhoBilhetesClicavel) return;

    setAnimandoId([])

    const id = getBilheteId(bilhete);

    setRevealedId(id); // Revela carta
    setAnimandoId([id]); // Anima (destaca) a carta

    // aguarda o flip ficar visível
    await sleep(600);

    removerBilheteDestinoBaralho(bilhete)

    await sleep(300);

    jogador.atual.addBilheteDestino(bilhete);

    setAnimandoId([]);
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
                renderizarCarta={(bilhete: BilheteDestino, idx: number) => {
                  const id : string = getBilheteId(bilhete, idx);
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
                          onClick={() => handleComprarBilheteDestino(bilhete, idx)}
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
            <SumarioJogadorView jogador={jogador.atual} jogada={jogada} setJogada={setJogada} onExecutarJogada={handleExecutarJogada}/>
          </div>

      </div>
    </div>
    </div>
  );
};

export default GamePage;
