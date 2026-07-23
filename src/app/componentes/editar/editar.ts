import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import { Dados } from '../../mock/imovel.model';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';

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
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatStepperModule,
  ],
  templateUrl: './editar.html',
  styleUrl: './editar.css',
})
export class Editar implements OnInit {
  public dados!: Dados;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const navigation = this.router.getCurrentNavigation();

    const dadosRecebidos =
      navigation?.extras?.state?.['dados'] ?? history.state?.['dados'];

    if (
      !dadosRecebidos ||
      !dadosRecebidos.processo ||
      !dadosRecebidos.imovel ||
      !dadosRecebidos.obtencao ||
      !dadosRecebidos.avaliacao
    ) {
      this.router.navigate(['/lista']);
      return;
    }

    this.dados = dadosRecebidos;
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
