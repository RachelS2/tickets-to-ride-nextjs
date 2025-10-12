
export class Player {
  public Id: string
  private Name: string
  private RoundToPlay: number
  private TrainsAmount: number


  constructor(name: string, Id: string, roundToPlay: number, trainsAmount: number) {
    console.log("Argumentos recebidos:", { name, Id, roundToPlay, trainsAmount });
    this.RoundToPlay = roundToPlay;
    this.TrainsAmount = trainsAmount;
    this.Name = name;
    this.Id = Id;

  }

  getId(): string {
        return this.Id;
    }

  getName(): string {
    return this.Name;
  }

  getRoundToPlay(): number {
    return this.RoundToPlay;
  }

  getTrainsAmount(): number {
    return this.TrainsAmount;
  }

  // Método da classe
  saudacao(): string {
    return `Olá, meu nome é ${this.Name}`;
  }

  
}