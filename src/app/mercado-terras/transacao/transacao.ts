import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';

import { PesquisaImovelCompleto } from '../editar-merdado-de-terras/pesquisaImovelCompleto';

/** Estrutura de uma classe de solo no formulário */
interface ClasseSolo {
  areaHa: number | null;
  percentual: number | null;
  indice: number | null;
}

/** Linha do Inventário de Benfeitorias */
export interface Benfeitoria {
  descricao: string;
  unidadeMedida: string | null;
  quantidade: number | null;
  valorUnitario: number | null;
  depreciacao: number | null;
}

/**
 * Estende o modelo persistido com:
 *  - a lista do inventário de benfeitorias;
 *  - os campos do bloco "Valores do Imóvel".
 */
type DadosComBenfeitorias = PesquisaImovelCompleto & {
  benfeitorias: Benfeitoria[];

  // ---- Bloco Valores do Imóvel ----
  /** Valor total do imóvel (R$) — equivale ao VTI */
  valorImovel: number | null;
  /** Valor das benfeitorias (R$) */
  valorBenfeitorias: number | null;
  /** Área total em hectares (usada em VTI/ha, VTN/ha e nos solos) */
  area: number | null;
  /** Quantidade de parcelas (substitui o antigo qtdParcelas) */
  quantidadeParcelas: number | null;
};

const CLASSES_SOLO = [
  'I',
  'II',
  'III',
  'IV',
  'V',
  'VI',
  'VII',
  'VIII',
] as const;

@Component({
  selector: 'app-transacao',
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatStepperModule,
    MatExpansionModule,
    MatDialogModule,
    MatCardModule,
    MatListModule,
  ],
  templateUrl: './transacao.html',
  styleUrl: './transacao.css',
})
export class Transacao {
  opcoesPrazoPagamento = ['À vista', 'Parcelado'];

  public readonly METADADOS_SOLO: {
    classe: string;
    discriminacao: string;
    indice: number;
  }[] = [
    { classe: 'I', discriminacao: 'Lavoura sem restrições', indice: 1.0 },
    {
      classe: 'II',
      discriminacao: 'Lavoura com práticas simples',
      indice: 0.8,
    },
    {
      classe: 'III',
      discriminacao: 'Lavoura com práticas intensas',
      indice: 0.61,
    },
    {
      classe: 'IV',
      discriminacao: 'Lavoura esporádica e pastos',
      indice: 0.47,
    },
    { classe: 'V', discriminacao: 'Pastagens com restrições', indice: 0.39 },
    {
      classe: 'VI',
      discriminacao: 'Pastagens com práticas simples',
      indice: 0.29,
    },
    {
      classe: 'VII',
      discriminacao:
        'Áreas de uso restrito (florestas, solos extremamente pedregosos/muito rasos, relevo montanhoso)',
      indice: 0.2,
    },
    {
      classe: 'VIII',
      discriminacao:
        'Abrigo da vida silvestre (APP), áreas muito mal drenadas ou com relevo escarpado',
      indice: 0.13,
    },
  ];

  public fonteNotaCcu = '';
  public fonteNotaAcesso = '';
  public readonly CLASSES_SOLO = CLASSES_SOLO;

  // ============================================================
  // ESTADO
  // ============================================================
  public arquivosSelecionados: File[] = [];
  public imagensSelecionadas: File[] = [];
  public dados!: DadosComBenfeitorias;

