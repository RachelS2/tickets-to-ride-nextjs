import { CartaVagao, BilheteDestino  } from "./cartas-jogo"
import {Tabuleiro} from "./tabuleiro"
import { customAlphabet } from "nanoid";

// cria IDs numéricos com 5 dígitos
const nanoid = customAlphabet('1234567890', 5);
export function gerarIdUsuario() {
  const i = nanoid()
  console.log(i)
  return i;
}

export class Jogador {
  private Id: string
  public readonly Nome: string
  private RodadaAJogar: number
  private QtdeTrens: number = 45

  private CartasVagaoMaos: CartaVagao[] = []
  private BilhetesDestinoMaos: BilheteDestino[] = []

  private Pontos: number = 0
  private Tabuleiro: Tabuleiro; 

  constructor(nome: string, Id: string, rodadaAJogar: number, tabuleiro: Tabuleiro) {
    console.log("Argumentos recebidos:", { nome, Id, rodadaAJogar });
    this.RodadaAJogar = rodadaAJogar;
    this.Nome = nome;
    this.Id = Id;
    this.Tabuleiro = tabuleiro;

  }

  private removerTrem(qtde: number) : void {
    this.QtdeTrens -= qtde;
  }

  public pegarPontos(): number {
    return this.Pontos;
  }

  public pegarId(): string {
        return this.Id;
    }

  public pegarNome(): string {
    return this.Nome;
  }

  public pegarRodadaAJogar(): number {
    return this.RodadaAJogar;
  }

  public pegarQtdeTrens(): number {
    return this.QtdeTrens;
  }

  public addCartaVagao(carta: CartaVagao): void {
    this.CartasVagaoMaos.push(carta);
    //console.log(this.CartasVagaoMaos)
  }

  public addBilheteDestino(carta: BilheteDestino): void {
    this.BilhetesDestinoMaos.push(carta);
    //console.log("Jogador(a): ", this.Nome, "Tickets de Destino:", this.BilhetesDestinoMaos)

  }

  
}