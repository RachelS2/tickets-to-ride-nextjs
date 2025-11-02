'use client';
import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import { Label } from "@/app/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/app/components/ui/radio-group";
import { ArrowLeft, Train, Trash2, CreditCard } from "lucide-react";
import { useRouter, notFound } from 'next/navigation';
import Tabuleiro from "@/app/components/tabuleiro-view";
import { CartaVagaoView } from "@/app/components/carta-vagao-view";
import { BilhetesDestinoView } from "@/app/components/bilhetes-de-destino-view";
import { MaiorCaminhoContinuoView } from "@/app/components/carta-maior-caminho-continuo-view.tsx";

import { SumarioJogador } from "@/app/components/sumario-jogador-view";
import { usarJogo } from "@/app/lib/contexto-jogo";
import { Jogo } from "@/app/lib/jogo";
import { Jogador } from "@/app/lib/jogador";
import { BilheteDestino, CartaVagao } from "@/app/lib/cartas-jogo";
import { cn , pegarHexDaCor} from "@/app/lib/utils";

const GamePage = () => {
  const Jogo: Jogo = usarJogo();
  if (!Jogo.foiIniciado()) {
    notFound();
  }
  const router = useRouter();
  const JOGADORES : Jogador[] = Jogo.pegaJogadores();
  let primeiroJogador: Jogador = JOGADORES[0];

  const [rodada] = useState(Jogo.rodadaAtual());
  const [jogadorAtual] = useState({ dados: primeiroJogador });
  const [selectedAction, setSelectedAction] = useState<string>("ocupar-rota");

  const cartasDeVagao : CartaVagao[] = primeiroJogador.verCartasVagao();
  const bilhetesDeDestino : BilheteDestino[] = primeiroJogador.verBilhetesDestino();
  const cartaMaiorCaminhoContinuo = Jogo.pegaCartaMaiorCaminhoContinuo();
  const trains: number = primeiroJogador.pegarQtdeTrens();

  return (
    <div className="min-h-screen font-serif  p-1">
      {/* Top Bar */}
        <div className="container mx-auto py-4 px-4 flex justify-between items-center">
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

            <MaiorCaminhoContinuoView maiorCaminhoContinuo={cartaMaiorCaminhoContinuo} size="md"/>

            {/* Baralho Bilhete de Destino */}
            <Card className="p-6 bg-gradient-to-br from-secondary to-accent">
              <div className="flex flex-row  items-center justify-center text-primary-foreground">
                <Train className="w-7 h-7 rotate-90 origin-center mb-2" />
                <p className="text-xs font-bold font-serif rotate-90 origin-center">TICKET</p>
              </div>
            </Card>
          </div>

          {/* Main Board Area */}
          <div className="flex flex-row items-center justify-center bg-blue-300 col-span-7">
            <div>
                <Tabuleiro />
              {/* Action Icons Below Board */}
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

          {/* Right Sidebar */}
          <div className="col-span-3 rounded-md space-y-1 bg-accent/3">

            <Card className=" border-none shadow-none">
              <div className={cn("flex flex-col text-white rounded-md justify-center shadow items-center", pegarHexDaCor(jogadorAtual.dados.CorDoTrem))}>
                <h2 className="font-semibold text-lg">
                 Jogador(a) Atual: 
                </h2>
                <h2 className="font-semibold text-lg">{jogadorAtual.dados.Nome}</h2>
              </div>

              <div className="space-y-3 p-2 mt-4">
                <div className="flex flex-col">
                  <h3 className="font-semibold mb-2">Suas Cartas de Vagão</h3>
                  <div className="flex flex-wrap gap-3 center">
                    {cartasDeVagao.map((cartaDeVagao, index) => (
                      <CartaVagaoView key={index} cartaVagao={cartaDeVagao} size="md" />
                    ))}
                  </div>
                </div>

              <div className="space-y-2">
                <div className="flex flex-col">
                  <h3 className="font-semibold mb-2">Seus Bilhetes de Destino</h3>
                  <div className="flex flex-wrap gap-3 center">
                    {bilhetesDeDestino.map((ticket, index) => (
                      <BilhetesDestinoView
                        key={index}
                        bilheteDestino ={ticket}
                        size="md"
                      />
                    ))}
                  </div>
                </div>
              </div>

                <div className="flex items-center gap-2 mt-8">
                  <Train className="w-5 h-5" />
                  <p className="font-semibold">Você tem {trains} trens!</p>
                </div>
            </div>
            </Card>
            <Card className="p-4 border-none shadow-none">
              <h3 className="font-semibold mb-4">Próxima Jogada:</h3>
              <RadioGroup value={selectedAction} onValueChange={setSelectedAction}>
                <div className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem value="ocupar-rota" id="ocupar-rota" className="cursor-pointer" />
                  <Label htmlFor="ocupar-rota" className="text-base">
                    Ocupar Rota
                  </Label>
                </div>
                <div className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem value="comprar-bilhetes" id="comprar-bilhetes" className="cursor-pointer" />
                  <Label htmlFor="comprar-bilhetes" className="text-base ">
                    Comprar Bilhetes De Destino
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="comprar-cartas" id="comprar-cartas" className="cursor-pointer" />
                  <Label htmlFor="comprar-cartas" className="text-base">
                    Comprar Cartas de Vagão
                  </Label>
                </div>
              </RadioGroup>

              {/* Botão ocupa toda a largura */}
              <Button className="w-full mt-6">
                EXECUTAR JOGADA
              </Button>
            </Card>
            <Card className="p-3 border-none shadow-none">
              <p className="text-sm">
                <span className="font-semibold">Próximo(a) a Jogar:</span> {Jogo.proximoJogador().Nome}
              </p>
            </Card>
          </div>
        </div>

        {/* Bottom Player Summary */}
        {/* <Card className="mt-6">
          <div className="flex divide-x divide-border">
            {JOGADORES.map((player, index) => (
              <div key={index} className="flex-1">
                <SumarioJogador {player, False} />
              </div>
            ))}
          </div>
        </Card> */}
      </div>
    </div>
  );
};

export default GamePage;
