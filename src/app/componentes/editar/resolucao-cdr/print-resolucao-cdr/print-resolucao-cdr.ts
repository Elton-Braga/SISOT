import { DatePipe } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

export interface DadosResolucaoCdr {
  sr: string;
  idResolucaoCdr: string;
  dataResolucaoCdr: Date | null;
  dataReuniaoCdr: Date | null;

  consideracoes: string[];
  consideracaoFinal: string;

  imovel: string;
  area: number;
  municipio: string;
  proprietario: string;
  sncr: string;

  valorTotal: number;
  valorTotalPorExtenso: string;

  valorTda: number;
  valorTdaPorExtenso: string;

  valorMoeda: number;
  valorMoedaPorExtenso: string;

  prazo: string;
  responsavelPagamento: string;
  cpfResponsavel: string;
}

@Component({
  selector: 'app-print-resolucao-cdr',
  standalone: true,
  imports: [DatePipe, MatButtonModule, MatIconModule],
  templateUrl: './print-resolucao-cdr.html',
  styleUrl: './print-resolucao-cdr.css',
})
export class PrintResolucaoCdr {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public dados: DadosResolucaoCdr,
  ) {}

  imprimir(): void {
    const conteudo = document.getElementById('conteudoImpressao');

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

          <title>
            Resolução CDR - ${this.dados.idResolucaoCdr}
          </title>

          <style>

            @page {
              size: A4;
              margin: 2cm;
            }

            * {
              box-sizing: border-box;
            }

            html,
            body {
              margin: 0;
              padding: 0;

              background: #ffffff;

              font-family:
                Arial,
                Helvetica,
                sans-serif;

              font-size: 12pt;

              line-height: 1.6;

              color: #000;
            }

            .resolucao-documento {
              width: 100%;
            }

            .cabecalho-resolucao {
              margin-bottom: 48px;

              text-align: center;
            }

            .titulo-resolucao {
              margin: 0;

              font-size: 12pt;

              font-weight: bold;

              text-transform: uppercase;
            }

            .texto {
              margin: 0 0 24px 0;

              text-align: justify;

              text-indent: 2.5rem;

              line-height: 1.75;
            }

            .consideracao {
              margin-bottom: 20px;
            }

            .artigo {
              margin-top: 28px;

              margin-bottom: 28px;

              page-break-inside: avoid;
            }

            .assinatura {
              margin-top: 80px;

              text-align: center;

              page-break-inside: avoid;
            }

            .assinatura p {
              margin: 6px 0;
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

  enviarParaAssinatura(): void {
    alert('Resolução enviada para assinatura');

    // Implementar futuramente a integração
    // com o serviço de assinatura.
  }
}
