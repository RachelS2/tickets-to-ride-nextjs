'use client';
import { useState, useEffect } from "react";
import { Plus, Users, X, Play } from "lucide-react";
import { Card, CardTitle, CardContent, CardHeader } from "@/app/components/card";
import { Button } from "@/app/components/button";
import { Label } from "@/app/components/label";
import Input from "@/app/components/input";
import Link from "next/link";
import { Jogador, CoresDeTrem, gerarIdUsuario } from "@/app/lib/jogador";
import { usarJogo } from "@/app/lib/contexto-jogo";

const PLAYER_COLORS: { value: CoresDeTrem; hex: string }[] = [
  { value: "Vermelho", hex: "#DC2626" },
  { value: "Azul", hex: "#2563EB" },
  { value: "Verde", hex: "#16A34A" },
  { value: "Amarelo",  hex: "#EAB308" },
  { value: "Preto", hex: "#1F2937" },
];

const NovaAventuraPagina = () => {
  const [nomeJogadorAtual, defineJogadorAtual] = useState("");
  const [jogadores, defineJogador] = useState<Jogador[]>([]);
  const [selectedColor, setSelectedColor] = useState<CoresDeTrem | null>(PLAYER_COLORS[0].value);

  const jogo = usarJogo();

  const findFirstAvailableColor = (existingPlayers: Jogador[]) => {
    return PLAYER_COLORS.find((c) => !existingPlayers.some((p) => p.pegarCorDoTrem() === c.value))?.value ?? null;
  };

  useEffect(() => {
    // se selectedColor for null, tenta selecionar uma disponível
    const available = findFirstAvailableColor(jogadores);
    if (selectedColor === null && available !== null) {
      setSelectedColor(available);
      return;
    }

    // se a cor atualmente selecionada foi usada por alguém, escolhe a próxima disponível
    if (selectedColor !== null) {
      const isUsed = jogadores.some((p) => p.pegarCorDoTrem() === selectedColor);
      if (isUsed) {
        setSelectedColor(available); 
      }
    }
  }, [jogadores, selectedColor]);

  const handleAddJogador = () => {
    const nome: string = nomeJogadorAtual?.trim();
    if (!nome) return;

    if (!selectedColor) return;

    if (jogadores.find((p) => p.pegarNome().toLowerCase() === nome.toLowerCase())) {
      return;
    }

    const novoJogador: Jogador = new Jogador(
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

    // escolhe a próxima cor disponível (ou null se esgotadas)
    const nextAvailable = PLAYER_COLORS.find((c) => ![...jogadores, novoJogador].some((p) => p.pegarCorDoTrem() === c.value))?.value ?? null;
    setSelectedColor(nextAvailable);
  };

  const handleRemoveJogador = (playerId: string) => {
    defineJogador((prev) => prev.filter((p) => p.pegarId() !== playerId));
    jogo.removeJogador(playerId);
  };

  const handleStartGame = async () => {
    if (jogadores.length < 2) return;
    if (jogadores.length > 5) return;
    await jogo.iniciaJogo();
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-serif font-bold text-primary mb-2">Novo Jogo</h1>
          <p className="text-muted-foreground">Configure os jogadores e comece a aventura</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 items-start">
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

                <div>
                  <Label>Escolha sua Cor</Label>
                  <div className="grid grid-cols-5 gap-2 mt-1.5">
                    {PLAYER_COLORS.map((color) => {
                      const isUsed = jogadores.some((p) => p.pegarCorDoTrem() === color.value);
                      const isSelected = selectedColor === color.value;
                      return (
                        <button
                          key={color.value}
                          onClick={() => !isUsed && setSelectedColor(color.value)}
                          disabled={isUsed}
                          className={`
                            relative w-12 h-12 rounded-full border-2 transition-all
                            ${isSelected ? "border-primary scale-110 ring-4 ring-primary/20" : "border-border hover:scale-105"}
                            ${isUsed ? "opacity-30 cursor-not-allowed" : "cursor-pointer"}
                          `}
                          style={{ backgroundColor: color.hex }}
                          title={color.value}
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
                  disabled={jogadores.length >= 5 || !selectedColor} // desativa se sem cor selecionada
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Jogador
                </Button>
              </CardContent>
            </Card>

            <div className="mt-6 text-center">
              <Link href="/" className="flex items-center justify-center rounded-md h-10 w-60 px-8 font-sans bg-primary text-primary-foreground font-semibold text-lg shadow-elegant hover:shadow-xl transition-all duration-300">
                Voltar para Início
              </Link>
            </div>
          </div>

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
                  {jogadores.map((jogador) => {
                    const colorInfo = PLAYER_COLORS.find((c) => c.value === jogador.pegarCorDoTrem());
                    return (
                      <div key={jogador.pegarId()} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 border border-border">
                        <div className="w-10 h-10 rounded-full border-2 border-border flex-shrink-0" style={{ backgroundColor: colorInfo?.hex }} />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{jogador.pegarNome()}</p>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => handleRemoveJogador(jogador.pegarId())} className="flex-shrink-0 cursor-pointer">
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    );
                  })}
                </div>
              )}

              <Button onClick={handleStartGame} disabled={jogadores.length < 2} className="w-full mt-6 cursor-pointer" size="lg">
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
