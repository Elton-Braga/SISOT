import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dados-iniciais-do-imovel-processos',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
  ],
  templateUrl: './dados-iniciais-do-imovel-processos.html',
  styleUrl: './dados-iniciais-do-imovel-processos.css',
})
export class DadosIniciaisDoImovelProcessos {
  form: FormGroup;
  partesEnvolvidas: string[] = [];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      dadosImovel: this.fb.group({
        nomeImovel: [''],
        uf: [''],
        municipio: [''],
        codigoSncr: [''],
        matricula: [''],
        parteEnvolvida: [''],
        nomeProprietario: [''],
        cpfCnpjProprietario: [''],
        areaRegistrada: [''],
        areaMedida: [''],
        areaAvaliada: [''],
        areaVisada: [''],
        valorTotalInferior: [''],
        valorTotalMedio: [''],
        valorTotalSuperior: [''],
        vtiEstimado: [''],
        terraNuaInferior: [''],
        terraNuaMedio: [''],
        terraNuaSuperior: [''],
        vtnEstimado: [''],
        benfeitorias: [''],
        passivoAmbiental: [''],
        ativoAmbiental: [''],
      }),
      naturezaOcupacional: this.fb.group({
        entidadeDemandante: [''],
        acampamentoVinculado: [''],
        imovelOcupado: [''],
        acoesReintegracao: [''],
        orgaoConcorrente: [''],
        capacidadeAssentamento: [''],
        familiasCadastradas: [''],
      }),
      processoObtencao: this.fb.group({
        processoSei: [''],
        processoCadeiaDominial: [''],
        faseAtualProcesso: [''],
      }),
    });
  }
}
