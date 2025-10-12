import {Player} from "./player";
import {Path, randomPathColor} from "./path"
import {TrainCardColors, TrainCard, DestinyTicket } from "./game-cards";
import {CityNames, PathCities, DestinyTicketsCities} from './cities';

export class Board {
  private Round: number = 1
  private Players: Player[]
  private Paths: Path[] = []
  
  private TrainCardPack: TrainCard[] 
  private DestinyTicketPack: DestinyTicket[]

  constructor(player: Player[]) {
    this.Players = player;
  }

  public addPlayer(player: Player): void {
    this.Players.push(player);
  }

  public removePlayer(playerId: string): void {
    this.Players = this.Players.filter(player => player.getId() !== playerId);
  }

  public nextPlayer(): Player {
    const nextPlayerIndex : number = this.Round % this.Players.length;
    return this.Players.filter(player => player.getRoundToPlay() == nextPlayerIndex)[0];
  }

  public getPlayers(): Player[] {
    return this.Players;
  }

  public async startGame(): Promise<void> {
    this.TrainCardPack = this.createTrainCards();
    console.log("cartas de trem:", this.TrainCardPack); 
    this.Paths = this.createPaths();     
    console.log("rotas:", this.Paths); 
    this.DestinyTicketPack = this.createDestinyTickets();
    console.log("cartas de destino:", this.DestinyTicketPack); // 110

    this.handCardsToPlayers();
  }

  private shufflePack<T>(deck: T[]): T[] { // embaralha qq baralho (destinytickets ou traincards)
    const shuffled = [...deck]; // copia o array
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // índice aleatório entre 0 e i
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // troca
    }
    return shuffled;
  }

  private handCardsToPlayers(): void{
    for (const player of this.Players) {
        for (let i = 0; i < 4; i++) {
            const trainCard = this.TrainCardPack.pop();
            if (trainCard) {
              player.addTrainCard(trainCard);
            }
            const destinyTicket = this.DestinyTicketPack.pop();
            if (destinyTicket) {
              player.addDestinyTicket(destinyTicket);
            }
        }
    } 
  }

  private createPaths(): Path[] {
    const paths: Path[] = [];
    const added = new Set<string>(); // evita duplicações (ex: Rio–Niteroi e Niteroi–Rio)

    for (const [lengthStr, cities] of Object.entries(PathCities)) {
      const length = parseInt(lengthStr);

      for (const [origin, destinations] of Object.entries(cities)) {

        for (const destination of destinations) {
          const key = [origin, destination].sort().join("-"); // ordena para evitar duplicação

          if (!added.has(key)) {
            added.add(key);

            const path = new Path(origin as CityNames, destination as CityNames, length, randomPathColor());
            paths.push(path);
          }
        }
      }
    }

    return this.shufflePack(paths);
  }

  private createTrainCards() : TrainCard[] {
    const cardCounts: Record<TrainCardColors, number> = {
        "Roxo": 12,
        "Azul": 12,
        "Laranja": 12,
        "Branco": 12,
        "Verde": 12,
        "Amarelo": 12,
        "Preto": 12,
        "Vermelho": 12,
        "Coringa": 14
    };

    const pack: TrainCard[] = [];

    for (const color in cardCounts) {
        const count : number = cardCounts[color as TrainCardColors];
        for (let i = 0; i < count; i++) {
            pack.push(new TrainCard(color as TrainCardColors));
        }
    }

    return this.shufflePack(pack);
  }

  private createDestinyTickets(): DestinyTicket[] {
    const destinyTickets: DestinyTicket[] = [];

    // cria 29 tickets de destino a partir de DestinyTicketsCities
    for (const [pointsStr, routes] of Object.entries(DestinyTicketsCities)) {
      const points = Number(pointsStr);

      for (const [origin, destination] of Object.entries(routes!)) {
        destinyTickets.push(new DestinyTicket(origin as CityNames, destination as CityNames, points));
      }
    }

    // chave 8 (miracema a quissama) é repetida 2x, totalizando 3 cartas no baralho
    for (let i = 0; i < 2; i++) {
      destinyTickets.push(new DestinyTicket("Miracema" as CityNames, "Quissama" as CityNames, 8));
    }

    // chave 9 e 10 (itatiaia a volta redonda) são repetidas 2x, totalizando 2 cartas de cada uma dessas no baralho
    for (let i = 0; i < 1; i++) {
      destinyTickets.push(new DestinyTicket("Itatiaia" as CityNames, "Volta Redonda" as CityNames, 9));
      destinyTickets.push(new DestinyTicket("Sumidouro" as CityNames, "Petropolis" as CityNames, 10));
    }

    return this.shufflePack(destinyTickets);
  }

}