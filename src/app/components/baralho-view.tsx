import React from "react";

type BaralhoViewProps<T> = {
  cartas?: T[]; 
  renderizarCarta?: (item: T, index: number, clickable: boolean) => React.ReactNode; 
  qtdeCartas?: number; 
  angleStep?: number;
  offsetXStep?: number;
  offsetYStep?: number;
  transformOrigin?: string;
  //estilo?: React.CSSProperties;
  clicavel?: boolean; 
  onCardClick?: (item: T, index: number) => void; // callback quando clicam em uma carta
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
  clicavel = false,
  onCardClick,
}: BaralhoViewProps<T>) {
  const total = cartas ? cartas.length : qtdeCartas;
  const arr = new Array(total).fill(null);
  const startAngle = -angleStep * ((total - 1) / 2);

  const handleClick = (i: number) => {
    if (!clicavel || !onCardClick) return;
    if (cartas) onCardClick(cartas[i], i);
    else onCardClick(undefined as unknown as T, i); // fallback se não houver items
  };

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
            onClick={() => handleClick(i)}
            role={clicavel ? "button" : undefined}
            tabIndex={clicavel ? 0 : undefined}
            onKeyDown={(e) => {
              if (!clicavel) return;
              if (e.key === "Enter" || e.key === " ") handleClick(i);
            }}
            aria-disabled={!clicavel}

          >
            {cartas && renderizarCarta ? renderizarCarta(cartas[i], i, clicavel) : renderizarCarta ? renderizarCarta(undefined as any, i, clicavel) : null}
          </div>
        );
      })}
    </div>
  );
}

export default BaralhoView;
