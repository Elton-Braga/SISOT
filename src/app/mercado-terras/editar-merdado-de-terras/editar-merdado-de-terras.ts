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
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';

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

    MatCardModule,
    MatListModule,
  ],
  templateUrl: './editar-merdado-de-terras.html',
  styleUrl: './editar-merdado-de-terras.css',
})
export class EditarMerdadoDeTerras implements OnInit {
  arquivosSelecionados: File[] = [];
  public dados!: PesquisaImovelCompleto;
  localizacaoGeral: string = '';
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
  atualizarLocalizacaoClasses() {
    const classes = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'];
    classes.forEach((cls) => {
      if (this.dados['classe' + cls]) {
        this.dados['classe' + cls].localizacao = this.localizacaoGeral;
      }
    });
  }
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

  // Evento disparado ao selecionar arquivos
  onFileSelected(event: any): void {
    const files: FileList = event.target.files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        // Evita duplicatas (opcional)
        const existe = this.arquivosSelecionados.some(
          (f) => f.name === files[i].name && f.size === files[i].size,
        );
        if (!existe) {
          this.arquivosSelecionados.push(files[i]);
        }
      }
    }
    // Limpa o input para permitir selecionar novamente o mesmo arquivo
    event.target.value = '';
  }

  // Remove um arquivo da lista
  removerArquivo(index: number): void {
    this.arquivosSelecionados.splice(index, 1);
  }

  // (Opcional) Método para enviar os arquivos para o servidor
  enviarArquivos(): void {
    // Exemplo: FormData
    const formData = new FormData();
    this.arquivosSelecionados.forEach((file) => {
      formData.append('anexos', file, file.name);
    });
    // Chame seu serviço de upload aqui
    // this.uploadService.upload(formData).subscribe(...);
  }
}
