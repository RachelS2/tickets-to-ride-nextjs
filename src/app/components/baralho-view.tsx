import React from "react";
import { BilheteDestino } from "../lib/cartas-jogo";

type BaralhoViewProps<T> = {
  cartas?: T[]; 
  renderizarCarta?: (item: T, idx: number) => React.ReactNode; 
  qtdeCartas?: number; 
  angleStep?: number;
  offsetXStep?: number;
  offsetYStep?: number;
  transformOrigin?: string;
  //estilo?: React.CSSProperties;
};


export function BaralhoView<T>({
  cartas,
  renderizarCarta,
  qtdeCartas = 5,
  angleStep = 12,
  offsetXStep = 22,
  offsetYStep = 4,
  transformOrigin = "bottom center",
//   estilo,   
}: BaralhoViewProps<T>) {
  const total = cartas ? cartas.length : qtdeCartas;
  
  const arr = new Array(total).fill(null);
  const startAngle = -angleStep * ((total - 1) / 2);

  return (
    <div className="relative w-64 h-48 flex cartas-end justify-center">
      {arr.map((_, i) => {
        const angle = startAngle + i * angleStep;
        const offsetX = (i - (total - 1) / 2) * offsetXStep;
        const offsetY = Math.abs(i - (total - 1) / 2) * offsetYStep;

        return (
          <div
            key={i}
            className="absolute transition-transform"
            style={{
              transformOrigin,
              transform: `translate(${offsetX}px, ${offsetY}px) rotate(${angle}deg)`,
              zIndex: i,
            }}

          >
            {cartas && renderizarCarta ? renderizarCarta(cartas[i]) : renderizarCarta ? renderizarCarta(undefined as any) : null}
          </div>
        );
      })}
    </div>
  );
}

export default BaralhoView;
