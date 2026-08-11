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
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    MatSelectModule,
  ],
  templateUrl: './cadastrar-grupo.html',
  styleUrls: ['./cadastrar-grupo.css'],
})
export class CadastrarGrupo implements OnInit {
  // Estado de expansão: guarda o grupo que está expandido (ou null)
  expandedGroup: Grupo | null = null;

  // Dados brutos (imóveis)
  public imoveis = signal<Dados[]>(IMOVEIS_MOCK);
  public gruposSalvos = signal<Grupo[]>([]);

  // Paginação (sobre grupos)
  public itensPorPagina = signal<number>(10);
  public paginaAtual = signal<number>(0);
  // Controla a exibição do modo de seleção para criação de grupo
  public modoSelecaoGrupo = signal(false);

  // Nome do novo grupo
  public nomeGrupo = '';

  public selectedImoveisArray = signal<Dados[]>([]);

  // Imóveis disponíveis para inclusão no grupo
  public imoveisDisponiveis = computed(() => this.imoveis());

  // Imóveis selecionados especificamente para o novo grupo
  private imoveisSelecionadosGrupo = signal<Set<Dados>>(new Set());

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

  public inclusaoMap = signal<Map<Grupo, Dados[]>>(new Map());
  public totalGrupos = computed(() => this.gruposFiltrados().length);

  public totalSelecionados = computed(() => this.itensSelecionados().size);

  public colunasExibidas: string[] = ['expandIcon', 'grupo', 'acoes'];

  // Colunas da sub‑tabela (dentro da expansão)
  public colunasSubTabela: string[] = [
    'selecao',
    'sr',
    'imovel',
    'proprietario',
    'acoesImovel',
  ];

  public editandoGrupo = signal<Grupo | null>(null);
  public novoNomeGrupo = signal<string>('');

