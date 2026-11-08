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
     TEXTOS GERADOS
  ========================================================= */

  get numeroVoto(): string {
    return this.dados.numeroVoto || '—';
  }

  get ementa(): string {
    const d = this.dados;
    return (
      'APRECIAÇÃO PELO COMITE DE DECISÃO REGIONAL SOBRE PROPOSTA DE ' +
      `"${d.assunto || '[modalidade]'}" - ` +
      `"${d.imovel || '[imóvel]'}", ` +
      `"${d.municipio || '[município]'}", ` +
      `"${d.uf || '[UF]'}"`
    );
  }

  get textoFatos(): string {
    const d = this.dados;
    return (
      `Trata-se de proposta de ${d.assunto || '[modalidade]'} para o imóvel rural ` +
      `${d.imovel || '[imóvel]'}, matrícula ${d.matricula || '[matrícula]'}, ` +
      `localizada no município de ${d.municipio || '[município]'}, ${d.uf || '[UF]'}, ` +
      `com código SNCR nº ${d.sncr || '[SNCR]'}, apresentando área registrada de ` +
      `${d.areaRegistrada || '[área registrada]'} ha e área medida de ` +
      `${d.areaMedida || '[área medida]'} ha.`
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
    this.dialogRef.close(true);
  }
}
