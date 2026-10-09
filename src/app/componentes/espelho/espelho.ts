import {
  CurrencyPipe,
  DatePipe,
  DecimalPipe,
  NgFor,
  PercentPipe,
} from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-espelho',
  standalone: true,
  imports: [
    NgFor,
    MatDialogActions,
    MatDialogContent,
    MatIconModule,
    MatButtonModule,
    //CurrencyPipe,
    //DecimalPipe,
    DatePipe,
  ],
  templateUrl: './espelho.html',
  styleUrl: './espelho.css',
})
export class Espelho {
  documentos: { tipo: 'CPF' | 'CNPJ'; documento: string; nome: string }[] = [
    { tipo: 'CPF', documento: '00000000000', nome: 'Nome do Portador' },
    {
      tipo: 'CNPJ',
      documento: '00000000000000',
      nome: 'Razão Social da Empresa',
    },
  ];
  dataEmissao = new Date();
  window = window;
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public imovel: any,
    public dialogRef: MatDialogRef<Espelho>,
  ) {}
  fechar(): void {
    this.dialogRef.close();
  }
  imprimir(): void {
    window.print();
  }

  get cpfsFormatados(): { label: string; valor: string; nome: string }[] {
    return this.documentos
      .filter((doc) => doc.tipo === 'CPF')
      .map((doc) => ({
        label: doc.tipo,
        valor: doc.documento.replace(
          /(\d{3})(\d{3})(\d{3})(\d{2})/,
          '$1.$2.$3-$4',
        ),
        nome: doc.nome,
      }));
  }
}
