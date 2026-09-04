import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { PesquisaImovelCompleto } from '../editar-merdado-de-terras/pesquisaImovelCompleto';

@Component({
  selector: 'app-modal-visualizar-mercado',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatExpansionModule,
  ],
  templateUrl: './modal-visualizar-mercado.html',
  styleUrl: './modal-visualizar-mercado.css',
})
export class ModalVisualizarMercado {
  // Opções para comboboxes (iguais ao Editar)
  public opcoesTipoDado = ['Transação', 'Oferta'];
  public opcoesFonte = [
    'Informação de terceiros',
    'Vistoria in loco',
    'Documental',
    'Outra',
  ];
  public opcoesOrigem = [
    'Vistoria remota',
    'Vistoria in loco',
    'Pesquisa documental',
    'Outra',
  ];
  public opcoesAcesso = [
    'Ótimo',
    'Muito Bom',
    'Bom',
    'Regular',
    'Desfavorável',
    'Má',
  ];
  public opcoesNivel1 = ['Pecuária', 'Agricultura', 'Silvicultura', 'Outra'];
  public opcoesNivel2 = [
    'Baixo nível tecnológico',
    'Médio nível tecnológico',
    'Alto nível tecnológico',
  ];
  public opcoesCidade = ['Bom Jesus da Lapa', 'Riacho de Santana', 'Outra'];
  public opcoesEnergia = [
    'Monofásica/Bifásica',
    'Trifásica',
    'Insuficiente',
    'Indisponível',
  ];
  public opcoesHidrica = [
    'dessedentação animal',
    'potencial de irrigação',
    'meteorológica/pluvial',
  ];
  public opcoesTecnologia = ['Insuficiente', 'Médio', 'Avançado'];
  public opcoesConectividade = ['Sim', 'Não'];
  public opcoesBenfeitorias = ['Insuficientes', 'Suficientes', 'Ótimas'];
  public opcoesConservacao = ['Necessitam de reparos', 'Bom', 'Ótimo', 'Ruim'];
  public opcoesLocalizacao = [
    'Ótima',
    'Muito Boa',
    'Boa',
    'Regular',
    'Desfavorável',
    'Ruim',
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA) public dados: PesquisaImovelCompleto,
    private dialogRef: MatDialogRef<ModalVisualizarMercado>,
  ) {}

  /**
   * Retorna o objeto da classe solicitada, com valores padrão
   * caso ele não exista no objeto `dados`.
   */
  getClasse(classe: string): {
    percentual: number | null;
    localizacao: string;
    indice: number | null;
  } {
    const chave = 'classe' + classe;
    if (this.dados && this.dados[chave]) {
      return this.dados[chave];
    }
    // Retorna um objeto padrão para evitar undefined
    return { percentual: null, localizacao: '', indice: null };
  }

  fechar(): void {
    this.dialogRef.close();
  }
}
