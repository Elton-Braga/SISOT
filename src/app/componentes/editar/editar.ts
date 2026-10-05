import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import { Dados } from '../../mock/imovel.model';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { OrdemServico } from './ordem-servico/ordem-servico';
import { ResolucaoCdr } from './resolucao-cdr/resolucao-cdr';
import { PortariaCdr } from './portaria-cdr/portaria-cdr';
import { PortariaCd } from './portaria-cd/portaria-cd';
import { ResolucaoCd } from './resolucao-cd/resolucao-cd';
import { EmitirLaudo } from './emitir-laudo/emitir-laudo';
import { MatTableModule } from '@angular/material/table';

export interface NotaEmpenho {
  numero: string;
  valor: number;
  dataEmissao: string | Date;
  anexo?: string;
}

export interface ProjetoAssentamento {
  codigo: string;
  nome: string;
  dataCriacao: string;
  situacao: string;
}

export interface RegistroMatricula {
  protocolo: string;
  situacao: string;
  matricula: string;
  anexo?: string;
}

export interface RegistroSpunet {
  numeroRip: string;
  proprietarioTitular: string;
  situacaoImovel: string;
  pendencias: string;
  anexo?: string;
}

/* ---------------------------------------------------------
   MOCK FIXO — Fase 13
--------------------------------------------------------- */
const PA_FIXO: ProjetoAssentamento[] = [
  {
    codigo: 'PA-0001',
    nome: 'Projeto de Assentamento Surubim',
    dataCriacao: '15/03/2010',
    situacao: 'Ativo',
  },
  {
    codigo: 'PA-0002',
    nome: 'Projeto de Assentamento Surubim II',
    dataCriacao: '22/08/2014',
    situacao: 'Em criação',
  },
];

const MATRICULA_FIXO: RegistroMatricula[] = [
  {
    protocolo: 'PROT-2026-000123',
    situacao: 'Em andamento',
    matricula: 'Matrícula nº 12.345 – Cartório de Xinguara/PA',
    anexo: 'matricula-surubim.pdf',
  },
  {
    protocolo: 'PROT-2025-009876',
    situacao: 'Concluído',
    matricula: 'Matrícula nº 9.876 – Cartório de Coelho Neto/MA',
    anexo: 'matricula-baixa-fria.pdf',
  },
];

const SPUNET_FIXO: RegistroSpunet[] = [
  {
    numeroRip: '0000.1478523697-12',
    proprietarioTitular: 'União',
    situacaoImovel: 'Ativo',
    pendencias: 'Validar cadastro SPIUNet',
    anexo: 'spunet-surubim.pdf',
  },
  {
    numeroRip: '0000.7578523698-12',
    proprietarioTitular: 'Autarquia/Fundação',
    situacaoImovel: 'Aguardando homologação',
    pendencias: 'Aguardando sincronização SPIUNet',
    anexo: 'spunet-bloco16.pdf',
  },
];

@Component({
  selector: 'app-editar',
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
    MatRadioModule,
    MatTableModule,
  ],
  templateUrl: './editar.html',
  styleUrl: './editar.css',
})
export class Editar implements OnInit {
  public dados!: Dados;

  public colunasNotaEmpenho: string[] = [
    'numero',
    'valor',
    'dataEmissao',
    'anexo',
  ];
  public notasEmpenho: NotaEmpenho[] = [];
  projetosAssentamento: ProjetoAssentamento[] = [];
  registrosMatricula: RegistroMatricula[] = [];
  registrosSpunet: RegistroSpunet[] = [];

  public scdpHabilitado = false;

  /* -------------------------------------------------------
     Fase 0 — propriedades originais
  ------------------------------------------------------- */
  public modalidadeObtencao = '';
  public ufSelecionada = '';
  public municipioSelecionado = '';
  public imovelOcupado: 'sim' | 'nao' | '' = '';

  /* -------------------------------------------------------
     FASE 0 → refletem nas Seções 1 e 2 (NOVAS)
  ------------------------------------------------------- */
  public nomeImovel = '';
  public codigoSncr = '';
  public matricula = '';
  public nomeProprietario = '';
  public cpfCnpjProprietario = '';

  public areaRegistrada: number | null = null;
  public areaCertificada: number | null = null; // vira "Medida" na Seção 1
  public areaVisada: number | null = null;

