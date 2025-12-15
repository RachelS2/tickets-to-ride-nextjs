"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import  Input  from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Plus, X, Users, Play } from "lucide-react";
import Link from "next/link";
import { cn, gerarIdUsuario, CoresDeTrem } from "@/app/lib/utils"; 
import { Jogador } from "@/app/lib/jogador"; 
import { usarJogo } from "@/app/lib/contexto-jogo";

const NovaAventuraPagina = () => {
  const [nomeJogadorAtual, defineJogadorAtual] = useState("");
  const [jogadores, defineJogador] = useState<Jogador[]>([]);
  const router = useRouter();
  const {jogo} = usarJogo();

  const CoresTremDisponiveis : CoresDeTrem[] = ["Vermelho", "Azul", "Verde", "Amarelo", "Preto"]

const findFirstAvailableColor = (existingPlayers: Jogador[]) => {
  return CoresTremDisponiveis.find(
    (cor) => !existingPlayers.some((p) => p.CorDoTrem === cor)
  ) ?? null;
};

const [selectedColor, setSelectedColor] = useState<CoresDeTrem | null>(findFirstAvailableColor(jogadores));

useEffect(() => {
    const available = findFirstAvailableColor(jogadores);
    if (selectedColor === null && available !== null) {
      setSelectedColor(available);
      return;
    }

    if (selectedColor !== null) {
      const isUsed = jogadores.some((p) => p.CorDoTrem === selectedColor);
      if (isUsed) {
        setSelectedColor(available);
      }
    }
  }, [jogadores, selectedColor]);

  const handleAddJogador = () => {
    const nome = nomeJogadorAtual.trim();
    if (!nome || !selectedColor) return;

    if (jogadores.find((p) => p.Nome.toLowerCase() === nome.toLowerCase())) {
      return;
    }

    const novoJogador = new Jogador(
      nome,
      gerarIdUsuario(),
      jogadores.length + 1,
      selectedColor
    );

    defineJogador((prev) => {
      const next = [...prev, novoJogador];
      return next;
    });

    jogo.adicionaJogador(novoJogador);
    defineJogadorAtual("");

    const nextAvailable = findFirstAvailableColor([...jogadores, novoJogador]);
    setSelectedColor(nextAvailable);
  };

  const handleRemoveJogador = (playerId: string) => {
    defineJogador((prev) => prev.filter((p) => p.Id !== playerId));
    jogo.removeJogador(playerId);
  };

  const handleStartGame = async () => {
    if (jogadores.length < 2 || jogadores.length > 5) return;
    await jogo.iniciaJogo();
    router.push("/nova-aventura/ticket-to-ride");
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-serif font-bold text-primary mb-2">Novo Jogo</h1>
          <p className="text-muted-foreground">
            Configure os jogadores e comece a aventura
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 items-start">
          <div className="grid md:grid-rows-2 gap-6 items-start">

            {/* Adicionar jogador */}
            <Card className="shadow-rose">
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

                <div>
                  <Label>Escolha sua Cor</Label>
                  <div className="grid grid-cols-5 gap-2 mt-1.5">
                    {CoresTremDisponiveis.map((color) => {
                      const isUsed = jogadores.some((p) => p.CorDoTrem === color);
                      const isSelected = selectedColor === color;
                      const corLower = color.toLowerCase();

                      return (
                        <button
                          key={color}
                          onClick={() => !isUsed && setSelectedColor(color)}
                          disabled={isUsed}
                          className={cn(
                            `relative w-12 h-12 rounded-full border-2 transition-all`,
                            isSelected
                              ? "border-primary scale-110 ring-4 ring-primary/20"
                              : "border-border hover:scale-105",
                            isUsed ? "opacity-30 cursor-not-allowed" : "cursor-pointer",
                            `bg-${corLower}-custom`
                          )}
                          title={color}
                        >
                          {isUsed && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <X className="w-6 h-6 text-white drop-shadow-lg" />
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <Button
                  onClick={handleAddJogador}
                  className="w-full cursor-pointer"
                  disabled={jogadores.length >= 5 || !selectedColor}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Jogador
                </Button>
              </CardContent>
            </Card>

            <div className="mt-6 text-center">
              <Link
                href="/"
                className="flex items-center justify-center rounded-md h-10 w-60 px-8 font-sans bg-primary text-primary-foreground text-s shadow-rose hover:shadow-xl transition-all duration-300"
              >
                Voltar para o Início
              </Link>
            </div>

          </div>

          {/* Lista de jogadores add*/}
          <Card className="shadow-rose">
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
                  {jogadores.map((jogador) => {
                    const corLower = jogador.CorDoTrem.toLowerCase();
                    return (
                      <div
                        key={jogador.Id}
                        className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 border border-border"
                      >
                        <div
                          className={cn(
                            "w-10 h-10 rounded-full border-2 border-border flex-shrink-0",
                            `bg-${corLower}-custom`
                          )}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{jogador.Nome}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveJogador(jogador.Id)}
                          className="flex-shrink-0 cursor-pointer"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    );
                  })}
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