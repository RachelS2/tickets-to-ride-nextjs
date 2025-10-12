
export type CityNames =
  | "Rio de Janeiro"
  | "Niteroi"
  | "Sao Goncalo"
  | "Duque de Caxias"
  | "Nova Iguacu"
  | "Belford Roxo"
  | "Sao Joao de Meriti"
  | "Nilopolis"
  | "Itaborai"
  | "Mage"
  | "Cabo Frio"
  | "Arraial do Cabo"
  | "Armacao dos Buzios"
  | "Saquarema"
  | "Marica"
  | "Angra dos Reis"
  | "Paraty"
  | "Mangaratiba"
  | "Itaguai"
  | "Petropolis"
  | "Teresopolis"
  | "Nova Friburgo"
  | "Cachoeiras de Macacu"
  | "Bom Jardim"
  | "Sumidouro"
  | "Campos dos Goytacazes"
  | "Sao Joao da Barra"
  | "Macae"
  | "Quissama"
  | "Itaperuna"
  | "Santo Antonio de Padua"
  | "Miracema"
  | "Volta Redonda"
  | "Barra Mansa"
  | "Resende"
  | "Itatiaia"
  | "Pirai"
  | "Mendes"
  | "Vassouras"
  | "Valenca";



export const DestinyTicketsCities: Record<
  number,
  Partial<Record<CityNames, CityNames>>
> = {
  1: {
    "Nilopolis": "Nova Iguacu",     
    "Itaguai": "Mangaratiba",       
    "Paraty": "Angra dos Reis",     
    "Rio de Janeiro": "Sao Goncalo", 
    "Duque de Caxias": "Sao Joao de Meriti",
    "Marica": "Itaborai", 
  },

  2: {
     "Cabo Frio": "Armacao dos Buzios",
    "Mage": "Arraial do Cabo",
    "Rio de Janeiro": "Itaborai",   
    "Duque de Caxias": "Nilopolis"      
  },
  4: {
    "Mage": "Armacao dos Buzios",   
    "Campos dos Goytacazes": "Sao Joao da Barra",
    "Quissama": "Itaperuna", 
    "Itaperuna": "Santo Antonio de Padua",
    "Santo Antonio de Padua": "Miracema",
    "Volta Redonda": "Barra Mansa",
  },
  5: {
    "Petropolis": "Nova Friburgo", 
    "Nova Friburgo": "Bom Jardim",
    "Teresopolis": "Cachoeiras de Macacu", 
    "Cachoeiras de Macacu": "Sumidouro",
  },
  
  6: {
    "Sao Joao da Barra": "Macae",   
    "Itaperuna": "Miracema",
    "Quissama": "Santo Antonio de Padua",
  },
  7: {
    "Bom Jardim": "Teresopolis",    
    "Valenca": "Pirai", 
    "Nova Friburgo": "Sumidouro",            
  },
  8: {
    "Miracema": "Quissama",         
  },
  9: {
    "Itatiaia": "Volta Redonda",    
  },
  10: {
    "Sumidouro": "Petropolis",      
  },
};


export const PathCities: Record<number, Partial<Record<CityNames, CityNames[]>>> = {
  1: {
    "Rio de Janeiro": ["Niteroi", "Marica"],
    "Niteroi": ["Sao Goncalo"],
    "Sao Goncalo": ["Itaborai"],
    "Duque de Caxias": ["Nova Iguacu", "Belford Roxo"],
    "Nova Iguacu": ["Belford Roxo"],
    "Belford Roxo": ["Sao Joao de Meriti"],
    "Sao Joao de Meriti": ["Nilopolis"],
    
  },
  2: {
    "Cabo Frio": ["Mage", "Arraial do Cabo"],
    "Arraial do Cabo": ["Armacao dos Buzios"],
    "Saquarema": ["Marica"],
  },
  3: {
    "Angra dos Reis": ["Paraty"],
    "Mangaratiba": ["Itaguai"],
  },
  4: {
    "Petropolis": ["Teresopolis"],
    "Teresopolis": ["Nova Friburgo"],
    "Nova Friburgo": ["Cachoeiras de Macacu"],
    "Cachoeiras de Macacu": ["Bom Jardim"],
    "Bom Jardim": ["Sumidouro"],
  },
  5: {
    "Campos dos Goytacazes": ["Sao Joao da Barra", "Macae"],
    "Quissama": ["Itaperuna"],
    "Itaperuna": ["Santo Antonio de Padua"],
    "Santo Antonio de Padua": ["Miracema"],
  },
  6: {
    "Volta Redonda": ["Barra Mansa"],
    "Barra Mansa": ["Resende"],
    "Resende": ["Itatiaia"],
    "Pirai": ["Vassouras"],
    "Vassouras": ["Valenca"],
  },
};