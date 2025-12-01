import { Cidade } from "./cidades";
import {Jogador} from "./jogador";
import { CoresDeRota } from "./utils";

export class Rota {
  public readonly Origem: Cidade
  public readonly Destino: Cidade
  public readonly Cor: CoresDeRota
  public readonly QtdeEspacos : number
  private Dono : Jogador | null = null

  constructor(origem: Cidade, destino: Cidade, qtdeEspacos: number, cor: CoresDeRota) {
    if (origem.Nome == destino.Nome) {
      throw new Error("A origem e o destino da rota não podem ser iguais.");}

    this.Origem = origem;
    this.Destino = destino;
    this.QtdeEspacos = qtdeEspacos;
    this.Cor = cor;
  }

  public estaOcupada(): boolean {
    return this.Dono != null;
  }

  public ocupar(jogador: Jogador): number {
    this.Dono = jogador;
    return this.QtdeEspacos;
  }

  public pegarDono() : Jogador | null {
    return this.Dono;
  }


}

