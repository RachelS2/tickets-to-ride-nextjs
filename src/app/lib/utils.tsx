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

export type OpcoesDeJogada = "ocupar-rota" | "comprar-bilhete" | "comprar-carta" | "descartar-bilhete"

export function pegarHexDaCor(cor: string): string {
  const corLimpa: string = cor.toLowerCase();
  return `bg-${corLimpa}-custom`
}

export type CoresDeTrem = "Azul" | "Vermelho" | "Amarelo" | "Verde" | "Preto";
export type CoresDeRota = "Cinza" | "Roxo" | "Laranja" | "Branco" | CoresDeTrem;
export type CoresCartaVagao = "Roxo" | "Laranja" | "Branco" | "Coringa" | CoresDeTrem;

function corAleatoria<T extends string>(cores: readonly T[]): T {
  return cores[Math.floor(Math.random() * cores.length)];
}

export function corDeRotaAleatoria(): CoresDeRota {
  const cores: CoresDeRota[] = [
    "Cinza",
    "Roxo",
    "Azul",
    "Laranja",
    "Branco",
    "Verde",
    "Amarelo",
    "Preto",
    "Vermelho",
  ];
  return corAleatoria(cores);
}
