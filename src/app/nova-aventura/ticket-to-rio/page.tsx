'use client';
import { useEffect, useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import { ArrowLeft, Train, Trash2, CreditCard } from "lucide-react";
import { useRouter, notFound } from 'next/navigation';
import Tabuleiro from "@/app/components/tabuleiro-view";
import { BilheteDestinoView } from "@/app/components/bilhete-de-destino-view";
import BaralhoView from "@/app/components/baralho-view";
import SumarioJogadorView from "@/app/nova-aventura/ticket-to-rio/sumario-jogador-view";
import { usarJogo } from "@/app/lib/contexto-jogo";
import { Jogo } from "@/app/lib/jogo";
import { BilheteDestino, CartaMaiorCaminhoContinuo, CartaVagao } from "@/app/lib/cartas-jogo";
import {OpcoesDeJogada, JogadaEfetiva} from "@/app/lib/utils"
import { Jogador } from "@/app/lib/jogador";

const GamePage: React.FC = () => {
  const jogo: Jogo = usarJogo();
  if (!jogo.foiIniciado()) {
    notFound();
  }
  const router = useRouter();
  const cartaMaiorCaminhoContinuo : CartaMaiorCaminhoContinuo = jogo.pegaCartaMaiorCaminhoContinuo();

  // VARIÁVEIS DO BARALHO DE BILHETES DE DESTINO
  const [baralhoBilhetesAtual, setBaralhoBilhetesAtual] = useState<BilheteDestino[]>(jogo.pegarBilhetesDeDestino(15));
  const [baralhoBilhetesClicavel, setBaralhoBilhetesClicavel] = useState<boolean>(false); // controla se o baralho de bilhetes pode ser clicado (após executar a jogada comprar-bilhetes)
  
  // VARIÁVEIS DA RODADA
  const [rodada, setRodada] = useState<number>(1);
  
  // VARIÁVEIS DA JOGADA
  const [jogadaEfetiva, setJogadaEfetiva] = useState<JogadaEfetiva>("");
  const [jogadaSelecionada, setJogadaSelecionada] = useState<OpcoesDeJogada>("ocupar-rota"); // pega a jogada escolhida pelo jogador
  const [finalizouJogadaPrincipal, setExecutouJogadaPrincipal] = useState<boolean>(false);

  // VARIÁVEIS DO JOGADOR
  const [jogadoresRestantes, setJogadoresRestantes] = useState<Jogador[]>(jogo.pegaJogadores());
  const [jogador, setJogador] = useState({ atual: jogadoresRestantes[0] });
  const [proximoJogador, setProximoJogador] = useState<Jogador>(jogadoresRestantes[1]);
  const [qtdeBilhetesComprados, setQtdeBilhetesComprados] = useState<number>(0); 

  const [jogadorBilhetesMao, setJogadorBilhetesMao] = useState<BilheteDestino[]>(jogador.atual.verBilhetesDestino());
  const [jogadorBilhetesMaoClicavel, setjogadorBilhetesMaoClicavel] = useState<boolean>(false);

  // VARIÁVEIS DE ANIMAÇÃO DOS BILHETES (DO BARALHO OU DO JOGADOR)
  const [idBilheteExposto, setIdBilheteExposto] = useState<string | null>(null); // id do bilhete q esta exposto 
  const [idsBilhetesDestacados, setIdsBilhetesDestacados] = useState<string[]>([]);

  useEffect(() => {
  if (qtdeBilhetesComprados >= 3) {
    setIdsBilhetesDestacados([]);
    setIdBilheteExposto(null);
    setBaralhoBilhetesClicavel(false);
  }
}, [qtdeBilhetesComprados]);


  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const handleRemoverBilheteDestinoBaralho = (bilhete: BilheteDestino) => {

    const index : number = baralhoBilhetesAtual.indexOf(bilhete);
    if (index < 0) throw new Error("Esse bilhete de destino não estava no baralho!");
    
    const novoBaralho = [...baralhoBilhetesAtual];
    novoBaralho.splice(index, 1); // remove 1 elemento do baralho a partir do índice encontrado

    setBaralhoBilhetesAtual(novoBaralho);

  }

  const handleDescartarBilheteDestino = async(bilhete: BilheteDestino) => {

  }
  const handleComprarBilheteDestino = async (bilhete: BilheteDestino) => {
    if (!baralhoBilhetesClicavel) return;
    setJogadaEfetiva("comprar-bilhete")
    // tira destaque do baralho
    setIdsBilhetesDestacados([]);
    const id = bilhete.Id;
    setIdBilheteExposto(id); 
    setIdsBilhetesDestacados([id]); 

    await sleep(600);

    handleRemoverBilheteDestinoBaralho(bilhete);

    await sleep(300);

    jogador.atual.addBilheteDestino(bilhete);

    // console.log("O jogador já comprou " + qtdeBilhetesComprados + " bilhetes!")
    const novoTotal = qtdeBilhetesComprados + 1;
    setQtdeBilhetesComprados(novoTotal);

    // se comprou menos de 3 cartas e há baralho, mantém o fluxo
    if ((novoTotal < 3) && (baralhoBilhetesAtual.length > 0)) {
      setJogadaSelecionada("comprar-bilhete");
      setIdsBilhetesDestacados(baralhoBilhetesAtual.map(b => b.Id));
      
    }
    else if ((novoTotal >= 3) || (baralhoBilhetesAtual.length == 0)) {
      setExecutouJogadaPrincipal(true);
    }
  };

  // Função usada pelo SumarioJogadorView quando o botão "EXECUTAR JOGADA" é clicado
  const handleExecutarJogadaFromChild = () => {
    setJogadaEfetiva(jogadaSelecionada)
    if (jogadaSelecionada === "comprar-bilhete" && qtdeBilhetesComprados < 3 && baralhoBilhetesAtual.length > 0) {
      setBaralhoBilhetesClicavel(true);
      setIdsBilhetesDestacados(baralhoBilhetesAtual.map(b => b.Id));
    }

    else if (jogadaSelecionada=="passar-a-vez") {
      handleProximoJogador();
    }

    else if (jogadaSelecionada == "comprar-carta") {
      
    }
    else if (jogadaEfetiva == "descartar-bilhete") {
    }
  };

  const handleProximoJogador = () => {
    // remove o jogador atual da lista de jogadores a jogar na rodada
    const novosJogadoresRestantes = jogadoresRestantes.filter(j => j.Id !== jogador.atual.Id);
    // reinicia variaveis pro prox jogador
    setExecutouJogadaPrincipal(false);
    setQtdeBilhetesComprados(0);
    setBaralhoBilhetesClicavel(false);
    setIdsBilhetesDestacados([]);
    setJogadaEfetiva("");
    setJogadaSelecionada("ocupar-rota");
    const todos = jogo.pegaJogadores();
    if (novosJogadoresRestantes.length === 0) {
      setJogadoresRestantes(todos);
      setRodada(r => r + 1);
      setJogador({ atual: todos[0] });
      setProximoJogador(todos[1] ?? todos[0]);
    } else {
      setJogadoresRestantes(novosJogadoresRestantes);
      setJogador({ atual: novosJogadoresRestantes[0] });
      setProximoJogador(novosJogadoresRestantes[1] ?? todos[0]); //pega lista original
    }
  };
  
  return (
    <div className="min-h-screen font-serif p-1">
      <div className="container mx-auto pt-4 px-4 flex text-center justify-between items-center">
        <Button className="hover:bg-vermelho-custom" variant="ghost" onClick={() => router.push("/nova-aventura")}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Sair do Jogo
        </Button>
        <h1 className="text-2xl font-bold text-primary">Rodada {rodada}</h1>
        <div className="w-32" />
      </div>

      <div className="px-3 py-6">
        <div className="grid grid-cols-12 gap-3">
          {/* Left Sidebar */}
          <div className="col-span-2 bg-background space-y-4 overflow-hidden">

            <BilheteDestinoView bilheteDestino={cartaMaiorCaminhoContinuo} size="md" orientacao="horizontal" />

            <div className="mt-10 relative w-full flex justify-center">
              <BaralhoView
                cartas={baralhoBilhetesAtual}
                angleStep={5}
                offsetXStep={7}
                renderizarCarta={(bilhete: BilheteDestino) => {
                  const id : string = bilhete.Id;
                  const bilheteEstaExposto : boolean  = idBilheteExposto === id;
                  const bilheteEstaDestacado : boolean = idsBilhetesDestacados.includes(id);
                  return (
                    <div key={id} className="relative w-full flex justify-center">

                        <BilheteDestinoView
                          bilheteDestino={bilhete}
                          expostoInicialmente={bilheteEstaExposto}
                          orientacao="vertical"
                          size="md"
                          clicavel={baralhoBilhetesClicavel}
                          onClick={() => handleComprarBilheteDestino(bilhete)}
                          destacar={bilheteEstaDestacado}
                        />

                    </div>
                  );
                }}
              />
            </div>
          </div>

          <div className="flex flex-row items-center justify-center bg-blue-300 col-span-7">
                <Tabuleiro />
              <div className="gap-4 mt-4 justify-center">
                  <Button variant="outline" size="icon" className="w-16 h-16 mr-4 bg-muted">
                    <Trash2 className="w-6 h-6" />
                  </Button>
                  <Button variant="outline" size="icon" className="w-16 h-16 bg-muted">
                    <Train className="w-6 h-6" />
                  </Button>
              </div>
  
          </div>

          <div className="col-span-3">
            <SumarioJogadorView
              rodada={rodada}
              jogadorAtual={{
                  nome: jogador.atual.Nome,
                  qtdeTrens: jogador.atual.pegarQtdeTrens(),
                  corDoTrem: jogador.atual.CorDoTrem,
                  bilhetesDestino: jogadorBilhetesMao,                
                  cartasDeVagao: jogador.atual.verCartasVagao(),     
                }}
              jogadaSelecionada={jogadaSelecionada}
              setJogada={setJogadaSelecionada}
              onExecutarJogada={handleExecutarJogadaFromChild}
              jogadaEfetiva={jogadaEfetiva}
              proximoJogador={proximoJogador}
              finalizouJogadaPrincipal = {finalizouJogadaPrincipal}
            />
          </div>

      </div>
    </div>
    </div>
  );
};

export default GamePage;
