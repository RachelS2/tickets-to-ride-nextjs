import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { customAlphabet } from "nanoid";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const nanoid = customAlphabet('1234567890', 5);
export function gerarIdUsuario() {
  return nanoid();
}

export type OpcoesDeJogada = "ocupar-rota" | "comprar-bilhete" | "comprar-carta" | "descartar-bilhete" | "passar-a-vez"

export type JogadaEfetiva = "" | OpcoesDeJogada

export function pegarVarDaCor(cor: string): string {
  const corLimpa: string = cor.toLowerCase();
  return `bg-${corLimpa}-custom`
}

export type CoresDeTrem = "Azul" | "Vermelho" | "Amarelo" | "Verde" | "Preto";

type CoresComuns = "Roxo" | "Laranja" | "Branco" | CoresDeTrem
export type CoresDeRota = "Cinza" | CoresComuns;
export type CoresCartaVagao = "Coringa" | CoresComuns;

//Roxo, Vermelho, Laranja, Amarelo, Verde, Azul, Branco, Preto

export function pegarHexDaCor(cor: CoresCartaVagao | CoresDeRota | CoresDeTrem): string {
  const cores: Record<string, string> = {

  Vermelho: "#DC2626",
   Azul: "#2564ebd3",
   Verde: "#16A34A",
   Amarelo: "#ffd105be",
   Preto: "#1F2937",
   Roxo: "#5b27b6b0",
   Laranja: "#ff8800f1",
  Branco: "#FFFFFF",
  Cinza: "#808080",
  };

  return cores[cor] || "#999999"; // fallback
}


// function corAleatoria<T extends string>(cores: readonly T[]): T {
//   return cores[Math.floor(Math.random() * cores.length)];
// }

// export function corDeRotaAleatoria(): CoresDeRota {
//   const cores: CoresDeRota[] = [
//     "Cinza",
//     "Roxo",
//     "Azul",
//     "Laranja",
//     "Branco",
//     "Verde",
//     "Amarelo",
//     "Preto",
//     "Vermelho",
//   ];
//   return corAleatoria(cores);
// }


export const NomesDeCidades = [
  "Seattle",
  "Portland",
  "San Francisco",
  "Los Angeles",
  "Las Vegas",
  "Salt Lake City",
  "Denver",
  "Santa Fe",
  "El Paso",
  "Dallas",
  "Houston",
  "Oklahoma City",
  "Kansas City",
  "Omaha",
  "Chicago",
  "Saint Louis",
  "Nashville",
  "Atlanta",
  "Miami",
  "Charleston",
  "Raleigh",
  "Washington",
  "Pittsburgh",
  "New York",
  "Boston",
  "Phoenix",
] as const;


export type NomesDeCidades = typeof NomesDeCidades[number];



