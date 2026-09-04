import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PesquisaImovelCompleto } from './pesquisaImovelCompleto';

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
    MatExpansionModule,
    MatDialogModule,
  ],
  templateUrl: './editar-merdado-de-terras.html',
  styleUrl: './editar-merdado-de-terras.css',
})
export class EditarMerdadoDeTerras implements OnInit {
  public dados!: PesquisaImovelCompleto;

  // Opções para comboboxes
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
    private router: Router,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    const navigation = this.router.getCurrentNavigation();
    const dadosRecebidos =
      navigation?.extras?.state?.['dados'] ?? history.state?.['dados'];

    if (!dadosRecebidos || !dadosRecebidos.id) {
      this.router.navigate(['/lista']);
      return;
    }

    // Monta o objeto completo mesclando com valores padrão
    this.dados = {
      ...dadosRecebidos,
      // Inicializa campos extras com valores padrão (pode ser vindo do banco no futuro)
      rintIbge: dadosRecebidos.rintIbge || '',
      rgiIbge: dadosRecebidos.rgiIbge || '',
      fonteElemento: dadosRecebidos.fonteElemento || 'Informação de terceiros',
      origemInformacoes: dadosRecebidos.origemInformacoes || 'Vistoria remota',
      roteiroAcesso: dadosRecebidos.roteiroAcesso || '',
      nivel1: dadosRecebidos.nivel1 || '',
      nivel2: dadosRecebidos.nivel2 || '',
      nivel3: dadosRecebidos.nivel3 || '',
      percAgriculturaSilvicultura:
        dadosRecebidos.percAgriculturaSilvicultura ?? null,
      distanciaEnergiaKm: dadosRecebidos.distanciaEnergiaKm ?? null,
      areaIrrigada: dadosRecebidos.areaIrrigada ?? null,
      tecnologia: dadosRecebidos.tecnologia || '',
      conectividade: dadosRecebidos.conectividade || '',
      benfeitoriasAtividade: dadosRecebidos.benfeitoriasAtividade || '',
      estadoConservacaoBenfeitorias:
        dadosRecebidos.estadoConservacaoBenfeitorias || '',
      classeI: dadosRecebidos.classeI || {
        percentual: null,
        indice: null,
        localizacao: '',
      },
      classeII: dadosRecebidos.classeII || {
        percentual: null,
        indice: null,
        localizacao: '',
      },
      classeIII: dadosRecebidos.classeIII || {
        percentual: null,
        indice: null,
        localizacao: '',
      },
      classeIV: dadosRecebidos.classeIV || {
        percentual: null,
        indice: null,
        localizacao: '',
      },
      classeV: dadosRecebidos.classeV || {
        percentual: null,
        indice: null,
        localizacao: '',
      },
      classeVI: dadosRecebidos.classeVI || {
        percentual: null,
        indice: null,
        localizacao: '',
      },
      classeVII: dadosRecebidos.classeVII || {
        percentual: null,
        indice: null,
        localizacao: '',
      },
      classeVIII: dadosRecebidos.classeVIII || {
        percentual: null,
        indice: null,
        localizacao: '',
      },
      prazoPagamento: dadosRecebidos.prazoPagamento ?? null,
      qtdParcelas: dadosRecebidos.qtdParcelas ?? null,
      taxaJuros: dadosRecebidos.taxaJuros ?? null,
      descricaoBenfeitorias: dadosRecebidos.descricaoBenfeitorias || '',
      telefoneInformante: dadosRecebidos.telefoneInformante || '',
      pesquisadores: dadosRecebidos.pesquisadores || '',
      logUsuario: dadosRecebidos.logUsuario || '',
    };
  }

  public getClasse(classe: string): any {
    return this.dados['classe' + classe];
  }

  salvar(): void {
    // Aqui você pode enviar os dados para API ou apenas voltar
    console.log('Dados salvos:', this.dados);
    this.router.navigate(['/lista']);
  }

  cancelar(): void {
    this.router.navigate(['/mercado-terras']);
  }

  // Funções para abrir diálogos (mantidas)
  abrirOrdemServico(): void {
    /* ... */
  }
  abrirResolucaoCdr(): void {
    /* ... */
  }
  abrirPortariaCdr(): void {
    /* ... */
  }
  abrirResolucaoCd(): void {
    /* ... */
  }
  abrirPortariaCd(): void {
    /* ... */
  }
}
