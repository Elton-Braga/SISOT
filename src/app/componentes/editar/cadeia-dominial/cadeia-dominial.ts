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

/* =========================================================
   TIPOS AUXILIARES
========================================================= */

interface Servidor {
  nome: string;
  cargo: string;
  siape: string;
}

/* =========================================================
   MOCKS AUXILIARES
   (não existem no IMOVEIS_MOCK — substituir pela API real)
========================================================= */

const RESPONSAVEL_MOCK: Servidor = {
  nome: 'Daniele Ramos',
  cargo: 'Perito Agrário',
  siape: '123456',
};

/* =========================================================
   COMPONENTE
========================================================= */

@Component({
  selector: 'app-cadeia-dominial',
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
  ],
  templateUrl: './cadeia-dominial.html',
  styleUrl: './cadeia-dominial.css',
})
export class CadeiaDominial {
  /** Registro base carregado do mock. */
  private readonly registro = IMOVEIS_MOCK[0];

  /* -------------------------------------------------------
     IDENTIFICAÇÃO DO DOCUMENTO (Memorando)
  ------------------------------------------------------- */
  sr = '';
  tipo = 'T';
  id = '';
  dataPorExtenso = '';

  /* -------------------------------------------------------
     SÚMULA DO PROCESSO
  ------------------------------------------------------- */
  nomeImovel = '';
  codigoSncr = '';
  matricula = '';
  municipios = '';
  processoSei = '';

  /* -------------------------------------------------------
     RESPONSÁVEL PELA ASSINATURA
  ------------------------------------------------------- */
  responsavel: Servidor = RESPONSAVEL_MOCK;

  /* -------------------------------------------------------
     PROCESSO CADEIA DOMINIAL
  ------------------------------------------------------- */
  processoCadeiaDominial = '';
  dataAnalise = '';
  statusAnalise = '';
  linkParecer = '';

  constructor(private dialog: MatDialog) {
    this.carregarDados();
  }

  /* =======================================================
     CARREGAMENTO AUTOMÁTICO A PARTIR DO MOCK
  ======================================================= */
  private carregarDados(): void {
    // `as any` porque o mock original não possui todos os campos novos
    // (código SNCR, matrícula, processo SEI, dados do MDA etc.)
    const { imovel, resolucaoCdr, cadeiaDominial } = this.registro as any;

    /* ---------- Identificação do documento ---------- */
    const anoAta = resolucaoCdr?.dataResolucaoCdr
      ? new Date(resolucaoCdr.dataResolucaoCdr).getUTCFullYear()
      : new Date().getFullYear();

    this.sr = imovel.sr ?? '';
    this.tipo = imovel.tipo ?? 'T';
    this.id = `${anoAta}${String(imovel.processo ?? '').slice(-4)}`;
    this.dataPorExtenso = this.formatarDataPorExtenso(new Date());

    /* ---------- Súmula do processo ---------- */
    this.nomeImovel = imovel.imovel ?? '';
    this.codigoSncr = imovel.codigoSncr ?? imovel.codigoSncrIncra ?? '';
    this.matricula = imovel.matricula ?? '';
    this.municipios = imovel.municipio ?? '';
    this.processoSei = imovel.processo ?? '';

    /* ---------- Processo Cadeia Dominial ---------- */
    this.processoCadeiaDominial = cadeiaDominial?.processo ?? '';
    this.dataAnalise = cadeiaDominial?.dataAnalise
      ? this.formatarData(cadeiaDominial.dataAnalise)
      : '';
    this.statusAnalise = cadeiaDominial?.status ?? '';
    this.linkParecer = cadeiaDominial?.linkParecer ?? '';
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
     FORMATAÇÕES
  ======================================================= */
  formatarData(value: string | Date): string {
    const d = value instanceof Date ? value : this.parseDate(value);
    if (!d) return '';

    const dia = String(d.getDate()).padStart(2, '0');
    const mes = String(d.getMonth() + 1).padStart(2, '0');
    return `${dia}/${mes}/${d.getFullYear()}`;
  }

  formatarDataPorExtenso(value: Date): string {
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

    const dia = value.getDate();
    const mes = meses[value.getMonth()];
    const ano = value.getFullYear();

    return `${dia} de ${mes} de ${ano}`;
  }

  /* =======================================================
     MONTAGEM DOS DADOS PARA IMPRESSÃO / ENVIO
  ======================================================= */
  private montarDadosDocumento() {
    return {
      cabecalho: {
        sr: this.sr,
        tipo: this.tipo,
        id: this.id,
        dataPorExtenso: this.dataPorExtenso,
      },
      destinatario: 'Chefe do Protocolo',
      assunto: 'Formalização de Processo Administrativo de Cadeia Dominial',
      sumula: {
        assunto: `Abertura de processo administrativo para levantamento e análise da cadeia dominial do imóvel rural ${this.nomeImovel} cadastrado no Sistema Nacional de Cadastro Rural – SNCR sob o código ${this.codigoSncr}, e registrado sob a matrícula nº ${this.matricula}.`,
        interessado:
          'Instituto Nacional de Colonização e Reforma Agrária – INCRA',
        municipio: this.municipios,
        codigo: `Processo SEI ${this.processoSei}`,
      },
      responsavel: this.responsavel,
      processoCadeiaDominial: {
        processo: this.processoCadeiaDominial,
        dataAnalise: this.dataAnalise,
        statusAnalise: this.statusAnalise,
        linkParecer: this.linkParecer,
      },
    };
  }

  /* =======================================================
     AÇÕES
  ======================================================= */
  gerarSolicitacao(): void {
    console.log('Solicitação de Processo de Cadeia Dominial:', {
      cabecalho: {
        sr: this.sr,
        tipo: this.tipo,
        id: this.id,
        dataPorExtenso: this.dataPorExtenso,
      },
      sumula: {
        nomeImovel: this.nomeImovel,
        codigoSncr: this.codigoSncr,
        matricula: this.matricula,
        municipios: this.municipios,
        processoSei: this.processoSei,
      },
    });
  }

  enviarParaAssinatura(): void {
    alert('Documento enviado para assinatura:');
  }

  realizarCadeiaDominial(): void {
    // Botão para o sistema em desenvolvimento do MDA
    const url = 'https://sistema.mda.gov.br/cadeia-dominial';
    window.open(url, '_blank', 'noopener');
  }
}
