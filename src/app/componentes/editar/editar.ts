import { Component, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { Dados } from '../../mock/imovel.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-editar',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
  ],
  templateUrl: './editar.html',
  styleUrl: './editar.css',
})
export class Editar {
  constructor(
    private dialogRef: MatDialogRef<Editar>,
    @Inject(MAT_DIALOG_DATA) public dados: Dados,
  ) {}

  salvar(): void {
    this.dialogRef.close(this.dados);
  }

  cancelar(): void {
    this.dialogRef.close();
  }
}