  public vtiMedio: number | null = null;
  public vtnMedio: number | null = null;

  public entidadeDemandante = '';
  public acampamentoVinculado = '';
  public acoesReintegracao = '';
  public orgaoConcorrente = '';
  public familiasCadastradas: number | null = null;

  /* -------------------------------------------------------
     FASE 1 → reflete na Seção 4 (NOVO)
  ------------------------------------------------------- */
  public processoSei = '';

  /* -------------------------------------------------------
     Fase atual do stepper → Seção 4 (NOVO)
  ------------------------------------------------------- */
  public faseAtualProcesso = 'Fase 0 - Análise Inicial';

  /** Lista de UFs (mock) */
  public ufs: string[] = [
    'AC',
    'AL',
    'AP',
    'AM',
    'BA',
    'CE',
    'DF',
    'ES',
    'GO',
    'MA',
    'MT',
    'MS',
    'MG',
    'PA',
    'PB',
    'PR',
    'PE',
    'PI',
    'RJ',
    'RN',
    'RS',
    'RO',
    'RR',
    'SC',
    'SP',
    'SE',
    'TO',
  ];

  /** Lista de municípios (mock) */
  public municipios: string[] = [
    'Xinguara',
    'Marabá',
    'Altamira',
    'Santarém',
    'Belém',
    'Coelho Neto',
  ];

  /** Lista de órgãos (mock) */
  public orgaos: string[] = [
    'INCRA',
    'SPU',
    'Ministério Público Federal',
    'Defensoria Pública da União',
    'Prefeitura Municipal',
    'Governo do Estado',
    'Outro',
  ];

  constructor(
    private router: Router,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    const navigation = this.router.getCurrentNavigation();
    const dadosRecebidos =
      navigation?.extras?.state?.['dados'] ?? history.state?.['dados'];

    if (
      !dadosRecebidos ||
      !dadosRecebidos.processo ||
      !dadosRecebidos.imovel ||
      !dadosRecebidos.obtencao ||
      !dadosRecebidos.avaliacao
    ) {
      this.router.navigate(['/lista']);
      return;
    }

    this.dados = dadosRecebidos;

    this.carregarFase13(this.dados);
    this.carregarNotasEmpenho(this.dados);
  }

  /* -------------------------------------------------------
     Stepper — sincroniza "Fase atual do processo"
  ------------------------------------------------------- */
  onStepChange(event: any): void {
    const idx: number = event?.selectedIndex ?? 0;
    const labels = [
      'Fase 0 - Análise Inicial',
      'Fase 1 - Abertura de Processo',
      'Fase 2 - Instrução básica',
      'Fase 3 - Elaboração de Laudos',
      'Fase 4 - Negociação de Compra e Venda',
      'Fase 5 - Publicidade da Proposta',
      'Fase 6 - Consulta sobreposição de interesses públicos',
      'Fase 7 - Análise da Cadeia Dominial',
      'Fase 8 - Emissão de Parecer Técnico Revisor',
      'Fase 9 - Deliberação do CDR',
      'Fase 10 - Deliberação do CD',
      'Fase 11 - Atos para Pagamento',
      'Fase 12 - Escrituração e Registro',
      'Fase 13 - Destinação do Imóvel',
    ];
    this.faseAtualProcesso = labels[idx] ?? '';
  }

  /* -------------------------------------------------------
     FASE 13 — dados fixos (mock)
  ------------------------------------------------------- */
  private carregarFase13(_dados: any): void {
    this.projetosAssentamento = PA_FIXO.slice(0, 1);
    this.registrosMatricula = MATRICULA_FIXO.slice(0, 1);
    this.registrosSpunet = SPUNET_FIXO.slice(0, 1);
  }

  /* -------------------------------------------------------
     ANEXOS
  ------------------------------------------------------- */
  selecionarAnexoMatricula(index: number): void {
    const nome = prompt('Nome do arquivo (simulação):', 'matricula.pdf');
    if (nome) {
      this.registrosMatricula[index].anexo = nome;
      this.registrosMatricula = [...this.registrosMatricula];
    }
  }

  selecionarAnexoSpunet(index: number): void {
    const nome = prompt('Nome do PDF SPUNet (simulação):', 'spunet.pdf');
    if (nome) {
      this.registrosSpunet[index].anexo = nome;
      this.registrosSpunet = [...this.registrosSpunet];
    }
  }

