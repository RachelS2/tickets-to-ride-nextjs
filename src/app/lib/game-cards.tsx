import {CityNames} from './cities';

export type TrainCardColors = "Coringa" | "Roxo" | "Azul" | "Laranja" | "Branco" | "Verde" | "Amarelo" | "Preto" | "Vermelho";

export class TrainCard {
    private Color: TrainCardColors 

    constructor(color: TrainCardColors) {
        this.Color = color;
    }

    public getColor(): TrainCardColors {
        return this.Color;
    }

    public isLocomotive(): boolean {
        return this.Color === "Coringa";
    }
      
}


export class DestinyTicket {
    public Origin: CityNames
    public Destination: CityNames
    private Points: number

    constructor(origin: CityNames, destination: CityNames, points: number) {
        this.Origin = origin;
        this.Destination = destination;
        this.Points = points;
    }

    public getPoints(): number {
        return this.Points;
    }
}