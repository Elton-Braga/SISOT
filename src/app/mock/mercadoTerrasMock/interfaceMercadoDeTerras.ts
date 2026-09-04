export interface PesquisaImovel {
  id: number;
  imovel: string;
  tipoDado: string;

  dataPesquisa: Date | null;
  dataImovel: Date | null;

  localizacao: LocalizacaoImovel;
  valores: ValoresImovel;
  caracteristicas: CaracteristicasImovel;
  avaliacao: AvaliacaoImovel;
  identificacao: IdentificacaoImovel;
  envolvidos: EnvolvidosImovel;

  observacoesGeral: string;
}

export interface LocalizacaoImovel {
  estado: string;
  municipioSede: string;
  distanciaSedeKm: number | null;

  municipioPolo: string;
  distanciaPoloKm: number | null;

  acesso: string;

  coordenadas: Coordenadas;
}

export interface Coordenadas {
  longitude: number | null;
  latitude: number | null;
}

export interface ValoresImovel {
  areaTotalHa: number | null;

  vti: number | null;
  benfeitorias: number | null;
  vtn: number | null;

  vtiPorHa: number | null;
  vtnPorHa: number | null;

  percentualBenfeitoriasVti: number | null;
}

export interface CaracteristicasImovel {
  fatorElasticidade: number | null;

  percentualMecanizavel: number | null;
  percentualAbertaPasto: number | null;

  energia: string;
  disponibilidadeHidrica: string;
}

export interface AvaliacaoImovel {
  notaCcu: number | null;
  notaAgronomica: number | null;
  notaAcesso: number | null;
}

export interface EnvolvidosImovel {
  vendedor: string;
  comprador: string;
  informante: string;
}

export interface IdentificacaoImovel {
  codigoSncr: string;
  codigoCar: string;
  codigoCertificacao: string;
}
