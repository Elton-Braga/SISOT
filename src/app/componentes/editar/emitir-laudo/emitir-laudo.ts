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

const USO_IMOVEL_MOCK: UsoImovel[] = [
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
    // ImprimirLaudo,
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
  areaRegistrada = 0;
  areaMedidaAvaliada = 0;
  capacidadeFamilias = 0;
  familiasCadastradas = 0;

  /* -------------------------------------------------------
     VALORES
  ------------------------------------------------------- */
  valorPassivoAmbiental = 0;
  valorAtivoAmbiental = 0;
  valorBenfeitorias = 0;

  vtnInferior = 0;
  vtnMedio = 0;
  vtnSuperior = 0;

  vtiInferior = 0;
  valorPrevisto = 0;
  vtiSuperior = 0;

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
    // `as any` porque o mock original não possui todos os campos novos
    // (VTN inferior/superior, VTI inferior, valor ativo, famílias cadastradas etc.)
    const { imovel, obtencao, avaliacao, resolucaoCdr } = this.registro as any;

    /* ---------- Dados gerais ---------- */
    const anoAta = resolucaoCdr?.dataResolucaoCdr
      ? new Date(resolucaoCdr.dataResolucaoCdr).getUTCFullYear()
      : new Date().getFullYear();

    this.ata = `Ata nº ${resolucaoCdr?.idResolucaoCdr}/${anoAta}`;
    this.processo = imovel.processo;

    // Data do LVA — agora editável (input type="date")
    this.dataLva = this.parseDate(resolucaoCdr?.dataReuniaoCdr);

    /* ---------- Servidores ---------- */
    this.servidoresSelecionados = [...SERVIDORES_MOCK];

    /* ---------- Localização ---------- */
    this.sr = imovel.sr;
    this.estado = imovel.uf;
    this.imovel = imovel.imovel;
    this.municipio = imovel.municipio;

    /* ---------- Dimensões e capacidade ---------- */
    this.areaRegistrada = imovel.areaHa ?? 0;
    this.areaMedidaAvaliada = imovel.areaHa ?? 0;
    this.capacidadeFamilias = obtencao?.capacidadeAssentamento ?? 0;
    this.familiasCadastradas = obtencao?.familiasCadastradas ?? 0;

    /* ---------- Valores ---------- */
    this.valorPassivoAmbiental = avaliacao?.valorPassivoAmbiental ?? 0;
    this.valorAtivoAmbiental = avaliacao?.valorAtivoAmbiental ?? 0;
    this.valorBenfeitorias = avaliacao?.valorBenfeitorias ?? 0;

    this.vtnInferior =
      avaliacao?.valorTerraNuaInferior ?? avaliacao?.valorTerraNuaMedio ?? 0;
    this.vtnMedio = avaliacao?.valorTerraNuaMedio ?? 0;
    this.vtnSuperior =
      avaliacao?.valorTerraNuaSuperior ?? avaliacao?.valorTerraNuaMedio ?? 0;

    this.vtiInferior =
      avaliacao?.valorTotalImovelInferior ??
      avaliacao?.valorTotalImovelMedio ??
      0;
    this.valorPrevisto =
      avaliacao?.valorPrevisto ?? avaliacao?.valorTotalImovelMedio ?? 0;
    this.vtiSuperior = avaliacao?.valorTotalImovelMedio ?? 0;

    /* ---------- Uso do imóvel ---------- */
    this.usoImovel = USO_IMOVEL_MOCK.map((u) => ({ ...u }));
  }

  /* =======================================================
     HELPERS
  ======================================================= */
  private parseDate(value?: string | null): Date | null {
    if (!value) return null;

    // Evita o shift de fuso em strings "YYYY-MM-DD"
    const iso = /^(\d{4})-(\d{2})-(\d{2})/.exec(value);
    if (iso) {
      return new Date(+iso[1], +iso[2] - 1, +iso[3]);
    }

    const d = new Date(value);
    return isNaN(d.getTime()) ? null : d;
  }

  /* =======================================================
     CONTADOR — ÁREA MEDIDA / AVALIADA
  ======================================================= */
  incrementarArea(): void {
    this.areaMedidaAvaliada = +(Number(this.areaMedidaAvaliada) + 1).toFixed(4);
  }

  decrementarArea(): void {
    this.areaMedidaAvaliada = Math.max(
      0,
      +(Number(this.areaMedidaAvaliada) - 1).toFixed(4),
    );
  }

  /* =======================================================
     CÁLCULOS DERIVADOS
  ======================================================= */
  get custoPorFamilia(): number {
    return this.capacidadeFamilias > 0
      ? this.vtiSuperior / this.capacidadeFamilias
      : 0;
  }

  get areaTotalUso(): number {
    return this.usoImovel.reduce((t, u) => t + (Number(u.areaHa) || 0), 0);
  }

  get percentualTotalUso(): number {
    return this.usoImovel.reduce((t, u) => t + this.percentualDe(u), 0);
  }

  percentualDe(item: UsoImovel): number {
    const total = this.areaTotalUso;
    return total > 0 ? ((Number(item.areaHa) || 0) / total) * 100 : 0;
  }

  /* =======================================================
     FORMATAÇÕES
  ======================================================= */
  get dataLvaFormatada(): string {
    if (!this.dataLva) return '';

    const d = new Date(this.dataLva);
    const dia = String(d.getDate()).padStart(2, '0');
    const mes = String(d.getMonth() + 1).padStart(2, '0');
    return `${dia}/${mes}/${d.getFullYear()}`;
  }

  get areaRegistradaFormatada(): string {
    return this.formatarArea(this.areaRegistrada);
  }

  get capacidadeFamiliasFormatada(): string {
    return `${this.capacidadeFamilias} ${
      this.capacidadeFamilias === 1 ? 'família' : 'famílias'
    }`;
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

  formatarMoeda(valor: number): string {
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
      familiasCadastradas: this.familiasCadastradas,

      usoImovel: this.usoImovel.map((u) => ({
        ...u,
        percentual: this.percentualDe(u),
      })),

      valorPassivoAmbiental: this.valorPassivoAmbiental,
      valorAtivoAmbiental: this.valorAtivoAmbiental,
      valorBenfeitorias: this.valorBenfeitorias,
      custoPorFamilia: this.custoPorFamilia,

      vtnInferior: this.vtnInferior,
      vtnMedio: this.vtnMedio,
      vtnSuperior: this.vtnSuperior,

      vtiInferior: this.vtiInferior,
      valorPrevisto: this.valorPrevisto,
      vtiSuperior: this.vtiSuperior,
    };
  }

  /* =======================================================
     AÇÕES
  ======================================================= */
  salvar(): void {
    console.log('Laudo salvo:', this.montarDadosLaudo());
  }

  emitir(): void {
    this.salvar();

    this.dialog.open(ImprimirLaudo, {
      data: this.montarDadosLaudo(),
      width: '100%',
      maxWidth: '56.25rem',
      panelClass: 'print-dialog',
    });
  }
}
