import { Component, OnInit, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Imports do Angular Material
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';

import { Dados, Imovel } from '../../mock/imovel.model';
import { IMOVEIS_MOCK } from '../../mock/imovel.mock';
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Espelho } from '../espelho/espelho';
import { Log } from '../log/log';
import { Editar } from '../editar/editar';

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [
    MatMenuModule,
    CommonModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatToolbarModule,
    MatChipsModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatDialogModule,
  ],
  templateUrl: './lista.html',
  styleUrl: './lista.css',
})
export class Lista implements OnInit {
  //public imoveis = signal<Imovel[]>(IMOVEIS_MOCK);
  public imoveis = signal<Dados[]>(IMOVEIS_MOCK);
  public itensPorPagina = signal<number>(5);
  public paginaAtual = signal<number>(0); // MatPaginator utiliza índice baseado em 0

  public atualizarColunas(): void {
    this.colunasExibidas = this.configuracaoColunas
      .filter((c) => c.visivel)
      .map((c) => c.id);
  }

  // Objeto de filtros vinculados ao formulário
  public filtros = signal({
    sr: '',
    imovel: '',
    sncr: '',
    areaHa: null as number | null,
    proprietario: '',
    processo: '',
    modalidade: '',
    situacao: '',
    municipio: '',
    uf: '',
  });

