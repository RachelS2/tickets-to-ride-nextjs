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
  private Tabuleiro: Tabuleiro; 

  constructor(nome: string, id: string, rodadaAJogar: number, tabuleiro: Tabuleiro, corDoTrem: CoresDeTrem) {
    console.log("Argumentos recebidos:", { nome, Id: id, rodadaAJogar });
    this.RodadaAJogar = rodadaAJogar;
    this.Nome = nome;
    this.Id = id;
    this.Tabuleiro = tabuleiro;
    this.CorDoTrem = corDoTrem;

  }

  public pegarCorDoTrem(): CoresDeTrem {
    return this.CorDoTrem;
  }

  public removerTrem(qtde: number) : void {
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