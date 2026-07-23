import { Interface } from 'node:readline';

export type Acao = 'Espelho' | 'Histórico' | 'Editar' | 'Log';

export interface Dados {
  processo: DadosProcesso;
  imovel: Imovel;
  obtencao: DadosObtencao;
  avaliacao: DadosAvaliacao;
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