  constructor(
    private router: Router,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {}

  public configuracaoColunas = [
    // Dados do Imóvel
    { id: 'sr', titulo: 'SR', visivel: true },
    { id: 'imovel', titulo: 'Imóvel', visivel: true },
    { id: 'sncr', titulo: 'SNCR', visivel: true },
    { id: 'areaHa', titulo: 'Área (Ha)', visivel: true },
    { id: 'proprietario', titulo: 'Proprietário', visivel: true },
    { id: 'processo', titulo: 'Processo', visivel: true },
    { id: 'modalidade', titulo: 'Modalidade', visivel: true },
    { id: 'situacao', titulo: 'Situação', visivel: true },
    { id: 'municipioUf', titulo: 'Município / UF', visivel: true },

    // Dados de Obtenção
    { id: 'processoSei', titulo: 'Processo SEI', visivel: false },
    { id: 'situacaoObtencao', titulo: 'Situação de Obtenção', visivel: false },
    {
      id: 'entidadeDemandante',
      titulo: 'Entidade Demandante',
      visivel: false,
    },
    { id: 'formaObtencao', titulo: 'Forma de Obtenção', visivel: false },
    {
      id: 'orgaoConcorrente',
      titulo: 'Órgão Concorrente',
      visivel: false,
    },
    {
      id: 'processoCadeiaDominial',
      titulo: 'Processo Cadeia Dominial',
      visivel: false,
    },
    {
      id: 'acampamentoVinculado',
      titulo: 'Acampamento Vinculado',
      visivel: false,
    },
    {
      id: 'imovelOcupado',
      titulo: 'Imóvel Ocupado?',
      visivel: false,
    },
    {
      id: 'capacidadeAssentamento',
      titulo: 'Capacidade de Assentamento',
      visivel: false,
    },
    {
      id: 'acoesReintegracao',
      titulo: 'Ações de Reintegração',
      visivel: false,
    },
    {
      id: 'familiasCadastradas',
      titulo: 'Famílias Cadastradas',
      visivel: false,
    },

    // Dados de Avaliação e Valores
    {
      id: 'valorTotalImovelInferior',
      titulo: 'Valor Total do Imóvel — Inferior (R$)',
      visivel: false,
    },
    {
      id: 'valorTotalImovelMedio',
      titulo: 'Valor Total do Imóvel — Médio (R$)',
      visivel: false,
    },
    {
      id: 'valorTotalImovelSuperior',
      titulo: 'Valor Total do Imóvel — Superior (R$)',
      visivel: false,
    },
    {
      id: 'valorTerraNuaInferior',
      titulo: 'Valor da Terra Nua (VTN) — Inferior (R$)',
      visivel: false,
    },
    {
      id: 'valorTerraNuaMedio',
      titulo: 'Valor da Terra Nua (VTN) — Médio (R$)',
      visivel: false,
    },
    {
      id: 'valorTerraNuaSuperior',
      titulo: 'Valor da Terra Nua (VTN) — Superior (R$)',
      visivel: false,
    },

    // Valores Complementares
    {
      id: 'valorBenfeitorias',
      titulo: 'Valor das Benfeitorias (R$)',
      visivel: false,
    },
    {
      id: 'valorTotalNegociado',
      titulo: 'Valor Negociado (R$)',
      visivel: false,
    },
    {
      id: 'valorPassivoAmbiental',
      titulo: 'Passivo Ambiental (R$)',
      visivel: false,
    },
    {
      id: 'valorAtivoAmbiental',
      titulo: 'Ativo Ambiental (R$)',
      visivel: false,
    },

    // Ações
    { id: 'acoes', titulo: 'Ações', visivel: true },
  ];

  public colunasExibidas: string[] = this.configuracaoColunas
    .filter((c) => c.visivel)
    .map((c) => c.id);

  // Lista filtrada baseada nos inputs dos usuários
  public imoveisFiltrados = computed(() => {
    const f = this.filtros();
    return this.imoveis().filter((item) => {
      return (
        this.matchString(item.imovel.sr, f.sr) &&
        this.matchString(item.imovel.imovel, f.imovel) &&
        this.matchString(item.imovel.sncr, f.sncr) &&
        this.matchNumber(item.imovel.areaHa, f.areaHa) &&
        this.matchString(item.imovel.proprietario, f.proprietario) &&
        this.matchString(item.imovel.processo, f.processo) &&
        this.matchString(item.imovel.modalidade, f.modalidade) &&
        this.matchString(item.imovel.situacao, f.situacao) &&
        this.matchString(item.imovel.municipio, f.municipio) &&
        this.matchString(item.imovel.uf, f.uf)
      );
    });
  });

  public abrirEspelho(dados: Dados): void {
    this.dialog.open(Espelho, {
      width: '90vw',
      maxWidth: '1200px',
      maxHeight: '90vh',
      data: dados,
      disableClose: false,
      autoFocus: false,
    });
  }

  public abrirEditar(dados: Dados): void {
    this.router.navigate(['/editar'], {
      state: {
        dados: structuredClone(dados),
      },
    });
  }

  // Lista paginada derivada da lista filtrada
  public imoveisPaginados = computed(() => {
    const inicio = this.paginaAtual() * this.itensPorPagina();
    const fim = inicio + this.itensPorPagina();
    return this.imoveisFiltrados().slice(inicio, fim);
  });

  // Auxiliares de filtragem
  private matchString(valor: string, busca: string): boolean {
    if (!busca) return true;
    return (valor || '').toLowerCase().includes(busca.toLowerCase());
  }

  private matchNumber(valor: number | null, busca: any | null): boolean {
    if (busca === null || busca === undefined || busca === '') return true;
    if (valor === null) return false;
    return valor.toString().includes(busca.toString());
  }

  // Interceptador de paginação nativa do Angular Material
  public tratarPaginacao(event: PageEvent): void {
    this.paginaAtual.set(event.pageIndex);
    this.itensPorPagina.set(event.pageSize);
  }

  public limparFiltros(): void {
    this.filtros.set({
      sr: '',
      imovel: '',
      sncr: '',
      areaHa: null,
      proprietario: '',
      processo: '',
      modalidade: '',
      situacao: '',
      municipio: '',
      uf: '',
    });
    this.paginaAtual.set(0);
  }

  public abrirHistorico(dados: Dados): void {
    this.dialog.open(Log, {
      width: '90vw',
      maxWidth: '1100px',
      maxHeight: '90vh',
      data: dados,
      disableClose: false,
      autoFocus: false,
    });
  }

  public executarAcao(acao: string, dados: Dados): void {
    switch (acao) {
      case 'Espelho':
        this.abrirEspelho(dados);
        break;

      case 'Histórico':
        this.abrirHistorico(dados);
        break;

      case 'Editar':
        this.abrirEditar(dados);
        break;

      case 'Log':
        console.log(dados);
        break;
    }
  }

  public exportar(tipo: 'excel' | 'csv' | 'pdf'): void {
    switch (tipo) {
      case 'excel':
        console.log('Exportando Excel...');
        break;

      case 'csv':
        console.log('Exportando CSV...');
        break;

      case 'pdf':
        this.router.navigate(['/relatorio']);

        break;
    }
  }
}
