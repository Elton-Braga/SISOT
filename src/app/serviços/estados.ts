import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, map, tap } from 'rxjs';

import { Estado, Municipio } from './estados.model';

/**
 * Serviço responsável por listar os estados (UFs) brasileiros e
 * seus respectivos municípios, com cache em memória.
 *
 * Fonte oficial: API de Localidades do IBGE.
 * Docs: https://servicodados.ibge.gov.br/api/docs/localidades
 */
@Injectable({
  providedIn: 'root',
})
export class Estados {
  private readonly http = inject(HttpClient);

  private readonly BASE_URL =
    'https://servicodados.ibge.gov.br/api/v1/localidades';

  /** Cache dos estados após a primeira chamada. */
  private readonly _estados = signal<Estado[]>([]);

  /** Cache de municípios por UF. */
  private readonly _municipiosPorUf = new Map<string, Municipio[]>();

  /** Lista reativa de estados (vazia até a primeira chamada de listarEstados). */
  readonly estados = this._estados.asReadonly();

  /**
   * Retorna a lista de estados (UFs) ordenada alfabeticamente por nome.
   * Usa cache após a primeira requisição.
   */
  listarEstados(): Observable<Estado[]> {
    if (this._estados().length > 0) {
      return new Observable((sub) => {
        sub.next(this._estados());
        sub.complete();
      });
    }

    return this.http
      .get<Estado[]>(`${this.BASE_URL}/estados?orderBy=nome`)
      .pipe(
        map((lista) =>
          lista.map((e) => ({ id: e.id, sigla: e.sigla, nome: e.nome })),
        ),
        tap((lista) => this._estados.set(lista)),
      );
  }

  /**
   * Retorna os municípios de uma UF (sigla, ex.: "SP").
   * Usa cache por UF após a primeira requisição.
   */
  listarMunicipiosPorUf(uf: string): Observable<Municipio[]> {
    const ufNormalizada = uf.trim().toUpperCase();

    const emCache = this._municipiosPorUf.get(ufNormalizada);
    if (emCache) {
      return new Observable((sub) => {
        sub.next(emCache);
        sub.complete();
      });
    }

    return this.http
      .get<Municipio[]>(`${this.BASE_URL}/estados/${ufNormalizada}/municipios`)
      .pipe(
        map((lista) =>
          lista
            .map((m) => ({ id: m.id, nome: m.nome }))
            .sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR')),
        ),
        tap((lista) => this._municipiosPorUf.set(ufNormalizada, lista)),
      );
  }

  /** Utilitário: retorna a UF (sigla) a partir do nome (ex.: "São Paulo" → "SP"). */
  ufPorNome(nome: string): string | undefined {
    return this._estados().find(
      (e) => e.nome.toLowerCase() === nome.trim().toLowerCase(),
    )?.sigla;
  }

  /** Utilitário: retorna o nome do estado a partir da sigla. */
  nomePorUf(sigla: string): string | undefined {
    return this._estados().find(
      (e) => e.sigla.toUpperCase() === sigla.trim().toUpperCase(),
    )?.nome;
  }

  /** Limpa os caches (útil em testes ou ao trocar de ambiente). */
  limparCache(): void {
    this._estados.set([]);
    this._municipiosPorUf.clear();
  }
}
