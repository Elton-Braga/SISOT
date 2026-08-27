import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {
  DadosResolucaoCdr,
  PrintResolucaoCdr,
} from './print-resolucao-cdr/print-resolucao-cdr';
import { MatDialog } from '@angular/material/dialog';
import { IMOVEIS_MOCK } from '../../../mock/imovel.mock';

@Component({
  selector: 'app-resolucao-cdr',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,

    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './resolucao-cdr.html',
  styleUrl: './resolucao-cdr.css',
})
export class ResolucaoCdr implements OnInit {
  sr: string = '';
  idResolucaoCdr: string = '000';

  dataResolucaoCdr: any;
  dataReuniaoCdr: any;

  consideracoes: string[] = [''];
  consideracaoFinal: string = '...';

  imovel: string = 'teste';
  area: any;
  municipio: string = 'teste123';
  proprietario: string = '...';
  sncr: string = '...';

  valorTotal: number = 0;
  valorTotalPorExtenso: string = '...';

  valorTda: number = 0;
  valorTdaPorExtenso: string = '...';

  valorMoeda: number = 0;
  valorMoedaPorExtenso: string = '...';

  prazo: string = '30';
  responsavelPagamento: string = '...';
  cpfResponsavel: string = '000.000.000-00';

  constructor(private dialog: MatDialog) {}

  ngOnInit() {
    // 1️⃣ Primeiro, define as datas com o dia atual por extenso
    this.dataResolucaoCdr = this.formatarDataPorExtenso(new Date());
    this.dataReuniaoCdr = this.formatarDataPorExtenso(new Date());
    this.idResolucaoCdr = this.gerarIdNumericoAleatorio();
    // 2️⃣ Depois, preenche os demais campos com o JSON (mas NÃO sobrescreve as datas)
    const dados = IMOVEIS_MOCK[0];
    if (dados) {
      this.sr = dados.imovel.sr;
      this.imovel = dados.imovel.imovel;
      this.area = dados.imovel.areaHa;
      this.municipio = dados.imovel.municipio;
      this.proprietario = dados.imovel.proprietario;
      this.sncr = dados.imovel.sncr;

      //this.idResolucaoCdr = dados.resolucaoCdr.idResolucaoCdr;
      // ⚠️ NÃO ATRIBUIMOS dados.resolucaoCdr.dataResolucaoCdr nem dataReuniaoCdr aqui

      this.consideracoes = [...dados.resolucaoCdr.consideracoes];
      this.consideracaoFinal = dados.resolucaoCdr.consideracaoFinal;

      this.valorTotal = dados.resolucaoCdr.valorTotal;
      this.valorTotalPorExtenso = dados.resolucaoCdr.valorTotalPorExtenso;
      this.valorTda = dados.resolucaoCdr.valorTda;
      this.valorTdaPorExtenso = dados.resolucaoCdr.valorTdaPorExtenso;
      this.valorMoeda = dados.resolucaoCdr.valorMoeda;
      this.valorMoedaPorExtenso = dados.resolucaoCdr.valorMoedaPorExtenso;

      this.prazo = dados.resolucaoCdr.prazo;
      this.responsavelPagamento = dados.resolucaoCdr.responsavelPagamento;
      this.cpfResponsavel = dados.resolucaoCdr.cpfResponsavel;
    }
  }

  private gerarIdNumericoAleatorio(): string {
    const min = 100000;
    const max = 999999;
    const numero = Math.floor(Math.random() * (max - min + 1)) + min;
    return numero.toString();
  }

  private formatarDataPorExtenso(data: Date): string {
    const meses = [
      'janeiro',
      'fevereiro',
      'março',
      'abril',
      'maio',
      'junho',
      'julho',
      'agosto',
      'setembro',
      'outubro',
      'novembro',
      'dezembro',
    ];
    const dia = data.getDate();
    const mes = meses[data.getMonth()];
    const ano = data.getFullYear();
    return `${dia} de ${mes} de ${ano}`;
  }

  adicionarConsideracao(): void {
    this.consideracoes.push('');
  }

  salvar(): void {
    const dados: DadosResolucaoCdr = {
      // Dados da resolução
      sr: this.sr,
      idResolucaoCdr: this.idResolucaoCdr,
      dataResolucaoCdr: this.dataResolucaoCdr,
      dataReuniaoCdr: this.dataReuniaoCdr,

      // Considerações
      consideracoes: [...this.consideracoes],
      consideracaoFinal: this.consideracaoFinal,

      // Dados do imóvel
      imovel: this.imovel,
      area: this.area,
      municipio: this.municipio,
      proprietario: this.proprietario,
      sncr: this.sncr,

      // Valores
      valorTotal: this.valorTotal,
      valorTotalPorExtenso: this.valorTotalPorExtenso,

      valorTda: this.valorTda,
      valorTdaPorExtenso: this.valorTdaPorExtenso,

      valorMoeda: this.valorMoeda,
      valorMoedaPorExtenso: this.valorMoedaPorExtenso,

      // Pagamento
      prazo: this.prazo,
      responsavelPagamento: this.responsavelPagamento,
      cpfResponsavel: this.cpfResponsavel,
    };

    // Abre a modal com o componente de impressão
    this.dialog.open(PrintResolucaoCdr, {
      width: '1100px',
      height: '90vh',
      maxWidth: '95vw',
      maxHeight: '95vh',
      data: dados,
    });
  }
  /**
   * Geração provisória do código da resolução.
   *
   * Posteriormente pode ser substituído por um ID
   * retornado pelo backend.
   */
  private gerarIdResolucao(): string {
    const data = new Date();

    const ano = data.getFullYear();

    const numero = Math.floor(Math.random() * 900000) + 100000;

    return `CDR-${ano}-${numero}`;
  }

  /**
   * Atualiza os valores por extenso.
   */
  atualizarValoresPorExtenso(): void {
    if (this.valorTotal !== null) {
      this.valorTotalPorExtenso = this.converterValorParaTexto(this.valorTotal);
    }

    if (this.valorTda !== null) {
      this.valorTdaPorExtenso = this.converterValorParaTexto(this.valorTda);
    }

    if (this.valorMoeda !== null) {
      this.valorMoedaPorExtenso = this.converterValorParaTexto(this.valorMoeda);
    }
  }

  private converterValorParaTexto(valor: number): string {
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }

  enviarParaAssinatura(): void {
    console.log('Resolução enviada para assinatura');
  }

  // ... restante do código (adicionarConsideracao, salvar, etc.)
}
