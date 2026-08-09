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
import { Dados } from '../../mock/imovel.model';
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
  // Dados
  public imoveis = signal<Dados[]>(IMOVEIS_MOCK);
  public itensPorPagina = signal<number>(5);
  public paginaAtual = signal<number>(0);
  public nomeGrupo: string = ''; // usado se houver campo de nome, mas pode ser removido

  // Seleção
  private itensSelecionados = signal<Set<Dados>>(new Set());
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

  // Filtros
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

  // Configuração das colunas (idêntica à do componente Lista)
  public configuracaoColunas = [
    { id: 'selecao', titulo: '', visivel: true },
    { id: 'sr', titulo: 'SR', visivel: true },
    { id: 'imovel', titulo: 'Imóvel', visivel: true },
    { id: 'sncr', titulo: 'SNCR', visivel: true },
    { id: 'areaHa', titulo: 'Área (Ha)', visivel: true },
    { id: 'proprietario', titulo: 'Proprietário', visivel: true },
    { id: 'processo', titulo: 'Processo', visivel: true },
    { id: 'modalidade', titulo: 'Modalidade', visivel: true },
    { id: 'situacao', titulo: 'Situação', visivel: true },
    { id: 'municipioUf', titulo: 'Município / UF', visivel: true },
    { id: 'processoSei', titulo: 'Processo SEI', visivel: false },
    { id: 'situacaoObtencao', titulo: 'Situação de Obtenção', visivel: false },
    { id: 'entidadeDemandante', titulo: 'Entidade Demandante', visivel: false },
    { id: 'formaObtencao', titulo: 'Forma de Obtenção', visivel: false },
    { id: 'orgaoConcorrente', titulo: 'Órgão Concorrente', visivel: false },
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
    { id: 'imovelOcupado', titulo: 'Imóvel Ocupado?', visivel: false },
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
    { id: 'grupo', titulo: 'Grupo', visivel: true },
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
    { id: 'acoes', titulo: 'Ações', visivel: true },
  ];

  public colunasExibidas: string[] = this.configuracaoColunas
    .filter((c) => c.visivel)
    .map((c) => c.id);

  constructor(
    private router: Router,
    // private dialog: MatDialog // se for usar diálogos, descomente e importe
  ) {}

  ngOnInit(): void {}

  // --------------------- FILTROS E PAGINAÇÃO ---------------------

  public imoveisFiltrados = computed(() => {
    const f = this.filtros();
    return this.imoveis().filter((item) => {
      // Só exibe se o grupo existir e não for vazio
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

  public imoveisPaginados = computed(() => {
    const inicio = this.paginaAtual() * this.itensPorPagina();
    const fim = inicio + this.itensPorPagina();
    return this.imoveisFiltrados().slice(inicio, fim);
  });

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
      grupo: '',
    });
    this.paginaAtual.set(0);
    this.limparSelecao();
  }

  // --------------------- SELEÇÃO ---------------------

  public itemSelecionado(item: Dados): boolean {
    return this.itensSelecionados().has(item);
  }

  public selecionarItem(item: Dados, selecionado: boolean): void {
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

  public getItensSelecionados(): Dados[] {
    return Array.from(this.itensSelecionados());
  }

  public limparSelecao(): void {
    this.itensSelecionados.set(new Set());
  }

  // --------------------- CRIAÇÃO DE GRUPO ---------------------

  public criarGrupo(): void {
    const selecionados = this.getItensSelecionados();
    if (selecionados.length === 0) {
      console.warn('Nenhum imóvel selecionado.');
      return;
    }

    // Aqui você pode implementar a lógica real de criação do grupo
    // Ex: chamar uma API, abrir um modal, etc.
    console.log('Criando grupo com os imóveis:', selecionados);

    // Exemplo: limpar seleção após criar
    this.limparSelecao();
  }

  // --------------------- AÇÕES DOS BOTÕES NA TABELA ---------------------

  public executarAcao(acao: string, dados: Dados): void {
    switch (acao) {
      case 'Editar':
        console.log('Vrau');
        break;
      default:
        console.log('Ação não reconhecida:', acao);
    }
  }

  editar(item: any): void {
    console.log('Editar:', item);
  }

  excluir(item: any): void {
    console.log('Excluir:', item);
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
