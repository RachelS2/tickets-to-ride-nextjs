import {Jogador} from "./jogador";
import {NomesDeCidades} from './cidades';
import { Tabuleiro } from "./tabuleiro";
import {CoresCartaVagao, CartaVagao, BilheteDestino } from "./cartas-jogo";

export class Jogo {

    private Tabuleiro!: Tabuleiro;
    private Jogadores: Jogador[] = [];
    private Rodada: number = 1;


    public async iniciaJogo(): Promise<void> {
        if (!this.Jogadores || this.Jogadores.length < 2 || this.Jogadores.length > 5) {
            throw new Error("Verifique o número de jogadores antes de iniciar o jogo.");
        }

        if (this.Tabuleiro) {
            throw new Error("O jogo já foi iniciado.");
        }

        this.Tabuleiro = new Tabuleiro();
        this.Tabuleiro.configuracaoInicial(this.Jogadores);
        const tabuleiro: Tabuleiro = this.Tabuleiro;

        for (const jogador of this.Jogadores) {
            jogador.defineTabuleiro(tabuleiro);
        }
    }


    private proximoJogador(): Jogador {
        const indexProxJogador: number = (this.Rodada) % this.Jogadores.length;
        return this.Jogadores[indexProxJogador];
    }


    public adicionaJogador(jogador: Jogador): void {
        if (this.Tabuleiro) {
            throw new Error("Não é possível adicionar jogadores após o início do jogo.");
        }
        this.Jogadores.push(jogador);
    }

    public removeJogador(playerId: string): void {
        if (this.Tabuleiro) {
            throw new Error("Não é possível remover jogadores após o início do jogo.");
        }
        this.Jogadores = this.Jogadores.filter(jogador => jogador.pegarId() !== playerId);
    }

    private calculaVencedor(): void {
        // TODO
    }



}