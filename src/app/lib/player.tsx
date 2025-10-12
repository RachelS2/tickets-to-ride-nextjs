import { TrainCard, DestinyTicket  } from "./game-cards"
import { useBoard } from "@/app/lib/board-context";
import {Board} from "./board"

export class Player {
  private Id: string
  public readonly Name: string
  private RoundToPlay: number
  private TrainsAmount: number = 45

  private HandTrainCards: TrainCard[] = []
  private HandDestinyTickets: DestinyTicket[] = []

  private Board: Board; 

  constructor(name: string, Id: string, roundToPlay: number, board: Board) {
    console.log("Argumentos recebidos:", { name, Id, roundToPlay });
    this.RoundToPlay = roundToPlay;
    this.Name = name;
    this.Id = Id;
    this.Board = board;

  }

  private removeTrain() : void {
    this.TrainsAmount -= 1;
  }

  public getId(): string {
        return this.Id;
    }

  public getName(): string {
    return this.Name;
  }

  public getRoundToPlay(): number {
    return this.RoundToPlay;
  }

  public getTrainsAmount(): number {
    return this.TrainsAmount;
  }

  public addTrainCard(card: TrainCard): void {
    this.HandTrainCards.push(card);
    //console.log(this.HandTrainCards)
  }

  public addDestinyTicket(card: DestinyTicket): void {
    this.HandDestinyTickets.push(card);
    //console.log("Jogador(a): ", this.Name, "Tickets de Destino:", this.HandDestinyTickets)

  }

  
}