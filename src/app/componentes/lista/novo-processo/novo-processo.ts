import { Component, ViewChild, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { getSrFromUf } from '../../../utils/sr-por-uf'; // ⬅️ SR calculada da UF

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
    'Arrecadação de Terras Públicas do Estado',
    'Compensação Ambiental',
    'Arrecadação de Terras Públicas da União',
    'Desapropriação Lei 8.629/93',
    'Doação',
    'Leilão',
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

    // ⬇️ O form do filho é ANINHADO:
    //    { dadosImovel, naturezaOcupacional, processoObtencao }
    const raw = this.dadosIniciais.form.getRawValue();
    const di = raw.dadosImovel ?? {};
    const no = raw.naturezaOcupacional ?? {};
    const po = raw.processoObtencao ?? {};

    const uf = String(di.uf ?? '')
      .trim()
      .toUpperCase();
    const sr = getSrFromUf(uf); // ⬅️ SR calculada da UF

    const novo = {
      imovel: {
        sr, // ← coluna "SR" da lista
        imovel: String(di.nomeImovel ?? '').trim(), // ← coluna "Imóvel"
        sncr: String(di.codigoSncr ?? '').trim(), // ← coluna "SNCR"
        areaHa: this.toNumberOrNull(di.areaRegistrada), // ← coluna "Área (Ha)"
        proprietario: String(di.nomeProprietario ?? '').trim(),
        processo: '', // não há campo no form; fica vazio
        modalidade, // vem do select do pai
        situacao: String(po.faseAtualProcesso ?? '').trim(),
        municipio: String(di.municipio ?? '').trim(),
        uf,
      },
      obtencao: {
        grupo: '',
        processoSei: String(po.processoSei ?? '').trim(),
        processoCadeiaDominial: String(po.processoCadeiaDominial ?? '').trim(),
        situacao: String(po.faseAtualProcesso ?? '').trim(),
        entidadeDemandante: String(no.entidadeDemandante ?? '').trim(),
        formaObtencao: '',
        orgaoConcorrente: String(no.orgaoConcorrente ?? '').trim(),
        acampamentoVinculado: String(no.acampamentoVinculado ?? '').trim(),
        imovelOcupado:
          no.imovelOcupado === true ||
          String(no.imovelOcupado ?? '').toLowerCase() === 'sim',
        capacidadeAssentamento: this.toNumberOrNull(no.capacidadeAssentamento),
        acoesReintegracao: String(no.acoesReintegracao ?? '').trim(),
        familiasCadastradas: this.toNumberOrNull(no.familiasCadastradas),
      },
      avaliacao: {
        valorTotalImovelInferior: this.toNumberOrNull(di.valorTotalInferior),
        valorTotalImovelMedio: this.toNumberOrNull(di.valorTotalMedio),
        valorTotalImovelSuperior: this.toNumberOrNull(di.valorTotalSuperior),
        valorTerraNuaInferior: this.toNumberOrNull(di.terraNuaInferior),
        valorTerraNuaMedio: this.toNumberOrNull(di.terraNuaMedio),
        valorTerraNuaSuperior: this.toNumberOrNull(di.terraNuaSuperior),
        valorBenfeitorias: this.toNumberOrNull(di.benfeitorias),
        valorTotalNegociado: null,
        valorPassivoAmbiental: this.toNumberOrNull(di.passivoAmbiental),
        valorAtivoAmbiental: this.toNumberOrNull(di.ativoAmbiental),
      },
      processo: {},
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
