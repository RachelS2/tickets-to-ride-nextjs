import {Jogador} from "./jogador";
import {NomesDeCidades} from './cidades';

export type CoresDeRota = "Cinza" | "Roxo" | "Azul" | "Laranja" | "Branco" | "Verde" | "Amarelo" | "Preto" | "Vermelho";

export class Rota {
  private readonly Origem: NomesDeCidades
  private readonly Destino: NomesDeCidades
  private readonly Cor: CoresDeRota
  private Dono : Jogador | null = null
  private readonly QtdeEspacos : number

  constructor(origem: NomesDeCidades, destino: NomesDeCidades, qtdeEspacos: number, cor: CoresDeRota) {
    if (origem == destino) {
      throw new Error("A origem e o destino da rota não podem ser iguais.");}

    this.Origem = origem;
    this.Destino = destino;
    this.QtdeEspacos = qtdeEspacos;
    this.Cor = cor;
  }

  public estaOcupada(): boolean {
    return this.Dono == null;
  }

  public ocupar(jogador: Jogador): number {
    this.Dono = jogador;
    return this.QtdeEspacos;
  }

  public pegarQtdeEspacos(): number {
    return this.QtdeEspacos;
  }

  public pegarCor(): CoresDeRota {
    return this.Cor;
  }

  public pegarOrigem(): NomesDeCidades {
    return this.Origem;
  }

  public pegarDestino(): NomesDeCidades {
    return this.Destino;
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