  // ============================================================
  // OPÇÕES
  // ============================================================
  public opcoesTipoDado = ['Transação', 'Oferta'];
  public opcoesFonte = [
    'Informação de terceiros',
    'Ficha do ITBI',
    'Anúncio impresso ou digital',
    'Placa de venda',
  ];
  public opcoesOrigem = ['Informante', 'Vistoria in loco', 'Vistoria remota'];
  public opcoesAcesso = [
    'Ótimo',
    'Muito Bom',
    'Bom',
    'Regular',
    'Desfavorável',
    'Má',
  ];
  public opcoesSituacao = [
    'otima',
    'muito boa',
    'boa',
    'regular',
    'desfavorável',
    'má',
  ];
  public opcoesEstados = ['BA', 'MG', 'GO', 'MT', 'MS', 'TO', 'PI', 'Outro'];
  public opcoesCidades = ['Bom Jesus da Lapa', 'Riacho de Santana', 'Outra'];
  public opcoesNivel1 = [
    'Terra agrícola',
    'Pecuária',
    'Exploração mista',
    'Produção florestal',
    'Vegetação nativa',
    'Não agrícola',
  ];
  public opcoesNivel2 = [
    'Produção de commodities',
    'Fruticultura',
    'Cafeicultura',
    'Produção diversificada',
    'Cana-de-açúcar',
    'Cultivos agrícolas consorciados',
    'Cerrado',
    'Caatinga',
    'Mata atlântica',
    'Silvicultura',
    'Extrativismo',
    'Baixo nível tecnológico',
    'Médio nível tecnológico',
    'Alto nível tecnológico',
    'Agricultura e pecuária sem integração',
    'Sistemas de integração lavoura-pecuária-floresta',
    'Aquicultura',
    'Mineração',
    'Energia',
    'Urbano',
  ];
  public opcoesCidade = ['Bom Jesus da Lapa', 'Riacho de Santana', 'Outra'];
  public opcoesEnergia = ['Indisponível', 'Monofásica/Bifásica', 'Trifásica'];
  public opcoesHidrica = [
    'metereologica pluvial',
    'dessedentação animal',
    'potencial de irrigação',
    'irrigação presente',
  ];
  public opcoesTecnologia = ['Insuficiente', 'adequado', 'diferenciado'];
  public opcoesConectividade = ['Não', 'Sim'];
  public opcoesBenfeitorias = [
    'Não existem',
    'Insuficientes',
    'adequadas',
    'completas',
  ];
  public opcoesConservacao = [
    'Não existem/sem condições de uso',
    'Necessitam de reparos',
    'adequadas ao uso',
  ];
  public opcoesLocalizacao = [
    'Ótima',
    'Muito Boa',
    'Boa',
    'Regular',
    'Desfavorável',
    'Ruim',
  ];

  public readonly unidadesMedida: string[] = ['m²', 'ud', 'h/maq'];
  public readonly opcoesDepreciacao: number[] = [0.2, 0.4, 0.6, 0.8];

  constructor(
    private router: Router,
    private dialog: MatDialog,
  ) {}

  // ============================================================
  // CICLO DE VIDA
  // ============================================================
  ngOnInit(): void {
    const state = (history.state ?? {}) as Record<string, any>;
    const dadosRecebidos = state['dados'];
    const tipoRecebido: string | undefined = state['tipo'];

    if (dadosRecebidos && dadosRecebidos.id) {
      this.dados = this.mesclarComDefaults(dadosRecebidos);
      return;
    }
    if (tipoRecebido) {
      this.dados = this.criarDadosVazios(tipoRecebido);
      return;
    }
    this.router.navigate(['/lista']);
  }

  // ============================================================
  // GETTERS — Bloco Valores do Imóvel
  // ============================================================
  /** VTN = Valor do Imóvel − Valor das Benfeitorias */
  public get valorTerraNua(): number {
    return (
      (this.dados?.valorImovel ?? 0) - (this.dados?.valorBenfeitorias ?? 0)
    );
  }

  /** VTI/ha = Valor do Imóvel ÷ Área */
  public get vtiPorHa(): number {
    const area = this.dados?.area ?? 0;
    if (!area) return 0;
    return (this.dados?.valorImovel ?? 0) / area;
  }

  /** % de benfeitorias no VTI = Valor das Benfeitorias ÷ VTI (em %) */
  public get percentualBenfeitoriasVti(): number {
    const vti = this.dados?.valorImovel ?? 0;
    if (!vti) return 0;
    return ((this.dados?.valorBenfeitorias ?? 0) / vti) * 100;
  }

