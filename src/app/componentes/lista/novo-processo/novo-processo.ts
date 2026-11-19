import { Component, ViewChild, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';

import { DadosIniciaisDoImovelProcessos } from '../../processos/dados-iniciais-do-imovel-processos/dados-iniciais-do-imovel-processos';
import { ImoveisStorage } from '../../../mock/imoveis-storage';
import { Dados } from '../../../mock/imovel.model';

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
    MatSnackBarModule,
    CommonModule,
    DadosIniciaisDoImovelProcessos,
  ],
  templateUrl: './novo-processo.html',
  styleUrl: './novo-processo.css',
})
export class NovoProcesso {
  private readonly dialogRef = inject(MatDialogRef<NovoProcesso>);
  private readonly storage = inject(ImoveisStorage);
  private readonly snackBar = inject(MatSnackBar);

  @ViewChild(DadosIniciaisDoImovelProcessos)
  dadosIniciais!: DadosIniciaisDoImovelProcessos;

  readonly modalidades: string[] = [
    'Compra e Venda Decreto 433/92',
    'Adjudicação',
    'Desapropriação Lei 4132/62',
    'Arrecadação de Terras Públicas da União',
    'Desapropriação Lei 8.629/93',
    'Doação',
  ];

  readonly filtros = signal<FiltrosModalidade>({ modalidade: null });

  limparFiltros(): void {
    this.filtros.set({ modalidade: null });
  }

  salvar(): void {
    if (!this.dadosIniciais) {
      console.error(
        '[NovoProcesso] Componente filho ainda não foi renderizado.',
      );
      return;
    }

    const modalidade = this.filtros().modalidade;
    if (!modalidade) {
      this.snackBar.open('Selecione a modalidade antes de salvar.', 'OK', {
        duration: 4000,
      });
      return;
    }

    if (this.dadosIniciais.form.invalid) {
      this.dadosIniciais.form.markAllAsTouched();
      this.snackBar.open('Preencha os campos obrigatórios.', 'OK', {
        duration: 4000,
      });
      return;
    }

    const raw = this.dadosIniciais.form.getRawValue();

    // Ajuste os campos de processo, obtencao, avaliacao e resolucaoCdr
    // conforme a estrutura exata definida em src/app/mock/imovel.model.ts
    const novo = {
      imovel: {
        modalidade,
        tipoImovel: (raw.tipoImovel ?? '').trim(),
        inscricaoImobiliaria: (raw.inscricaoImobiliaria ?? '').trim(),
        cep: (raw.cep ?? '').trim(),
        logradouro: (raw.logradouro ?? '').trim(),
        numero: (raw.numero ?? '').trim(),
        complemento: (raw.complemento ?? '').trim(),
        bairro: (raw.bairro ?? '').trim(),
        cidade: (raw.cidade ?? '').trim(),
        uf: (raw.uf ?? '').trim().toUpperCase(),
        areaTerreno: this.toNumberOrNull(raw.areaTerreno),
        areaConstruida: this.toNumberOrNull(raw.areaConstruida),
        proprietario: (raw.proprietario ?? '').trim(),
        documentoProprietario: (raw.documentoProprietario ?? '').trim(),
      },
      processo: {},
      obtencao: {},
      avaliacao: {},
      resolucaoCdr: {},
    } as unknown as Dados;

    this.storage.adicionar(novo);

    this.snackBar.open('Processo cadastrado com sucesso!', 'OK', {
      duration: 3000,
    });
    this.dialogRef.close({ salvo: true, dados: novo });
  }

  cancelar(): void {
    this.dialogRef.close();
  }

  private toNumberOrNull(value: unknown): number | null {
    if (value === null || value === undefined || value === '') return null;
    const n = typeof value === 'number' ? value : Number(value);
    return Number.isFinite(n) ? n : null;
  }
}
