'use client';
import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import { Label } from "@/app/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/app/components/ui/radio-group";

import { CartaVagaoView } from "@/app/components/carta-vagao-view";
import { BilheteDestinoView } from "@/app/components/bilhete-de-destino-view";
import {  Play, Train } from "lucide-react";

import { usarJogo } from "@/app/lib/contexto-jogo";
import { Jogo } from "@/app/lib/jogo";
import { BilheteDestino, CartaVagao } from "@/app/lib/cartas-jogo";
import { cn , pegarHexDaCor} from "@/app/lib/utils";
import { Jogador } from "@/app/lib/jogador";

type SumarioProps = {
  jogador: Jogador;
  jogada: string;
  setJogada: (j: string) => void;
  onExecutarJogada: () => void; // notify parent when user clicks "EXECUTAR JOGADA"
};

/** Cria a lateral direita da tela, que permite a visualização das cartas do jogador atual e que o jogador faça uma jogada. */
const SumarioJogadorView : React.FC<SumarioProps> = ({ jogador, jogada, setJogada, onExecutarJogada } : SumarioProps ) => {
    const Jogo: Jogo = usarJogo();
    
    const cartasDeVagaoJogador : CartaVagao[] = jogador.verCartasVagao();
    const bilhetesDestinoJogador : BilheteDestino[] = jogador.verBilhetesDestino();
    const qtdeTrensJogador: number = jogador.pegarQtdeTrens();

    const corJogador = pegarHexDaCor(jogador.CorDoTrem);
    return (
        <div>
        {/* Right Sidebar */}
            <div className=" rounded-md space-y-1 bg-accent/3">
            <Card className="border-none shadow-none">
                <div
                    className={cn(
                    "flex flex-col  text-white rounded-md justify-center shadow text-center items-center",
                    corJogador
                    )}
                >
                    <h2 className="font-semibold md:text-lg text-base mx-2">
                    Jogador(a) Atual: <br />
                    {jogador.Nome}
                    </h2>
                </div>

                <div className="space-y-3 pt-2 mt-4">
                    <div className="flex flex-col">
                        <h3 className="font-semibold mb-2">Suas Cartas de Vagão</h3>
                        <div className="flex flex-wrap gap-3 items-center">
                            {cartasDeVagaoJogador.map((cartaDeVagao, index) => (
                            <CartaVagaoView key={index} cartaVagao={cartaDeVagao} size="md" />
                            ))}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex flex-col">
                            <h3 className="font-semibold mb-2">Seus Bilhetes de Destino</h3>
                            <div className="flex flex-wrap gap-3 items-center">
                                {bilhetesDestinoJogador.map((ticket, index) => (
                                    <BilheteDestinoView key={index} bilheteDestino={ticket} size="md" />
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 mt-8">
                        <Train className="w-5 h-5" />
                        <p className="font-semibold">Você tem {qtdeTrensJogador} trens!</p>
                    </div>
                </div>
            </Card>

            <Card className="p-4 border-none shadow-none">
                <h3 className="font-semibold mb-4">Próxima Jogada:</h3>

                <RadioGroup value={jogada} onValueChange={setJogada}>
                    <div className="flex items-center space-x-2 mb-2">
                        <RadioGroupItem value="ocupar-rota" id="ocupar-rota" className="cursor-pointer" />
                        <Label htmlFor="ocupar-rota" className="text-base">
                            Ocupar Rota
                        </Label>
                    </div>

                    <div className="flex items-center space-x-2 mb-2">
                        <RadioGroupItem value="comprar-bilhetes" id="comprar-bilhetes" className="cursor-pointer" />
                        <Label htmlFor="comprar-bilhetes" className="text-base">
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

                <Button className="w-full mt-6  " onClick={onExecutarJogada}>
                    <Play className="w-4 h-4 mr-2" />
                    <span>EXECUTAR JOGADA</span>
                </Button>
            </Card>

            <Card className="p-3 border-none shadow-none">
                <p className="text-sm">
                    <span className="font-semibold">Próximo(a) a Jogar:</span> {Jogo.proximoJogador().Nome}
                </p>
            </Card>
        </div>
    </div>
  );
};

export default SumarioJogadorView;