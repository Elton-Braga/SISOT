import { Injectable, signal, computed } from '@angular/core';
import { Dados } from './imovel.model';
import { IMOVEIS_MOCK } from './imovel.mock';

const STORAGE_KEY = 'sgir.imoveis.v1';

@Injectable({ providedIn: 'root' })
export class ImoveisStorage {
  /** Estado reativo – fonte única da verdade para toda a aplicação. */
  private readonly _imoveis = signal<Dados[]>(this.carregar());

  /** Exposição read-only (evita mutação externa). */
  readonly imoveis = this._imoveis.asReadonly();

  readonly total = computed(() => this._imoveis().length);

  // ---------------------------------------------------------------------
  // Persistência
  // ---------------------------------------------------------------------
  private carregar(): Dados[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed as Dados[];
      }
    } catch (err) {
      console.warn(
        '[ImoveisStorage] Falha ao ler localStorage. Usando mock.',
        err,
      );
    }
    return IMOVEIS_MOCK;
  }

  private persistir(lista: Dados[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lista));
    } catch (err) {
      console.error('[ImoveisStorage] Falha ao gravar localStorage', err);
    }
  }

  // ---------------------------------------------------------------------
  // Operações
  // ---------------------------------------------------------------------
  /** Adiciona um novo imóvel (no topo, para o usuário ver a inserção). */
  adicionar(novo: Dados): void {
    const lista = [novo, ...this._imoveis()];
    this._imoveis.set(lista);
    this.persistir(lista);
  }

  /** Substitui a lista inteira (usado se vier de API, por exemplo). */
  substituir(lista: Dados[]): void {
    this._imoveis.set(lista);
    this.persistir(lista);
  }

  /** Remove tudo e volta para o mock inicial. */
  resetar(): void {
    localStorage.removeItem(STORAGE_KEY);
    this._imoveis.set(IMOVEIS_MOCK);
  }
}
