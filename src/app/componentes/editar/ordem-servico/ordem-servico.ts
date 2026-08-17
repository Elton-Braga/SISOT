import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { PrintOS } from './print-os/print-os';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
@Component({
  selector: 'app-ordem-servico',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    PrintOS,
    MatDialogModule,
  ],
  templateUrl: './ordem-servico.html',
  styleUrl: './ordem-servico.css',
})
export class OrdemServico {
  dadosOrdem = {
    id: '2026/0001',
    sr: 'SR-01',
    estado: 'SP',
    dataAbertura: '17/08/2026',
    imovel: 'Fazenda Santa Maria',
    municipio: 'São Paulo',
    prazo: '30',
    consideracoes: 'Lei nº 8.629/93 e Decreto nº 2.250/97',
    // Lista de servidores (cada um com nome, cargo e siape)
    servidores: [
      { nome: 'Daniele Ramos', cargo: 'Perito Agrário', siape: '123456' },
      { nome: 'Liz Onishi', cargo: 'Especialista', siape: '789012' },
      { nome: 'Marcos Gonçalves', cargo: 'Técnico', siape: '345678' },
    ],
  };
  constructor(private dialog: MatDialog) {}

  salvar() {
    console.log('Salvo!');
    // Abre o modal com o componente PrintOS
    const dialogRef = this.dialog.open(PrintOS, {
      data: this.dadosOrdem, // passa os dados para o PrintOS
      width: '90%',
      maxWidth: '800px',
      panelClass: 'print-dialog', // classe para estilização
    });

    // Após o modal ser aberto, dispara a impressão
    dialogRef.afterOpened().subscribe(() => {
      // Pequeno delay para garantir que o conteúdo foi renderizado
      setTimeout(() => {
        window.print();
      }, 300);
    });

    // Opcional: fechar o modal após a impressão (se desejar)
    // dialogRef.afterClosed().subscribe(() => { ... });
  }
}
