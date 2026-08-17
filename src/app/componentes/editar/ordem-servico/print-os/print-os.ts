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

@Component({
  selector: 'app-print-os',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './print-os.html',
  styleUrl: './print-os.css',
})
export class PrintOS implements AfterViewInit {
  @Input() dados: any;

  @ViewChild('conteudoImpressao', { static: false })
  conteudoImpressao!: ElementRef<HTMLElement>;

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any) {}

  get dadosExibicao() {
    return this.dados || this.dialogData;
  }

  ngAfterViewInit(): void {
    // Aguarda o Angular terminar de renderizar o conteúdo,
    // inclusive o *ngFor dos servidores.
    setTimeout(() => {
      this.imprimir();
    }, 300);
  }

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

          <title>Ordem de Serviço</title>

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
              background: white;
              font-family: Arial, Helvetica, sans-serif;
              font-size: 12pt;
              color: #000;
            }

            body {
              width: 100%;
            }

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

            @media print {
              html,
              body {
                width: 100%;
                height: auto;
              }

              .documento {
                width: 100%;
              }
            }
          </style>
        </head>

        <body>

          ${conteudo.outerHTML}

        </body>
      </html>
    `);

    janela.document.close();

    // Aguarda a renderização da nova janela
    // antes de abrir a caixa de impressão.
    janela.onload = () => {
      janela.focus();

      setTimeout(() => {
        janela.print();

        // Fecha a janela depois que o usuário
        // terminar/cancelar a impressão.
        janela.onafterprint = () => {
          janela.close();
        };
      }, 300);
    };
  }
}
