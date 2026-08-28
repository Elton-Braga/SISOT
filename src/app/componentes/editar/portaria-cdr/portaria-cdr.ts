import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

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
export class PortariaCdr {
  sr: string = '';
  idResolucaoCdr: string = '000';

  dataResolucaoCdr: any;
  dataReuniaoCdr: any;

  consideracoes: string[] = [''];
  consideracaoFinal: string = '...';

  imovel: string = 'teste';
  area: any;
  municipio: string = 'teste123';
  proprietario: string = '...';
  sncr: string = '...';

  valorTotal: number = 0;
  valorTotalPorExtenso: string = '...';

  valorTda: number = 0;
  valorTdaPorExtenso: string = '...';

  valorMoeda: number = 0;
  valorMoedaPorExtenso: string = '...';

  prazo: string = '30';
  responsavelPagamento: string = '...';
  cpfResponsavel: string = '000.000.000-00';

  salvar(): void {
    /*
      const dados: DadosResolucaoCdr = {
        // Dados da resolução
        sr: this.sr,
        idResolucaoCdr: this.idResolucaoCdr,
        dataResolucaoCdr: this.dataResolucaoCdr,
        dataReuniaoCdr: this.dataReuniaoCdr,
  
        // Considerações
        consideracoes: [...this.consideracoes],
        consideracaoFinal: this.consideracaoFinal,
  
        // Dados do imóvel
        imovel: this.imovel,
        area: this.area,
        municipio: this.municipio,
        proprietario: this.proprietario,
        sncr: this.sncr,
  
        // Valores
        valorTotal: this.valorTotal,
        valorTotalPorExtenso: this.valorTotalPorExtenso,
  
        valorTda: this.valorTda,
        valorTdaPorExtenso: this.valorTdaPorExtenso,
  
        valorMoeda: this.valorMoeda,
        valorMoedaPorExtenso: this.valorMoedaPorExtenso,
  
        // Pagamento
        prazo: this.prazo,
        responsavelPagamento: this.responsavelPagamento,
        cpfResponsavel: this.cpfResponsavel,
      };
  
      // Abre a modal com o componente de impressão
      this.dialog.open(PrintResolucaoCdr, {
        width: '1100px',
        height: '90vh',
        maxWidth: '95vw',
        maxHeight: '95vh',
        data: dados,
      });*/
  }
}
