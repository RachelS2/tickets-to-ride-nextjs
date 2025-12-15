'use client';
import { JSX, useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import { Label } from "@/app/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/app/components/ui/radio-group";

import { CartaVagaoView } from "@/app/components/carta-de-vagao/carta-vagao-view";
import { BilheteDestinoView }  from "@/app/components/bilhete-de-destino/bilhete-de-destino-view";

import {  Play, Train } from "lucide-react";
import { BilheteDestino, CartaVagao } from "@/app/lib/cartas-jogo";
import { cn , pegarVarDaCor, OpcoesDeJogada, JogadaEfetiva} from "@/app/lib/utils";
import { Jogador } from "@/app/lib/jogador";


type ConfiguracaoBilhetesProps = {
  clicavel : string[] ;
  destacar: string[]; 
  onClick: (bilhete: BilheteDestino) => void; 
}

type ConfiguracaoCartasJogador = {
  clicavel : string[] ;
  destacar: string[]; 
  onClick: (carta: CartaVagao) => void; 
  clicadas: string[]; 
}

type SumarioProps = {
  rodada: number;
  jogadorAtual: Jogador;
  jogadaSelecionada: OpcoesDeJogada;
  setJogada: (j: OpcoesDeJogada) => void;
  onExecutarJogada: () => void; // notify parent when user clicks "EXECUTAR JOGADA"
  jogadaEfetiva: JogadaEfetiva;
  proximoJogador: Jogador;
  finalizouJogadaPrincipal: boolean;
  configuracaoBilhetesJogador: ConfiguracaoBilhetesProps;
  configuracaoCartasJogador: ConfiguracaoCartasJogador;
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
const SumarioJogadorView : React.FC<SumarioProps> = ({ rodada, jogadorAtual, jogadaSelecionada, setJogada, onExecutarJogada, jogadaEfetiva, proximoJogador, 
    finalizouJogadaPrincipal, configuracaoBilhetesJogador, configuracaoCartasJogador } : SumarioProps ) => {

    const cartasDeVagaoJogador : CartaVagao[] = jogadorAtual.verCartasVagao();
    const bilhetesDestinoJogador : BilheteDestino[] = jogadorAtual.verBilhetesDestino();
    const qtdeTrensJogador: number = jogadorAtual.pegarQtdeTrens();
    const corJogador = pegarVarDaCor(jogadorAtual.CorDoTrem);
    const bilhetesClicaveis : string[] = configuracaoBilhetesJogador.clicavel;
    const bilhetesDestacados : string[] = configuracaoBilhetesJogador.destacar;
    const onClickBilhete = configuracaoBilhetesJogador.onClick;

    const cartasClicaveis : string[] = configuracaoCartasJogador.clicavel;
    const cartasDestacadas : string[] = configuracaoCartasJogador.destacar;
    const onClickCarta = configuracaoCartasJogador.onClick;
    const clicada = configuracaoCartasJogador.clicadas;

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
            {jogadorAtual.verBilhetesDestino() ? renderOpcoesJogada("descartar-bilhete", "Descartar Bilhete") :
            <></> }
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

    const renderOcuparRota = () => (
        <>
            {renderOpcoesJogada("ocupar-rota", "Ocupar Rota")}
        </>
    )
    const renderJogadasPrincipais = () => (
        <>
            {renderOpcoesJogada("ocupar-rota", "Ocupar Rota")}
            {renderComprarBilhete()}
            {renderComprarCartaVagao()}
        </>
    );

    const renderRodada0 = () => (
        <>
            {renderPassarAVez() }
            {renderDescartarBilhete() }
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
                return finalizouJogadaPrincipal ? renderPosComprarBilhete() : 
                renderPassarAVez();

            case "comprar-carta":
                return finalizouJogadaPrincipal ? renderPassarAVez() 
                : renderComprarCartaVagao();
            
            case "ocupar-rota":
                return finalizouJogadaPrincipal ? renderPassarAVez() :
                renderOcuparRota();

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
                                <CartaVagaoView expostoInicialmente={true} destacar={cartasDestacadas.includes(cartaDeVagao.Id)} 
                                clicavel={cartasClicaveis? cartasClicaveis.includes(cartaDeVagao.Id): undefined}  
                                key={index} clicada={clicada.includes(cartaDeVagao.Id)} cartaVagao={cartaDeVagao} size="responsive" 
                                onClick={cartasClicaveis ? () => onClickCarta(cartaDeVagao) : undefined}/>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex flex-col">
                                <h3 className="font-semibold mb-2">Seus Bilhetes de Destino</h3>
                                <div className="flex flex-wrap gap-3 items-center">
                                    {bilhetesDestinoJogador.map((ticket, index) => (
                                        <BilheteDestinoView onClick= {bilhetesClicaveis ? () => onClickBilhete(ticket) : undefined} key={index} bilheteDestino={ticket} size="responsive"  
                                        clicavel={bilhetesClicaveis ? bilhetesClicaveis.includes(ticket.Id) : undefined } destacar={bilhetesDestacados.includes(ticket.Id)} />
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 mt-8">
                            <Train className="w-5 h-5" />
                            <p className="font-semibold">Você tem {qtdeTrensJogador} trens e {jogadorAtual.pegarPontos()} pontos!</p>
                        </div>
                    </div>
                </Card>

                <Card className="pt-4 border-none shadow-none">
                    <h3 className="font-semibold mb-4">Próxima Jogada:</h3>
                        <RadioGroup value={jogadaSelecionada} onValueChange={setJogada}>
                            {renderJogadas()}
                        </RadioGroup>

                        <Button className="w-full mt-6  " onClick={onExecutarJogada}>
                            <Play className="w-4 h-4 mr-2" />
                            <span>EXECUTAR JOGADA</span>
                        </Button>

                    <Card className="pt-4 border-none shadow-none">
                        <span className="font-semibold">Próximo(a) a Jogar:</span> {proximoJogador.Nome}
                    </Card>
                </Card>

        </div>
    </div>
  );
};

export default SumarioJogadorView;