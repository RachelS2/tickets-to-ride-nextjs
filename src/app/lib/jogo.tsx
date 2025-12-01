import {Jogador} from "./jogador";
import { Tabuleiro } from "./tabuleiro";
import { BilheteDestino, CartaMaiorCaminhoContinuo, CartaVagao } from "./cartas-jogo";
import { Rota } from "./rota";

export class Jogo {

    private Tabuleiro!: Tabuleiro;
    private Jogadores: Jogador[] = [];
    private Rodada: number = 0;
    private Iniciado: boolean = false;
    private RodadaFinal: number | null = null;

    public foiIniciado(): boolean {
        return this.Iniciado;
    }

    public pegarRodada() : number {
        return this.Rodada;
    }

    public subirRodada() : void {
        this.Rodada += 1;
    }

    public pegarRodadaFinal() : number | null{
        return this.RodadaFinal;
    }

    public setRodadaFinal(): void {
        this.RodadaFinal = this.Rodada + 1;
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

        for (const jogador of this.Jogadores) {
            jogador.defineTabuleiro(this.Tabuleiro);
        }
    }

    public pegarBilhetesDeDestino(qtde: number): BilheteDestino[] {
        return this.Tabuleiro.pegarBaralhoBilhetesDeDestino(qtde);
    }

    public pegarBaralhoCartasVagao(qtde: number): CartaVagao[] {
        return this.Tabuleiro.pegarBaralhoCartasVagao(qtde);
    }

    private exporCartasVagao(qtde: number): CartaVagao[] {
        let cartasExpostas: CartaVagao[] = this.Tabuleiro.pegarBaralhoCartasVagao(qtde);

        // conta locomotivas
        const qtdeLocomotivas = cartasExpostas.filter(c => c.ehLocomotiva()).length;

        // aplica regra de 3 locomotivas
        if (qtdeLocomotivas >= 3) {
            this.Tabuleiro.descartarC(cartasExpostas);
            // tenta novamente até sair uma combinação válida
            return this.exporCartasVagao(qtde);
        }

        // se não houver 3 locomotivas, mantém as cartas reveladas
        this.Tabuleiro.exporCartasVagao(cartasExpostas);
        return cartasExpostas;
    }

    public pegarCartasVagaoExpostas(qtde: number) : CartaVagao[] {
        return this.exporCartasVagao(qtde);
    }

    public pegarRotas() : Rota[] {
        return this.Tabuleiro.pegarRotas()
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
        this.Jogadores = this.Jogadores.filter(jogador => jogador.Id !== playerId);
    }
    
    public verificarFimDeJogo(): boolean {
        if (!this.Iniciado) {
            throw new Error("O jogo não foi iniciado.");
        }
        if (this.Jogadores.some(jogador => jogador.pegarQtdeTrens() <= 2)) {
            console.log("Um jogador tem 2 ou menos trens restantes. Iniciando a rodada final.");
            return true;
        }
        console.log("Nenhum jogador com 2 ou menos trens restantes.");
        return false;
    }

    public calculaVencedor(): Jogador[] {
        console.log("Calculando vencedor...");
        const resultados: { jogador: Jogador; novoPontos: number }[] = [];
        const cartaMaiorCaminho : CartaMaiorCaminhoContinuo = this.Tabuleiro.pegarCartaMaiorCaminhoContinuo();
        let cartaMaiorCaminhoAtingida: boolean = false;
        for (const jogador of this.Jogadores) {
            const pontosAtuais = jogador.pegarPontos();
            console.log("Verificando jogador " + jogador.Nome + " com pontos atuais: " + pontosAtuais);
            let ganho = 0;
            const bilhetesJogador : BilheteDestino[] = jogador.verBilhetesDestino()
            if (!cartaMaiorCaminhoAtingida && this.Tabuleiro.verificarBilheteAtingido(cartaMaiorCaminho, jogador)) {
                ganho += cartaMaiorCaminho.Pontos;
                cartaMaiorCaminhoAtingida = true;
                console.log(`Jogador ${jogador.Nome} ganhou ${cartaMaiorCaminho.Pontos} pontos por ter conquistado o Maior Caminho Contínuo do tabuleiro.`);
            }
            for (let i = bilhetesJogador.length - 1; i >= 0; i--) {
                const bilhete = bilhetesJogador[i];
                if (this.Tabuleiro.verificarBilheteAtingido(bilhete, jogador) || bilhete.objetivoFoiAtingido()) {
                    ganho += bilhete.Pontos;
                    bilhete.marcarObjetivoAtingido()
                }
            }
            // penalidades: todos os bilhetes de destino cujo objetivo não foi atingido
            let penalidade = 0;
            for (const bilhete of bilhetesJogador) {
                if (!bilhete.objetivoFoiAtingido()) {
                    penalidade += bilhete.Pontos;
                }
            }

            let novoTotal = pontosAtuais + ganho - penalidade;
            resultados.push({ jogador, novoPontos: novoTotal });
            jogador.marcarPontos(novoTotal - pontosAtuais); 
            console.log(`${jogador.Nome}: ${pontosAtuais} +${ganho} -${penalidade} => ${novoTotal}`);
        }

        return this.Jogadores.slice().sort((a, b) => b.pegarPontos() - a.pegarPontos());
    }
    
    public pegaCartaMaiorCaminhoContinuo(): CartaMaiorCaminhoContinuo {
        return this.Tabuleiro.pegarCartaMaiorCaminhoContinuo();
    }

    public calculaQtdePontosRota(rota: Rota) : number {
        switch (rota.QtdeEspacos) {
            case 1:
                return 1
            case 2:
                return 2
            case 3: 
                return 4
            case 4:
                return 7
            case 5:
                return 10
            case 6:
                return 15
        }
        return 0;
    }

    public verificarBilheteAtingido(bilhete: BilheteDestino, jogador: Jogador): boolean {
        const bilheteAtingido = this.Tabuleiro.verificarBilheteAtingido(bilhete, jogador);
        if (bilheteAtingido) {
            bilhete.marcarObjetivoAtingido();
            console.log("Bilhete atingido! " + bilhete.Origem.Nome + " - " + bilhete.Destino.Nome);
        }
        return bilheteAtingido;
    }

    public finalizaJogo(): void {
        this.Iniciado = false;
        this.RodadaFinal = null;
        this.Rodada = 0;
        this.Tabuleiro = null as unknown as Tabuleiro;
        this.Jogadores = [];
    }
}