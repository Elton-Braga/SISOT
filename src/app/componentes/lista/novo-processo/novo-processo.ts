import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { DadosIniciaisDoImovelProcessos } from '../../processos/dados-iniciais-do-imovel-processos/dados-iniciais-do-imovel-processos';

import { MatDialogRef } from '@angular/material/dialog';

export interface FiltrosModalidade {
  modalidade: string | null;
}
@Component({
  selector: 'app-novo-processo',
  imports: [
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    CommonModule,
    DadosIniciaisDoImovelProcessos,
  ],
  templateUrl: './novo-processo.html',
  styleUrl: './novo-processo.css',
})
export class NovoProcesso {
  private readonly dialogRef = inject(MatDialogRef<NovoProcesso>);
  /** Modalidades extraídas do mock IMOVEIS_MOCK (valores distintos). */
  readonly modalidades: string[] = [
    'Compra e Venda Decreto 433/92',
    'Adjudicação',
    'Desapropriação Lei 4132/62',
    'Arrecadação de Terras Públicas da União',
    'Desapropriação Lei 8.629/93',
    'Doação',
  ];

  /*MODALIDADES = [
    'Compra e Venda Decreto 433/92',
    'Adjudicação',
    'Desapropriação Lei 4132/62',
    'Arrecadação de Terras Públicas da União',
    'Desapropriação Lei 8.629/93',
    'Doação',
  ];*/

  /** Objeto de filtros (signal) — começa sem modalidade selecionada. */
  readonly filtros = signal<FiltrosModalidade>({ modalidade: null });

  limparFiltros(): void {
    this.filtros.set({ modalidade: null });
  }
  salvar(): void {
    // Se precisar validar antes, faça aqui:
    // if (!this.filtros().modalidade) { ... exibir erro ...; return; }

    const resultado = {
      modalidade: this.filtros().modalidade,
    };

    this.dialogRef.close(resultado);
  }

  /** Fecha o modal sem devolver nada. */
  cancelar(): void {
    this.dialogRef.close();
  }
}
