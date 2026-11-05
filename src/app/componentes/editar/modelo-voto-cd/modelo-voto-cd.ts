import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-modelo-voto-cd',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
  ],
  templateUrl: './modelo-voto-cd.html',
  styleUrl: './modelo-voto-cd.css',
})
export class ModeloVotoCd implements OnInit {
  private readonly fb = inject(FormBuilder);

  /** Gerado pelo sistema */
  readonly numeroVoto = `${this.numeroAleatorio(100, 999)}/${new Date().getFullYear()}`;
  readonly processoSei = this.gerarProcessoSei();

  readonly modalidades: string[] = [
    'Compra e Venda Decreto 433/92',
    'Adjudicação',
    'Desapropriação Lei 4132/62',
    'Arrecadação de Terras Públicas da União',
    'Desapropriação Lei 8.629/93',
    'Doação',
  ];

  readonly tiposReferencia: string[] = [
    'Lei',
    'Decreto',
    'Ato',
    'Portaria',
    'Instrução Normativa',
    'Ofício',
    'Memorando',
    'Despacho',
    'Processo SEI',
  ];

  readonly ufs: string[] = [
    'AC',
    'AL',
    'AP',
    'AM',
    'BA',
    'CE',
    'DF',
    'ES',
    'GO',
    'MA',
    'MT',
    'MS',
    'MG',
    'PA',
    'PB',
    'PR',
    'PE',
    'PI',
    'RJ',
    'RN',
    'RS',
    'RO',
    'RR',
    'SC',
    'SP',
    'SE',
    'TO',
  ];

  form!: FormGroup;

  ngOnInit(): void {
    this.form = this.fb.group({
      // Identificação
      processoSei: [this.processoSei],
      interessado: ['', Validators.required],
      conselheiro: ['', Validators.required],
      cargo: [''],
      unidade: [''],

      // 1. Assunto
      assunto: ['', Validators.required],

      // 4.1.1. Dados do imóvel (alimentam ementa e texto automático)
      imovel: ['', Validators.required],
      matricula: [''],
      municipio: ['', Validators.required],
      uf: ['', Validators.required],
      sncr: [''],
      areaRegistrada: [''],
      areaMedida: [''],

      // 3. Referência
      referencias: this.fb.array([this.criarReferencia()]),

      // 4. Relatório
      fatos: [''],
      consideracoes: [''],

      // 5. Conclusão
      conclusao: ['', Validators.required],
    });
  }

  /* =========================================================
     REFERÊNCIAS (FormArray)
  ========================================================= */

  get referencias(): FormArray {
    return this.form.get('referencias') as FormArray;
  }

  criarReferencia(): FormGroup {
    return this.fb.group({
      tipo: [''],
      numero: [''],
      sei: [''],
      data: [''],
    });
  }

  adicionarReferencia(): void {
    this.referencias.push(this.criarReferencia());
  }

  removerReferencia(index: number): void {
    if (this.referencias.length > 1) {
      this.referencias.removeAt(index);
    }
  }

  /* =========================================================
     TEXTOS GERADOS AUTOMATICAMENTE
  ========================================================= */

  private get valor(): any {
    return this.form?.value ?? {};
  }

  get ementaGerada(): string {
    const v = this.valor;

    return (
      'APRECIAÇÃO PELO COMITE DE DECISÃO REGIONAL SOBRE PROPOSTA DE ' +
      `"${v.assunto || '[modalidade]'}" - ` +
      `"${v.imovel || '[imóvel]'}", ` +
      `"${v.municipio || '[município]'}", ` +
      `"${v.uf || '[UF]'}"`
    );
  }

  get textoFatos(): string {
    const v = this.valor;

    return (
      `Trata-se de proposta de ${v.assunto || '[modalidade]'} para o imóvel rural ` +
      `${v.imovel || '[imóvel]'}, matrícula ${v.matricula || '[matrícula]'}, ` +
      `localizada no município de ${v.municipio || '[município]'}, ${v.uf || '[UF]'}, ` +
      `com código SNCR nº ${v.sncr || '[SNCR]'}, apresentando área registrada de ` +
      `${v.areaRegistrada || '[área registrada]'} ha e área medida de ` +
      `${v.areaMedida || '[área medida]'} ha.`
    );
  }

  /* =========================================================
     BLOCO DE ASSINATURA
  ========================================================= */

  get nomeConselheiro(): string {
    return this.valor.conselheiro || '[NOME DO(A) CONSELHEIRO(A)]';
  }

  get cargoConselheiro(): string {
    const cargo = this.valor.cargo || '[CARGO/FUNÇÃO]';
    const unidade = this.valor.unidade || '[DIRETORIA/UNIDADE]';
    return `${cargo} - ${unidade}`;
  }

  /* =========================================================
     AÇÕES
  ========================================================= */

  imprimir(): void {
    window.print();
  }

  enviarParaAssinatura(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = this.form.getRawValue();

    // TODO: chamar o serviço responsável pelo envio à assinatura
    console.log('Voto enviado para assinatura:', payload);
  }

  /* =========================================================
     GERADORES
  ========================================================= */

  private numeroAleatorio(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /** Ex.: 21000.004821/2025-37 */
  private gerarProcessoSei(): string {
    const sequencial = String(this.numeroAleatorio(1, 999999)).padStart(6, '0');
    const digito = String(this.numeroAleatorio(10, 99));
    return `21000.${sequencial}/${new Date().getFullYear()}-${digito}`;
  }
}
