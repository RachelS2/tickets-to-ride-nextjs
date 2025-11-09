import { customAlphabet } from 'nanoid';
import { CoresCartaVagao, NomesDeCidades } from "./utils";

export class CartaVagao {
    public readonly Cor: CoresCartaVagao 
    public readonly Id: string

    constructor(cor: CoresCartaVagao) {
        this.Cor = cor;
        const gerarId = customAlphabet("1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ", 8);
        this.Id = `${cor.slice(0,2)}-${cor.slice(2,5)}-${gerarId()}`;
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

    constructor(origem: NomesDeCidades, destino: NomesDeCidades, pontos: number) {
        this.Origem = origem;
        this.Destino = destino;
        this.Pontos = pontos;
        const gerarId = customAlphabet("1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ", 8);
        this.Id = `${origem.slice(0,2)}-${destino.slice(0,2)}-${gerarId()}`;
    }
}

export class CartaMaiorCaminhoContinuo extends BilheteDestino {
    constructor(origin: NomesDeCidades, destino: NomesDeCidades, pontos: number) {
        super(origin, destino, pontos);

    }
}