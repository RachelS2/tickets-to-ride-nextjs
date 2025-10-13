import {Jogador} from "./jogador";
import {Rota, corDeRotaAleatoria} from "./rota"
import {CoresCartaVagao, CartaVagao, BilheteDestino } from "./cartas-jogo";
import {NomesDeCidades, RotaCidades, DestinosCidades} from './cidades';

export class Tabuleiro {
  private Rodada: number = 1
  private Jogadores: Jogador[]
  private Rotas: Rota[] = []
  
  private BaralhoCartasVagao: CartaVagao[] 
  private BaralhoBilhetesDestino: BilheteDestino[]

  constructor(jogador: Jogador[]) {
    this.Jogadores = jogador;
  }

  public adicionaJogador(jogador: Jogador): void {
    this.Jogadores.push(jogador);
  }

  public removeJogador(playerId: string): void {
    this.Jogadores = this.Jogadores.filter(jogador => jogador.pegarId() !== playerId);
  }

  public proximoJogador(): Jogador {
    const indiceProxJogador : number = this.Rodada % this.Jogadores.length;
    return this.Jogadores.filter(jogador => jogador.pegarRodadaAJogar() == indiceProxJogador)[0];
  }

  public pegarJogadores(): Jogador[] {
    return this.Jogadores;
  }

  public async iniciarJogo(): Promise<void> {
    this.BaralhoCartasVagao = this.criarCartasDeVagao();
    console.log("cartas de trem:", this.BaralhoCartasVagao); 
    this.Rotas = this.criarRotas();     
    console.log("rotas:", this.Rotas); 
    this.BaralhoBilhetesDestino = this.criarBilhetesDestino();
    console.log("cartas de destino:", this.BaralhoBilhetesDestino); // 110

    this.darCartasAosJogadores();
  }

  private embaralharCartas<T>(deck: T[]): T[] { // embaralha qq baralho (destinytickets ou traincards)
    const shuffled = [...deck]; // copia o array
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // índice aleatório entre 0 e i
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // troca
    }
    return shuffled;
  }

  private darCartasAosJogadores(): void{
    for (const jogador of this.Jogadores) {
        for (let i = 0; i < 4; i++) {
            const cartaVagao = this.BaralhoCartasVagao.pop();
            if (cartaVagao) {
              jogador.addCartaVagao(cartaVagao);
            }
            const bilheteDestino = this.BaralhoBilhetesDestino.pop();
            if (bilheteDestino) {
              jogador.addBilheteDestino(bilheteDestino);
            }
        }
    } 
  }

  private criarRotas(): Rota[] {
    const rotas: Rota[] = [];
    const rotasAdicionadas = new Set<string>(); // evita duplicações (ex: Rio–Niteroi e Niteroi–Rio)

    for (const [espacosStr, cidades] of Object.entries(RotaCidades)) {
      const qtdeEspacos = parseInt(espacosStr);

      for (const [origem, destinos] of Object.entries(cidades)) {

        for (const destino of destinos) {
          const chave = [origem, destino].sort().join("-"); // ordena para evitar duplicação

          if (!rotasAdicionadas.has(chave)) {
            rotasAdicionadas.add(chave);

            const rota = new Rota(origem as NomesDeCidades, destino as NomesDeCidades, qtdeEspacos, corDeRotaAleatoria());
            rotas.push(rota);
          }
        }
      }
    }

    return this.embaralharCartas(rotas);
  }

  private criarCartasDeVagao() : CartaVagao[] {
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

    return this.embaralharCartas(baralho);
  }

  private criarBilhetesDestino(): BilheteDestino[] {
    const bilhetesDestino: BilheteDestino[] = [];

    // cria 29 tickets de destino a partir de DestinosCidades
    for (const [espacosStr, rotas] of Object.entries(DestinosCidades)) {
      const pontos = Number(espacosStr);

      for (const [origem, destino] of Object.entries(rotas!)) {
        bilhetesDestino.push(new BilheteDestino(origem as NomesDeCidades, destino as NomesDeCidades, pontos));
      }
    }

    // chave 8 (miracema a quissama) é repetida 2x, totalizando 3 cartas no baralho
    for (let i = 0; i < 2; i++) {
      bilhetesDestino.push(new BilheteDestino("Miracema" as NomesDeCidades, "Quissama" as NomesDeCidades, 8));
    }

    // chave 9 e 10 (itatiaia a volta redonda) são repetidas 2x, totalizando 2 cartas de cada uma dessas no baralho
    for (let i = 0; i < 1; i++) {
      bilhetesDestino.push(new BilheteDestino("Itatiaia" as NomesDeCidades, "Volta Redonda" as NomesDeCidades, 9));
      bilhetesDestino.push(new BilheteDestino("Sumidouro" as NomesDeCidades, "Petropolis" as NomesDeCidades, 10));
    }

    return this.embaralharCartas(bilhetesDestino);
  }

}