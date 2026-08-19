import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PrintOS } from './print-os/print-os';
import { IMOVEIS_MOCK } from '../../../mock/imovel.mock';
//import { IMOVEIS_MOCK } from './mock-imoveis'; // Importação do mock

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
    MatIconModule,
    PrintOS,
    MatDialogModule,
  ],
  templateUrl: './ordem-servico.html',
  styleUrl: './ordem-servico.css',
})
export class OrdemServico {
  // Dados para impressão (serão atualizados ao salvar)
  dadosOrdem = {
    id: '2026/0001',
    sr: 'SR-01',
    estado: 'SP',
    dataAbertura: '17/08/2026',
    imoveis: [] as { imovel: string; municipio: string }[],
    prazo: '30',
    consideracoes: 'Lei nº 8.629/93 e Decreto nº 2.250/97',
    servidores: [
      { nome: 'Daniele Ramos', cargo: 'Perito Agrário', siape: '123456' },
      { nome: 'Liz Onishi', cargo: 'Especialista', siape: '789012' },
      { nome: 'Marcos Gonçalves', cargo: 'Técnico', siape: '345678' },
    ],
    servicos: [] as string[],
  };

  // Lista de opções de imóveis extraída do mock
  listaImoveis = IMOVEIS_MOCK.map((item) => ({
    imovel: item.imovel.imovel,
    municipio: item.imovel.municipio,
  }));

  // Linhas dinâmicas de imóveis (cada uma com imóvel e município)
  imoveisSelecionados: { imovel: string; municipio: string }[] = [];

  // Serviços selecionados (múltipla escolha)
  servicosSelecionados: string[] = [];

  constructor(private dialog: MatDialog) {}

  // Adiciona uma nova linha vazia
  adicionarImovel() {
    this.imoveisSelecionados.push({ imovel: '', municipio: '' });
  }

  // Remove uma linha
  removerImovel(index: number) {
    this.imoveisSelecionados.splice(index, 1);
  }

  // Quando o imóvel é selecionado, preenche o município automaticamente
  onImovelChange(index: number) {
    const item = this.imoveisSelecionados[index];
    const found = this.listaImoveis.find((op) => op.imovel === item.imovel);
    if (found) {
      item.municipio = found.municipio;
    } else {
      item.municipio = '';
    }
  }

  get podeAdicionar(): boolean {
    if (this.imoveisSelecionados.length === 0) {
      return true; // permite adicionar o primeiro imóvel
    }
    const ultimo =
      this.imoveisSelecionados[this.imoveisSelecionados.length - 1];
    return ultimo.imovel.trim() !== ''; // habilitado se o último tiver imóvel preenchido
  }

  salvar() {
    // Atualiza dadosOrdem com os imóveis e serviços selecionados
    this.dadosOrdem.imoveis = this.imoveisSelecionados.filter((i) => i.imovel);
    this.dadosOrdem.servicos = this.servicosSelecionados;

    console.log('Dados salvos:', this.dadosOrdem);

    // Abre o modal de impressão
    this.dialog.open(PrintOS, {
      data: this.dadosOrdem,
      width: '100%',
      maxWidth: '56.25rem',
      panelClass: 'print-dialog',
    });
  }
}