  /** VTN/ha = VTN ÷ Área */
  public get vtnPorHa(): number {
    const area = this.dados?.area ?? 0;
    if (!area) return 0;
    return this.valorTerraNua / area;
  }

  /** Fator elasticidade: 1 para Transação, 0,9 para Oferta */
  public get fatorElasticidade(): number {
    return this.dados?.tipoDado === 'Oferta' ? 0.9 : 1;
  }

  // ============================================================
  // HELPERS DE INICIALIZAÇÃO
  // ============================================================
  private criarDadosVazios(tipo: string): DadosComBenfeitorias {
    const classeVazia = (indice: number): ClasseSolo => ({
      areaHa: null,
      percentual: null,
      indice,
    });

    return {
      id: 0,
      imovel: '',
      tipoDado: tipo,
      dataPesquisa: new Date(),
      dataImovel: null,

      rintIbge: '',
      rgiIbge: '',
      fonteElemento: 'Informação de terceiros',
      origemInformacoes: 'Vistoria remota',
      roteiroAcesso: '',

      localizacao: {
        estado: '',
        municipioSede: '',
        distanciaSedeKm: null,
        municipioPolo: '',
        distanciaPoloKm: null,
        acesso: '',
        coordenadas: { longitude: null, latitude: null },
        situacao: '',
        coordenadasTexto: '',
      },

      descricaoFotografia: '',

      identificacao: {
        codigoSncr: '',
        codigoCar: '',
        codigoCertificacao: '',
      },

      avaliacao: {
        notaCcu: null,
        notaAcesso: null,
        notaAgronomica: null,
        fonteNotaCcu: '',
        fonteNotaAcesso: '',
      },

      caracteristicas: {
        percentualMecanizavel: null,
        percentualAbertaPasto: null,
        energia: '',
        disponibilidadeHidrica: '',
        fatorElasticidade: null,
      },

      valores: {
        areaTotalHa: null,
        vti: null,
        benfeitorias: null,
        vtn: null,
        vtiPorHa: null,
        percentualBenfeitoriasVti: null,
        vtnPorHa: null,
      },

      envolvidos: { comprador: '', vendedor: '', informante: '' },

      nivel1: '',
      nivel2: '',
      nivel3: '',

      percAgriculturaSilvicultura: null,
      distanciaEnergiaKm: null,
      areaIrrigada: null,
      tecnologia: '',
      conectividade: '',

      benfeitoriasAtividade: '',
      estadoConservacaoBenfeitorias: '',
      descricaoBenfeitorias: '',
      benfeitorias: [],

      // ---- Bloco Valores do Imóvel ----
      valorImovel: null,
      valorBenfeitorias: null,
      area: null,
      prazoPagamento: null,
      quantidadeParcelas: null,
      taxaJuros: null,

      telefoneInformante: '',
      pesquisadores: '',
      logUsuario: '',
      observacoesGeral: '',

      classeI: classeVazia(1.0),
      classeII: classeVazia(0.8),
      classeIII: classeVazia(0.61),
      classeIV: classeVazia(0.47),
      classeV: classeVazia(0.39),
      classeVI: classeVazia(0.29),
      classeVII: classeVazia(0.2),
      classeVIII: classeVazia(0.13),
    } as DadosComBenfeitorias;
  }

