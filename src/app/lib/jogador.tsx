import { CartaVagao, BilheteDestino  } from "./cartas-jogo"
import {Tabuleiro} from "./tabuleiro"
import { customAlphabet } from "nanoid";

// cria IDs numéricos com 5 dígitos
const nanoid = customAlphabet('1234567890', 5);
export function gerarIdUsuario() {
  return nanoid();
}

export type CoresDeTrem = "Azul" | "Vermelho" | "Amarelo" | "Verde" | "Preto";

export class Jogador {
  private readonly Id: string
  public readonly Nome: string
  private readonly RodadaAJogar: number
  private QtdeTrens: number = 45

  private CartasVagaoMaos: CartaVagao[] = []
  private BilhetesDestinoMaos: BilheteDestino[] = []

  private readonly CorDoTrem: CoresDeTrem

  private Pontos: number = 0
  private Tabuleiro!: Tabuleiro; 

  constructor(nome: string, id: string, rodadaAJogar: number, corDoTrem: CoresDeTrem) {
    this.RodadaAJogar = rodadaAJogar;
    this.Nome = nome;
    this.Id = id;
    this.CorDoTrem = corDoTrem;
  }

  public defineTabuleiro(tabuleiro: Tabuleiro) : void {
    if (this.Tabuleiro) throw new Error("Tabuleiro já definido para este jogador!");
    this.Tabuleiro = tabuleiro;
  }

  public pegarCorDoTrem(): CoresDeTrem {
    return this.CorDoTrem;
  }

  public pegarTrem(qtde: number) : void {
    if (this.QtdeTrens == 0 || this.QtdeTrens - qtde < 0) 
        throw new Error("Quantidade de trens insuficiente para pegar.");

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