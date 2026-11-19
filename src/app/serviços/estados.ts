import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, asyncScheduler, map, of, observeOn, tap } from 'rxjs';
import { Estado, Municipio } from './estados.model';

@Injectable({ providedIn: 'root' })
export class Estados {
  private readonly http = inject(HttpClient);
  private readonly BASE_URL =
    'https://servicodados.ibge.gov.br/api/v1/localidades';

  private readonly _estados = signal<Estado[]>([]);
  private readonly _municipiosPorUf = new Map<string, Municipio[]>();

  readonly estados = this._estados.asReadonly();

  listarEstados(): Observable<Estado[]> {
    if (this._estados().length > 0) {
      // ⬇️ async, espelhando o caminho HTTP
      return of(this._estados()).pipe(observeOn(asyncScheduler));
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

  listarMunicipiosPorUf(uf: string): Observable<Municipio[]> {
    const ufNormalizada = uf.trim().toUpperCase();

    const emCache = this._municipiosPorUf.get(ufNormalizada);
    if (emCache) {
      // ⬇️ async, espelhando o caminho HTTP
      return of(emCache).pipe(observeOn(asyncScheduler));
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

  ufPorNome(nome: string): string | undefined {
    return this._estados().find(
      (e) => e.nome.toLowerCase() === nome.trim().toLowerCase(),
    )?.sigla;
  }

  nomePorUf(sigla: string): string | undefined {
    return this._estados().find(
      (e) => e.sigla.toUpperCase() === sigla.trim().toUpperCase(),
    )?.nome;
  }

  limparCache(): void {
    this._estados.set([]);
    this._municipiosPorUf.clear();
  }
}
