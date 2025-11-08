'use client';
import { JSX, useState } from "react";
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
import { cn , pegarHexDaCor, OpcoesDeJogada} from "@/app/lib/utils";
import { Jogador } from "@/app/lib/jogador";

type SumarioProps = {
  rodada: number;
  jogador: Jogador;
  jogada: OpcoesDeJogada;
  setJogada: (j: OpcoesDeJogada) => void;
  onExecutarJogada: () => void; // notify parent when user clicks "EXECUTAR JOGADA"
  executouJogadaPrincipal: boolean,
};

const renderOpcoesJogada = (
  value: OpcoesDeJogada,
  label: string,
) : JSX.Element => 
    (
      <div key={value} className="flex items-center space-x-2 mb-2">
        <RadioGroupItem
          value={value}
          id={value}
          className="cursor-pointer"
        />
        <Label htmlFor={value} className="text-base">
          {label}
        </Label>
      </div>
    );


/** Cria a lateral direita da tela, que permite a visualização das cartas do jogador atual e que o jogador faça uma jogada. */
const SumarioJogadorView : React.FC<SumarioProps> = ({ rodada, jogador, jogada, setJogada, onExecutarJogada, executouJogadaPrincipal } : SumarioProps ) => {


    const Jogo: Jogo = usarJogo();
    const cartasDeVagaoJogador : CartaVagao[] = jogador.verCartasVagao();
    const bilhetesDestinoJogador : BilheteDestino[] = jogador.verBilhetesDestino();
    const qtdeTrensJogador: number = jogador.pegarQtdeTrens();
    const corJogador = pegarHexDaCor(jogador.CorDoTrem);

    const renderJogadasPrincipais = () => (
    <RadioGroup value={jogada} onValueChange={setJogada}>
        {renderOpcoesJogada("ocupar-rota", "Ocupar Rota")}
        {renderOpcoesJogada("comprar-bilhete", "Comprar Bilhetes de Destino")}
        {renderOpcoesJogada("comprar-carta", "Comprar Cartas de Vagão")}
    </RadioGroup>
    );

    const renderJogadasConsecutivas = () => (
        <RadioGroup value={jogada} onValueChange={setJogada}>
            {renderOpcoesJogada("descartar-bilhete", "Descartar Bilhete")}
        </RadioGroup>
        );

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

            <Card className="pt-4 border-none shadow-none">
                <h3 className="font-semibold mb-4">Próxima Jogada:</h3>
                                    
                {executouJogadaPrincipal ? renderJogadasConsecutivas() : renderJogadasPrincipais()}


                <Button className="w-full mt-6  " onClick={onExecutarJogada}>
                    <Play className="w-4 h-4 mr-2" />
                    <span>EXECUTAR JOGADA</span>
                </Button>
            </Card>

            <Card className="pt-4 border-none shadow-none">
                <p className="text-sm">
                    <span className="font-semibold">Próximo(a) a Jogar:</span> {Jogo.proximoJogador().Nome}
                </p>
            </Card>
        </div>
    </div>
  );
};

export default SumarioJogadorView;