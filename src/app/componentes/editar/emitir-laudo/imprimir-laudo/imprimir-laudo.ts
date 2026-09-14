import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  Input,
  ViewChild,
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

/* =========================================================
   TIPOS
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

interface DadosLaudo {
  ata: string;
  processo: string;
  dataLva: string;
  servidores: Servidor[];
  sr: string;
  estado: string;
  imovel: string;
  municipio: string;
  areaRegistrada: number;
  areaMedidaAvaliada: number;
  capacidadeFamilias: number;
  usoImovel: UsoImovel[];
  valorPassivoAmbiental: number;
  valorBenfeitorias: number;
  custoPorFamilia: number;
  valorTerraNua: number;
  valorTotalImovel: number;
}

/* =========================================================
   COMPONENTE
========================================================= */

@Component({
  selector: 'app-imprimir-laudo',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './imprimir-laudo.html',
  styleUrl: './imprimir-laudo.css',
})
export class ImprimirLaudo implements AfterViewInit {
  @Input() dados: DadosLaudo | any;

  @ViewChild('conteudoImpressao', { static: false })
  conteudoImpressao!: ElementRef<HTMLElement>;

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any) {}

  get dadosExibicao(): DadosLaudo {
    return this.dados || this.dialogData;
  }

  ngAfterViewInit(): void {
    // this.imprimir();
  }

  /* =======================================================
     IMPRESSÃO
  ======================================================= */
  imprimir(): void {
    const conteudo = this.conteudoImpressao?.nativeElement;

    if (!conteudo) {
      console.error('Conteúdo para impressão não encontrado.');
      return;
    }

    const janela = window.open('', '_blank', 'width=900,height=700');

    if (!janela) {
      alert(
        'Não foi possível abrir a janela de impressão. ' +
          'Verifique se o navegador bloqueou pop-ups.',
      );
      return;
    }

    janela.document.open();

    janela.document.write(`
      <!DOCTYPE html>
      <html lang="pt-BR">
        <head>
          <meta charset="UTF-8">
          <title>Ata do Grupo Técnico - LVA</title>
          <style>
            @page { size: A4; margin: 2cm; }

            * { box-sizing: border-box; }

            html, body {
              margin: 0;
              padding: 0;
              background: white;
              font-family: Arial, Helvetica, sans-serif;
              font-size: 12pt;
              color: #000;
            }

            body { width: 100%; }

            .documento {
              width: 100%;
              margin: 0;
              padding: 0;
            }

            p {
              margin-top: 0;
              margin-bottom: 16px;
              line-height: 1.5;
              text-align: justify;
            }

            h3 {
              margin-top: 24px;
              margin-bottom: 12px;
              font-size: 12pt;
              font-weight: bold;
              text-transform: uppercase;
            }

            ol, ul {
              margin: 0 0 16px 0;
              padding-left: 20px;
              line-height: 1.5;
            }

            ol li, ul li { margin-bottom: 4px; }

            table.uso {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 16px;
              font-size: 11pt;
            }

            table.uso th,
            table.uso td {
              border: 1px solid #000;
              padding: 6px 8px;
              text-align: left;
            }

            table.uso th {
              background: #f2f2f2;
              font-weight: bold;
            }

            table.uso td.num,
            table.uso th.num { text-align: right; }

            .cabecalho {
              text-align: center;
              font-weight: bold;
              margin-bottom: 24px;
              line-height: 1.4;
            }

            .titulo-ata {
              text-align: center;
              font-weight: bold;
              margin: 24px 0 8px;
            }

            .assinaturas {
              margin-top: 60px;
              display: flex;
              flex-direction: column;
              gap: 40px;
            }

            .assinatura {
              text-align: center;
              page-break-inside: avoid;
            }

            .assinatura .linha {
              border-top: 1px solid #000;
              width: 70%;
              margin: 0 auto 6px;
            }

            .assinatura .nome {
              font-weight: bold;
              text-transform: uppercase;
            }

            .assinatura .detalhe {
              font-size: 11pt;
            }

            .no-print { display: none !important; }

            @media print {
              html, body { width: 100%; height: auto; }
              .documento { width: 100%; }
            }
          </style>
        </head>
        <body>
          ${conteudo.outerHTML}
        </body>
      </html>
    `);

    janela.document.close();

    janela.onload = () => {
      janela.focus();
      setTimeout(() => {
        janela.print();
        janela.onafterprint = () => {
          janela.close();
        };
      }, 300);
    };
  }

  /* =======================================================
     ENVIO PARA ASSINATURA
  ======================================================= */
  enviarParaAssinatura(): void {
    alert('Ata encaminhada para assinatura digital dos servidores.');
  }

  /* =======================================================
     FORMATAÇÕES
  ======================================================= */
  formatarArea(valor: number): string {
    return `${new Intl.NumberFormat('pt-BR', {
      minimumFractionDigits: 4,
      maximumFractionDigits: 4,
    }).format(valor ?? 0)} ha`;
  }

  formatarMoeda(valor: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(valor ?? 0);
  }

  formatarNumero(valor: number): string {
    return new Intl.NumberFormat('pt-BR').format(valor ?? 0);
  }

  formatarPercentual(valor: number): string {
    return `${new Intl.NumberFormat('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(valor ?? 0)}%`;
  }

  get totalAreaUso(): string {
    const total =
      this.dadosExibicao?.usoImovel?.reduce((t, u) => t + (u.areaHa ?? 0), 0) ??
      0;
    return this.formatarArea(total);
  }

  get totalPercentualUso(): string {
    const total =
      this.dadosExibicao?.usoImovel?.reduce(
        (t, u) => t + (u.percentual ?? 0),
        0,
      ) ?? 0;
    return this.formatarPercentual(total);
  }
}
