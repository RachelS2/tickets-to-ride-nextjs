import {NomesDeCidades} from './cidades';
import { CoresCartaVagao } from "./utils";

export class CartaVagao {
    public readonly Cor: CoresCartaVagao 

    constructor(cor: CoresCartaVagao) {
        this.Cor = cor;
    }

    public ehLocomotiva(): boolean {
        return this.Cor === "Coringa";
    }
      
}


export class BilheteDestino {
    public readonly Origem: NomesDeCidades
    public readonly Destino: NomesDeCidades
    public readonly Pontos: number

    constructor(origin: NomesDeCidades, destino: NomesDeCidades, pontos: number) {
        this.Origem = origin;
        this.Destino = destino;
        this.Pontos = pontos;
    }
}

export class CartaMaiorCaminhoContinuo extends BilheteDestino {
    constructor(origin: NomesDeCidades, destino: NomesDeCidades, pontos: number) {
        super(origin, destino, pontos);

    }
}