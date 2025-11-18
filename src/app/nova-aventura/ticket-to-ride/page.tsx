'use client';
import { useEffect, useRef, useState } from "react";
import { Button } from "@/app/components/ui/button";
import { ArrowLeft} from "lucide-react";
import {BaralhoCartasVagaoView} from "@/app/components/carta-de-vagao/baralho-cartas-vagao-view"
import { useRouter, notFound } from 'next/navigation';
import TabuleiroView from "@/app/components/tabuleiro-view";
import { BilheteDestinoView } from "@/app/components/bilhete-de-destino/bilhete-de-destino-view";
import BaralhoView from "@/app/components/baralho-view";
import SumarioJogadorView from "@/app/nova-aventura/ticket-to-ride/sumario-jogador-view";
import { usarJogo } from "@/app/lib/contexto-jogo";
import { Jogo } from "@/app/lib/jogo";
import { BilheteDestino, CartaMaiorCaminhoContinuo, CartaVagao } from "@/app/lib/cartas-jogo";
import {OpcoesDeJogada, JogadaEfetiva, CoresDeRota, NomesDeCidades, } from "@/app/lib/utils"
import { Jogador } from "@/app/lib/jogador";
import { BaralhoBilhetesDestinoView } from "../../components/bilhete-de-destino/baralho-bilhetes-destino-view";
import { Rota } from "@/app/lib/rota";

