import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import { Dados } from '../../mock/imovel.model';

@Component({
  selector: 'app-editar',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    //MatDialogActions,
    //MatDialogContent,
  ],
  templateUrl: './editar.html',
  styleUrl: './editar.css',
})
export class Editar implements OnInit {
  public dados!: Dados;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const navigation = this.router.getCurrentNavigation();

    this.dados =
      navigation?.extras?.state?.['dados'] ?? history.state?.['dados'];

    if (!this.dados) {
      this.router.navigate(['/lista']);
    }
  }

  salvar(): void {
    // Aqui você pode implementar a persistência
    // ou retornar para a lista após salvar.

    this.router.navigate(['/lista']);
  }

  cancelar(): void {
    this.router.navigate(['/lista']);
  }
}

/*import { Component, Inject } from '@angular/core';
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
*/
