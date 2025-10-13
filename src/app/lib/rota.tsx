import {Jogador} from "./jogador";
import {NomesDeCidades} from './cidades';
import { CartaVagao } from "./cartas-jogo";

export type CoresDeRota = "Cinza" | "Roxo" | "Azul" | "Laranja" | "Branco" | "Verde" | "Amarelo" | "Preto" | "Vermelho";

export class Rota {
  private readonly Origem: NomesDeCidades
  private readonly Destino: NomesDeCidades
  private readonly Cor: CoresDeRota
  private Dono : Jogador | null = null
  private readonly QtdeEspacos : number

  constructor(origem: NomesDeCidades, destino: NomesDeCidades, qtdeEspacos: number, cor: CoresDeRota) {
    if (origem != destino) {
      this.Origem = origem;
      this.Destino = destino;
      this.QtdeEspacos = qtdeEspacos;
      this.Cor = cor;
    }
  }

  public pegarDono(): Jogador | null {
    return this.Dono;
  }

  public definirDono(jogador: Jogador): void {
    this.Dono = jogador;
  }

  public pegarQtdeEspacos(): number {
    return this.QtdeEspacos;
  }

}

export function corDeRotaAleatoria(): CoresDeRota {
    const cores: CoresDeRota[] = [
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
    return cores[Math.floor(Math.random() * cores.length)];
}