import { useState } from "react";
import { Card } from "@/app/components/ui/card";
import { usarJogo } from "@/app/lib/contexto-jogo";
import { Jogo } from "@/app/lib/jogo";
import notFound from "../not-found";
import { Rota } from "../lib/rota";
import { Cidade, cidades } from "../lib/cidades";
import { cn, CoresDeRota, pegarVarDaCor, pegarHexDaCor } from "../lib/utils";


type TabuleiroProps = {
  clicavel: boolean;
  rotaSelecionada: Rota | null;
  setRotaSelecionada: (rota: Rota) => void;
};


export  const Tabuleiro = ({clicavel, rotaSelecionada, setRotaSelecionada} : TabuleiroProps) => {
  const jogo: Jogo = usarJogo();
  if (!jogo.foiIniciado()) {
    notFound();
  }
  const rotas: Rota[] = jogo.pegarRotas();
  
  // const [selectedRoute, setRotaSelecionada] = useState<string | null>(null);
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);

  const geraLegenda = (cor: CoresDeRota) => {
    return (
      <div className="flex items-center gap-2">
        
        <div className={cn("w-6 h-1 rounded", pegarVarDaCor(cor))}></div>

        <span className="text-sm text-muted-foreground">{cor}</span>
      </div> 
    )
  }

  const coresUsadas : CoresDeRota[] = []

  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      <Card className="p-6 bg-muted/20">
        {/* <div className="mb-6">
          <h2 className="font-serif font-bold text-3xl mb-2 text-foreground">
            Tabuleiro do Jogo
          </h2>
          <p className="text-muted-foreground">
            Clique nas rotas para selecioná-las e construir sua ferrovia
          </p>
        </div> */}

        <div className="bg-background rounded-lg shadow-elegant p-4 overflow-auto">
          <svg 
            viewBox="0 0 1100 600" 
            className="w-full h-auto"
            style={{ minHeight: "500px" }}
          >
            {/* Background map texture */}
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path 
                  d="M 40 0 L 0 0 0 40" 
                  fill="none" 
                  stroke="hsl(var(--border))" 
                  strokeWidth="0.5"
                  opacity="0.3"
                />
              </pattern>
            </defs>
            <rect width="1100" height="600" fill="url(#grid)" />

            {/* Routes */}
            <g>
              {rotas.map((rota, index) => {
                const origem = rota.Origem;
                const destino = rota.Destino;
                if (!origem || !destino) return null;

                const idRota = `${origem.Nome}-${destino.Nome}`;
                const idRotaSelecionada = `${rotaSelecionada?.Origem.Nome}-${rotaSelecionada?.Destino.Nome}`;
                const estaSelecionada = idRotaSelecionada === idRota;

                const corHex = pegarHexDaCor(rota.Cor);

                // Calcula o comprimento total da linha
                const dx = destino.XCoord - origem.XCoord;
                const dy = destino.YCoord - origem.YCoord;
                const distancia = Math.sqrt(dx * dx + dy * dy);

                // Define o padrão de tracejado (dashLength e gap)
                // Aqui dividimos a distância total pela quantidade de espaços
                const dashLength = distancia / (rota.QtdeEspacos * 2);
                const gapLength = dashLength; // espaçamento igual ao traço

                return (
                  <line
                    key={index}
                    x1={origem.XCoord}
                    y1={origem.YCoord}
                    x2={destino.XCoord}
                    y2={destino.YCoord}
                    stroke={corHex}
                    strokeWidth={estaSelecionada ? "8" : "6"}
                    strokeLinecap="round"
                    strokeDasharray={`${dashLength},${gapLength}`}
                    opacity={estaSelecionada ? "1" : "0.8"}
                    className="cursor-pointer transition-all hover:opacity-100"
                    onClick={clicavel? () => setRotaSelecionada(rota) : undefined}
                  />
                );
              })}
            </g>


            <g>
            {cidades.map((cidade) => (
              <g key={cidade.Nome}>
                <circle
                  cx={cidade.XCoord}
                  cy={cidade.YCoord}
                  r={hoveredCity === cidade.Nome ? "12" : "8"}
                  fill="hsl(var(--background))"
                  stroke="hsl(var(--primary))"
                  strokeWidth="3"
                  className="cursor-pointer transition-all"
                  onMouseEnter={() => setHoveredCity(cidade.Nome)}
                  onMouseLeave={() => setHoveredCity(null)}
                />
                <text
                  x={cidade.XCoord + 30}
                  y={cidade.YCoord - 15}
                  textAnchor="middle"
                  fill={
                    hoveredCity === cidade.Nome
                      ? "hsl(var(--primary))"
                      : "hsl(var(--foreground))"
                  }
                  fontSize="14"
                  fontWeight={hoveredCity === cidade.Nome ? "bold" : "normal"}
                  className="font-sans text-black pointer-events-none select-none"
                >
                  {cidade.Nome}
                </text>
              </g>
            ))}
            </g>
          </svg>
        </div>

        {/* Subtitles */}
        <div className="mt-6 flex flex-wrap gap-4 justify-center">
          {coresUsadas.map((cor) => (
            <div key={cor}>{geraLegenda(cor)}</div>
          ))}
        </div>

      </Card>
    </div>
  );
};

export default Tabuleiro;


