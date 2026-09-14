import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { IMOVEIS_MOCK } from '../../../mock/imovel.mock';
import { ImprimirLaudo } from './imprimir-laudo/imprimir-laudo';

/* =========================================================
   TIPOS AUXILIARES
========================================================= */

interface Servidor {
  nome: string;
  cargo: string;
  siape: string;
}

interface UsoImovel {
  descricao: string;
  areaHa: number;
  percentual: number;
}

/* =========================================================
   MOCKS AUXILIARES
   (não existem no IMOVEIS_MOCK — substituir pela API real)
========================================================= */

const SERVIDORES_MOCK: Servidor[] = [
  { nome: 'Daniele Ramos', cargo: 'Perito Agrário', siape: '123456' },
  { nome: 'Liz Onishi', cargo: 'Especialista', siape: '789012' },
  { nome: 'Marcos Gonçalves', cargo: 'Técnico', siape: '345678' },
];

const USO_IMOVEL_MOCK: { descricao: string; areaHa: number }[] = [
  { descricao: 'Vegetação nativa / Reserva Legal', areaHa: 6500.0 },
  { descricao: 'Pastagem', areaHa: 3200.0 },
  { descricao: 'Lavoura', areaHa: 900.0 },
  { descricao: 'Benfeitorias e instalações', areaHa: 100.0 },
  { descricao: 'Área inaproveitável', areaHa: 278.8258 },
];

/* =========================================================
   COMPONENTE
========================================================= */

@Component({
  selector: 'app-emitir-laudo',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    //ImprimirLaudo,
  ],
  templateUrl: './emitir-laudo.html',
  styleUrl: './emitir-laudo.css',
})
export class EmitirLaudo {
  /** Registro base carregado do mock. */
  private readonly registro = IMOVEIS_MOCK[0];

  /* -------------------------------------------------------
     DADOS GERAIS
  ------------------------------------------------------- */
  ata = '';
  processo = '';
  dataLva: Date | null = null;

  /* -------------------------------------------------------
     SERVIDORES
  ------------------------------------------------------- */
  servidores = SERVIDORES_MOCK;
  servidoresSelecionados: Servidor[] = [];

  /* -------------------------------------------------------
     LOCALIZAÇÃO / IMÓVEL
  ------------------------------------------------------- */
  sr = '';
  estado = '';
  imovel = '';
  municipio = '';

  /* -------------------------------------------------------
     DIMENSÕES E CAPACIDADE
  ------------------------------------------------------- */
  areaRegistrada: any;
  areaMedidaAvaliada: any;
  capacidadeFamilias = 0;

  /* -------------------------------------------------------
     VALORES
  ------------------------------------------------------- */
  valorPassivoAmbiental = 0;
  valorBenfeitorias = 0;
  valorTerraNua = 0;
  valorTotalImovel = 0;

  /* -------------------------------------------------------
     USO DO IMÓVEL
  ------------------------------------------------------- */
  usoImovel: UsoImovel[] = [];

  constructor(private dialog: MatDialog) {
    this.carregarDados();
  }

  /* =======================================================
     CARREGAMENTO AUTOMÁTICO A PARTIR DO MOCK
  ======================================================= */
  private carregarDados(): void {
    const { imovel, obtencao, avaliacao, resolucaoCdr } = this.registro;

    /* ---------- Dados gerais ---------- */

    // Ata (Código) — geração automática a partir da resolução do CDR
    const anoAta = resolucaoCdr.dataResolucaoCdr
      ? new Date(resolucaoCdr.dataResolucaoCdr).getUTCFullYear()
      : new Date().getFullYear();

    this.ata = `Ata nº ${resolucaoCdr.idResolucaoCdr}/${anoAta}`;

    // Processo — numeral
    this.processo = imovel.processo;

    // Data do LVA — data da reunião do CDR
    this.dataLva = resolucaoCdr.dataReuniaoCdr
      ? new Date(resolucaoCdr.dataReuniaoCdr)
      : null;

    // Servidores — pré-selecionados
    this.servidoresSelecionados = [...SERVIDORES_MOCK];

    /* ---------- Localização ---------- */
    this.sr = imovel.sr;
    this.estado = imovel.uf;
    this.imovel = imovel.imovel;
    this.municipio = imovel.municipio;

    /* ---------- Dimensões e capacidade ---------- */
    this.areaRegistrada = imovel.areaHa;
    this.areaMedidaAvaliada = imovel.areaHa;
    this.capacidadeFamilias = obtencao.capacidadeAssentamento ?? 0;

    /* ---------- Valores ---------- */
    this.valorPassivoAmbiental = avaliacao.valorPassivoAmbiental ?? 0;
    this.valorBenfeitorias = avaliacao.valorBenfeitorias ?? 0;
    this.valorTerraNua = avaliacao.valorTerraNuaMedio ?? 0;
    this.valorTotalImovel = avaliacao.valorTotalImovelMedio ?? 0;

    /* ---------- Uso do imóvel ---------- */
    const totalUso = USO_IMOVEL_MOCK.reduce((t, u) => t + u.areaHa, 0);

    this.usoImovel = USO_IMOVEL_MOCK.map((u) => ({
      ...u,
      percentual: totalUso > 0 ? (u.areaHa / totalUso) * 100 : 0,
    }));
  }

