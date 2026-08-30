import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CurrencyPipe } from '@angular/common';

export interface DadosPortaria {
  sr: string;
  idPortariaCdr: string;
  dataPortariaCdr: string;
  idResolucaoCdr: string;
  dataResolucaoCdr: string;
  imovel: string;
  area: number;
  municipio: string;
  estado: string;
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
  selector: 'app-texto-portaria',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, CurrencyPipe],
  templateUrl: './texto-portaria.html',
  styleUrl: './texto-portaria.css',
})
export class TextoPortaria {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public dados: DadosPortaria,
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
          <title>Portaria CDR - ${this.dados.idPortariaCdr}</title>
          <style>
            @page {
              size: A4;
              margin: 2cm;
            }
            * {
              box-sizing: border-box;
            }
            html, body {
              margin: 0;
              padding: 0;
              background: #ffffff;
              font-family: Arial, Helvetica, sans-serif;
              font-size: 12pt;
              line-height: 1.6;
              color: #000;
            }
            .portaria-documento {
              width: 100%;
            }
            .titulo-portaria {
              margin: 0 0 48px 0;
              font-size: 12pt;
              font-weight: bold;
              text-transform: uppercase;
              text-align: center;
            }
            .texto {
              margin: 0 0 24px 0;
              text-align: justify;
              text-indent: 2.5rem;
              line-height: 1.75;
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
    alert('Portaria enviada para assinatura');
    // Implementar futuramente a integração com serviço de assinatura.
  }
}
