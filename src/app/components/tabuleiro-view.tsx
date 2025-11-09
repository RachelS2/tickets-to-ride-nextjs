import { useState } from "react";
import { Card } from "@/app/components/ui/card";
import { usarJogo } from "@/app/lib/contexto-jogo";
import { Jogo } from "@/app/lib/jogo";
import notFound from "../not-found";
import { Rota } from "../lib/rota";
import { Cidade, cidades } from "../lib/cidades";
import { pegarHexDaCor, pegarVarDaCor } from "../lib/utils";


export  const Tabuleiro = () => {
  const jogo: Jogo = usarJogo();
  if (!jogo.foiIniciado()) {
    notFound();
  }
  const rotas: Rota[] = jogo.pegarRotas();
  
  const [selectedRoute, setRotaSelecionada] = useState<string | null>(null);
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);

  const getCityPosition = (nomeCidade: string) => {
    return cidades.find(c => c.Nome === nomeCidade);
  };

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
                const origem : Cidade = rota.Origem;
                const destino : Cidade= rota.Destino;
                if (!origem || !destino) return null;

                const idRota = `${origem}-${destino}`;
                const estaSelecionada = selectedRoute === idRota;
                console.log(pegarHexDaCor(rota.Cor));
                return (
                  <line
                    key={index}
                    x1={origem.XCoord}
                    y1={origem.YCoord}
                    x2={destino.XCoord}
                    y2={destino.YCoord}
                    stroke={pegarHexDaCor(rota.Cor)}
                    strokeWidth={estaSelecionada ? "8" : "6"}
                    strokeLinecap="round"
                    opacity={estaSelecionada ? "1" : "0.7"}
                    className="cursor-pointer transition-all hover:opacity-100"
                    onClick={() => setRotaSelecionada(estaSelecionada ? null : idRota)}
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
                  {hoveredCity === cidade.Nome && (
                    <text
                      x={cidade.XCoord}
                      y={cidade.YCoord - 20}
                      textAnchor="middle"
                      fill="hsl(var(--foreground))"
                      fontSize="14"
                      fontWeight="bold"
                      className="font-sans pointer-events-none"
                    >
                      {cidade.Nome}
                    </text>
                  )}
                </g>
              ))}
            </g>
          </svg>
        </div>

        {/* Subtitles */}
        <div className="mt-6 flex flex-wrap gap-4 justify-center">
          <div className="flex items-center gap-2">
            <div className="w-6 h-1 bg-red-500 rounded"></div>
            <span className="text-sm text-muted-foreground">Vermelho</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-1 bg-blue-500 rounded"></div>
            <span className="text-sm text-muted-foreground">Azul</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-1 bg-green-500 rounded"></div>
            <span className="text-sm text-muted-foreground">Verde</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-1 bg-yellow-500 rounded"></div>
            <span className="text-sm text-muted-foreground">Amarelo</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-1 bg-purple-500 rounded"></div>
            <span className="text-sm text-muted-foreground">Roxo</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-1 bg-gray-500 rounded"></div>
            <span className="text-sm text-muted-foreground">Cinza</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Tabuleiro;


