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

export type Acao = 'Espelho' | 'Histórico' | 'Editar';
