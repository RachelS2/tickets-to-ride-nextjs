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

export const rotas: Rota[] = [
    new Rota(Seattle, Portland, 1, "Vermelho"),
    new Rota(Portland, SanFrancisco, 5, "Verde"),
    new Rota(SanFrancisco, LosAngeles, 3, "Laranja"),
    new Rota(LosAngeles, LasVegas, 2, "Cinza"),
    new Rota(LasVegas, SaltLakeCity, 3, "Laranja"),
    new Rota(SaltLakeCity, Denver, 3, "Vermelho"),
    new Rota(SaltLakeCity, Denver, 3, "Laranja"),
    new Rota(Denver, KansasCity, 4, "Azul"),
    new Rota(Denver, SantaFe, 2, "Cinza"),
    new Rota(LosAngeles, Phoenix, 3, "Cinza"),
    new Rota(Phoenix, SantaFe, 3, "Cinza"),
    new Rota(SantaFe, ElPaso, 2, "Cinza"),
    new Rota(ElPaso, Dallas, 4, "Vermelho"),
    new Rota(Dallas, Houston, 1, "Cinza"),
    new Rota(Dallas, OklahomaCity, 2, "Vermelho"),
    new Rota(OklahomaCity, KansasCity, 2, "Cinza"),
    new Rota(KansasCity, Omaha, 1, "Azul"),
    new Rota(Omaha, Chicago, 4, "Vermelho"),
    new Rota(KansasCity, SaintLouis, 2, "Roxo"),
    new Rota(Chicago, SaintLouis, 2, "Verde"),
    new Rota(SaintLouis, Nashville, 2, "Cinza"),
    new Rota(Nashville, Atlanta, 1, "Cinza"),
    new Rota(Atlanta, Miami, 5, "Azul"),
    new Rota(Atlanta, Charleston, 2, "Cinza"),
    new Rota(Charleston, Raleigh, 2, "Cinza"),
    new Rota(Raleigh, Washington, 2, "Cinza"),
    new Rota(Washington, Pittsburgh, 2, "Cinza"),
    new Rota(Pittsburgh, NewYork, 2, "Verde"),
    new Rota(NewYork, Boston, 2, "Vermelho"),
    new Rota(Chicago, Pittsburgh, 3, "Laranja"),
  ];

export const cidades: Cidade[] = [
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

export const MaiorCaminhoContinuo: Record<number, Partial<Record<NomesDeCidades, NomesDeCidades>>> = {
  16: {
    "Los Angeles": "Miami",
  },
};

export const DestinosCidades: Record<number, Partial<Record<NomesDeCidades, NomesDeCidades>>> = {
  1: {
    "Dallas": "Houston",
    "Seattle": "Portland",
    "Kansas City": "Omaha",
    "Nashville": "Atlanta",
  },

  2: {
    "Dallas": "Oklahoma City",
    "Kansas City": "Saint Louis",
    "Chicago": "Saint Louis",
    "Saint Louis": "Nashville",
    "Santa Fe": "El Paso",
    "Los Angeles": "Las Vegas",
    "Charleston": "Raleigh",
    "Raleigh": "Washington",
    "Washington": "Pittsburgh",
    "Pittsburgh": "New York",
    "New York": "Boston",
  },

  3: {
    "Phoenix": "Santa Fe",
    "Salt Lake City": "Denver",
    "Los Angeles": "Phoenix",
    "Las Vegas": "Salt Lake City",
    "Chicago": "Pittsburgh",
  },

  4: {
    "Denver": "Kansas City",
    "El Paso": "Dallas",
  },

  5: {
    "Denver": "Santa Fe",
    "Portland": "San Francisco",
    "Atlanta": "Miami",
    "Salt Lake City": "Denver",
  },

  6: {
    "Seattle": "San Francisco",
    "Los Angeles": "Denver",
  },

  7: {
    "San Francisco": "Santa Fe",
    "Denver": "Chicago",
  },

  8: {
    "Los Angeles": "Houston",
  },

  9: {
    "Seattle": "Denver",
  },

  10: {
    "Seattle": "Chicago",
  },

  11: {
    "Los Angeles": "Atlanta",
  },

  12: {
    "San Francisco": "Chicago",
  },

  13: {
    "Denver": "New York",
  },

  14: {
    "Seattle": "New York",
  },
};
