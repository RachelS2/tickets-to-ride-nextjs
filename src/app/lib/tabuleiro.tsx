import {Jogador} from "./jogador";
import {Rota } from "./rota"
import {CartaVagao, CartaMaiorCaminhoContinuo, BilheteDestino } from "./cartas-jogo";
import { NomesDeCidades, CoresCartaVagao} from "./utils";
import { Rotas, DestinosCidades} from "./cidades";

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
  console.log("DEBUG - estado do jogo antes de repor:");
  console.log("jogo.baralhoBilhetesDestino.length", this.BaralhoBilhetesDestino.length);
    const retiradas: BilheteDestino[] = [];
    for (let i = 0; i < qtde; i++) {
      const card = this.BaralhoBilhetesDestino.pop();
      if (!card) break;
      retiradas.push(card);
    }
    return retiradas;
  }


  public pegarBaralhoCartasVagao(qtde: number): CartaVagao[] {
    console.log("DEBUG - estado do jogo antes de repor:");
    console.log("jogo.baralhoBilhetesDestino.length", this.BaralhoCartasVagao.length);
    const retiradas: CartaVagao[] = [];
    for (let i = 0; i < qtde; i++) {
      const card = this.BaralhoCartasVagao.pop();
      if (!card) break;
      retiradas.push(card);
    }
    return retiradas;
  }

  public exporCartasVagao(cartas: CartaVagao[]): void {
    this.BaralhoCartasVagao = this.BaralhoCartasVagao.filter(
      (carta) => !cartas.includes(carta)
    );

    this.CartasVagaoExpostas = cartas;
  }


  public pegarCartaMaiorCaminhoContinuo(): CartaMaiorCaminhoContinuo {
    return this.CartaMaiorCaminhoContinuo;
  }


  private reporBaralhoCartasVagao() : void {
    
    this.BaralhoCartasVagao = this.CartasVagaoDescartadas
    this.CartasVagaoDescartadas = []
  }


  public pegarCartasVagaoExpostas(qtde: number) :  CartaVagao[]{
    return this.CartasVagaoExpostas.splice(-qtde)
  }

  // private controlarCartasVagaoDoBaralho(qtdeDesejada: number) : CartaVagao[] {
  //   const cartasPegas: CartaVagao[] = []
  //   let qtdeCartasVagaoBaralho: number = this.BaralhoCartasVagao.length
  //   if (qtdeCartasVagaoBaralho - qtdeDesejada < 0) {
  //       const ultimasCartasBaralho : CartaVagao[] = this.pegarBaralhoCartasVagao(qtdeCartasVagaoBaralho)
  //       cartasPegas.push(...ultimasCartasBaralho)
  //       qtdeCartasVagaoBaralho = 0 
  //   }

  //   if (qtdeCartasVagaoBaralho == 0)
  //     this.reporBaralhoCartasVagao();

  //   const numCartasFaltantes: number = qtdeDesejada - cartasPegas.length
  //   if (numCartasFaltantes >= 0)
  //     cartasPegas.push(...this.pegarBaralhoCartasVagao(numCartasFaltantes));
    
  //   return cartasPegas;
  // }

  // public comprarCartasVagao(numCartasExpostasAPegar: number, numCartasDoBaralhoAPegar: number) : CartaVagao[] {
  //   const totalAPegar: number = numCartasExpostasAPegar + numCartasDoBaralhoAPegar
  //   if (totalAPegar > 2)
  //     throw new Error("Você pode comprar no máximo 2 cartas de vagão por rodada!")
  //   if (totalAPegar < 0) 
  //     throw new Error("Você deve comprar um número positivo de cartas de vagão.")
  //   const cartasPegas: CartaVagao[] = []
  //   cartasPegas.push(...this.controlarCartasVagaoDoBaralho(numCartasDoBaralhoAPegar))
  //   cartasPegas.push(...this.pegarCartasVagaoExpostas(numCartasExpostasAPegar))
  //   return cartasPegas;
  // }

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

    //console.log("Número de cartas de vagão antes de embaralhar" + baralho.length)
    const cartasVagaoEmbaralhadas : CartaVagao[] = this.embaralharCartas(baralho);
    // console.log("Número de cartas de vagão após embaralhar:", cartasVagaoEmbaralhadas.length);
    // console.log("Cartas de vagão embaralhadas:", cartasVagaoEmbaralhadas);
    return cartasVagaoEmbaralhadas;
  }
  
  private criarCartaMaiorCaminhoContinuo(): CartaMaiorCaminhoContinuo {

    return new CartaMaiorCaminhoContinuo("Seatle" as NomesDeCidades, "Boston" as NomesDeCidades, 25);

  }

  private criarBilhetesDestino(): BilheteDestino[] {
    if (this.BaralhoBilhetesDestino) 
      throw new Error("Já existem Bilhetes de Destino pra esse tabuleiro!");
    
    const bilhetesDestino: BilheteDestino[] = [];

    // cria 29 tickets de destino a partir de DestinosCidades
    for (const [espacosStr, rotas] of Object.entries(DestinosCidades)) {
      const pontos = Number(espacosStr);
      
      for (const [origem, destino] of Object.entries(rotas!)) {
        bilhetesDestino.push(new BilheteDestino(origem as NomesDeCidades, destino as NomesDeCidades, pontos));
      }
    }

    const bilhetesDestino2 = this.embaralharCartas(bilhetesDestino);
    // console.log("qtde bilhetes de destino criadas:", bilhetesDestino2.length);
    // console.log("bilhetes de destino criadas:", bilhetesDestino2);
    return bilhetesDestino2;
  }

  private darCartasAosJogadores(jogadores: Jogador[]): void{
    //console.log("Qtde cartas baralho antes da distribuição: " + this.BaralhoCartasVagao.length)
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

      for (let i = 0; i < 4; i++) { // 34 bilhetes de destino por jogador
        const bilheteDestino = this.BaralhoBilhetesDestino.pop();
        if (bilheteDestino) {
            jogador.addBilheteDestino(bilheteDestino);
        }
      }
    }
    //console.log("Qtde cartas baralho depois da distribuição aos jogadores: " + this.BaralhoCartasVagao.length)
  }
  
}