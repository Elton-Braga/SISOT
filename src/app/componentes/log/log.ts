import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatIcon, MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-log',
  standalone: true,
  templateUrl: './log.html',
  styleUrl: './log.css',
  imports: [
    MatIcon,
    MatDialogActions,
    DatePipe,
    DecimalPipe,
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class Log {
  dataEmissao = new Date();

  historico = [
    {
      sr: 'SR-01',
      imovel: 'Fazenda Boa Esperança',
      sncr: '123.456.789',
      area: 2456.3254,
      proprietario: 'José da Silva',
      usuario: 'Analista Fulano',
    },
    {
      sr: 'SR-01',
      imovel: 'Fazenda Santa Luzia',
      sncr: '223.456.789',
      area: 1589.7412,
      proprietario: 'Maria Oliveira',
      usuario: 'Analista Fulano',
    },
    {
      sr: 'SR-02',
      imovel: 'Fazenda Primavera',
      sncr: '323.456.789',
      area: 874.3658,
      proprietario: 'Carlos Pereira',
      usuario: 'Analista Fulano',
    },
    {
      sr: 'SR-05',
      imovel: 'Fazenda Horizonte',
      sncr: '423.456.789',
      area: 3675.1289,
      proprietario: 'Ana Rodrigues',
      usuario: 'Analista Fulano',
    },
    {
      sr: 'SR-08',
      imovel: 'Fazenda União',
      sncr: '523.456.789',
      area: 925.8741,
      proprietario: 'Pedro Santos',
      usuario: 'Analista Fulano',
    },
    {
      sr: 'SR-11',
      imovel: 'Fazenda Vitória',
      sncr: '623.456.789',
      area: 5214.4478,
      proprietario: 'João Almeida',
      usuario: 'Analista Fulano',
    },
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA) public imovel: any,
    public dialogRef: MatDialogRef<Log>,
  ) {}

  fechar(): void {
    this.dialogRef.close();
  }

  imprimir(): void {
    window.print();
  }
}
