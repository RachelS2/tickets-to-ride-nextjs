import {Jogador} from "./jogador";
import {NomesDeCidades} from './cidades';
import { Tabuleiro } from "./tabuleiro";
import { BilheteDestino, CartaMaiorCaminhoContinuo, CartaVagao } from "./cartas-jogo";

export class Jogo {

    private Tabuleiro!: Tabuleiro;
    private Jogadores: Jogador[] = [];

    private Iniciado: boolean = false;

    public foiIniciado(): boolean {
        return this.Iniciado;
    }
    
    public async iniciaJogo(): Promise<void> {
        if (!this.Jogadores || this.Jogadores.length < 2 || this.Jogadores.length > 5) {
            throw new Error("Verifique o número de jogadores antes de iniciar o jogo.");
        }
        
        if (this.Iniciado) {
            throw new Error("O jogo já foi iniciado.");
        }
        
        this.Iniciado = true;
        this.Tabuleiro = new Tabuleiro();
        this.Tabuleiro.configuracaoInicial(this.Jogadores);
        const tabuleiro: Tabuleiro = this.Tabuleiro;

        for (const jogador of this.Jogadores) {
            jogador.defineTabuleiro(tabuleiro);
        }
    }

    public pegarBilhetesDeDestino(qtde: number): BilheteDestino[] {
        return this.Tabuleiro.pegarBilhetesDeDestino(qtde);
    }

    // public removerBilheteDestinoDoBaralho(bilhete: BilheteDestino): BilheteDestino[] {
    //     return this.Tabuleiro.removerBilheteDestinoDoBaralho(bilhete);
    // }

    public pegarBaralhoCartasVagao(): CartaVagao[] {
        return this.Tabuleiro.pegarBaralhoCartasVagao();
    }

    public pegaJogadores(): Jogador[] {
        return this.Jogadores;
    }

    public adicionaJogador(jogador: Jogador): void {
        if (this.Iniciado) {
            throw new Error("Não é possível adicionar jogadores após o início do jogo.");
        }
        this.Jogadores.push(jogador);
    }
    
    public removeJogador(playerId: string): void {
        if (this.Iniciado) {
            throw new Error("Não é possível remover jogadores após o início do jogo.");
        }
        this.Jogadores = this.Jogadores.filter(jogador => jogador.Id !== playerId);
    }

    public descartarV(cartas: CartaVagao[]): void {
        this.Tabuleiro.descartarC(cartas);
    }

    public descartarB(bilhetes: BilheteDestino[]): void {
        this.Tabuleiro.descartarB(bilhetes);
    }
    
    private calculaVencedor(): void {
        // TODO
    }
    
    public pegaCartaMaiorCaminhoContinuo(): CartaMaiorCaminhoContinuo {
        return this.Tabuleiro.pegarCartaMaiorCaminhoContinuo();
    }


    public finalizaJogo() {

    }
}