  /** Mescla dados vindos da navegação com valores padrão */
  private mesclarComDefaults(d: any): DadosComBenfeitorias {
    return {
      ...d,

      rintIbge: d.rintIbge ?? '',
      rgiIbge: d.rgiIbge ?? '',
      fonteElemento: d.fonteElemento ?? 'Informação de terceiros',
      origemInformacoes: d.origemInformacoes ?? 'Vistoria remota',
      roteiroAcesso: d.roteiroAcesso ?? '',

      nivel1: d.nivel1 ?? '',
      nivel2: d.nivel2 ?? '',
      nivel3: d.nivel3 ?? '',

      percAgriculturaSilvicultura: d.percAgriculturaSilvicultura ?? null,
      distanciaEnergiaKm: d.distanciaEnergiaKm ?? null,
      areaIrrigada: d.areaIrrigada ?? null,
      tecnologia: d.tecnologia ?? '',
      conectividade: d.conectividade ?? '',

      classeI: this.normalizarClasse(d.classeI, 1.0),
      classeII: this.normalizarClasse(d.classeII, 0.8),
      classeIII: this.normalizarClasse(d.classeIII, 0.61),
      classeIV: this.normalizarClasse(d.classeIV, 0.47),
      classeV: this.normalizarClasse(d.classeV, 0.39),
      classeVI: this.normalizarClasse(d.classeVI, 0.29),
      classeVII: this.normalizarClasse(d.classeVII, 0.2),
      classeVIII: this.normalizarClasse(d.classeVIII, 0.13),

      benfeitoriasAtividade: d.benfeitoriasAtividade ?? '',
      estadoConservacaoBenfeitorias: d.estadoConservacaoBenfeitorias ?? '',
      descricaoBenfeitorias: d.descricaoBenfeitorias ?? '',

      benfeitorias: Array.isArray(d.benfeitorias)
        ? d.benfeitorias.map((b: Partial<Benfeitoria>) =>
            this.normalizarBenfeitoria(b),
          )
        : [],

      // ---- Bloco Valores do Imóvel (com fallback para `valores` legado) ----
      valorImovel: d.valorImovel ?? d.valores?.vti ?? null,
      valorBenfeitorias: d.valorBenfeitorias ?? d.valores?.benfeitorias ?? null,
      area: d.area ?? d.valores?.areaTotalHa ?? null,

      prazoPagamento: d.prazoPagamento ?? null,
      quantidadeParcelas: d.quantidadeParcelas ?? d.qtdParcelas ?? null,
      taxaJuros: d.taxaJuros ?? null,

      telefoneInformante: d.telefoneInformante ?? '',
      pesquisadores: d.pesquisadores ?? '',
      logUsuario: d.logUsuario ?? '',
    } as DadosComBenfeitorias;
  }

  private normalizarClasse(
    classe: Partial<ClasseSolo> | undefined,
    indicePadrao: number,
  ): ClasseSolo {
    return {
      areaHa: classe?.areaHa ?? null,
      percentual: classe?.percentual ?? null,
      indice: classe?.indice ?? indicePadrao,
    };
  }

  private normalizarBenfeitoria(
    b: Partial<Benfeitoria> | undefined,
  ): Benfeitoria {
    return {
      descricao: b?.descricao ?? '',
      unidadeMedida: b?.unidadeMedida ?? null,
      quantidade: b?.quantidade ?? null,
      valorUnitario: b?.valorUnitario ?? null,
      depreciacao: b?.depreciacao ?? null,
    };
  }

  // ============================================================
  // CLASSES DE SOLO
  // ============================================================
  public getClasse(classe: string): ClasseSolo {
    const chave = `classe${classe}`;
    return (this.dados as any)[chave] as ClasseSolo;
  }

  public percentualClasse(classe: string): number {
    const total = this.dados?.area ?? this.dados?.valores?.areaTotalHa ?? 0;
    if (!total || total <= 0) return 0;
    const area = this.getClasse(classe).areaHa ?? 0;
    return (area / total) * 100;
  }

  public calcularNotaSolos(): number {
    const total = this.dados?.area ?? this.dados?.valores?.areaTotalHa ?? 0;
    if (!total || total <= 0) return 0;

    let soma = 0;
    this.METADADOS_SOLO.forEach((m) => {
      const area = this.getClasse(m.classe).areaHa ?? 0;
      const percentual = area / total;
      soma += percentual * m.indice;
    });
    return Number(soma.toFixed(4));
  }