  /* =======================================================
     CONTADOR — ÁREA MEDIDA / AVALIADA
  ======================================================= */
  incrementarArea(): void {
    this.areaMedidaAvaliada = +(this.areaMedidaAvaliada + 1).toFixed(4);
  }

  decrementarArea(): void {
    this.areaMedidaAvaliada = Math.max(
      0,
      +(this.areaMedidaAvaliada - 1).toFixed(4),
    );
  }

  /* =======================================================
     CÁLCULOS DERIVADOS
  ======================================================= */
  get custoPorFamilia(): number {
    return this.capacidadeFamilias > 0
      ? this.valorTotalImovel / this.capacidadeFamilias
      : 0;
  }

  get areaTotalUso(): number {
    return this.usoImovel.reduce((total, item) => total + item.areaHa, 0);
  }

  get percentualTotalUso(): number {
    return this.usoImovel.reduce((total, item) => total + item.percentual, 0);
  }

  /* =======================================================
     FORMATAÇÕES
  ======================================================= */
  get dataLvaFormatada(): string {
    if (!this.dataLva) {
      return '';
    }

    const d = new Date(this.dataLva);
    const dia = String(d.getUTCDate()).padStart(2, '0');
    const mes = String(d.getUTCMonth() + 1).padStart(2, '0');
    const ano = d.getUTCFullYear();

    return `${dia}/${mes}/${ano}`;
  }

  get areaRegistradaFormatada(): string {
    return this.formatarArea(this.areaRegistrada);
  }

  get capacidadeFamiliasFormatada(): string {
    return `${this.capacidadeFamilias} ${
      this.capacidadeFamilias === 1 ? 'família' : 'famílias'
    }`;
  }

  get valorPassivoAmbientalFormatado(): string {
    return this.formatarMoeda(this.valorPassivoAmbiental);
  }

  get valorBenfeitoriasFormatado(): string {
    return this.formatarMoeda(this.valorBenfeitorias);
  }

  get valorTerraNuaFormatado(): string {
    return this.formatarMoeda(this.valorTerraNua);
  }

  get valorTotalImovelFormatado(): string {
    return this.formatarMoeda(this.valorTotalImovel);
  }

  get custoPorFamiliaFormatado(): string {
    return this.formatarMoeda(this.custoPorFamilia);
  }

  formatarArea(valor: number): string {
    return `${new Intl.NumberFormat('pt-BR', {
      minimumFractionDigits: 4,
      maximumFractionDigits: 4,
    }).format(valor ?? 0)} ha`;
  }

  formatarPercentual(valor: number): string {
    return `${new Intl.NumberFormat('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(valor ?? 0)}%`;
  }

  private formatarMoeda(valor: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(valor ?? 0);
  }

  /* =======================================================
     MONTAGEM DOS DADOS PARA IMPRESSÃO
  ======================================================= */
  private montarDadosLaudo() {
    return {
      ata: this.ata,
      processo: this.processo,
      dataLva: this.dataLvaFormatada,
      servidores: this.servidoresSelecionados,
      sr: this.sr,
      estado: this.estado,
      imovel: this.imovel,
      municipio: this.municipio,
      areaRegistrada: this.areaRegistrada,
      areaMedidaAvaliada: this.areaMedidaAvaliada,
      capacidadeFamilias: this.capacidadeFamilias,
      usoImovel: this.usoImovel,
      valorPassivoAmbiental: this.valorPassivoAmbiental,
      valorBenfeitorias: this.valorBenfeitorias,
      custoPorFamilia: this.custoPorFamilia,
      valorTerraNua: this.valorTerraNua,
      valorTotalImovel: this.valorTotalImovel,
    };
  }

  /* =======================================================
     AÇÕES
  ======================================================= */
  salvar(): void {
    const dados = this.montarDadosLaudo();

    console.log('Laudo salvo:', dados);

    // Aqui você pode persistir os dados via service
  }

  emitir(): void {
    this.salvar();

    const dados = this.montarDadosLaudo();

    this.dialog.open(ImprimirLaudo, {
      data: dados,
      width: '100%',
      maxWidth: '56.25rem',
      panelClass: 'print-dialog',
    });
  }
}
