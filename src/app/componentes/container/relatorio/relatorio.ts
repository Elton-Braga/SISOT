import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Dados, Imovel } from '../../../mock/imovel.model';
import { IMOVEIS_MOCK } from '../../../mock/imovel.mock';

@Component({
  selector: 'app-relatorio',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatTableModule],
  templateUrl: './relatorio.html',
  styleUrl: './relatorio.css',
})
export class Relatorio {
  displayedColumns = [
    'sr',
    'imovel',
    'sncr',
    'areaHa',
    'proprietario',
    'processo',
    'modalidade',
    'municipio',
    'uf',
  ];

  dataEmissao = new Date();

  dataSource: Dados[] = IMOVEIS_MOCK;
  public imoveis = signal<Dados[]>(IMOVEIS_MOCK);

  imprimirRelatorio() {
    window.print();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      window.print();
    }, 300);
  }
}
