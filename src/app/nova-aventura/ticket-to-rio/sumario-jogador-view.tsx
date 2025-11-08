'use client';
import { JSX, useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import { Label } from "@/app/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/app/components/ui/radio-group";

import { CartaVagaoView } from "@/app/components/carta-vagao-view";
import { BilheteDestinoView , BilhetesDestinoProps}  from "@/app/components/bilhete-de-destino-view";

import {  Play, Train } from "lucide-react";

import { usarJogo } from "@/app/lib/contexto-jogo";
import { Jogo } from "@/app/lib/jogo";
import { BilheteDestino, CartaVagao } from "@/app/lib/cartas-jogo";
import { cn , pegarHexDaCor, OpcoesDeJogada, JogadaEfetiva} from "@/app/lib/utils";
import { Jogador } from "@/app/lib/jogador";

type ItensJogadorProps = {
    nome: string;
    qtdeTrens: number;
    corDoTrem: string;
    bilhetesDestino : BilheteDestino[];
    cartasDeVagao : CartaVagao[]
}

type SumarioProps = {
  rodada: number;
  jogadorAtual: ItensJogadorProps;
  jogadaSelecionada: OpcoesDeJogada;
  setJogada: (j: OpcoesDeJogada) => void;
  onExecutarJogada: () => void; // notify parent when user clicks "EXECUTAR JOGADA"
  jogadaEfetiva: JogadaEfetiva;
  proximoJogador: Jogador;
  finalizouJogadaPrincipal: boolean;
  configuracaoBilhetesJogador: BilhetesDestinoProps;
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
const SumarioJogadorView : React.FC<SumarioProps> = ({ rodada, jogadorAtual, jogadaSelecionada, setJogada, onExecutarJogada, jogadaEfetiva, proximoJogador, finalizouJogadaPrincipal } : SumarioProps ) => {

    const cartasDeVagaoJogador : CartaVagao[] = jogadorAtual.cartasDeVagao;
    const bilhetesDestinoJogador : BilheteDestino[] = jogadorAtual.bilhetesDestino;
    const qtdeTrensJogador: number = jogadorAtual.qtdeTrens;
    const corJogador = pegarHexDaCor(jogadorAtual.corDoTrem);


    const renderComprarBilhete = () => (
        <>
            {renderOpcoesJogada("comprar-bilhete", "Comprar Bilhetes de Destino")}
        </>
    )
    const renderPosComprarBilhete = () => (
        <>
            {renderDescartarBilhete()}
            {renderPassarAVez()}
        </>
    );
    const renderDescartarBilhete = () => (
        <>
            {renderOpcoesJogada("descartar-bilhete", "Descartar Bilhete")}
        </>  
    )
    const renderPassarAVez= () => (
        <>
            {renderOpcoesJogada("passar-a-vez", "Passar a Vez")}
        </>  
    )
    const renderComprarCartaVagao = ()=> (
        <>
            {renderOpcoesJogada("comprar-carta", "Comprar Cartas de Vagão")}
        </>  
    )

    const renderJogadasPrincipais = () => (
        <>
            {renderOpcoesJogada("ocupar-rota", "Ocupar Rota")}
            {renderComprarBilhete()}
            {renderComprarCartaVagao()}
            {renderPassarAVez()}
        </>
    );

    const renderRodada0 = () => (
        <>
            {renderDescartarBilhete()}
            {renderPassarAVez()}
        </>
        );

    const renderJogadas = () => {
        if (rodada === 0) return renderRodada0();
        
        switch (jogadaEfetiva) {
            case "comprar-bilhete":
                return finalizouJogadaPrincipal
                    ? renderPosComprarBilhete()
                    : renderComprarBilhete();

            case "descartar-bilhete":
                return renderDescartarBilhete();

            case "comprar-carta":
                return renderComprarCartaVagao();

            case "":
                default:
                return renderJogadasPrincipais();
        }
    };


    return (
        <div>
        {/* Right Sidebar */}
            <div className=" rounded-md space-y-1 bg-accent/3 min-h-[150px]">
                <Card className="border-none shadow-none">
                    <div
                        className={cn(
                        "flex flex-col  text-white rounded-md justify-center shadow text-center items-center",
                        corJogador
                        )}
                    >
                        <h2 className="font-semibold md:text-lg text-base mx-2">
                        Jogador(a) Atual: <br />
                        {jogadorAtual.Nome}
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
                        <RadioGroup value={jogadaSelecionada} onValueChange={setJogada}>
                            {renderJogadas()}
                        </RadioGroup>

                    {!jogadaEfetiva? (
                        <Button className="w-full mt-6  " onClick={onExecutarJogada}>
                            <Play className="w-4 h-4 mr-2" />
                            <span>EXECUTAR JOGADA</span>
                        </Button>

                    ) : <></> }
                    <Card className="pt-4 border-none shadow-none">
                        <span className="font-semibold">Próximo(a) a Jogar:</span> {proximoJogador.Nome}
                    </Card>
                </Card>

        </div>
    </div>
  );
};

export default SumarioJogadorView;