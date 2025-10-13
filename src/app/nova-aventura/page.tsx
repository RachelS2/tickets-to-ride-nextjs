'use client';
import { useState, useRef } from "react";
import { Plus, Users, X, Play, Train } from "lucide-react";
import { Card, CardTitle, CardContent, CardHeader } from "@/app/components/card";
import {Button} from "@/app/components/button";
import {Label} from "@/app/components/label";
import Input from "@/app/components/input";
import Link from "next/link";
import { Jogador , gerarIdUsuario } from "@/app/lib/jogador";
import { usarTabuleiro } from "@/app/lib/contexto-tabuleiro";

const NovaAventuraPagina = () => {
  const [nomeJogadorAtual, defineJogadorAtual] = useState("");
  const [jogadores, defineJogador] = useState<Jogador[]>([]);

  const tabuleiro = usarTabuleiro();

  const handleAddJogador = () => {
    const nome : string = nomeJogadorAtual?.trim();
    if (!nome) {
      return;
    }

    if (jogadores.find((p) => p.pegarNome().toLowerCase() === nome.toLowerCase())) { // se o nome já existe na lista de jogadores..
      return; 
    }

    const novoJogador : Jogador = new Jogador(nome, gerarIdUsuario(), jogadores.length + 1, tabuleiro, "Amarelo"); //mudar cor dps

    defineJogador((prev) => {
      const next = [...prev, novoJogador];
      return next;
    });

    console.log(novoJogador)
    tabuleiro.adicionaJogador(novoJogador);

    defineJogadorAtual(""); 
  };

  const handleRemoveJogador = (playerId: string) => {
    defineJogador((prev) => prev.filter((p) => p.pegarId() !== playerId));
    tabuleiro.removeJogador(playerId);
    console.log(tabuleiro.pegarJogadores())
  };

  const handleStartGame = async () => {
    if (jogadores.length < 2) {
      return;
    }

    if (jogadores.length > 5) {
      return;
    }

    await tabuleiro.iniciarJogo();

  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-serif font-bold text-primary mb-2">
            Novo Jogo
          </h1>
          <p className="text-muted-foreground">
            Configure os jogadores e comece a aventura
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 items-start">
          {/* Card de Adicionar Jogador */}

          <div className="grid md:grid-rows-2 gap-6 items-start">
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  Adicionar Jogador
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="playerName">Nome do Jogador</Label>
                  <Input
                    id="playerName"
                    placeholder="Digite seu nome"
                    value={nomeJogadorAtual}
                    onChange={(e) => defineJogadorAtual(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAddJogador()}
                    className="mt-1.5"
                    required
                  />
                </div>

                <Button
                  onClick={handleAddJogador}
                  className="w-full cursor-pointer"
                  disabled={jogadores.length >= 5}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Jogador
                </Button>
              </CardContent>
            </Card>

            <div className="mt-6 text-center">
              <Link
                href="/"
                className="flex items-center justify-center rounded-md h-10 w-60 px-8 font-sans bg-primary text-primary-foreground font-semibold text-lg shadow-elegant hover:shadow-xl transition-all duration-300"
              >
                Voltar para Início
              </Link>
            </div>

          </div>

          {/* Card de Jogadores */}
          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Jogadores ({jogadores.length}/5)
              </CardTitle>
            </CardHeader>
            <CardContent>
              {jogadores.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Users className="w-12 h-12 mx-auto mb-2 opacity-30" />
                  <p>Nenhum jogador adicionado ainda</p>
                  <p className="text-sm mt-1">Adicione de 2 a 5 jogadores</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {jogadores.map((jogador) => (
                    <div
                      key={jogador.pegarId()}
                      className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 border border-border"
                    >
                      <Train className="w-10 h-10 text-primary border-border flex-shrink-0" strokeWidth={1.5} />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{jogador.pegarNome()}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveJogador(jogador.pegarId())}
                        className="flex-shrink-0 cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              <Button
                onClick={handleStartGame}
                disabled={jogadores.length < 2}
                className="w-full mt-6 cursor-pointer"
                size="lg"
              >
                <Play className="w-4 h-4 mr-2" />
                Iniciar Jogo
              </Button>
            </CardContent>
          </Card>
        </div>


      </div>
    </div>
  );
};

export default NovaAventuraPagina;
