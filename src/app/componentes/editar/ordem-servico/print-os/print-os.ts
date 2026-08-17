import { Component, Inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-print-os',
  standalone: true,
  imports: [CommonModule], // <-- necessário para *ngFor
  templateUrl: './print-os.html',
  styleUrl: './print-os.css',
})
export class PrintOS {
  @Input() dados: any;

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any) {}

  // Propriedade computada: se tiver dados via input, usa-os; senão, usa os do dialog
  get dadosExibicao() {
    return this.dados || this.dialogData;
  }
}
