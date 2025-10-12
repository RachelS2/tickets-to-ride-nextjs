'use client';
import { useState, useRef } from "react";
import { Plus, Users, X, Play, Train } from "lucide-react";
import { Card, CardTitle, CardContent, CardHeader } from "@/app/components/card";
import {Button} from "@/app/components/button";
import {Label} from "@/app/components/label";
import Input from "@/app/components/input";
import Link from "next/link";
import { Player } from "@/app/lib/player";
import { useBoard } from "@/app/lib/board-context";
import { generateUserId } from "@/app/lib/actions"; // ajuste conforme seu util

const NewAdventurePage = () => {
  const [currentPlayerName, setCurrentPlayerName] = useState("");
  const [players, setPlayers] = useState<Player[]>([]);

  const boardRef = useBoard();

  const handleAddPlayer = () => {
    const name : string = currentPlayerName?.trim();
    if (!name) {
      return;
    }

    if (players.find((p) => p.getName().toLowerCase() === name.toLowerCase())) { // se o nome já existe na lista de jogadores..
      return; 
    }

    const newPlayer : Player = new Player(name, generateUserId(), players.length + 1, boardRef);

    setPlayers((prev) => {
      const next = [...prev, newPlayer];
      return next;
    });

    console.log(newPlayer)
    boardRef.addPlayer(newPlayer);

    setCurrentPlayerName(""); 
  };

  const handleRemovePlayer = (playerId: string) => {
    setPlayers((prev) => prev.filter((p) => p.getId() !== playerId));
    boardRef.removePlayer(playerId);
    console.log(boardRef.getPlayers())
  };

  const handleStartGame = async () => {
    if (players.length < 2) {
      return;
    }

    if (players.length > 5) {
      return;
    }

    await boardRef.startGame();

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
                      <Train className="w-10 h-10 text-primary border-border flex-shrink-0" strokeWidth={1.5} />
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


      </div>
    </div>
  );
};

export default NewAdventurePage;
