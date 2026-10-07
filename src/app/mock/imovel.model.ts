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
  // nomeGrupo: Grupo;
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
  matriculas?: string; // Matrícula(s)
  cpfCnpjProprietario?: string; // CPF/CNPJ Proprietário

  /* ---------- NOVOS (outra parte envolvida) ---------- */
  nomeOutraParte?: string;
  cpfCnpjOutraParte?: string;

  /* ---------- NOVOS (Áreas ha) ---------- */
  areaRegistrada?: number | null; // Registrada (matrícula)
  areaCertificada?: number | null; // Certificada (SNCR)
  areaVisada?: number | null; // VIsada

  /* ---------- NOVOS (Valor estimado — espelho de avaliacao) ---------- */
  vtiMedio?: number | null;
  vtnMedio?: number | null;
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
