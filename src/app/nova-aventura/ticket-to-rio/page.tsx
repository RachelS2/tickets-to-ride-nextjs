'use client';
import { useEffect, useState } from "react";
import { Button } from "@/app/components/ui/button";
import { ArrowLeft} from "lucide-react";
import {BaralhoCartasVagaoView} from "@/app/components/carta-de-vagao/baralho-cartas-vagao-view"
import { useRouter, notFound } from 'next/navigation';
import Tabuleiro from "@/app/components/tabuleiro-view";
import { BilheteDestinoView } from "@/app/components/bilhete-de-destino/bilhete-de-destino-view";
import BaralhoView from "@/app/components/baralho-view";
import SumarioJogadorView from "@/app/nova-aventura/ticket-to-rio/sumario-jogador-view";
import { usarJogo } from "@/app/lib/contexto-jogo";
import { Jogo } from "@/app/lib/jogo";
import { BilheteDestino, CartaMaiorCaminhoContinuo, CartaVagao } from "@/app/lib/cartas-jogo";
import {OpcoesDeJogada, JogadaEfetiva} from "@/app/lib/utils"
import { Jogador } from "@/app/lib/jogador";
import { BaralhoBilhetesDestinoView } from "../../components/bilhete-de-destino/baralho-bilhetes-destino-view";

