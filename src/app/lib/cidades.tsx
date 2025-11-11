import { Rota } from "./rota";
import { NomesDeCidades } from "./utils";

export class Cidade {
  public readonly Nome : NomesDeCidades;
  public readonly XCoord : number;
  public readonly YCoord: number;

  constructor(Nome: NomesDeCidades, xCoord: number, yCoord: number) {
    this.Nome  = Nome;
    this.XCoord = xCoord;
    this.YCoord = yCoord;
  }
}

export const Seattle: Cidade = { Nome: "Seattle", XCoord: 120, YCoord: 100 };
export const Portland: Cidade = { Nome: "Portland", XCoord: 100, YCoord: 180 };
export const SanFrancisco: Cidade = { Nome: "San Francisco", XCoord: 80, YCoord: 320 };
export const LosAngeles: Cidade = { Nome: "Los Angeles", XCoord: 140, YCoord: 400 };
export const LasVegas: Cidade = { Nome: "Las Vegas", XCoord: 200, YCoord: 360 };
export const SaltLakeCity: Cidade = { Nome: "Salt Lake City", XCoord: 280, YCoord: 220 };
export const Phoenix: Cidade = { Nome: "Phoenix", XCoord: 260, YCoord: 440 };
export const Denver: Cidade = { Nome: "Denver", XCoord: 400, YCoord: 280 };
export const SantaFe: Cidade = { Nome: "Santa Fe", XCoord: 380, YCoord: 380 };
export const ElPaso: Cidade = { Nome: "El Paso", XCoord: 380, YCoord: 480 };
export const Dallas: Cidade = { Nome: "Dallas", XCoord: 540, YCoord: 440 };
export const Houston: Cidade = { Nome: "Houston", XCoord: 580, YCoord: 520 };
export const OklahomaCity: Cidade = { Nome: "Oklahoma City", XCoord: 540, YCoord: 360 };
export const KansasCity: Cidade = { Nome: "Kansas City", XCoord: 580, YCoord: 280 };
export const Omaha: Cidade = { Nome: "Omaha", XCoord: 580, YCoord: 220 };
export const Chicago: Cidade = { Nome: "Chicago", XCoord: 740, YCoord: 220 };
export const SaintLouis: Cidade = { Nome: "Saint Louis", XCoord: 680, YCoord: 300 };
export const Nashville: Cidade = { Nome: "Nashville", XCoord: 760, YCoord: 340 };
export const Atlanta: Cidade = { Nome: "Atlanta", XCoord: 800, YCoord: 400 };
export const Miami: Cidade = { Nome: "Miami", XCoord: 880, YCoord: 540 };
export const Charleston: Cidade = { Nome: "Charleston", XCoord: 860, YCoord: 420 };
export const Raleigh: Cidade = { Nome: "Raleigh", XCoord: 880, YCoord: 360 };
export const Washington: Cidade = { Nome: "Washington", XCoord: 920, YCoord: 300 };
export const Pittsburgh: Cidade = { Nome: "Pittsburgh", XCoord: 860, YCoord: 260 };
export const NewYork: Cidade = { Nome: "New York", XCoord: 960, YCoord: 240 };
export const Boston: Cidade = { Nome: "Boston", XCoord: 980, YCoord: 180 };

export const Rotas: Rota[] = [
  new Rota(Seattle, Portland, 1, "Vermelho"),
  new Rota(Portland, SanFrancisco, 5, "Verde"),
  new Rota(SanFrancisco, LosAngeles, 3, "Laranja"),
  new Rota(LosAngeles, LasVegas, 2, "Azul"),
  new Rota(LasVegas, SaltLakeCity, 3, "Roxo"),
  new Rota(SaltLakeCity, Denver, 3, "Amarelo"),
  new Rota(SaltLakeCity, Denver, 3, "Branco"),
  new Rota(Denver, KansasCity, 4, "Azul"),
  new Rota(Denver, SantaFe, 2, "Cinza"),
  new Rota(LosAngeles, Phoenix, 3, "Preto"),
  new Rota(Phoenix, SantaFe, 3, "Laranja"),
  new Rota(SantaFe, ElPaso, 2, "Amarelo"),
  new Rota(ElPaso, Dallas, 4, "Vermelho"),
  new Rota(Dallas, Houston, 1, "Branco"),
  new Rota(Dallas, OklahomaCity, 2, "Roxo"),
  new Rota(OklahomaCity, KansasCity, 2, "Verde"),
  new Rota(KansasCity, Omaha, 1, "Preto"),
  new Rota(Omaha, Chicago, 4, "Azul"),
  new Rota(KansasCity, SaintLouis, 2, "Amarelo"),
  new Rota(Chicago, SaintLouis, 2, "Branco"),
  new Rota(SaintLouis, Nashville, 2, "Cinza"),
  new Rota(Nashville, Atlanta, 1, "Laranja"),
  new Rota(Atlanta, Miami, 5, "Verde"),
  new Rota(Atlanta, Charleston, 2, "Roxo"),
  new Rota(Charleston, Raleigh, 2, "Cinza"),
  new Rota(Raleigh, Washington, 2, "Branco"),
  new Rota(Washington, Pittsburgh, 2, "Vermelho"),
  new Rota(Pittsburgh, NewYork, 2, "Laranja"),
  new Rota(NewYork, Boston, 2, "Azul"),
  new Rota(Chicago, Pittsburgh, 3, "Preto"),
];


export const Cidades: Cidade[] = [
  Seattle,
  Portland,
  SanFrancisco,
  LosAngeles,
  LasVegas,
  SaltLakeCity,
  Phoenix,
  Denver,
  SantaFe,
  ElPaso,
  Dallas,
  Houston,
  OklahomaCity,
  KansasCity,
  Omaha,
  Chicago,
  SaintLouis,
  Nashville,
  Atlanta,
  Miami,
  Charleston,
  Raleigh,
  Washington,
  Pittsburgh,
  NewYork,
  Boston,
];


export const DestinosCidades: Record<
  number,
  Partial<Record<NomesDeCidades, NomesDeCidades>>
> = {
  // 1 ponto — pares muito curtos / vizinhança imediata
  1: {
    "Kansas City": "Omaha",
    "Santa Fe": "El Paso",        
    "Saint Louis": "Kansas City", 
    "Washington": "Pittsburgh",
    "Oklahoma City": "Dallas",
  },

  2: {
    "Raleigh": "Washington",
    "Saint Louis": "Nashville",
    "Oklahoma City": "Kansas City",
  },
  3: {
    "Los Angeles": "Phoenix",  
    "Phoenix": "Santa Fe",  
    "Salt Lake City": "Denver",   
    "Las Vegas": "Salt Lake City",
    "Omaha": "Chicago",           
    "Chicago": "Pittsburgh",
    "San Francisco": "Los Angeles",
  },
  
  5: {
    "Denver": "Kansas City",
    "El Paso": "Dallas",
    "Omaha": "Chicago",
  },

  6: {
    "Miami": "Atlanta",
    "Portland": "San Francisco",
    "Phoenix": "Denver",
    "San Francisco":"Las Vegas",
  },

  8: {
    "Seattle": "San Francisco",
    "Miami": "Charleston",
    "Salt Lake City": "Kansas City",
    "San Francisco": "Santa Fe",
    "Santa Fe": "Houston"
  },

  11: {
    "Omaha": "Atlanta",
    "Boston": "Charleston",
    "El Paso": "Saint Louis",

  }
};
