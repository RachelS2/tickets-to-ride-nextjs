// src/utils/myClass.ts
import {Player} from "./player";

// Declaração da classe

export class Board {
  // Propriedades com tipos
  private Round: number
  private Players: Player[]

  // Construtor para inicializar a classe
  constructor(round: number, player: Player[]) {
    this.Round = round;
    this.Players = player;
  }

  public addPlayer(player: Player): void {
    this.Players.push(player);
  }

  public removePlayer(playerId: string): void {
    this.Players = this.Players.filter(player => player.getId() !== playerId);
  }

  public nextPlayer(): Player {
    const nextPlayerIndex = this.Round % this.Players.length;
    return this.Players.filter(player => player.getRoundToPlay() == nextPlayerIndex)[0];
  }





}