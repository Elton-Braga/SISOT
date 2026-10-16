export interface PesquisaImovel {
  id: number;
  imovel: string;
  tipoDado: string;

  dataPesquisa: Date | null;
  dataImovel: Date | null;

  // --- Cadastro / identificação (novos) ---
  rintIbge: string;
  rgiIbge: string;
  fonteElemento: string;
  origemInformacoes: string;
  roteiroAcesso: string;

  localizacao: LocalizacaoImovel;
  valores: ValoresImovel;
  caracteristicas: CaracteristicasImovel;
  avaliacao: AvaliacaoImovel;
  identificacao: IdentificacaoImovel;
  envolvidos: EnvolvidosImovel;

  // --- Contato / auditoria (novos) ---
  telefoneInformante: string;
  pesquisadores: string;
  logUsuario: string;

  // --- Fotografia (novo) ---
  descricaoFotografia: string;

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
  situacao: string;
  coordenadasTexto: string;
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
  notaAcesso: number | null;
  notaAgronomica: number | null; // mantido (será substituído por "nota solos" via classes)
  fonteNotaCcu: string; // <-- novo
  fonteNotaAcesso: string; // <-- novo
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
