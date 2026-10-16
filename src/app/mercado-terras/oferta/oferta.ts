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
/** Estrutura de uma classe de solo no formulário */
interface ClasseSolo {
  /** Área digitada da classe, em hectares */
  areaHa: number | null;
  /** % da área (calculado: areaHa / areaTotalHa) */
  percentual: number | null;
  /** Índice fixo da classe (vem da tabela) */
  indice: number | null;
}

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
  selector: 'app-oferta',
  standalone: true,
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
  templateUrl: './oferta.html',
  styleUrl: './oferta.css',
})
export class Oferta implements OnInit {
  /** Metadados fixos de cada classe de solo (discriminação + índice) */
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
  // em oferta.ts, junto com os outros state fields
  public fonteNotaCcu = '';
  public fonteNotaAcesso = '';
  public readonly CLASSES_SOLO = CLASSES_SOLO;
  // ============================================================
  // ESTADO DO COMPONENTE
  // ============================================================
  public arquivosSelecionados: File[] = [];
  public imagensSelecionadas: File[] = []; // <-- ADICIONAR

  /** Dados do formulário (carregados via navegação) */
  public dados!: PesquisaImovelCompleto;

  /** Localização geral aplicada em massa às classes */
  //public localizacaoGeral: string = '';
  // ============================================================
  // OPÇÕES DOS COMBOBOXES
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

  /** 2º nível — tipologia detalhada */
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

  constructor(
    private router: Router,
    private dialog: MatDialog,
  ) {}

  // ============================================================
  // CICLO DE VIDA
  // ============================================================
  ngOnInit(): void {
    // Em ngOnInit a navegação já terminou — leia do history.state
    const state = (history.state ?? {}) as Record<string, any>;
    const dadosRecebidos = state['dados'];
    const tipoRecebido: string | undefined = state['tipo'];

    // --- Fluxo 1: EDIÇÃO (veio um objeto com id) ---
    if (dadosRecebidos && dadosRecebidos.id) {
      this.dados = this.mesclarComDefaults(dadosRecebidos);
      return;
    }

    // --- Fluxo 2: NOVA PESQUISA (veio só o tipo) ---
    if (tipoRecebido) {
      this.dados = this.criarDadosVazios(tipoRecebido);
      return;
    }

    // --- Fallback: nada foi informado → volta para a lista ---
    this.router.navigate(['/lista']);
  }