const GamePage: React.FC = () => {
  const jogo: Jogo = usarJogo();
  if (!jogo.foiIniciado()) {
    notFound();
  }
  const router = useRouter();
  const cartaMaiorCaminhoContinuo : CartaMaiorCaminhoContinuo = jogo.pegaCartaMaiorCaminhoContinuo();

  // ESTADOS DO BARALHO DE CARTAS VAGÃO (CARTAS OCULTAS)
  const [cartasVagaoBaralhoAtual, setCartasVagaoBaralhoAtual] = useState<CartaVagao[]>(jogo.pegarCartasVagao(15));
  const [cartasVagaoBaralhoClicaveis, setCartasVagaoBaralhoClicaveis] = useState<boolean>(false); // controla se o baralho de cartas pode ser clicado (após executar a jogada comprar-bilhetes)
  const [idsCartasVagaoBaralhoExpostas, setIdsCartasVagaoBaralhoExpostas] = useState<string[]>([]); // id da carta de vagão exposta
  const [idsCartasVagaoBaralhoDestacadas, setIdsCartasVagaoBaralhoDestacadas] = useState<string[]>([]);

  // ESTADOS DO BARALHO DE CARTAS VAGÃO (CARTAS EXPOSTAS)
  const [cartasVagaoExpostasAtual, setCartasVagaoExpostasAtual] = useState<CartaVagao[]>(jogo.pegarCartasVagaoExpostas(5));
  const [cartasVagaoExpostasClicavel, setCartasVagaoExpostasClicavel] = useState<boolean>(false);
  const [idsCartaVagaoExpostasDestacadas, setIdsCartaVagaoExpostasDestacadas] = useState<string[]>([]);

  // ESTADOS DO BARALHO DE BILHETES DE DESTINO
  const [baralhoBilhetesAtual, setBaralhoBilhetesAtual] = useState<BilheteDestino[]>(jogo.pegarBilhetesDeDestino(15));
  const [baralhoBilhetesClicavel, setBaralhoBilhetesClicavel] = useState<boolean>(false); // controla se o baralho de bilhetes pode ser clicado (após executar a jogada comprar-bilhetes)
  const [idBilheteExposto, setIdBilheteExposto] = useState<string | null>(null); // id do bilhete do baralho q esta exposto 
  const [idsBilhetesBaralhoDestacados, setIdsBilhetesBaralhoDestacados] = useState<string[]>([]);
  
  // ESTADOS DA RODADA
  const [rodada, setRodada] = useState<number>(jogo.pegarRodada());
  
  // ESTADOS DA JOGADA
  const [jogadaEfetiva, setJogadaEfetiva] = useState<JogadaEfetiva>("");
  const [jogadaSelecionada, setJogadaSelecionada] = useState<OpcoesDeJogada>("ocupar-rota"); // pega a jogada escolhida pelo jogador
  const [finalizouJogadaPrincipal, setExecutouJogadaPrincipal] = useState<boolean>(false);

  // ESTADOS DO JOGADOR
  const [jogadoresRestantes, setJogadoresRestantes] = useState<Jogador[]>(jogo.pegaJogadores());
  const [proximoJogador, setProximoJogador] = useState<Jogador>(jogadoresRestantes[1]);
  const [jogador, setJogador] = useState<Jogador>(jogadoresRestantes[0]);
  const [bilhetesComprados, setbilhetesComprados] = useState<BilheteDestino[]>([]); 
  const [jogadorIdsBilhetesClicaveis, setJogadorIdsBilhetesClicaveis] = useState<string[]>([]);
  const [jogadorIdsBilhetesDestacados, setJogadorIdsBilhetesDestacados] = useState<string[]>([]);
  const [cartasVagaoCompradas, setCartasCompradas] = useState<CartaVagao[]>([])
  
  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  useEffect(() => {
  if (jogadaSelecionada === "comprar-bilhete" && bilhetesComprados.length >= 3 ||( baralhoBilhetesAtual.length == 0)) {
    setIdsBilhetesBaralhoDestacados([]);
    setIdBilheteExposto(null);
    setBaralhoBilhetesClicavel(false);
    setExecutouJogadaPrincipal(true);
    console.log("Jogada finalizada automaticamente: o jogador deve comprar até 3 bilhetes de destino por rodada!");
  }
}, [bilhetesComprados, jogadaSelecionada]);

  useEffect(() => {
    if (jogadaSelecionada === "descartar-bilhete" && bilhetesComprados.length <= 1) {
      // só resta 1 bilhete: finaliza a jogada automaticamente
      setExecutouJogadaPrincipal(false);
      setJogadorIdsBilhetesClicaveis([]);
      setJogadorIdsBilhetesDestacados([]);
      console.log("Jogada finalizada automaticamente: o jogador deve ficar com pelo menos 1 dos 3 bilhetes de destino comprados!");
    }
  }, [bilhetesComprados, jogadaSelecionada]);

  useEffect(() => {
    if (jogadaSelecionada === "comprar-carta" && ((cartasVagaoCompradas.length >= 2) || (cartasVagaoBaralhoAtual.length == 0 && cartasVagaoExpostasAtual.length == 0)) ) {
      setExecutouJogadaPrincipal(true);
      setIdsCartasVagaoBaralhoDestacadas([]);
      setIdsCartasVagaoBaralhoExpostas([]);
      setCartasVagaoBaralhoClicaveis(false);

      setCartasVagaoExpostasClicavel(false);
      setIdsCartaVagaoExpostasDestacadas([]);
      setCartasCompradas([]);
      console.log("Cartas de vagão compradas" + cartasVagaoCompradas )

      console.log("Jogada finalizada automaticamente: o jogador pode comprar no máximo 2 cartas de vagão por rodada!");
    }
  }, [cartasVagaoCompradas, jogadaSelecionada]);


  const handleDescartarBilheteDestino = async (bilhete: BilheteDestino) => {

    if (bilhetesComprados.length > 1) {
      const novaLista = bilhetesComprados.filter(b => b.Id !== bilhete.Id);

      setJogadorIdsBilhetesDestacados([bilhete.Id]);
      await sleep(600);

      jogador.removerBilheteDestino(bilhete);

      setbilhetesComprados(novaLista);

      setJogadorIdsBilhetesDestacados([]);
      setJogadorIdsBilhetesClicaveis([]);
    } 
  };

  const handleComprarCartaVagaoExposta = async (carta: CartaVagao) => {    
    setIdsCartasVagaoBaralhoDestacadas([carta.Id]);
    await sleep(600);
    
    const index : number = cartasVagaoExpostasAtual.indexOf(carta);
    if (index < 0) throw new Error("Essa carta de vagão não estava exposta!");
    const novoBaralho = [...cartasVagaoExpostasAtual];
    novoBaralho.splice(index, 1);
    setCartasVagaoExpostasAtual(novoBaralho);
    
    await sleep(300);
    jogador.addCartaVagao(carta);
    
    const cartasVagaoCompradasCopy = [...cartasVagaoCompradas, carta];
    setCartasCompradas(cartasVagaoCompradasCopy);

    setIdsCartasVagaoBaralhoDestacadas(cartasVagaoBaralhoAtual.map(b => b.Id));
  }

  const handleComprarCartaVagaoBaralho = async (carta: CartaVagao) => {
    const cartasVagaoCompradasCopy = [...cartasVagaoCompradas, carta];
    console.log(cartasVagaoCompradasCopy)

    setIdsCartasVagaoBaralhoExpostas([carta.Id]);
    setIdsCartasVagaoBaralhoDestacadas([carta.Id]);
    await sleep(600);

    const index : number = cartasVagaoBaralhoAtual.indexOf(carta);
    if (index < 0) throw new Error("Essa carta de vagão não estava no baralho!");
    const novoBaralho = [...cartasVagaoBaralhoAtual];
    novoBaralho.splice(index, 1);
    setCartasVagaoBaralhoAtual(novoBaralho);

    await sleep(300);
    jogador.addCartaVagao(carta);
    setCartasCompradas(cartasVagaoCompradasCopy);

    setIdsCartasVagaoBaralhoDestacadas(cartasVagaoBaralhoAtual.map(b => b.Id));
  }
  
  const handleComprarBilheteDestinoBaralho = async (bilhete: BilheteDestino) => {
    if (!baralhoBilhetesClicavel) return;
    const id = bilhete.Id;
    setIdBilheteExposto(id); 
    setIdsBilhetesBaralhoDestacados([id]); 

    await sleep(600);

    const index : number = baralhoBilhetesAtual.indexOf(bilhete);
    if (index < 0) throw new Error("Esse bilhete de destino não estava no baralho!");
    
    const novoBaralho = [...baralhoBilhetesAtual];
    novoBaralho.splice(index, 1); // remove 1 elemento do baralho a partir do índice encontrado

    setBaralhoBilhetesAtual(novoBaralho);

    await sleep(300);

    jogador.addBilheteDestino(bilhete);

    const bilhetesCompradosCopy : BilheteDestino[] = [...bilhetesComprados, bilhete]
    setbilhetesComprados(bilhetesCompradosCopy);

    setJogadaSelecionada("comprar-bilhete");
    setIdsBilhetesBaralhoDestacados(baralhoBilhetesAtual.map(b => b.Id));
  };

  // Função usada pelo SumarioJogadorView quando o botão "EXECUTAR JOGADA" é clicado
  const handleExecutarJogadaFromChild = () => {
    setJogadaEfetiva(jogadaSelecionada)
    console.log(jogadaSelecionada)
    if (jogadaSelecionada === "comprar-bilhete") {
      setBaralhoBilhetesClicavel(true);
      setIdsBilhetesBaralhoDestacados(baralhoBilhetesAtual.map(b => b.Id));
    }

    else if (jogadaSelecionada=="passar-a-vez") {
      handleProximoJogador();
    }

    else if (jogadaSelecionada == "comprar-carta") {
      setCartasVagaoBaralhoClicaveis(true);
      setCartasVagaoExpostasClicavel(true);
      // destaca todas as cartas do baralho
      const idsBaralho : string[] = cartasVagaoBaralhoAtual.map(c => c.Id);
      setIdsCartasVagaoBaralhoDestacadas(idsBaralho);

      // destaca todas as cartas expostas visíveis
      const idsExpostas : string[] = cartasVagaoExpostasAtual.map(c => c.Id);
      setIdsCartaVagaoExpostasDestacadas(idsExpostas);

    }

    else if (jogadaSelecionada == "descartar-bilhete") {
      const ids = bilhetesComprados.map(b => b.Id);
      setJogadorIdsBilhetesDestacados(ids);
      setJogadorIdsBilhetesClicaveis(ids);
    }
  };

  const handleProximoJogador = () => {
    // remove o jogador atual da lista de jogadores a jogar na rodada
    const novosJogadoresRestantes = jogadoresRestantes.filter(j => j.Id !== jogador.Id);
    // reinicia variaveis pro prox jogador
    setExecutouJogadaPrincipal(false);
    setbilhetesComprados([]);
    setBaralhoBilhetesClicavel(false);
    setIdsBilhetesBaralhoDestacados([]);
    setJogadaEfetiva("");
    setJogadaSelecionada("ocupar-rota");
    const todos = jogo.pegaJogadores();
    if (novosJogadoresRestantes.length === 0) {
      setJogadoresRestantes(todos);
      jogo.subirRodada();
      setRodada(jogo.pegarRodada());
      setJogador(todos[0]);
      setProximoJogador(todos[1] ?? todos[0]);
    } else {
      setJogadoresRestantes(novosJogadoresRestantes);
      setJogador(novosJogadoresRestantes[0]);
      setProximoJogador(novosJogadoresRestantes[1] ?? todos[0]); //pega lista original
    }
  };
  
  return (
    <div className="min-h-screen font-serif p-1">
      <div className="container mx-auto pt-4 px-4 flex text-center justify-center">
        {/* <Button className="hover:bg-vermelho-custom" variant="ghost" onClick={() => router.push("/nova-aventura")}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Sair do Jogo
        </Button> */}
        <h1 className="text-2xl font-bold text-primary">Rodada {rodada}</h1>
        <div></div>
        <div className="w-32" />
      </div>

      <div className="px-3 py-6">
        <div className="grid grid-cols-12 gap-3">
          {/* Left Sidebar */}
          <div className="col-span-2 bg-background space-y-4 overflow-hidden">

            <BilheteDestinoView bilheteDestino={cartaMaiorCaminhoContinuo} size="md" orientacao="horizontal" />

            <BaralhoBilhetesDestinoView bilhetes={baralhoBilhetesAtual} idBilheteExposto={idBilheteExposto} idsBilhetesDestacados={idsBilhetesBaralhoDestacados}
                                        baralhoClicavel={baralhoBilhetesClicavel} handleComprarBilheteDestino={handleComprarBilheteDestinoBaralho}/>

            <BaralhoCartasVagaoView cartas={cartasVagaoBaralhoAtual} cartasClicaveis={cartasVagaoBaralhoClicaveis} idsCartasDestacadas={idsCartasVagaoBaralhoDestacadas} 
                                    idCartaExposta={idsCartasVagaoBaralhoExpostas} handleComprarCartaVagaoBaralho={handleComprarCartaVagaoBaralho}/>
          
            <BaralhoCartasVagaoView cartas={cartasVagaoExpostasAtual} cartasClicaveis={cartasVagaoExpostasClicavel} idsCartasDestacadas={idsCartaVagaoExpostasDestacadas} 
                                    angleStep={25} offsetXStep={18} idCartaExposta={cartasVagaoExpostasAtual.map(c => c.Id)} handleComprarCartaVagaoBaralho={handleComprarCartaVagaoExposta}/>
          </div>

          <div className="flex flex-row items-center justify-center bg-blue-300 col-span-7">
                <Tabuleiro />  
          </div>

          <div className="col-span-3">
            <SumarioJogadorView
              rodada={rodada}
              jogadorAtual={jogador}
              jogadaSelecionada={jogadaSelecionada}
              setJogada={setJogadaSelecionada}
              onExecutarJogada={handleExecutarJogadaFromChild}
              jogadaEfetiva={jogadaEfetiva}
              proximoJogador={proximoJogador}
              finalizouJogadaPrincipal = {finalizouJogadaPrincipal}
              configuracaoBilhetesJogador = {{onClick: handleDescartarBilheteDestino, clicavel:jogadorIdsBilhetesClicaveis, destacar: jogadorIdsBilhetesDestacados}}
            />
          </div>

      </div>
    </div>
    </div>
  );
};

export default GamePage;