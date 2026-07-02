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

import { Imovel } from '../../mock/imovel.model';
import { IMOVEIS_MOCK } from '../../mock/imovel.mock';
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';

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
  ],
  templateUrl: './lista.html',
  styleUrl: './lista.css',
})
export class Lista implements OnInit {
  // Sinais para controle de estado reativo
  public imoveis = signal<Imovel[]>(IMOVEIS_MOCK);
  public itensPorPagina = signal<number>(5);
  public paginaAtual = signal<number>(0); // MatPaginator utiliza índice baseado em 0

  // Definição das colunas exibidas na mat-table
  /*
  public colunasExibidas: string[] = [
    'sr',
    'imovel',
    'sncr',
    'areaHa',
    'proprietario',
    'processo',
    'modalidade',
    'situacao',
    'municipioUf',
    'acoes',
  ];*/

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

  ngOnInit(): void {}

  public configuracaoColunas = [
    { id: 'sr', titulo: 'SR', visivel: true },
    { id: 'imovel', titulo: 'Imóvel', visivel: true },
    { id: 'sncr', titulo: 'SNCR', visivel: true },
    { id: 'areaHa', titulo: 'Área (Ha)', visivel: true },
    { id: 'proprietario', titulo: 'Proprietário', visivel: true },
    { id: 'processo', titulo: 'Processo', visivel: true },
    { id: 'modalidade', titulo: 'Modalidade', visivel: true },
    { id: 'situacao', titulo: 'Situação', visivel: true },
    { id: 'municipioUf', titulo: 'Município / UF', visivel: true },
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
        this.matchString(item.sr, f.sr) &&
        this.matchString(item.imovel, f.imovel) &&
        this.matchString(item.sncr, f.sncr) &&
        this.matchNumber(item.areaHa, f.areaHa) &&
        this.matchString(item.proprietario, f.proprietario) &&
        this.matchString(item.processo, f.processo) &&
        this.matchString(item.modalidade, f.modalidade) &&
        this.matchString(item.situacao, f.situacao) &&
        this.matchString(item.municipio, f.municipio) &&
        this.matchString(item.uf, f.uf)
      );
    });
  });

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

  public executarAcao(acao: string, imovel: Imovel): void {
    console.log(`Ação [${acao}] executada para o imóvel: ${imovel.imovel}`);
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
        console.log('Exportando PDF...');
        break;
    }
  }
}
