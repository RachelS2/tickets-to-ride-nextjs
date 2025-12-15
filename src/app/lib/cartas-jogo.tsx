import { customAlphabet } from 'nanoid';
import { CoresCartaVagao, NomesDeCidades } from "./utils";
import { Cidade } from './cidades';

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
    public readonly Origem: Cidade
    public readonly Destino: Cidade
    public readonly Pontos: number
    private ObjetivoAtingido: boolean = false
    public readonly Id: string

    constructor(origem: Cidade, destino: Cidade, pontos: number) {
        this.Origem = origem;
        this.Destino = destino;
        this.Pontos = pontos;
        const gerarId = customAlphabet("1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ", 8);
        this.Id = `${origem.Nome.slice(0,2)}-${destino.Nome.slice(0,2)}-${gerarId()}`;
    }

    public marcarObjetivoAtingido() : void {
        this.ObjetivoAtingido = true;
    }

    public objetivoFoiAtingido() : boolean {
        return this.ObjetivoAtingido;
    }
    
}

export class CartaMaiorCaminhoContinuo extends BilheteDestino {
    constructor(origin: Cidade, destino: Cidade, pontos: number) {
        super(origin, destino, pontos);

    }
}