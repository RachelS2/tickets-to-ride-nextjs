import {Jogador} from "./jogador";
import {Rota } from "./rota"
import {CartaVagao, CartaMaiorCaminhoContinuo, BilheteDestino } from "./cartas-jogo";
import { NomesDeCidades, CoresCartaVagao} from "./utils";
import { Rotas, DestinosCidades, Seattle, Boston} from "./cidades";

export class Tabuleiro {
  private Rotas!: Rota[]
  private BaralhoCartasVagao!: CartaVagao[] 
  private BaralhoBilhetesDestino!: BilheteDestino[]
  private CartaMaiorCaminhoContinuo!: CartaMaiorCaminhoContinuo;
  private CartasVagaoExpostas: CartaVagao[] = []
  private CartasVagaoDescartadas : CartaVagao[] = []

  public configuracaoInicial(jogadores: Jogador[]): void {
    this.BaralhoCartasVagao = this.criarCartasDeVagao();
    this.Rotas = this.criarRotas();     
    this.BaralhoBilhetesDestino = this.criarBilhetesDestino();
    this.CartaMaiorCaminhoContinuo = this.criarCartaMaiorCaminhoContinuo();
    this.darCartasAosJogadores(jogadores);
  }

  private embaralharCartas<T>(deck: T[]): T[] { // embaralha qq baralho (destinytickets ou traincards)
    const shuffled = [...deck]; // copia o array
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // índice aleatório entre 0 e i
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // troca
    }
    return shuffled;
  }

  public pegarBaralhoBilhetesDeDestino(qtde: number): BilheteDestino[] {
    if (qtde > 0) {
      return this.BaralhoBilhetesDestino.splice(-qtde)
    }
    return [];
  }


  public pegarBaralhoCartasVagao(qtde: number): CartaVagao[] {
    if (qtde > 0) {
      return this.BaralhoCartasVagao.splice(-qtde)
    }
    return [];
  }

  public pegarCartasVagaoExpostas(qtde: number) :  CartaVagao[]{
    if (qtde > 0) {
      return this.CartasVagaoExpostas.splice(-qtde)
    }
    return [];
  }

  public exporCartasVagao(cartas: CartaVagao[]): void {
    this.BaralhoCartasVagao = this.BaralhoCartasVagao.filter(
      (carta) => !cartas.includes(carta)
    ); //remove do baralho oculto as cartas a serem expostas
    this.CartasVagaoExpostas = cartas; //expoe cartas
  }


  public pegarCartaMaiorCaminhoContinuo(): CartaMaiorCaminhoContinuo {
    return this.CartaMaiorCaminhoContinuo;
  }

  private reporBaralhoCartasVagao() : void {
    if (this.BaralhoCartasVagao.length > 0) return; //se ainda tiver cartas, não repõe  
    this.BaralhoCartasVagao = this.CartasVagaoDescartadas
    this.CartasVagaoDescartadas = []
  }

  public descartarC(cartas: CartaVagao[]): void {
    this.CartasVagaoDescartadas.push(...cartas);
  }

  public descartarB(bilhetes: BilheteDestino[]) : void {
    this.BaralhoBilhetesDestino.push(...bilhetes);
    this.BaralhoBilhetesDestino = this.embaralharCartas(this.BaralhoBilhetesDestino);
  }

  public pegarRotas() : Rota[] {
    if (!this.Rotas) throw new Error("As rotas ainda não foram criadas!");
    return this.Rotas;
  }

  private criarRotas(): Rota[] {
    if (this.Rotas) 
      throw new Error("Já existem Rotas pra esse tabuleiro!");
    return Rotas;
  }

  private criarCartasDeVagao() : CartaVagao[] {
    if (this.BaralhoCartasVagao) 
      throw new Error("Já existem Cartas de Vagão pra esse tabuleiro!");

    const cartasQtdes: Record<CoresCartaVagao, number> = {
        "Roxo": 12,
        "Azul": 12,
        "Laranja": 12,
        "Branco": 12,
        "Verde": 12,
        "Amarelo": 12,
        "Preto": 12,
        "Vermelho": 12,
        "Coringa": 14
    };

    const baralho: CartaVagao[] = [];

    for (const cor in cartasQtdes) {
        const qtde : number = cartasQtdes[cor as CoresCartaVagao];
        for (let i = 0; i < qtde; i++) {
            baralho.push(new CartaVagao(cor as CoresCartaVagao));
        }
    }

    const cartasVagaoEmbaralhadas : CartaVagao[] = this.embaralharCartas(baralho);
    return cartasVagaoEmbaralhadas;
  }
  
  private criarCartaMaiorCaminhoContinuo(): CartaMaiorCaminhoContinuo {
    return new CartaMaiorCaminhoContinuo(Seattle, Boston, 25);
  }

  private criarBilhetesDestino(): BilheteDestino[] {
    if (this.BaralhoBilhetesDestino) 
      throw new Error("Já existem Bilhetes de Destino pra esse tabuleiro!");
    return this.embaralharCartas(DestinosCidades);
  }

  private darCartasAosJogadores(jogadores: Jogador[]): void{
    if (!this.BaralhoCartasVagao || !this.BaralhoBilhetesDestino) {
        throw new Error("Baralhos não inicializados.");
    }

    for (const jogador of jogadores) {

      for (let i = 0; i < 4; i++) { // 4 cartas de vagão por jogador
        const cartaVagao = this.BaralhoCartasVagao.pop();
        if (cartaVagao) {
            jogador.addCartaVagao(cartaVagao);
        }
      }

      for (let i = 0; i < 4; i++) { // 4 bilhetes de destino por jogador
        const bilheteDestino = this.BaralhoBilhetesDestino.pop();
        if (bilheteDestino) {
            jogador.addBilheteDestino(bilheteDestino);
        }
      }
    }
  }
  
  public verificarBilheteAtingido(origem: NomesDeCidades, destino: NomesDeCidades, jogador: Jogador): boolean {
    const rotaConectada = this.Rotas.find(rota => 
      (rota.Origem.Nome === origem && rota.Destino.Nome === destino && rota.pegarDono() === jogador) ||
      (rota.Origem.Nome === destino && rota.Destino.Nome === origem && rota.pegarDono() === jogador)
    );
    if (rotaConectada !== undefined){
      console.log("Rota conectada: " + rotaConectada.Destino.Nome + " - " + rotaConectada.Origem.Nome);
    }
    return rotaConectada !== undefined;
  }
}