const GamePage: React.FC = () => {
  const jogo: Jogo = usarJogo();
  if (!jogo.foiIniciado()) {
    notFound();
  }

  // ESTADOS DO BARALHO DE CARTAS VAGÃO (CARTAS OCULTAS)
  const [cartasVagaoBaralhoAtual, setCartasVagaoBaralhoAtual] = useState<CartaVagao[]>([]);
  const [cartasVagaoBaralhoClicaveis, setCartasVagaoBaralhoClicaveis] = useState<boolean>(false); // controla se o baralho de cartas pode ser clicado (após executar a jogada comprar-bilhetes)
  const [idsCartasVagaoBaralhoExpostas, setIdsCartasVagaoBaralhoExpostas] = useState<string[]>([]); // id da carta de vagão exposta
  const [idsCartasVagaoBaralhoDestacadas, setIdsCartasVagaoBaralhoDestacadas] = useState<string[]>([]);
  const [cartasVagaoCompradas, setCartasCompradas] = useState<CartaVagao[]>([])
  const [cartasVagaoDescartadas, setCartasVagaoDescartadas] =  useState<CartaVagao[]>([])

  // ESTADOS DO BARALHO DE CARTAS VAGÃO (CARTAS EXPOSTAS)
  const [cartasVagaoExpostasAtual, setCartasVagaoExpostasAtual] = useState<CartaVagao[]>([]);
  const [cartasVagaoExpostasClicavel, setCartasVagaoExpostasClicavel] = useState<boolean>(false);
  const [idsCartaVagaoExpostasDestacadas, setIdsCartaVagaoExpostasDestacadas] = useState<string[]>([]);

  // ESTADOS DO BARALHO DE BILHETES DE DESTINO
  const [baralhoBilhetesAtual, setBaralhoBilhetesAtual] = useState<BilheteDestino[]>([]);
  const [baralhoBilhetesClicavel, setBaralhoBilhetesClicavel] = useState<boolean>(false); // controla se o baralho de bilhetes pode ser clicado (após executar a jogada comprar-bilhetes)
  const [idBilheteExposto, setIdBilheteExposto] = useState<string | null>(null); // id do bilhete do baralho q esta exposto 
  const [idsBilhetesBaralhoDestacados, setIdsBilhetesBaralhoDestacados] = useState<string[]>([]);
  
  // ESTADOS DA RODADA
  const [rodada, setRodada] = useState<number>(jogo.pegarRodada());
  
  // ESTADOS DA JOGADA
  const [jogadaEfetiva, setJogadaEfetiva] = useState<JogadaEfetiva>("");
  const [jogadaSelecionada, setJogadaSelecionada] = useState<OpcoesDeJogada>("ocupar-rota"); // pega a jogada escolhida pelo jogador
  const [finalizouJogadaPrincipal, setExecutouJogadaPrincipal] = useState<boolean>(false);
  const [resultadosFinais, setResultadosFinais] = useState<React.ReactNode>(null);

  // ESTADOS DO JOGADOR
  const [jogadoresRestantes, setJogadoresRestantes] = useState<Jogador[]>(jogo.pegaJogadores());
  const [proximoJogador, setProximoJogador] = useState<Jogador>(jogadoresRestantes[1]);
  const [jogador, setJogador] = useState<Jogador>(jogadoresRestantes[0]);
  const [bilhetesComprados, setBilhetesComprados] = useState<BilheteDestino[]>([]); 
  const [jogadorBilhetesDescartados, setJogadorBilhetesDescartados] = useState<number>(0); 
  const [jogadorIdsBilhetesClicaveis, setJogadorIdsBilhetesClicaveis] = useState<string[]>([]);
  const [jogadorIdsBilhetesDestacados, setJogadorIdsBilhetesDestacados] = useState<string[]>([]);
  const [jogadorCartasVagaoDestacadas, setJogadorCartasVagaoDestacadas] = useState<string[]>([]);
  const [jogadorCartasVagaoClicaveis, setJogadorCartasVagaoClicaveis] = useState<string[]>([]);
  const [jogadorCartasVagaoDescartadas, setJogadorCartasVagaoDescartadas] = useState<string[]>([]);
  const [jogadorCartasClicadas, setJogadorCartasClicadas] = useState<string[]>([]);
  
  // ESTADOS DO TABULEIRO
  const [rotaSelecionada, setRotaSelecionada] = useState<Rota | null>(null)
  const [rotasClicaveis, setRotasClicaveis] = useState<boolean>(false);
  const [rotasPiscando, setRotasPiscando] = useState<boolean>(false);

  const initializedRef = useRef(false);
  const qtdeInicialCartasVagaoBaralho : number = 15
  const qtdeInicialCartasVagaoExpostas: number = 5
  const qtdeInicialBilhetesDestinoBaralho : number = 15

  useEffect(() => {

    if (initializedRef.current) return;
    initializedRef.current = true;

    if (typeof window === "undefined") return;

    if (baralhoBilhetesAtual.length == 0) {
      const iniciais = jogo.pegarBilhetesDeDestino(qtdeInicialBilhetesDestinoBaralho);
      console.log("Baralho inicializado:", iniciais.map(b=>"Destino: " + b.Destino + " Origem: " + b.Origem));
      setBaralhoBilhetesAtual(iniciais);
    }

    if (cartasVagaoBaralhoAtual.length == 0) {
      const iniciais = jogo.pegarBaralhoCartasVagao(qtdeInicialCartasVagaoBaralho);
      console.log("Cartas vagão baralho inicial:", iniciais.map(b=>"Cor: " + b.Cor + " Coringa: " + b.ehLocomotiva));
      setCartasVagaoBaralhoAtual(iniciais);
    }
    if (cartasVagaoExpostasAtual.length == 0) {
      const iniciais = jogo.pegarCartasVagaoExpostas(qtdeInicialCartasVagaoExpostas);
      console.log("Cartas vagão expostas iniciais:", iniciais.map(b=>"Cor: " + b.Cor + " Coringa: " + b.ehLocomotiva));
      setCartasVagaoExpostasAtual(iniciais);
    }
  }, [baralhoBilhetesAtual, cartasVagaoBaralhoAtual, cartasVagaoExpostasAtual]); // jogo provavelmente do contexto; ajuste se necessário

  useEffect(() => {
  if (jogadaSelecionada === "comprar-bilhete" && bilhetesComprados.length >= 3 || baralhoBilhetesAtual.length == 0) {
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
    if (jogadaSelecionada == "ocupar-rota" && jogadorCartasVagaoDescartadas.length == rotaSelecionada?.QtdeEspacos) {
      
      for (const id of jogadorCartasVagaoDescartadas) {
        const carta = jogador.verCartasVagao().find(c => c.Id === id);
        console.log("Cor carta descartada: " + carta?.Cor)
        if (carta) {
          jogador.removerCartaVagao(carta);
        }
      }
      let qtdTrens = rotaSelecionada.ocupar(jogador);
      jogador.diminuirQtdeTrens(qtdTrens)
      jogador.somarPontos(qtdTrens);
      setJogadorCartasVagaoDescartadas([]);
      setJogadorCartasVagaoClicaveis([]);
      setJogadorCartasVagaoDestacadas([]);
      setExecutouJogadaPrincipal(true);
      }
    }
  )

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

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const handleDescartarBilheteDestino = async (bilhete: BilheteDestino) => {
    if (bilhetesComprados.length < 1 && rodada > 0 || (jogadorBilhetesDescartados >= 2 && rodada ==0)) return;

    setJogadorIdsBilhetesDestacados([bilhete.Id]);
    await sleep(600);
    jogador.removerBilheteDestino(bilhete);

    let novaLista : BilheteDestino[] = []
    if (rodada == 0) {
      novaLista = jogador.verBilhetesDestino().filter(b => b.Id !== bilhete.Id);
      setJogadorBilhetesDescartados(prev=> prev+1);
    } 
    else {
      novaLista = bilhetesComprados.filter(b => b.Id !== bilhete.Id);
    }
    setBilhetesComprados(novaLista);
    setJogadorIdsBilhetesDestacados([]);
    setJogadorIdsBilhetesClicaveis([]);
  };

  const handleDescartarCartaVagao = async (carta: CartaVagao) => {
    if (jogadaSelecionada !== "ocupar-rota" || !rotaSelecionada || typeof(carta) == undefined ) return;
    const corRota : CoresDeRota = rotaSelecionada.Cor;
    if (carta.Cor != "Coringa" && carta.Cor != corRota && corRota != "Cinza") {
      console.log("Selecione uma carta da cor da rota desejada!")
      return
    }
    const jogadorCartasDescartadasCopy = [...jogadorCartasVagaoDescartadas, carta.Id];
    setJogadorCartasVagaoDescartadas(jogadorCartasDescartadasCopy);
    
    const condOcupar = jogadorCartasDescartadasCopy.length >= (rotaSelecionada?.QtdeEspacos);
    console.log("Qtde cartas descartadas = " + jogadorCartasDescartadasCopy.length);
    console.log("Qtde espaços rota = " + rotaSelecionada.QtdeEspacos);
    const condJaOcupada = rotaSelecionada?.estaOcupada();
    setJogadorCartasClicadas([...jogadorCartasClicadas, carta.Id])

    if (!(condOcupar || condJaOcupada)) return;

    await sleep(600);

    for (const id of jogadorCartasDescartadasCopy) {
      const carta = jogador.verCartasVagao().find(c => c.Id === id);
      if (carta) {
        jogador.removerCartaVagao(carta);
        console.log("Carta de vagão removida: " + carta.Cor)
      } else {
        return; 
      }
    }

    rotaSelecionada?.ocupar(jogador);

    for (const bilhete of jogador.verBilhetesDestino()) {
      const rota = [rotaSelecionada!.Origem.Nome, rotaSelecionada!.Destino.Nome];
      const conecta = rota.includes(bilhete.Origem.Nome) && rota.includes(bilhete.Destino.Nome);
      if (conecta) {
        bilhete.marcarObjetivoAtingido();
        break;
      }
    }

    jogador.pegarTrem(rotaSelecionada!.QtdeEspacos);

    const qtdePontos = jogo.calculaQtdePontosRota(rotaSelecionada!);
    console.log("Qtde pontos feitos: " + qtdePontos);
    jogador.marcarPontos(qtdePontos);

    setJogadorCartasVagaoDescartadas([]);
    setJogadorCartasVagaoClicaveis([]);
    setJogadorCartasVagaoDestacadas([]);
    setExecutouJogadaPrincipal(true);

  }

  const handleComprarCartaVagaoExposta = async (carta: CartaVagao) => {    
    setIdsCartasVagaoBaralhoDestacadas([carta.Id]);
    await sleep(600);
    
    const index : number = cartasVagaoExpostasAtual.indexOf(carta);
    if (index < 0) throw new Error("Essa carta de vagão não estava exposta!");
    // const novoBaralho = [...cartasVagaoExpostasAtual];
    cartasVagaoExpostasAtual.splice(index, 1);
    //setCartasVagaoExpostasAtual(novoBaralho);
    await sleep(300);
    jogador.addCartaVagao(carta);
    
    const cartasVagaoCompradasCopy = [...cartasVagaoCompradas, carta];
    setCartasCompradas(cartasVagaoCompradasCopy);

    if (carta.ehLocomotiva() || cartasVagaoCompradasCopy.length >= 2) {
      console.log("Cartas vagão compradas: " + cartasVagaoCompradasCopy.map(c=> c.Cor));
      setExecutouJogadaPrincipal(true);
      setIdsCartaVagaoExpostasDestacadas([]);
      return;
    }

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
    // const novoBaralho = [...cartasVagaoBaralhoAtual];
    // novoBaralho.splice(index, 1);
    cartasVagaoBaralhoAtual.splice(index, 1);
    //setCartasVagaoBaralhoAtual( 1));

    await sleep(300);
    jogador.addCartaVagao(carta);
    setCartasCompradas(cartasVagaoCompradasCopy);
    console.log("Cartas vagão compradas: " + cartasVagaoCompradasCopy.map(c=> c.Cor));
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
    
    baralhoBilhetesAtual.splice(index, 1); // remove 1 elemento do baralho a partir do índice encontrado

    await sleep(300);

    jogador.addBilheteDestino(bilhete);

    const bilhetesCompradosCopy : BilheteDestino[] = [...bilhetesComprados, bilhete]
    setBilhetesComprados(bilhetesCompradosCopy);
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
      let ids : string[] = []
      if (rodada == 0) {
        if (jogadorBilhetesDescartados >= 3) {
          return;
        }
        ids = jogador.verBilhetesDestino().map(b=> b.Id);
      }
      else {
        ids = bilhetesComprados.map(b => b.Id);
      }
      setJogadorIdsBilhetesDestacados(ids);
      setJogadorIdsBilhetesClicaveis(ids);
      return;
    }

    else if (jogadaSelecionada == "ocupar-rota") {
      setRotasClicaveis(true);
      setRotasPiscando(true);      
    }
    
  };

  const handleOcuparRota = async (rota: Rota) => {
    setJogadorCartasClicadas([]);
    setJogadorCartasVagaoDescartadas([]);
    setRotaSelecionada(rota);
    setRotasPiscando(false);
    console.log("Tentou ocupar rota: " + rota.Cor + " " + rota.QtdeEspacos)    
    const cartasVagaoMaos = jogador.verCartasVagao().map(c=> c.Id)
    setJogadorCartasVagaoClicaveis(cartasVagaoMaos)
    setJogadorCartasVagaoDestacadas(cartasVagaoMaos);
  }

  const handleResultados = (jogadores: Array<Jogador>) => {
    console.log("Mostrando resultados finais:");
    for (const jogador of jogadores) {
      console.log(`Jogador: ${jogador.Nome}, Pontos: ${jogador.pegarPontos()}`);
    }
    return (
      <div className="p-6">
        <h1 className="text-xl font-bold mb-4">Jogadores</h1>

        <ul className="space-y-2">
          {jogadores.map((p) => (
            <li
              key={p.Id}
              className="p-3 border rounded-lg flex justify-between bg-gray-200"
            >
              <span>{p.Nome}</span>
              <span>{p.pegarPontos()} pts</span>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const handleProximoJogador = () => {
    // remove o jogador atual da lista de jogadores a jogar na rodada
    const novosJogadoresRestantes = jogadoresRestantes.filter(j => j.Id !== jogador.Id);
    // reinicia variaveis pro prox jogador
    setExecutouJogadaPrincipal(false);
    setBilhetesComprados([]);
    setIdsCartasVagaoBaralhoDestacadas([]);
    setIdsCartaVagaoExpostasDestacadas([]);
    setBaralhoBilhetesClicavel(false);
    setIdsBilhetesBaralhoDestacados([]);
    setJogadorBilhetesDescartados(0);
    setJogadorIdsBilhetesDestacados([]);
    setJogadaEfetiva("");
    setJogadaSelecionada("ocupar-rota");
    setJogadorCartasClicadas([]);
    setJogadorCartasVagaoDescartadas([]);
    setJogadorCartasVagaoDestacadas([]);
    setRotaSelecionada(null);
    setRotasPiscando(false);
    const todos = jogo.pegaJogadores();
    handleReporCartas();
    if(jogo.verificarFimDeJogo() && !jogo.pegarRodadaFinal()) {
      jogo.setRodadaFinal();
    }
    if(jogo.pegarRodadaFinal() === jogo.pegarRodada()) {
      const jogadores = jogo.calculaVencedor();
      setResultadosFinais(handleResultados(jogadores));  
      return;
    }
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

  const handleReporCartas = () => {


    const neededVagao = qtdeInicialCartasVagaoBaralho - cartasVagaoBaralhoAtual.length;
    console.log("neededVagao: " + neededVagao)

    const neededExpostas = qtdeInicialCartasVagaoExpostas - cartasVagaoExpostasAtual.length;
    console.log("neededExpostas: " + neededVagao)

    const neededBilhetes = qtdeInicialBilhetesDestinoBaralho - baralhoBilhetesAtual.length;
    console.log("neededBilhetes: " + neededBilhetes)

    const maisCartasVagaoBaralho: CartaVagao[] = jogo.pegarBaralhoCartasVagao(neededVagao);
    console.log("maisCartasVagaoBaralho:", maisCartasVagaoBaralho);

    const maisCartasVagaoExpostas: CartaVagao[] = jogo.pegarCartasVagaoExpostas(neededExpostas);
    console.log("maisCartasVagaoExpostas:", maisCartasVagaoExpostas);

    const maisBilhetesDestino: BilheteDestino[] = jogo.pegarBilhetesDeDestino(neededBilhetes);
    console.log("maisBilhetesDestino:", maisBilhetesDestino);

    const maisVagao = Array.isArray(maisCartasVagaoBaralho) ? maisCartasVagaoBaralho : [];
    const maisExpostas = Array.isArray(maisCartasVagaoExpostas) ? maisCartasVagaoExpostas : [];
    const maisBil = Array.isArray(maisBilhetesDestino) ? maisBilhetesDestino : [];

    if (maisBil.length > 0) {
      setBaralhoBilhetesAtual(prev => [...prev, ...maisBil]);
    }
    if (maisVagao.length > 0) {
      setCartasVagaoBaralhoAtual(prev => [...prev, ...maisVagao]);
    }
    if (maisExpostas.length > 0) {
      setCartasVagaoExpostasAtual(prev => [...prev, ...maisExpostas]);
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
          <div className="col-span-2 bg-background flex flex-col items-center overflow-hidden gap-0">

            <div className="mb-5">
              <BilheteDestinoView bilheteDestino={jogo.pegaCartaMaiorCaminhoContinuo()} size="responsive" orientacao="horizontal" />
            </div>

            <div className="mb-0">
            <BaralhoBilhetesDestinoView bilhetes={baralhoBilhetesAtual} idBilheteExposto={idBilheteExposto} idsBilhetesDestacados={idsBilhetesBaralhoDestacados}
                                        baralhoClicavel={baralhoBilhetesClicavel} handleComprarBilheteDestino={handleComprarBilheteDestinoBaralho}/>
            </div>

            <div className="mb-0">
            <BaralhoCartasVagaoView cartas={cartasVagaoBaralhoAtual} cartasClicaveis={cartasVagaoBaralhoClicaveis} idsCartasDestacadas={idsCartasVagaoBaralhoDestacadas} 
                                    idCartaExposta={idsCartasVagaoBaralhoExpostas} handleComprarCartaVagaoBaralho={handleComprarCartaVagaoBaralho}/>
            </div>
            
            <BaralhoCartasVagaoView cartas={cartasVagaoExpostasAtual} cartasClicaveis={cartasVagaoExpostasClicavel} idsCartasDestacadas={idsCartaVagaoExpostasDestacadas} 
                                    angleStep={25} offsetXStep={13} idCartaExposta={cartasVagaoExpostasAtual.map(c => c.Id)} handleComprarCartaVagaoBaralho={handleComprarCartaVagaoExposta}/>
          </div>

          <div className="col-span-7 flex justify-center items-up min-h-screen relative">
                <TabuleiroView rotasClicaveis={rotasClicaveis} handleOcuparRota={handleOcuparRota} rotasPiscando={rotasPiscando} rotaSelecionada={rotaSelecionada} />  
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
              configuracaoCartasJogador={{onClick: handleDescartarCartaVagao, clicavel:jogadorCartasVagaoClicaveis, clicadas: jogadorCartasClicadas, destacar: jogadorCartasVagaoDestacadas}}
            />
          </div>

      </div>
    </div>
    </div>
  );

};

export default GamePage;