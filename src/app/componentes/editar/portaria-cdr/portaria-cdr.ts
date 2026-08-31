import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialog } from '@angular/material/dialog';
import { TextoPortaria } from './texto-portaria/texto-portaria';
import { IMOVEIS_MOCK } from '../../../mock/imovel.mock';
import { Dados } from '../../../mock/imovel.model';

@Component({
  selector: 'app-portaria-cdr',
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
  templateUrl: './portaria-cdr.html',
  styleUrl: './portaria-cdr.css',
})
export class PortariaCdr implements OnInit {
  // Campos do formulário
  sr: string = '';
  idResolucaoCdr: string = '';
  dataResolucaoCdr: any = null;
  dataReuniaoCdr: any = null;
  idPortariaCdr: any = '';
  dataPortariaCdr: any = '';
  consideracoes: string[] = [''];
  consideracaoFinal: string = '';

  imovel: string = '';
  area: any = null;
  municipio: string = '';
  proprietario: string = '';
  sncr: string = '';
  estado: string = '';

  valorTotal: number = 0;
  valorTotalPorExtenso: string = '';
  valorTda: number = 0;
  valorTdaPorExtenso: string = '';
  valorMoeda: number = 0;
  valorMoedaPorExtenso: string = '';
  prazo: string = '';
  responsavelPagamento: string = '';
  cpfResponsavel: string = '';

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    // Carrega o primeiro imóvel do mock (ou use um índice específico)
    if (IMOVEIS_MOCK.length > 0) {
      this.popularComDados(IMOVEIS_MOCK[0]);
    }
  }

  /**
   * Preenche todos os campos do formulário com os dados do mock
   */
  popularComDados(dados: Dados): void {
    // Dados do imóvel
    this.sr = dados.imovel.sr || '';
    this.imovel = dados.imovel.imovel || '';
    this.municipio = dados.imovel.municipio || '';
    this.estado = dados.imovel.uf || '';
    this.proprietario = dados.imovel.proprietario || '';
    this.sncr = dados.imovel.sncr || '';

    // Área: use resolucaoCdr.area se disponível, senão imovel.areaHa
    this.area = dados.resolucaoCdr?.area ?? dados.imovel.areaHa ?? null;

    // Dados da resolução CDR
    this.idResolucaoCdr = dados.resolucaoCdr?.idResolucaoCdr || '';
    this.dataResolucaoCdr = dados.resolucaoCdr?.dataResolucaoCdr
      ? this.formatarData(dados.resolucaoCdr.dataResolucaoCdr)
      : '';
    this.dataReuniaoCdr = dados.resolucaoCdr?.dataReuniaoCdr
      ? this.formatarData(dados.resolucaoCdr.dataReuniaoCdr)
      : '';

    // Considerações (se houver)
    this.consideracoes = dados.resolucaoCdr?.consideracoes?.length
      ? [...dados.resolucaoCdr.consideracoes]
      : [''];
    this.consideracaoFinal = dados.resolucaoCdr?.consideracaoFinal || '';

    // Valores
    this.valorTotal = dados.resolucaoCdr?.valorTotal ?? 0;
    this.valorTotalPorExtenso = dados.resolucaoCdr?.valorTotalPorExtenso || '';
    this.valorTda = dados.resolucaoCdr?.valorTda ?? 0;
    this.valorTdaPorExtenso = dados.resolucaoCdr?.valorTdaPorExtenso || '';
    this.valorMoeda = dados.resolucaoCdr?.valorMoeda ?? 0;
    this.valorMoedaPorExtenso = dados.resolucaoCdr?.valorMoedaPorExtenso || '';

    // Pagamento
    this.prazo = dados.resolucaoCdr?.prazo || '';
    this.responsavelPagamento = dados.resolucaoCdr?.responsavelPagamento || '';
    this.cpfResponsavel = dados.resolucaoCdr?.cpfResponsavel || '';

    // Campos de portaria (não presentes no mock, deixe vazios ou com valor padrão)
    this.idPortariaCdr = '';
    this.dataPortariaCdr = '';
  }

  /**
   * Converte Date para string no formato dd/MM/yyyy
   */
  private formatarData(data: Date): string {
    if (!data) return '';
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
  }

  salvar(): void {
    // ... seu código de salvar existente ...
    const dados = {
      sr: this.sr,
      idResolucaoCdr: this.idResolucaoCdr,
      dataResolucaoCdr: this.dataResolucaoCdr,
      dataReuniaoCdr: this.dataReuniaoCdr,
      idPortariaCdr: this.idPortariaCdr,
      dataPortariaCdr: this.dataPortariaCdr,
      consideracoes: [...this.consideracoes],
      consideracaoFinal: this.consideracaoFinal,
      imovel: this.imovel,
      area: this.area,
      municipio: this.municipio,
      proprietario: this.proprietario,
      sncr: this.sncr,
      valorTotal: this.valorTotal,
      valorTotalPorExtenso: this.valorTotalPorExtenso,
      valorTda: this.valorTda,
      valorTdaPorExtenso: this.valorTdaPorExtenso,
      valorMoeda: this.valorMoeda,
      valorMoedaPorExtenso: this.valorMoedaPorExtenso,
      prazo: this.prazo,
      responsavelPagamento: this.responsavelPagamento,
      cpfResponsavel: this.cpfResponsavel,
      estado: this.estado,
    };
    this.dialog.open(TextoPortaria, {
      width: '1100px',
      height: '90vh',
      maxWidth: '95vw',
      maxHeight: '95vh',
      data: dados,
    });
  }
}
