import { customAlphabet } from 'nanoid';
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
    public readonly Id: string

    constructor(origin: NomesDeCidades, destino: NomesDeCidades, pontos: number) {
        this.Origem = origin;
        this.Destino = destino;
        this.Pontos = pontos;
        const gerarId = customAlphabet("1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ", 8);
        this.Id = `${origin.slice(0,2)}-${destino.slice(0,2)}-${gerarId()}`;
    }
}

export class CartaMaiorCaminhoContinuo extends BilheteDestino {
    constructor(origin: NomesDeCidades, destino: NomesDeCidades, pontos: number) {
        super(origin, destino, pontos);

    }
}