import { CartaVagao, BilheteDestino  } from "./cartas-jogo"
import {Tabuleiro} from "./tabuleiro"
import { CoresDeTrem } from "./utils"


export class Jogador {
  public readonly Id: string
  public readonly Nome: string
  public readonly CorDoTrem: CoresDeTrem
  public readonly RodadaAJogar: number

  private QtdeTrens: number = 45
  private CartasVagaoMaos: CartaVagao[] = []
  private BilhetesDestinoMaos: BilheteDestino[] = []
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

  public pegarTrem(qtde: number) : void {
    if (this.QtdeTrens == 0 || this.QtdeTrens - qtde < 0) 
        throw new Error("Quantidade de trens insuficiente para pegar.");

    this.QtdeTrens -= qtde;
  }

  public verCartasVagao(): CartaVagao[] {
    return this.CartasVagaoMaos;
  }

  public verBilhetesDestino(): BilheteDestino[] {
    return this.BilhetesDestinoMaos;
  }

  public pegarPontos(): number {
    return this.Pontos;
  }

  public pegarQtdeTrens(): number {
    return this.QtdeTrens;
  }

  public addCartaVagao(carta: CartaVagao): void {
    this.CartasVagaoMaos.push(carta);
  }

  public addBilheteDestino(carta: BilheteDestino): void {
    this.BilhetesDestinoMaos.push(carta);
  }

  public removerCartaVagao(carta: CartaVagao): void {
    const index = this.CartasVagaoMaos.indexOf(carta);
    if (index > -1) {
      this.CartasVagaoMaos.splice(index, 1);
    }
  }

  public removerBilheteDestino(bilhete: BilheteDestino): void {
    const index = this.BilhetesDestinoMaos.indexOf(bilhete);
    if (index > -1) {
      this.BilhetesDestinoMaos.splice(index, 1);
    }
  }
  
}