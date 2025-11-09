import { useState } from "react";
import { Card } from "@/app/components/ui/card";


interface City {
  id: string;
  name: string;
  x: number;
  y: number;
}

interface Route {
  from: string;
  to: string;
  color: string;
  length: number;
}

const cities: City[] = [
  { id: "seattle", name: "Seattle", x: 120, y: 100 },
  { id: "portland", name: "Portland", x: 100, y: 180 },
  { id: "san-francisco", name: "San Francisco", x: 80, y: 320 },
  { id: "los-angeles", name: "Los Angeles", x: 140, y: 400 },
  { id: "las-vegas", name: "Las Vegas", x: 200, y: 360 },
  { id: "salt-lake", name: "Salt Lake City", x: 280, y: 220 },
  { id: "phoenix", name: "Phoenix", x: 260, y: 440 },
  { id: "denver", name: "Denver", x: 400, y: 280 },
  { id: "santa-fe", name: "Santa Fe", x: 380, y: 380 },
  { id: "el-paso", name: "El Paso", x: 380, y: 480 },
  { id: "dallas", name: "Dallas", x: 540, y: 440 },
  { id: "houston", name: "Houston", x: 580, y: 520 },
  { id: "oklahoma", name: "Oklahoma City", x: 540, y: 360 },
  { id: "kansas", name: "Kansas City", x: 580, y: 280 },
  { id: "omaha", name: "Omaha", x: 580, y: 220 },
  { id: "chicago", name: "Chicago", x: 740, y: 220 },
  { id: "saint-louis", name: "Saint Louis", x: 680, y: 300 },
  { id: "nashville", name: "Nashville", x: 760, y: 340 },
  { id: "atlanta", name: "Atlanta", x: 800, y: 400 },
  { id: "miami", name: "Miami", x: 880, y: 540 },
  { id: "charleston", name: "Charleston", x: 860, y: 420 },
  { id: "raleigh", name: "Raleigh", x: 880, y: 360 },
  { id: "washington", name: "Washington", x: 920, y: 300 },
  { id: "pittsburgh", name: "Pittsburgh", x: 860, y: 260 },
  { id: "new-york", name: "New York", x: 960, y: 240 },
  { id: "boston", name: "Boston", x: 980, y: 180 },
];

const routes: Route[] = [
  { from: "seattle", to: "portland", color: "#EF4444", length: 1 },
  { from: "portland", to: "san-francisco", color: "#10B981", length: 5 },
  { from: "san-francisco", to: "los-angeles", color: "#F59E0B", length: 3 },
  { from: "los-angeles", to: "las-vegas", color: "#6B7280", length: 2 },
  { from: "las-vegas", to: "salt-lake", color: "#F59E0B", length: 3 },
  { from: "salt-lake", to: "denver", color: "#EF4444", length: 3 },
  { from: "salt-lake", to: "denver", color: "#F59E0B", length: 3 },
  { from: "denver", to: "kansas", color: "#3B82F6", length: 4 },
  { from: "denver", to: "santa-fe", color: "#6B7280", length: 2 },
  { from: "los-angeles", to: "phoenix", color: "#6B7280", length: 3 },
  { from: "phoenix", to: "santa-fe", color: "#6B7280", length: 3 },
  { from: "santa-fe", to: "el-paso", color: "#6B7280", length: 2 },
  { from: "el-paso", to: "dallas", color: "#EF4444", length: 4 },
  { from: "dallas", to: "houston", color: "#6B7280", length: 1 },
  { from: "dallas", to: "oklahoma", color: "#EF4444", length: 2 },
  { from: "oklahoma", to: "kansas", color: "#6B7280", length: 2 },
  { from: "kansas", to: "omaha", color: "#3B82F6", length: 1 },
  { from: "omaha", to: "chicago", color: "#EF4444", length: 4 },
  { from: "kansas", to: "saint-louis", color: "#8B5CF6", length: 2 },
  { from: "chicago", to: "saint-louis", color: "#10B981", length: 2 },
  { from: "saint-louis", to: "nashville", color: "#6B7280", length: 2 },
  { from: "nashville", to: "atlanta", color: "#6B7280", length: 1 },
  { from: "atlanta", to: "miami", color: "#3B82F6", length: 5 },
  { from: "atlanta", to: "charleston", color: "#6B7280", length: 2 },
  { from: "charleston", to: "raleigh", color: "#6B7280", length: 2 },
  { from: "raleigh", to: "washington", color: "#6B7280", length: 2 },
  { from: "washington", to: "pittsburgh", color: "#6B7280", length: 2 },
  { from: "pittsburgh", to: "new-york", color: "#10B981", length: 2 },
  { from: "new-york", to: "boston", color: "#EF4444", length: 2 },
  { from: "chicago", to: "pittsburgh", color: "#F59E0B", length: 3 },
];

export  const Tabuleiro = () => {
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);

  const getCityPosition = (cityId: string) => {
    return cities.find(c => c.id === cityId);
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
              {routes.map((route, index) => {
                const fromCity = getCityPosition(route.from);
                const toCity = getCityPosition(route.to);
                if (!fromCity || !toCity) return null;

                const routeId = `${route.from}-${route.to}`;
                const isSelected = selectedRoute === routeId;

                return (
                  <line
                    key={index}
                    x1={fromCity.x}
                    y1={fromCity.y}
                    x2={toCity.x}
                    y2={toCity.y}
                    stroke={route.color}
                    strokeWidth={isSelected ? "8" : "6"}
                    strokeLinecap="round"
                    opacity={isSelected ? "1" : "0.7"}
                    className="cursor-pointer transition-all hover:opacity-100"
                    onClick={() => setSelectedRoute(isSelected ? null : routeId)}
                  />
                );
              })}
            </g>

            {/* Cities */}
            <g>
              {cities.map((city) => (
                <g key={city.id}>
                  <circle
                    cx={city.x}
                    cy={city.y}
                    r={hoveredCity === city.id ? "12" : "8"}
                    fill="hsl(var(--background))"
                    stroke="hsl(var(--primary))"
                    strokeWidth="3"
                    className="cursor-pointer transition-all"
                    onMouseEnter={() => setHoveredCity(city.id)}
                    onMouseLeave={() => setHoveredCity(null)}
                  />
                  {hoveredCity === city.id && (
                    <text
                      x={city.x}
                      y={city.y - 20}
                      textAnchor="middle"
                      fill="hsl(var(--foreground))"
                      fontSize="14"
                      fontWeight="bold"
                      className="font-sans pointer-events-none"
                    >
                      {city.name}
                    </text>
                  )}
                </g>
              ))}
            </g>
          </svg>
        </div>

        {/* Legend */}
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
