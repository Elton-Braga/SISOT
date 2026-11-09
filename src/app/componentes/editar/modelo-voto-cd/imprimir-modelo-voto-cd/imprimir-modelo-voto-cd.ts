import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

export interface ReferenciaVoto {
  tipo: string;
  numero: string;
  sei: string;
  data: string;
}

export interface VotoCdData {
  numeroVoto: string;
  processoSei: string;
  interessado: string;
  conselheiro: string;
  cargo: string;
  unidade: string;

  assunto: string;

  imovel: string;
  matricula: string;
  municipio: string;
  uf: string;
  sncr: string;
  areaRegistrada: string;
  areaMedida: string;

  referencias: ReferenciaVoto[];

  fatos: string;
  consideracoes: string;
  conclusao: string;
}

@Component({
  selector: 'app-imprimir-modelo-voto-cd',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './imprimir-modelo-voto-cd.html',
  styleUrl: './imprimir-modelo-voto-cd.css',
})
export class ImprimirModeloVotoCd {
  private readonly dialogRef = inject(MatDialogRef<ImprimirModeloVotoCd>);

  /** Dados recebidos do componente ModeloVotoCd */
  readonly dados = inject<VotoCdData>(MAT_DIALOG_DATA);

  /* =========================================================
     TEXTOS GERADOS (padrão formal – similar à Ordem de Serviço)
  ========================================================= */

  get numeroVoto(): string {
    return this.dados.numeroVoto || '—';
  }

  /** Data por extenso para o cabeçalho (equivalente ao "estado, data" da OS) */
  get dataAtual(): string {
    const d = new Date();
    return d.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  }

  /** Prazo padrão de resposta/validade (equivalente ao prazo da OS) */
  get prazoResposta(): string {
    return '30';
  }

  /** Ementa no mesmo estilo institucional da OS */
  get ementa(): string {
    const d = this.dados;
    return (
      'APRECIAÇÃO, PELO COMITÊ DE DECISÃO REGIONAL, SOBRE PROPOSTA DE ' +
      `"${d.assunto || '[modalidade]'}" ` +
      `REFERENTE AO IMÓVEL RURAL "${d.imovel || '[imóvel]'}", ` +
      `LOCALIZADO NO MUNICÍPIO DE "${d.municipio || '[município]'}/${d.uf || '[UF]'}".`
    );
  }

  /** Texto dos fatos no mesmo padrão descritivo-formal da OS */
  get textoFatos(): string {
    const d = this.dados;
    return (
      `Trata-se de proposta de ${d.assunto || '[modalidade]'} para o imóvel rural ` +
      `denominado "${d.imovel || '[imóvel]'}", matrícula nº ${d.matricula || '[matrícula]'}, ` +
      `localizado no(s) município(s) de "${d.municipio || '[município]'}/${d.uf || '[UF]'}", ` +
      `com código SNCR nº ${d.sncr || '[SNCR]'}, apresentando área registrada de ` +
      `${d.areaRegistrada || '[área registrada]'} ha e área medida de ` +
      `${d.areaMedida || '[área medida]'} ha. Tudo conforme consta nos autos do ` +
      `Processo SEI nº "${d.processoSei || '[processo]'}", devidamente instruído ` +
      `com os documentos pertinentes.`
    );
  }

  get cargoConselheiro(): string {
    const cargo = this.dados.cargo || '[CARGO/FUNÇÃO]';
    const unidade = this.dados.unidade || '[DIRETORIA/UNIDADE]';
    return `${cargo} - ${unidade}`;
  }

  formatarData(data: string): string {
    if (!data) return '';
    const [ano, mes, dia] = data.split('-');
    if (!ano || !mes || !dia) return data;
    return `${dia}/${mes}/${ano}`;
  }

  /* =========================================================
     AÇÕES
  ========================================================= */

  imprimir(): void {
    window.print();
  }

  enviarParaAssinatura(): void {
    // Sinaliza para o componente pai que o voto deve seguir para assinatura
    alert('Documento enviado para assinatura! ');
    this.dialogRef.close(true);
  }
}
