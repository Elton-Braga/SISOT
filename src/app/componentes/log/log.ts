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
    //DecimalPipe,
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
      dataHora: '16/07/2026 09:15',
      usuario: 'Analista Fulano',
      peca: 'Portaria de Criação publicada no D.O.U',
      alteracoes: 'Inclusão da portaria no processo.',
      tipo: 'Modificação',
    },
    {
      dataHora: '16/07/2026 10:40',
      usuario: 'Analista Fulano',
      peca: 'Imissão na posse',
      alteracoes: 'Atualização dos dados da imissão na posse.',
      tipo: 'Modificação',
    },
    {
      dataHora: '17/07/2026 08:25',
      usuario: 'Analista Sicrano',
      peca: 'Petição de ajuizamento',
      alteracoes: 'Correção das informações processuais.',
      tipo: 'Modificação',
    },
    {
      dataHora: '17/07/2026 14:10',
      usuario: 'Analista Beltrano',
      peca: 'Parecer Jurídico Conclusivo',
      alteracoes: 'Revisão do parecer jurídico.',
      tipo: 'Modificação',
    },
    {
      dataHora: '18/07/2026 09:50',
      usuario: 'Analista Fulano',
      peca: 'Extrato e Parecer',
      alteracoes: 'Atualização do extrato e do parecer.',
      tipo: 'Modificação',
    },
    {
      dataHora: '18/07/2026 15:35',
      usuario: 'Analista Sicrano',
      peca: 'Imissão na posse',
      alteracoes: 'Complementação das informações do documento.',
      tipo: 'Modificação',
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
