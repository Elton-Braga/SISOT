/* =========================================================
   INTERFACES / MODELOS
   ========================================================= */

export type Acao = 'Espelho' | 'Histórico' | 'Editar' | 'Log';

export interface Dados {
  processo: DadosProcesso;
  imovel: Imovel;
  obtencao: DadosObtencao;
  avaliacao: DadosAvaliacao;
  resolucaoCdr: ResolucaoCdr;

  /* ---------- Fase 2 — Instrução básica ---------- */
  instrucaoBasica?: InstrucaoBasica;
}

export interface Grupo {
  nome: string;
  imoveis: Dados[];
  source?: 'saved' | 'mock';
}

export interface DadosProcesso {
  fase: any;
  processualPecaDocumento: string;
  data: any;
  campoComplementar: string;
  defineFase: string;
  obrigatorio: string;
  responsavel: string;
  temPrazo: string;
  observacoes: string;
}

export interface Imovel {
  sr: string;
  imovel: string;
  sncr: string;
  areaHa: number | null;
  proprietario: string;
  processo: string;
  modalidade: string;
  situacao: string;
  municipio: string;
  uf: string;
  acoes: Acao[];

  /* ---------- NOVOS (busca no SNCR) ---------- */
  matriculas?: string;
  cpfCnpjProprietario?: string;

  /* ---------- NOVOS (outra parte envolvida) ---------- */
  nomeOutraParte?: string;
  cpfCnpjOutraParte?: string;

  /* ---------- NOVOS (Áreas ha) ---------- */
  areaRegistrada?: number | null;
  areaCertificada?: number | null;
  areaVisada?: number | null;

  /* ---------- NOVOS (Valor estimado) ---------- */
  vtiMedio?: number | null;
  vtnMedio?: number | null;

  /* ---------- Fase 2 — fallbacks opcionais (busca SNCR/SICAR) ---------- */
  espelhoSncr?: string;
  demonstrativoSicar?: string;
  arquivoVetorialShp?: string;
  mapaImpresso?: string;
  memorialDescritivo?: string;
}

/* =========================================================
   Fase 2 — Instrução básica
   ========================================================= */
export interface InstrucaoBasica {
  espelhoImovelSncr: string;
  espelhoImovelSncrAnexo?: string;

  demonstrativoImovelSicar: string;
  demonstrativoImovelSicarAnexo?: string;

  matriculas: string;
  matriculasAnexo?: string;

  arquivoVetorialShp: string;
  arquivoVetorialShpAnexo?: string;

  mapaImpresso: string;
  mapaImpressoAnexo?: string;

  memorialDescritivo: string;
  memorialDescritivoAnexo?: string;

  observacao: string;
}

export interface DadosObtencao {
  processoSei: string;
  situacao: string;
  entidadeDemandante: string;
  processoCadeiaDominial?: string;
  formaObtencao: string;
  acampamentoVinculado?: string;
  imovelOcupado: boolean;
  orgaoConcorrente: string;
  capacidadeAssentamento: number;
  acoesReintegracao?: string;
  familiasCadastradas?: number;
  grupo: any;
}

export interface DadosAvaliacao {
  valorTotalImovelInferior: number;
  valorTotalImovelMedio: number;
  valorTotalImovelSuperior: number;
  valorTotalNegociado?: number;
  valorTerraNuaInferior: number;
  valorTerraNuaMedio: number;
  valorTerraNuaSuperior: number;
  valorBenfeitorias: number;
  valorPassivoAmbiental: number;
  valorAtivoAmbiental: number;
}

export interface ResolucaoCdr {
  idResolucaoCdr: string;
  dataResolucaoCdr: Date | null;
  dataReuniaoCdr: Date | null;
  consideracoes: string[];
  consideracaoFinal: string;
  area: number;
  valorTotal: number;
  valorTotalPorExtenso: string;
  valorTda: number;
  valorTdaPorExtenso: string;
  valorMoeda: number;
  valorMoedaPorExtenso: string;
  prazo: string;
  responsavelPagamento: string;
  cpfResponsavel: string;
}
