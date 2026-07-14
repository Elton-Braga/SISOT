import { CurrencyPipe, DecimalPipe, PercentPipe } from '@angular/common';
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
    MatDialogActions,
    MatDialogContent,
    MatIconModule,
    MatButtonModule,
    CurrencyPipe,
    DecimalPipe,
  ],
  templateUrl: './espelho.html',
  styleUrl: './espelho.css',
})
export class Espelho {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public imovel: any,
    public dialogRef: MatDialogRef<Espelho>,
  ) {}
  fechar(): void {
    this.dialogRef.close();
  }
}
