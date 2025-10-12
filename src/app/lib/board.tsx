import {Player} from "./player";

export class Board {
  private Round: number
  private Players: Player[]

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

  public getPlayers(): Player[] {
    return this.Players;
  }
}