  // --------------------- MÉTODOS ---------------------

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.carregarGruposSalvos();
  }

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

  // Verifica se o grupo está em modo de inclusão
  isInclusaoAtiva(grupo: Grupo): boolean {
    return this.inclusaoMap().has(grupo);
  }

  // Inicia a inclusão: adiciona o grupo ao map com valor null (nenhum imóvel selecionado)
  iniciarInclusaoImovel(grupo: Grupo): void {
    if (grupo.source === 'mock') {
      this.mostrarFeedback(
        'Não é possível adicionar imóveis a grupos do mock.',
        'error',
      );
      return;
    }
    // Expande o grupo
    this.expandedGroup = grupo;
    const novoMap = new Map(this.inclusaoMap());
    novoMap.set(grupo, []); // array vazio
    this.inclusaoMap.set(novoMap);
  }

  // Atualiza o imóvel selecionado temporariamente
  selecionarImoveisParaInclusao(grupo: Grupo, imoveis: Dados[]): void {
    const novoMap = new Map(this.inclusaoMap());
    novoMap.set(grupo, imoveis);
    this.inclusaoMap.set(novoMap);
  }

  // Cancela a inclusão
  cancelarInclusaoImovel(grupo: Grupo): void {
    const novoMap = new Map(this.inclusaoMap());
    novoMap.delete(grupo);
    this.inclusaoMap.set(novoMap);
    // Não altera expandedGroup
  }
  // Confirma a inclusão
  confirmarInclusaoImovel(grupo: Grupo): void {
    const imoveisSelecionados = this.inclusaoMap().get(grupo);
    if (!imoveisSelecionados || imoveisSelecionados.length === 0) {
      this.mostrarFeedback(
        'Selecione pelo menos um imóvel para adicionar.',
        'error',
      );
      return;
    }

    const duplicados = imoveisSelecionados.filter((item) =>
      grupo.imoveis.some((i) => i === item),
    );
    if (duplicados.length > 0) {
      this.mostrarFeedback(
        `Alguns imóveis já pertencem ao grupo: ${duplicados.map((i) => i.imovel.imovel).join(', ')}`,
        'error',
      );
      return;
    }

    grupo.imoveis.push(...imoveisSelecionados);

    const salvos = this.gruposSalvos();
    const index = salvos.findIndex((g) => g.nome === grupo.nome);
    if (index !== -1) {
      salvos[index].imoveis = grupo.imoveis;
      localStorage.setItem('grupos_imoveis', JSON.stringify(salvos));
      this.gruposSalvos.set([...salvos]);

      // 🔥 Mantém a expansão aberta após a atualização
      this.atualizarExpandedGroup(grupo.nome);

      this.cancelarInclusaoImovel(grupo);
      this.mostrarFeedback(
        `${imoveisSelecionados.length} imóvel(is) adicionado(s) ao grupo com sucesso.`,
        'success',
      );
    } else {
      this.mostrarFeedback('Erro ao salvar o grupo.', 'error');
    }
  }

  // Retorna a lista de imóveis disponíveis para adição (exclui os já presentes no grupo)
  getImoveisDisponiveisParaGrupo(grupo: Grupo): Dados[] {
    return this.imoveisDisponiveis().filter(
      (item) => !grupo.imoveis.some((i) => i === item),
    );
  }

  // 2. Agrupa os imóveis filtrados por grupo
  public gruposFiltrados = computed(() => {
    const salvos = this.gruposSalvos().map((g) => ({
      ...g,
      source: 'saved' as const,
    }));
    const mock = this.gruposDoMock().map((g) => ({
      ...g,
      source: 'mock' as const,
    }));
    return [...salvos, ...mock];
  });

  // 3. Grupos paginados (fatia de acordo com página atual)
  public gruposPaginados = computed(() => {
    const inicio = this.paginaAtual() * this.itensPorPagina();
    const fim = inicio + this.itensPorPagina();
    return this.gruposFiltrados().slice(inicio, fim);
  });

  public todosSelecionados = computed(() => {
    const grupos = this.gruposPaginados();
    const selecionados = this.itensSelecionados();
    const todosImoveis = grupos.flatMap((g) => g.imoveis);
    return (
      todosImoveis.length > 0 &&
      todosImoveis.every((item) => selecionados.has(item))
    );
  });

  /**
   * Inicia o processo de criação de um grupo.
   * Apenas abre a lista de imóveis para seleção.
   */
  iniciarCriacaoGrupo(): void {
    // Remove a verificação do nome
    this.imoveisSelecionadosGrupo.set(new Set());
    this.selectedImoveisArray.set([]);
    this.modoSelecaoGrupo.set(true);
  }

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

  private carregarGruposSalvos(): void {
    const grupos = this.obterGruposSalvos();
    this.gruposSalvos.set(grupos);
  }

  /**
   * Verifica se o imóvel está selecionado para o novo grupo.
   */
  imovelSelecionadoParaGrupo(item: Dados): boolean {
    return this.imoveisSelecionadosGrupo().has(item);
  }

  selecionarImovelParaGrupo(item: Dados, selecionado: boolean): void {
    const novoSet = new Set(this.imoveisSelecionadosGrupo());
    if (selecionado) {
      novoSet.add(item);
    } else {
      novoSet.delete(item);
    }
    this.imoveisSelecionadosGrupo.set(novoSet);
    this.selectedImoveisArray.set(Array.from(novoSet)); // sincroniza
  }

  selecionarTodosImoveisParaGrupo(): void {
    const todos = this.imoveisDisponiveis();
    this.imoveisSelecionadosGrupo.set(new Set(todos));
    this.selectedImoveisArray.set(todos); // sincroniza
  }

  public totalImoveisSelecionadosGrupo = computed(
    () => this.imoveisSelecionadosGrupo().size,
  );

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

  public gruposDoMock = computed(() => {
    const map = new Map<string, Dados[]>();
    this.imoveis().forEach((item) => {
      const nome = item.obtencao.grupo;
      if (nome && nome.trim() !== '') {
        if (!map.has(nome)) {
          map.set(nome, []);
        }
        map.get(nome)!.push(item);
      }
    });
    return Array.from(map.entries()).map(([nome, imoveis]) => ({
      nome,
      imoveis,
    }));
  });

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
    // Se ainda não estamos no modo de seleção,
    // primeiro abrimos a lista de imóveis.
    if (!this.modoSelecaoGrupo()) {
      this.iniciarCriacaoGrupo();
      return;
    }

    this.confirmarCriacaoGrupo();
  }

  limparSelecaoGrupo(): void {
    this.imoveisSelecionadosGrupo.set(new Set());
    this.selectedImoveisArray.set([]);
  }

  /**
   * Confirma a criação do grupo e associa
   * os imóveis selecionados ao grupo informado.
   */
  confirmarCriacaoGrupo(): void {
    // 1. Validação
    if (!this.nomeGrupo?.trim()) {
      this.mostrarFeedback('Por favor, informe um nome para o grupo.', 'error');
      return;
    }

    if (this.selectedImoveisArray().length === 0) {
      this.mostrarFeedback(
        'Selecione pelo menos um imóvel para o grupo.',
        'error',
      );
      return;
    }

    // 2. Monta o objeto do grupo (declaração da variável novoGrupo)
    const novoGrupo = {
      nome: this.nomeGrupo.trim(),
      imoveis: this.selectedImoveisArray(), // array completo dos objetos
    };

    // 3. Recupera a lista existente no localStorage
    const gruposSalvos = this.obterGruposSalvos();

    // 4. (Opcional) Verifica se já existe um grupo com o mesmo nome
    const nomeExistente = gruposSalvos.some((g) => g.nome === novoGrupo.nome);
    if (nomeExistente) {
      this.mostrarFeedback(
        `Já existe um grupo com o nome "${novoGrupo.nome}".`,
        'error',
      );
      return;
    }

    // 5. Adiciona o novo grupo e salva
    gruposSalvos.push(novoGrupo);
    localStorage.setItem('grupos_imoveis', JSON.stringify(gruposSalvos));

    // 6. Recarrega os grupos salvos no signal
    this.gruposSalvos.set(gruposSalvos);

    // 7. Limpa o formulário e sai do modo de seleção
    this.limparFormulario();
    this.modoSelecaoGrupo.set(false);
    this.mostrarFeedback(
      `Grupo "${novoGrupo.nome}" salvo com sucesso!`,
      'success',
    );
  }

  excluirImovel(item: Dados, grupo: Grupo): void {
    if (grupo.source === 'mock') {
      this.mostrarFeedback(
        'Não é possível remover imóveis de grupos do mock.',
        'error',
      );
      return;
    }

    // Encontra o índice do imóvel no grupo
    const index = grupo.imoveis.indexOf(item);
    if (index === -1) {
      this.mostrarFeedback('Imóvel não encontrado no grupo.', 'error');
      return;
    }

    // Remove do grupo
    grupo.imoveis.splice(index, 1);

    // Atualiza no localStorage (apenas para grupos 'saved')
    const salvos = this.gruposSalvos();
    const grupoIndex = salvos.findIndex((g) => g.nome === grupo.nome);
    if (grupoIndex !== -1) {
      salvos[grupoIndex].imoveis = grupo.imoveis;
      localStorage.setItem('grupos_imoveis', JSON.stringify(salvos));
      this.gruposSalvos.set([...salvos]); // força atualização da view
      this.atualizarExpandedGroup(grupo.nome);
      this.mostrarFeedback('Imóvel removido do grupo com sucesso.', 'success');
    } else {
      this.mostrarFeedback('Erro ao salvar a remoção.', 'error');
    }
  }

  private atualizarExpandedGroup(nome: string): void {
    if (!this.expandedGroup) return;
    // Busca o grupo atualizado em gruposFiltrados (que tem a nova referência)
    const grupoAtualizado = this.gruposFiltrados().find((g) => g.nome === nome);
    if (grupoAtualizado) {
      this.expandedGroup = grupoAtualizado;
    }
  }

  onSelectionChange(event: any): void {
    this.selectedImoveisArray.set(event.value);
  }

  private limparFormulario(): void {
    this.nomeGrupo = '';
    this.selectedImoveisArray.set([]);
    // Se houver um mat-select com ngModel, talvez seja necessário resetar também
  }

  private obterGruposSalvos(): any[] {
    const dados = localStorage.getItem('grupos_imoveis');
    const parsed = dados ? JSON.parse(dados) : [];
    return parsed;
  }

  private mostrarFeedback(mensagem: string, tipo: 'success' | 'error'): void {
    // Exemplo com MatSnackBar
    this.snackBar.open(mensagem, 'Fechar', {
      duration: 4000,
      panelClass: tipo === 'success' ? 'snack-success' : 'snack-error',
      verticalPosition: 'top',
    });

    // Caso não use MatSnackBar, pode usar um simples alert:
    // alert(mensagem);
  }

  cancelarCriacaoGrupo(): void {
    this.modoSelecaoGrupo.set(false);
    this.imoveisSelecionadosGrupo.set(new Set());
    this.selectedImoveisArray.set([]);
    this.nomeGrupo = '';
  }

  iniciarEdicaoGrupo(grupo: Grupo): void {
    // Apenas grupos 'saved' podem ser editados
    if (grupo.source === 'mock') {
      this.mostrarFeedback('Grupos do JSON não podem ser editados.', 'error');
      return;
    }
    this.editandoGrupo.set(grupo);
    this.novoNomeGrupo.set(grupo.nome);
  }

  salvarEdicaoGrupo(): void {
    const grupo = this.editandoGrupo();
    if (!grupo) return;

    const novoNome = this.novoNomeGrupo().trim();
    if (!novoNome) {
      this.mostrarFeedback('O nome do grupo não pode estar vazio.', 'error');
      return;
    }

    const salvos = this.gruposSalvos();
    // Busca pelo nome antigo (grupo.nome ainda é o original)
    const index = salvos.findIndex((g) => g.nome === grupo.nome);
    if (index === -1) {
      this.mostrarFeedback('Grupo não encontrado para edição.', 'error');
      return;
    }

    // Verifica se já existe outro grupo com o novo nome (ignorando o próprio)
    const existe = salvos.some((g, i) => g.nome === novoNome && i !== index);
    if (existe) {
      this.mostrarFeedback(
        `Já existe um grupo com o nome "${novoNome}".`,
        'error',
      );
      return;
    }

    // Atualiza o nome no objeto existente
    salvos[index].nome = novoNome;
    localStorage.setItem('grupos_imoveis', JSON.stringify(salvos));
    this.gruposSalvos.set([...salvos]); // nova referência para reatividade

    this.cancelarEdicaoGrupo();
    this.mostrarFeedback(
      `Nome do grupo alterado para "${novoNome}" com sucesso.`,
      'success',
    );
  }

  cancelarEdicaoGrupo(): void {
    this.editandoGrupo.set(null);
    this.novoNomeGrupo.set('');
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
    if (grupo.source === 'mock') {
      this.mostrarFeedback(
        'Grupos provenientes do JSON não podem ser excluídos.',
        'error',
      );
      return;
    }

    const salvos = this.gruposSalvos();
    const index = salvos.findIndex((g) => g.nome === grupo.nome);
    if (index === -1) {
      this.mostrarFeedback('Grupo não encontrado.', 'error');
      return;
    }

    // Remove o grupo
    salvos.splice(index, 1);

    // 🔥 ATUALIZA O SIGNAL COM UMA NOVA REFERÊNCIA
    this.gruposSalvos.set([...salvos]); // ou salvos.slice()

    localStorage.setItem('grupos_imoveis', JSON.stringify(salvos));

    if (this.expandedGroup === grupo) {
      this.expandedGroup = null;
    }

    this.mostrarFeedback(
      `Grupo "${grupo.nome}" removido com sucesso!`,
      'success',
    );
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
