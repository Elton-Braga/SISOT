import { Component, OnInit, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Angular Material
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
import { MatDialogModule } from '@angular/material/dialog';
import { Router, RouterLink } from '@angular/router';

// Modelos e dados mock
import { Dados, Grupo } from '../../mock/imovel.model';
import { IMOVEIS_MOCK } from '../../mock/imovel.mock';

@Component({
  selector: 'app-cadastrar-grupo',
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
  templateUrl: './cadastrar-grupo.html',
  styleUrls: ['./cadastrar-grupo.css'],
})
export class CadastrarGrupo implements OnInit {
  // Estado de expansão: guarda o grupo que está expandido (ou null)
  expandedGroup: Grupo | null = null;

  // Dados brutos (imóveis)
  public imoveis = signal<Dados[]>(IMOVEIS_MOCK);

  // Paginação (sobre grupos)
  public itensPorPagina = signal<number>(5);
  public paginaAtual = signal<number>(0);

  // Seleção de imóveis (para ações em lote)
  private itensSelecionados = signal<Set<Dados>>(new Set());

  // Filtros (mantidos iguais)
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
    grupo: '',
  });

  // --------------------- COMPUTEDS ---------------------

  // 1. Imóveis filtrados (aplicando os filtros)
  public imoveisFiltrados = computed(() => {
    const f = this.filtros();
    return this.imoveis().filter((item) => {
      // Só exibe se o grupo existir
      const temGrupo = item.obtencao.grupo && item.obtencao.grupo.trim() !== '';
      if (!temGrupo) return false;

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
        this.matchString(item.imovel.uf, f.uf) &&
        this.matchString(item.obtencao.grupo, f.grupo)
      );
    });
  });

  // 2. Agrupa os imóveis filtrados por grupo
  public gruposFiltrados = computed(() => {
    const filtrados = this.imoveisFiltrados();
    const map = new Map<string, Dados[]>();

    filtrados.forEach((item) => {
      const nome = item.obtencao.grupo || 'Não definido';
      if (!map.has(nome)) {
        map.set(nome, []);
      }
      map.get(nome)!.push(item);
    });

    // Converte para array de Grupo e ordena por nome (opcional)
    return Array.from(map.entries())
      .map(([nome, imoveis]) => ({ nome, imoveis }))
      .sort((a, b) => a.nome.localeCompare(b.nome));
  });

  // 3. Grupos paginados (fatia de acordo com página atual)
  public gruposPaginados = computed(() => {
    const inicio = this.paginaAtual() * this.itensPorPagina();
    const fim = inicio + this.itensPorPagina();
    return this.gruposFiltrados().slice(inicio, fim);
  });

  // 4. Total de grupos (para o paginator)
  public totalGrupos = computed(() => this.gruposFiltrados().length);

  // 5. Seleção (mantida para os imóveis)
  public totalSelecionados = computed(() => this.itensSelecionados().size);

  // Verifica se todos os imóveis de todos os grupos paginados estão selecionados
  public todosSelecionados = computed(() => {
    const grupos = this.gruposPaginados();
    const selecionados = this.itensSelecionados();
    const todosImoveis = grupos.flatMap((g) => g.imoveis);
    return (
      todosImoveis.length > 0 &&
      todosImoveis.every((item) => selecionados.has(item))
    );
  });

  public algunsSelecionados = computed(() => {
    const grupos = this.gruposPaginados();
    const selecionados = this.itensSelecionados();
    const todosImoveis = grupos.flatMap((g) => g.imoveis);
    const selecionadosNaPagina = todosImoveis.filter((item) =>
      selecionados.has(item),
    );
    return (
      selecionadosNaPagina.length > 0 &&
      selecionadosNaPagina.length < todosImoveis.length
    );
  });

  // --------------------- CONFIGURAÇÃO DE COLUNAS DA TABELA PRINCIPAL ---------------------
  public colunasExibidas: string[] = ['expandIcon', 'grupo', 'acoes'];

  // Colunas da sub‑tabela (dentro da expansão)
  public colunasSubTabela: string[] = [
    'selecao',
    'sr',
    'imovel',
    'proprietario',
    'acoesImovel',
  ];

  // --------------------- MÉTODOS ---------------------

  constructor(private router: Router) {}

  ngOnInit(): void {}

  // Expansão: alterna a expansão de um grupo
  toggleExpansion(grupo: any) {
    this.expandedGroup = this.expandedGroup === grupo ? null : grupo;
  }
  // Função usada no *matRowDef when para decidir se a linha de detalhe é exibida
  isExpanded = (index: number, row: any): boolean => {
    return true; // Retorna true para que a mat-table crie a linha de detalhe para cada grupo. O *ngIf do HTML controla a exibição do conteúdo.
  };

  // Paginação
  tratarPaginacao(event: PageEvent): void {
    this.paginaAtual.set(event.pageIndex);
    this.itensPorPagina.set(event.pageSize);
  }

  limparFiltros(): void {
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
      grupo: '',
    });
    this.paginaAtual.set(0);
    this.limparSelecao();
  }

  // --------------------- SELEÇÃO DE IMÓVEIS ---------------------

  itemSelecionado(item: Dados): boolean {
    return this.itensSelecionados().has(item);
  }

  selecionarItem(item: Dados, selecionado: boolean): void {
    const novoSet = new Set(this.itensSelecionados());
    if (selecionado) {
      novoSet.add(item);
    } else {
      novoSet.delete(item);
    }
    this.itensSelecionados.set(novoSet);
  }

  // Seleciona todos os imóveis de todos os grupos da página atual
  selecionarTodos(selecionado: boolean): void {
    const novoSet = new Set(this.itensSelecionados());
    const grupos = this.gruposPaginados();
    const todosImoveis = grupos.flatMap((g) => g.imoveis);
    if (selecionado) {
      todosImoveis.forEach((item) => novoSet.add(item));
    } else {
      todosImoveis.forEach((item) => novoSet.delete(item));
    }
    this.itensSelecionados.set(novoSet);
  }

  // Seleciona todos os imóveis de um grupo específico
  selecionarTodosDoGrupo(grupo: Grupo, selecionado: boolean): void {
    const novoSet = new Set(this.itensSelecionados());
    grupo.imoveis.forEach((item) => {
      if (selecionado) {
        novoSet.add(item);
      } else {
        novoSet.delete(item);
      }
    });
    this.itensSelecionados.set(novoSet);
  }

  // Verifica se todos os imóveis de um grupo estão selecionados
  todosSelecionadosNoGrupo(grupo: Grupo): boolean {
    const selecionados = this.itensSelecionados();
    return (
      grupo.imoveis.length > 0 &&
      grupo.imoveis.every((item) => selecionados.has(item))
    );
  }

  // Verifica se alguns (mas não todos) imóveis do grupo estão selecionados
  algunsSelecionadosNoGrupo(grupo: Grupo): boolean {
    const selecionados = this.itensSelecionados();
    const selecionadosNoGrupo = grupo.imoveis.filter((item) =>
      selecionados.has(item),
    );
    return (
      selecionadosNoGrupo.length > 0 &&
      selecionadosNoGrupo.length < grupo.imoveis.length
    );
  }

  getItensSelecionados(): Dados[] {
    return Array.from(this.itensSelecionados());
  }

  limparSelecao(): void {
    this.itensSelecionados.set(new Set());
  }

  // --------------------- AÇÕES ---------------------

  criarGrupo(): void {
    // Como já estamos agrupando, talvez essa ação seja para criar um novo grupo a partir dos selecionados?
    const selecionados = this.getItensSelecionados();
    if (selecionados.length === 0) {
      console.warn('Nenhum imóvel selecionado.');
      return;
    }
    console.log('Criando grupo com os imóveis:', selecionados);
    this.limparSelecao();
  }

  editar(item: Dados): void {
    console.log('Editar imóvel:', item);
    // navegar para edição, etc.
  }

  excluir(item: Dados): void {
    console.log('Excluir imóvel:', item);
  }

  // Ações em lote no grupo (ex: excluir todos os imóveis do grupo)
  excluirGrupo(grupo: Grupo): void {
    console.log('Excluir todos os imóveis do grupo:', grupo.nome);
    // Implementar lógica
  }

  // --------------------- AUXILIARES DE FILTRO ---------------------

  private matchString(valor: string, busca: string): boolean {
    if (!busca) return true;
    return (valor || '').toLowerCase().includes(busca.toLowerCase());
  }

  private matchNumber(valor: number | null, busca: any | null): boolean {
    if (busca === null || busca === undefined || busca === '') return true;
    if (valor === null) return false;
    return valor.toString().includes(busca.toString());
  }
}