  // ============================================================
  // HELPERS DE INICIALIZAÇÃO
  // ============================================================
  /** Cria um objeto em branco para uma nova pesquisa */
  private criarDadosVazios(tipo: string): PesquisaImovelCompleto {
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

      // --- Cadastro / identificação ---
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

      // --- Fotografia ---
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

      // --- Níveis categóricos ---
      nivel1: '',
      nivel2: '',
      nivel3: '',

      // --- Características extras ---
      percAgriculturaSilvicultura: null,
      distanciaEnergiaKm: null,
      areaIrrigada: null,
      tecnologia: '',
      conectividade: '',

      // --- Benfeitorias ---
      benfeitoriasAtividade: '',
      estadoConservacaoBenfeitorias: '',
      descricaoBenfeitorias: '',

      // --- Pagamento ---
      prazoPagamento: null,
      qtdParcelas: null,
      taxaJuros: null,

      // --- Contato / auditoria ---
      telefoneInformante: '',
      pesquisadores: '',
      logUsuario: '',

      observacoesGeral: '',

      // --- Classes de solo ---
      classeI: classeVazia(1.0),
      classeII: classeVazia(0.8),
      classeIII: classeVazia(0.61),
      classeIV: classeVazia(0.47),
      classeV: classeVazia(0.39),
      classeVI: classeVazia(0.29),
      classeVII: classeVazia(0.2),
      classeVIII: classeVazia(0.13),
    };
  }

  /** Mescla os dados vindos da navegação com valores padrão */
  private mesclarComDefaults(d: any): PesquisaImovelCompleto {
    return {
      ...d,

      // Identificação / Cadastro
      rintIbge: d.rintIbge ?? '',
      rgiIbge: d.rgiIbge ?? '',
      fonteElemento: d.fonteElemento ?? 'Informação de terceiros',
      origemInformacoes: d.origemInformacoes ?? 'Vistoria remota',
      roteiroAcesso: d.roteiroAcesso ?? '',

      // Níveis categóricos
      nivel1: d.nivel1 ?? '',
      nivel2: d.nivel2 ?? '',
      nivel3: d.nivel3 ?? '',

      // Características
      percAgriculturaSilvicultura: d.percAgriculturaSilvicultura ?? null,
      distanciaEnergiaKm: d.distanciaEnergiaKm ?? null,
      areaIrrigada: d.areaIrrigada ?? null,
      tecnologia: d.tecnologia ?? '',
      conectividade: d.conectividade ?? '',

      // Nota solos (classes dinâmicas)
      classeI: this.normalizarClasse(d.classeI, 1.0),
      classeII: this.normalizarClasse(d.classeII, 0.8),
      classeIII: this.normalizarClasse(d.classeIII, 0.61),
      classeIV: this.normalizarClasse(d.classeIV, 0.47),
      classeV: this.normalizarClasse(d.classeV, 0.39),
      classeVI: this.normalizarClasse(d.classeVI, 0.29),
      classeVII: this.normalizarClasse(d.classeVII, 0.2),
      classeVIII: this.normalizarClasse(d.classeVIII, 0.13),

      // Inventário das Benfeitorias
      benfeitoriasAtividade: d.benfeitoriasAtividade ?? '',
      estadoConservacaoBenfeitorias: d.estadoConservacaoBenfeitorias ?? '',
      descricaoBenfeitorias: d.descricaoBenfeitorias ?? '',

      // Valores
      prazoPagamento: d.prazoPagamento ?? null,
      qtdParcelas: d.qtdParcelas ?? null,
      taxaJuros: d.taxaJuros ?? null,

      // Envolvidos
      telefoneInformante: d.telefoneInformante ?? '',
      pesquisadores: d.pesquisadores ?? '',
      logUsuario: d.logUsuario ?? '',
    } as PesquisaImovelCompleto;
  }

  /** Garante que uma classe de solo tenha a estrutura esperada */
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

  /** Acessa uma classe pelo nome, de forma tipada (usado no template) */
  public getClasse(classe: string): ClasseSolo {
    const chave = `classe${classe}`;
    return (this.dados as any)[chave] as ClasseSolo;
  }

  /** Aplica a localização geral a todas as classes */

  /** Retorna o % da área de uma classe, em relação à área total do imóvel */
  public percentualClasse(classe: string): number {
    const total = this.dados?.valores?.areaTotalHa ?? 0;
    if (!total || total <= 0) return 0;

    const area = this.getClasse(classe).areaHa ?? 0;
    return (area / total) * 100;
  }

  /** Calcula a Nota solos = Σ (%área × índice), com 4 casas decimais */
  public calcularNotaSolos(): number {
    const total = this.dados?.valores?.areaTotalHa ?? 0;
    if (!total || total <= 0) return 0;

    let soma = 0;
    this.METADADOS_SOLO.forEach((m) => {
      const area = this.getClasse(m.classe).areaHa ?? 0;
      const percentual = area / total; // fração (0–1)
      soma += percentual * m.indice;
    });

    // Arredonda apenas no final, para 4 casas
    return Number(soma.toFixed(4));
  }

  // ============================================================
  // AÇÕES
  // ============================================================
  public salvar(): void {
    console.log('Dados salvos:', this.dados);
    // TODO: enviar para API
    this.router.navigate(['/mercado-terras']);
  }

  public cancelar(): void {
    this.router.navigate(['/mercado-terras']);
  }

  // ============================================================
  // DIÁLOGOS (mantidos)
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
  // UPLOAD DE ARQUIVOS
  // ============================================================
  public onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const files: FileList | null = input.files;

    if (files) {
      for (let i = 0; i < files.length; i++) {
        const existe = this.arquivosSelecionados.some(
          (f) => f.name === files[i].name && f.size === files[i].size,
        );
        if (!existe) {
          this.arquivosSelecionados.push(files[i]);
        }
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

  // ============================================================
  // UPLOAD DE IMAGENS
  // ============================================================
  public onImagemSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const files: FileList | null = input.files;

    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        // Aceita apenas imagens (reforço da validação do accept)
        if (!file.type.startsWith('image/')) {
          continue;
        }

        const existe = this.imagensSelecionadas.some(
          (f) => f.name === file.name && f.size === file.size,
        );
        if (!existe) {
          this.imagensSelecionadas.push(file);
        }
      }
    }

    input.value = '';
  }

  public removerImagem(index: number): void {
    this.imagensSelecionadas.splice(index, 1);
  }
}
