import { Component, computed, signal } from '@angular/core';
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
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Router, RouterLink } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

// Importe o mock e a interface
import { mockPesquisasImoveis } from '../mock/mercadoTerrasMock/mercadoDeTerrasMock';
import { PesquisaImovel } from '../mock/mercadoTerrasMock/interfaceMercadoDeTerras';

@Component({
  selector: 'app-mercado-terras',
  standalone: true,
  imports: [
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
    MatMenuModule,
    MatCheckboxModule,
    MatDialogModule,
    RouterLink,
  ],
  templateUrl: './mercado-terras.html',
  styleUrl: './mercado-terras.css',
})
export class MercadoTerras {
  // ============================================================
  // 1. DADOS E CONFIGURAÇÃO INICIAL
  // ============================================================
  public imoveis = signal<PesquisaImovel[]>(mockPesquisasImoveis);

  // Paginação
  public itensPorPagina = signal<number>(5);
  public paginaAtual = signal<number>(0);

  // Busca por termo
  public termoBusca = signal<string>('');

  public filtros = signal({
    id: '', // antes era "sr"
    imovel: '',
    municipio: '',
    uf: '',
    notaAgronomica: '',
    area: '',
    vtn: '',
    dataPesquisa: '',
  });

  // ============================================================
  // 2. SELEÇÃO (CHECKBOX)
  // ============================================================
  private itensSelecionados = signal<Set<PesquisaImovel>>(new Set());

  public totalSelecionados = computed(() => this.itensSelecionados().size);

  public todosSelecionados = computed(() => {
    const paginados = this.imoveisPaginados();
    const selecionados = this.itensSelecionados();
    return (
      paginados.length > 0 && paginados.every((item) => selecionados.has(item))
    );
  });

  public algunsSelecionados = computed(() => {
    const paginados = this.imoveisPaginados();
    const selecionados = this.itensSelecionados();
    const selecionadosNaPagina = paginados.filter((item) =>
      selecionados.has(item),
    );
    return (
      selecionadosNaPagina.length > 0 &&
      selecionadosNaPagina.length < paginados.length
    );
  });

  public itemSelecionado(item: PesquisaImovel): boolean {
    return this.itensSelecionados().has(item);
  }

  public selecionarItem(item: PesquisaImovel, selecionado: boolean): void {
    const novoSet = new Set(this.itensSelecionados());
    if (selecionado) {
      novoSet.add(item);
    } else {
      novoSet.delete(item);
    }
    this.itensSelecionados.set(novoSet);
  }

  public selecionarTodos(selecionado: boolean): void {
    const novoSet = new Set(this.itensSelecionados());
    const paginados = this.imoveisPaginados();
    if (selecionado) {
      paginados.forEach((item) => novoSet.add(item));
    } else {
      paginados.forEach((item) => novoSet.delete(item));
    }
    this.itensSelecionados.set(novoSet);
  }

  public getItensSelecionados(): PesquisaImovel[] {
    return Array.from(this.itensSelecionados());
  }

  public limparSelecao(): void {
    this.itensSelecionados.set(new Set());
  }

  public atualizarColunas(): void {
    this.colunasExibidas = this.configuracaoColunas
      .filter((c) => c.visivel)
      .map((c) => c.id);
  }

  // ============================================================
  // 3. FAVORITOS
  // ============================================================
  private favoritos = signal<Set<PesquisaImovel>>(new Set());

  public todosFavoritos = computed(() => {
    const paginados = this.imoveisPaginados();
    const favSet = this.favoritos();
    return paginados.length > 0 && paginados.every((item) => favSet.has(item));
  });

  public isFavorito(item: PesquisaImovel): boolean {
    return this.favoritos().has(item);
  }

  public toggleFavorito(item: PesquisaImovel): void {
    const novoSet = new Set(this.favoritos());
    if (novoSet.has(item)) {
      novoSet.delete(item);
    } else {
      novoSet.add(item);
    }
    this.favoritos.set(novoSet);
  }

  public toggleFavoritoTodos(): void {
    const paginados = this.imoveisPaginados();
    const todosFav = this.todosFavoritos();
    const novoSet = new Set(this.favoritos());

    if (todosFav) {
      paginados.forEach((item) => novoSet.delete(item));
    } else {
      paginados.forEach((item) => novoSet.add(item));
    }
    this.favoritos.set(novoSet);
  }