  // ============================================================
  // INVENTÁRIO DE BENFEITORIAS
  // ============================================================
  public calcularValorTotal(item: Benfeitoria): number {
    return (item.quantidade ?? 0) * (item.valorUnitario ?? 0);
  }

  public calcularValorFinal(item: Benfeitoria): number {
    const base = this.calcularValorTotal(item);
    if (item.depreciacao == null) return base;
    return base * item.depreciacao;
  }

  public totalBenfeitorias(): number {
    return (this.dados?.benfeitorias ?? []).reduce(
      (acc, item) => acc + this.calcularValorFinal(item),
      0,
    );
  }

  public adicionarBenfeitoria(): void {
    if (!this.dados.benfeitorias) this.dados.benfeitorias = [];
    this.dados.benfeitorias.push({
      descricao: '',
      unidadeMedida: null,
      quantidade: null,
      valorUnitario: null,
      depreciacao: null,
    });
  }

  public removerBenfeitoria(index: number): void {
    this.dados.benfeitorias.splice(index, 1);
  }

  // ============================================================
  // AÇÕES
  // ============================================================
  public salvar(): void {
    // Sincroniza os novos campos com a estrutura `valores` legada
    if (this.dados.valores) {
      this.dados.valores.vti = this.dados.valorImovel;
      this.dados.valores.areaTotalHa = this.dados.area;
      this.dados.valores.benfeitorias =
        this.dados.valorBenfeitorias ?? this.totalBenfeitorias();
      this.dados.valores.vtn = this.valorTerraNua;
      this.dados.valores.vtiPorHa = this.vtiPorHa;
      this.dados.valores.percentualBenfeitoriasVti =
        this.percentualBenfeitoriasVti;
      this.dados.valores.vtnPorHa = this.vtnPorHa;
    }

    // Mantém o fator de elasticidade coerente com o tipo de dado
    if (this.dados.caracteristicas) {
      this.dados.caracteristicas.fatorElasticidade = this.fatorElasticidade;
    }

    // Backward-compat: mantém o antigo nome `qtdParcelas` populado
    (this.dados as any).qtdParcelas = this.dados.quantidadeParcelas;

    console.log('Dados salvos:', this.dados);
    // TODO: enviar para API
    this.router.navigate(['/mercado-terras']);
  }

  public cancelar(): void {
    this.router.navigate(['/mercado-terras']);
  }

  // ============================================================
  // DIÁLOGOS
  // ============================================================
  public abrirOrdemServico(): void {
    /* ... */
  }
  public abrirResolucaoCdr(): void {
    /* ... */
  }
  public abrirPortariaCdr(): void {
    /* ... */
  }
  public abrirResolucaoCd(): void {
    /* ... */
  }
  public abrirPortariaCd(): void {
    /* ... */
  }

  // ============================================================
  // UPLOAD
  // ============================================================
  public onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const files: FileList | null = input.files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const existe = this.arquivosSelecionados.some(
          (f) => f.name === files[i].name && f.size === files[i].size,
        );
        if (!existe) this.arquivosSelecionados.push(files[i]);
      }
    }
    input.value = '';
  }

  public removerArquivo(index: number): void {
    this.arquivosSelecionados.splice(index, 1);
  }

  public enviarArquivos(): void {
    const formData = new FormData();
    this.arquivosSelecionados.forEach((file) => {
      formData.append('anexos', file, file.name);
    });
    // this.uploadService.upload(formData).subscribe(...);
  }

  public onImagemSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const files: FileList | null = input.files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (!file.type.startsWith('image/')) continue;
        const existe = this.imagensSelecionadas.some(
          (f) => f.name === file.name && f.size === file.size,
        );
        if (!existe) this.imagensSelecionadas.push(file);
      }
    }
    input.value = '';
  }

  public removerImagem(index: number): void {
    this.imagensSelecionadas.splice(index, 1);
  }
}