  private carregarNotasEmpenho(dados: any): void {
    const json: any[] =
      dados?.notasEmpenho ??
      dados?.empenhos ??
      dados?.fase11?.notasEmpenho ??
      [];

    this.notasEmpenho = json.map((item) => ({
      numero: item.codigo ?? item.numero ?? '',
      valor: Number(item.valor ?? item.valorEmpenho ?? 0),
      dataEmissao: item.data ?? item.dataEmissao ?? '',
      anexo: item.anexo ?? item.arquivo ?? '',
    }));
  }

  adicionarNotaEmpenho(): void {
    this.notasEmpenho = [
      ...this.notasEmpenho,
      { numero: '', valor: 0, dataEmissao: '', anexo: '' },
    ];
  }

  abrirOrdemServico(): void {
    const dialogRef = this.dialog.open(OrdemServico, {
      maxWidth: '1100px',
      width: '800px',
      maxHeight: '1100px',
      height: '90%',
      panelClass: 'dialog-com-rolagem',
    });

    dialogRef.afterClosed().subscribe((enviadoParaAssinatura: boolean) => {
      if (enviadoParaAssinatura) {
        this.scdpHabilitado = true;
      }
    });
  }

  abrirLaudo(): void {
    this.dialog.open(EmitirLaudo, {
      maxWidth: '1100px',
      width: '800px',
      maxHeight: '1100px',
      height: '90%',
      panelClass: 'dialog-com-rolagem',
    });
  }

  salvar(): void {
    const payload = {
      ...this.dados,
      fase0: {
        modalidadeObtencao: this.modalidadeObtencao,
        ufSelecionada: this.ufSelecionada,
        municipioSelecionado: this.municipioSelecionado,
        imovelOcupado: this.imovelOcupado,

        // NOVOS — refletem no topo
        nomeImovel: this.nomeImovel,
        codigoSncr: this.codigoSncr,
        matricula: this.matricula,
        nomeProprietario: this.nomeProprietario,
        cpfCnpjProprietario: this.cpfCnpjProprietario,
        areaRegistrada: this.areaRegistrada,
        areaCertificada: this.areaCertificada,
        areaVisada: this.areaVisada,
        vtiMedio: this.vtiMedio,
        vtnMedio: this.vtnMedio,
        entidadeDemandante: this.entidadeDemandante,
        acampamentoVinculado: this.acampamentoVinculado,
        acoesReintegracao: this.acoesReintegracao,
        orgaoConcorrente: this.orgaoConcorrente,
        familiasCadastradas: this.familiasCadastradas,
      },
      fase1: {
        processoSei: this.processoSei,
      },
      faseAtualProcesso: this.faseAtualProcesso,
      fase13: {
        projetosAssentamento: this.projetosAssentamento,
        registrosMatricula: this.registrosMatricula,
        registrosSpunet: this.registrosSpunet,
      },
    };

    console.log('Dados salvos:', payload);

    this.router.navigate(['/lista']);
  }

  cancelar(): void {
    this.router.navigate(['/lista']);
  }

  abrirResolucaoCdr(): void {
    this.dialog.open(ResolucaoCdr, {
      maxWidth: '1100px',
      width: '800px',
      maxHeight: '1100px',
      height: '90%',
      panelClass: 'dialog-com-rolagem',
    });
  }

  abrirPortariaCdr(): void {
    this.dialog.open(PortariaCdr, {
      maxWidth: '1100px',
      width: '800px',
      maxHeight: '1100px',
      height: '90%',
      panelClass: 'dialog-com-rolagem',
    });
  }

  abrirResolucaoCd(): void {
    this.dialog.open(ResolucaoCd, {
      maxWidth: '1100px',
      width: '800px',
      maxHeight: '1100px',
      height: '90%',
      panelClass: 'dialog-com-rolagem',
    });
  }

  solicitarScdp(): void {
    window.open('https://www2.scdp.gov.br/novoscdp/home.xhtml', '_blank');
  }

  abrirPortariaCd(): void {
    this.dialog.open(PortariaCd, {
      maxWidth: '1100px',
      width: '800px',
      maxHeight: '1100px',
      height: '90%',
      panelClass: 'dialog-com-rolagem',
    });
  }
}
