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
  percentual: number | null;
  indice: number | null;
  localizacao: string;
}

/** Lista fixa das classes usadas no template */
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
  selector: 'app-opiniao',
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
  templateUrl: './opiniao.html',
  styleUrl: './opiniao.css',
})
export class Opiniao implements OnInit {
  // ============================================================
  // ESTADO DO COMPONENTE
  // ============================================================
  public arquivosSelecionados: File[] = [];

  /** Dados do formulário (carregados via navegação) */
  public dados!: PesquisaImovelCompleto;

  /** Localização geral aplicada em massa às classes */
  public localizacaoGeral: string = '';

  // ============================================================
  // OPÇÕES DOS COMBOBOXES
  // ============================================================
  public opcoesTipoDado = ['Transação', 'Oferta', 'Opinião'];

  public opcoesFonte = [
    'Informação de terceiros',
    'Vistoria in loco',
    'Documental',
    'Outra',
  ];

  public opcoesOrigem = [
    'Vistoria remota',
    'Vistoria in loco',
    'Pesquisa documental',
    'Outra',
  ];

  public opcoesAcesso = [
    'Ótimo',
    'Muito Bom',
    'Bom',
    'Regular',
    'Desfavorável',
    'Má',
  ];

  public opcoesNivel1 = ['Pecuária', 'Agricultura', 'Silvicultura', 'Outra'];

  public opcoesNivel2 = [
    'Baixo nível tecnológico',
    'Médio nível tecnológico',
    'Alto nível tecnológico',
  ];

  public opcoesCidade = ['Bom Jesus da Lapa', 'Riacho de Santana', 'Outra'];

  public opcoesEnergia = [
    'Monofásica/Bifásica',
    'Trifásica',
    'Insuficiente',
    'Indisponível',
  ];

  public opcoesHidrica = [
    'dessedentação animal',
    'potencial de irrigação',
    'meteorológica/pluvial',
  ];

  public opcoesTecnologia = ['Insuficiente', 'Médio', 'Avançado'];

  public opcoesConectividade = ['Sim', 'Não'];

  public opcoesBenfeitorias = ['Insuficientes', 'Suficientes', 'Ótimas'];

  public opcoesConservacao = ['Necessitam de reparos', 'Bom', 'Ótimo', 'Ruim'];

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
    const classeVazia = (): ClasseSolo => ({
      percentual: null,
      indice: null,
      localizacao: '',
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
      },

      identificacao: {
        codigoSncr: '',
        codigoCar: '',
        codigoCertificacao: '',
      },

      avaliacao: {
        notaCcu: null,
        notaAcesso: null,
        notaAgronomica: null,
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

      prazoPagamento: null,
      qtdParcelas: null,
      taxaJuros: null,

      telefoneInformante: '',
      pesquisadores: '',
      logUsuario: '',
      observacoesGeral: '',

      classeI: classeVazia(),
      classeII: classeVazia(),
      classeIII: classeVazia(),
      classeIV: classeVazia(),
      classeV: classeVazia(),
      classeVI: classeVazia(),
      classeVII: classeVazia(),
      classeVIII: classeVazia(),
    } as PesquisaImovelCompleto;
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
      classeI: this.normalizarClasse(d.classeI),
      classeII: this.normalizarClasse(d.classeII),
      classeIII: this.normalizarClasse(d.classeIII),
      classeIV: this.normalizarClasse(d.classeIV),
      classeV: this.normalizarClasse(d.classeV),
      classeVI: this.normalizarClasse(d.classeVI),
      classeVII: this.normalizarClasse(d.classeVII),
      classeVIII: this.normalizarClasse(d.classeVIII),

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
  ): ClasseSolo {
    return {
      percentual: classe?.percentual ?? null,
      indice: classe?.indice ?? null,
      localizacao: classe?.localizacao ?? '',
    };
  }

  // ============================================================
  // HELPERS DE TEMPLATE
  // ============================================================
  /** Acessa uma classe pelo nome, de forma tipada (usado no template) */
  public getClasse(classe: string): ClasseSolo {
    const chave = `classe${classe}`;
    return (this.dados as any)[chave] as ClasseSolo;
  }

  /** Aplica a localização geral a todas as classes */
  public atualizarLocalizacaoClasses(): void {
    CLASSES_SOLO.forEach((cls) => {
      const chave = `classe${cls}`;
      const classe = (this.dados as any)[chave] as ClasseSolo | undefined;
      if (classe) {
        classe.localizacao = this.localizacaoGeral;
      }
    });
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
}
