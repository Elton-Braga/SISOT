export interface Estado {
  id: number; // código IBGE (ex.: 35 = SP)
  sigla: string; // UF (ex.: "SP")
  nome: string; // (ex.: "São Paulo")
}

export interface Municipio {
  id: number; // código IBGE do município
  nome: string;
  /** Presente no retorno do IBGE quando filtrado por UF */
  microrregiao?: {
    mesorregiao?: {
      UF?: { id: number; sigla: string; nome: string };
    };
  };
}