  // ============================================================
  // 4. FILTRAGEM E ORDENAÇÃO (com tratamento de null seguro)
  // ============================================================
  public imoveisFiltrados = computed(() => {
    const termo = this.termoBusca().toLowerCase().trim();
    if (!termo) return this.imoveis();

    return this.imoveis().filter((item) => {
      // Converte a data para string apenas se não for nula
      const dataStr = item.dataPesquisa
        ? new Date(item.dataPesquisa).toLocaleDateString('pt-BR')
        : '';

      return (
        item.id.toString().includes(termo) ||
        item.imovel.toLowerCase().includes(termo) ||
        item.localizacao.estado.toLowerCase().includes(termo) ||
        item.localizacao.municipioSede.toLowerCase().includes(termo) ||
        (item.avaliacao.notaAgronomica?.toString() || '').includes(termo) ||
        (item.valores.areaTotalHa?.toString() || '').includes(termo) ||
        (item.valores.vtn?.toString() || '').includes(termo) ||
        dataStr.includes(termo)
      );
    });
  });

  public imoveisOrdenados = computed(() => {
    const filtrados = this.imoveisFiltrados();
    const favSet = this.favoritos();

    const favoritos: PesquisaImovel[] = [];
    const naoFavoritos: PesquisaImovel[] = [];

    for (const item of filtrados) {
      if (favSet.has(item)) {
        favoritos.push(item);
      } else {
        naoFavoritos.push(item);
      }
    }

    return [...favoritos, ...naoFavoritos];
  });

  public imoveisPaginados = computed(() => {
    const inicio = this.paginaAtual() * this.itensPorPagina();
    const fim = inicio + this.itensPorPagina();
    return this.imoveisOrdenados().slice(inicio, fim);
  });

  // ============================================================
  // 5. CONFIGURAÇÃO DAS COLUNAS DA TABELA
  // ============================================================
  public configuracaoColunas = [
    { id: 'favoritos', titulo: '', visivel: true },
    { id: 'selecao', titulo: '', visivel: true },
    { id: 'id', titulo: 'ID', visivel: true },
    { id: 'imovel', titulo: 'Imóvel', visivel: true },
    { id: 'uf', titulo: 'UF', visivel: true },
    { id: 'municipio', titulo: 'Município', visivel: true },
    { id: 'notaAgronomica', titulo: 'Nota Agronômica', visivel: true },
    { id: 'area', titulo: 'Área (ha)', visivel: true },
    { id: 'vtn', titulo: 'VTN (R$)', visivel: true },
    { id: 'dataPesquisa', titulo: 'Data da Pesquisa', visivel: true },
    { id: 'acoes', titulo: 'Ações', visivel: true },
  ];

  public colunasExibidas: string[] = this.configuracaoColunas
    .filter((c) => c.visivel)
    .map((c) => c.id);

  // ============================================================
  // 6. PAGINAÇÃO
  // ============================================================
  public tratarPaginacao(event: PageEvent): void {
    this.paginaAtual.set(event.pageIndex);
    this.itensPorPagina.set(event.pageSize);
  }

  // ============================================================
  // 7. AÇÕES DOS BOTÕES
  // ============================================================
  constructor(
    private router: Router,
    private dialog: MatDialog,
  ) {}

  public executarAcao(acao: string, dados: PesquisaImovel): void {
    switch (acao) {
      case 'Visualizar':
        console.log('Visualizar:', dados);
        break;
      case 'Editar':
        console.log('Editar:', dados);
        this.router.navigate(['/editar', dados.id]);
        break;
      default:
        console.log('Ação não mapeada:', acao);
    }
  }

  // ============================================================
  // 8. EXPORTAÇÃO E AÇÕES EM MASSA
  // ============================================================
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

  public executarAcaoEmMassa(acao: string): void {
    const selecionados = this.getItensSelecionados();
    if (selecionados.length === 0) return;
    console.log(`Ação em massa "${acao}" em:`, selecionados);
  }

  // ============================================================
  // 9. GRUPO (opcional)
  // ============================================================
  public nomeGrupo: string = '';

  public criarGrupo(): void {
    const selecionados = this.getItensSelecionados();
    if (selecionados.length === 0 || !this.nomeGrupo.trim()) {
      return;
    }
    console.log(`Criando grupo "${this.nomeGrupo}" com:`, selecionados);
    this.nomeGrupo = '';
    this.limparSelecao();
  }

  public limparFiltros(): void {
    this.termoBusca.set('');
    this.paginaAtual.set(0);
    this.limparSelecao();
  }
}
