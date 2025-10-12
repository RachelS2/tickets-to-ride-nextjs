import {Player} from "./player";
import {CityNames} from './cities';
import { TrainCard } from "./game-cards";

export type PathColors = "Cinza" | "Roxo" | "Azul" | "Laranja" | "Branco" | "Verde" | "Amarelo" | "Preto" | "Vermelho";

export class Path {
  private readonly Origin: CityNames
  private readonly Destination: CityNames
  private readonly Color: PathColors
  private Owner : Player | null = null
  private readonly Length : number

  constructor(origin: CityNames, destination: CityNames, length: number, color: PathColors) {
    if (origin != destination) {
      this.Origin = origin;
      this.Destination = destination;
      this.Length = length;
      this.Color = color;
    }
  }

  public getOwner(): Player | null {
    return this.Owner;
  }

  public setOwner(player: Player): void {
    this.Owner = player;
  }

  public getLength(): number {
    return this.Length;
  }

}

export function randomPathColor(): PathColors {
    const colors: PathColors[] = [
      "Cinza",
      "Roxo",
      "Azul",
      "Laranja",
      "Branco",
      "Verde",
      "Amarelo",
      "Preto",
      "Vermelho",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}