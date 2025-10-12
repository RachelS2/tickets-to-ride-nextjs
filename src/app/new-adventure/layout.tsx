'use client';
import { useState, useRef } from "react";
import { Plus, Users, X, Play } from "lucide-react";
import { Card, CardTitle, CardContent, CardHeader } from "@/app/components/card";
import {Button} from "@/app/components/button";
import {Label} from "@/app/components/label";
import Input from "@/app/components/input";
import Link from "next/link";
import { Player } from "@/app/lib/player";
import { Board } from "@/app/lib/board";
import { generateUserId } from "@/app/lib/actions"; // ajuste conforme seu util

const LobbyPage = () => {
  const [currentPlayerName, setCurrentPlayerName] = useState("");
  const [players, setPlayers] = useState<Player[]>([]);
  //const { toast } = useToast();

  // Cria o board apenas uma vez
  const boardRef = useRef<Board | null>(null);
  if (!boardRef.current) boardRef.current = new Board(0, []);

  const handleAddPlayer = () => {
    const name = currentPlayerName?.trim();
    if (!name) {

      return;
    }

    const id = generateUserId();
    if (!id) {
      console.error("generateUserId retornou vazio!");
      return;
    }

    const newPlayer = new Player(name, id, players.length + 1, 45);

    setPlayers((prev) => {
      const next = [...prev, newPlayer];
      return next;
    });

    boardRef.current!.addPlayer(newPlayer);

    setCurrentPlayerName(""); // limpa input
  };

  const handleRemovePlayer = (playerId: string) => {
    setPlayers((prev) => prev.filter((p) => p.getId() !== playerId));
  };

  const handleStartGame = () => {
    if (players.length < 2) {
      // toast({
      //   title: "Jogadores insuficientes",
      //   description: "É necessário pelo menos 2 jogadores para começar.",
      //   variant: "destructive",
      // });
      return;
    }

    if (players.length > 5) {
      // toast({
      //   title: "Jogadores em excesso",
      //   description: "O jogo permite no máximo 5 jogadores.",
      //   variant: "destructive",
      // });
      return;
    }

    // toast({
    //   title: "Iniciando jogo!",
    //   description: "Preparando o tabuleiro...",
    // });
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-serif font-bold text-primary mb-2">
            Lobby do Jogo
          </h1>
          <p className="text-muted-foreground">
            Configure os jogadores e comece a aventura
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 items-start">
          {/* Card de Adicionar Jogador */}
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
                  value={currentPlayerName}
                  onChange={(e) => setCurrentPlayerName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddPlayer()}
                  className="mt-1.5"
                  required
                />
              </div>

              <Button
                onClick={handleAddPlayer}
                className="w-full cursor-pointer"
                disabled={players.length >= 5}
              >
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Jogador
              </Button>
            </CardContent>
          </Card>

          {/* Card de Jogadores */}
          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Jogadores ({players.length}/5)
              </CardTitle>
            </CardHeader>
            <CardContent>
              {players.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Users className="w-12 h-12 mx-auto mb-2 opacity-30" />
                  <p>Nenhum jogador adicionado ainda</p>
                  <p className="text-sm mt-1">Adicione de 2 a 5 jogadores</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {players.map((player) => (
                    <div
                      key={player.getId()}
                      className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 border border-border"
                    >
                      <div className="w-10 h-10 rounded-full border-2 border-border flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{player.getName()}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemovePlayer(player.getId())}
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
                disabled={players.length < 2}
                className="w-full mt-6 cursor-pointer"
                size="lg"
              >
                <Play className="w-4 h-4 mr-2" />
                Iniciar Jogo
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="flex items-center justify-center rounded-md h-10 w-60 px-8 font-sans bg-primary text-primary-foreground font-semibold text-lg shadow-elegant hover:shadow-xl transition-all duration-300"
          >
            Voltar para Início
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LobbyPage;
