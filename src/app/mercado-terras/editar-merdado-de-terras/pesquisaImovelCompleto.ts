import { PesquisaImovel } from '../../mock/mercadoTerrasMock/interfaceMercadoDeTerras';

export interface PesquisaImovelCompleto extends PesquisaImovel {
  // ⚠️ NÃO redeclarar campos que já existem em PesquisaImovel:
  // rintIbge, rgiIbge, fonteElemento, origemInformacoes, roteiroAcesso,
  // telefoneInformante, pesquisadores, logUsuario, descricaoFotografia.

  // --- Campos exclusivos deste formulário ---
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
  descricaoBenfeitorias?: string;

  // --- Classes de solo ---
  classeI?: ClasseSolo;
  classeII?: ClasseSolo;
  classeIII?: ClasseSolo;
  classeIV?: ClasseSolo;
  classeV?: ClasseSolo;
  classeVI?: ClasseSolo;
  classeVII?: ClasseSolo;
  classeVIII?: ClasseSolo;

  prazoPagamento?: number | null;
  qtdParcelas?: number | null;
  taxaJuros?: number | null;

  // ⭐ Assinatura de índice (permite acesso dinâmico com dados['classe' + classe])
  [key: string]: any;
}

/** Extrai a estrutura repetida das classes — evita duplicação */
export interface ClasseSolo {
  areaHa: number | null;
  percentual: number | null;
  indice: number | null;
}
