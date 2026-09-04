import { PesquisaImovel } from '../../mock/mercadoTerrasMock/interfaceMercadoDeTerras';

export interface PesquisaImovelCompleto extends PesquisaImovel {
  // Campos adicionais
  rintIbge?: string;
  rgiIbge?: string;
  fonteElemento?: string;
  origemInformacoes?: string;
  roteiroAcesso?: string;
  nivel1?: string;
  nivel2?: string;
  nivel3?: string;
  percAgriculturaSilvicultura?: number | null;
  distanciaEnergiaKm?: number | null;
  areaIrrigada?: number | null;
  tecnologia?: string;
  conectividade?: string;
  benfeitoriasAtividade?: string;
  estadoConservacaoBenfeitorias?: string;

  // Classes (cada uma com percentual, indice e localizacao)
  classeI?: {
    percentual: number | null;
    indice: number | null;
    localizacao?: string;
  };
  classeII?: {
    percentual: number | null;
    indice: number | null;
    localizacao?: string;
  };
  classeIII?: {
    percentual: number | null;
    indice: number | null;
    localizacao?: string;
  };
  classeIV?: {
    percentual: number | null;
    indice: number | null;
    localizacao?: string;
  };
  classeV?: {
    percentual: number | null;
    indice: number | null;
    localizacao?: string;
  };
  classeVI?: {
    percentual: number | null;
    indice: number | null;
    localizacao?: string;
  };
  classeVII?: {
    percentual: number | null;
    indice: number | null;
    localizacao?: string;
  };
  classeVIII?: {
    percentual: number | null;
    indice: number | null;
    localizacao?: string;
  };

  prazoPagamento?: number | null;
  qtdParcelas?: number | null;
  taxaJuros?: number | null;
  descricaoBenfeitorias?: string;
  telefoneInformante?: string;
  pesquisadores?: string;
  logUsuario?: string;

  // ⭐ Assinatura de índice (permite acesso dinâmico com dados['classe' + classe])
  [key: string]: any;
}
