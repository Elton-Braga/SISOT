import { Component, Inject, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';

/** Dados do imóvel recebidos via MAT_DIALOG_DATA */
export interface ImovelData {
  sr: string;
  imovel: string;
  sncr: string;
  areaHa: number;
  proprietario: string;
  processo: string;
  modalidade: string;
  situacao: string;
  municipio: string;
  uf: string;
  areaRegistrada: number;
  matriculas: string;
  cpfCnpjProprietario: string;
}

@Component({
  selector: 'app-sobreposicao-interesse',
  imports: [CommonModule, MatDialogModule],
  templateUrl: './sobreposicao-interesse.html',
  styleUrl: './sobreposicao-interesse.css',
})
export class SobreposicaoInteresse {
  dataOficio: string;
  anoAtual: string;

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: ImovelData | null,
    @Optional() public dialogRef: MatDialogRef<SobreposicaoInteresse>,
  ) {
    const hoje = new Date();
    this.dataOficio = hoje.toLocaleDateString('pt-BR');
    this.anoAtual = String(hoje.getFullYear()).slice(-2);
  }

  /** Área formatada em pt-BR com 4 casas decimais */
  get areaFormatada(): string {
    if (this.data?.areaRegistrada == null) {
      return '—';
    }
    return this.data.areaRegistrada.toLocaleString('pt-BR', {
      minimumFractionDigits: 4,
      maximumFractionDigits: 4,
    });
  }

  enviarParaAssinatura(): void {
    alert('Enviar para assinatura');
    this.dialogRef?.close();
  }

  fechar(): void {
    this.dialogRef?.close();
  }
}
