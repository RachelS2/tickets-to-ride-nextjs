import {NomesDeCidades} from './cidades';

export type CoresCartaVagao = "Coringa" | "Roxo" | "Azul" | "Laranja" | "Branco" | "Verde" | "Amarelo" | "Preto" | "Vermelho";

export class CartaVagao {
    private Cor: CoresCartaVagao 

    constructor(cor: CoresCartaVagao) {
        this.Cor = cor;
    }

    public pegarCor(): CoresCartaVagao {
        return this.Cor;
    }

    public ehLocomotiva(): boolean {
        return this.Cor === "Coringa";
    }
      
}


export class BilheteDestino {
    public Origem: NomesDeCidades
    public Destino: NomesDeCidades
    private Pontos: number

    constructor(origin: NomesDeCidades, destino: NomesDeCidades, pontos: number) {
        this.Origem = origin;
        this.Destino = destino;
        this.Pontos = pontos;
    }

    public pegarPontos(): number {
        return this.Pontos;
    }
}