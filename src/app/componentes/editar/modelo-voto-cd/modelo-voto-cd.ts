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
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
} from '@angular/material/dialog';

import { ImprimirModeloVotoCd } from './imprimir-modelo-voto-cd/imprimir-modelo-voto-cd';
import { Dados } from '../../../mock/imovel.model';

/* =========================================================
   Tipagem do payload do dialog
   ========================================================= */

interface ReferenciaRaw {
  tipo?: string;
  numero?: string;
  sei?: string;
  data?: string | Date | null;
}

/**
 * Payload enriquecido recebido de `Editar.abrirmodeloDeVotoCD()`.
 * Herda todos os campos de `Dados` e adiciona os campos extras
 * montados pelo `Editar.salvar()` / `Editar.abrirmodeloDeVotoCD()`.
 */
interface ModeloVotoData extends Dados {
  // Identificação (não estão em Dados, vêm do Editar)
  conselheiro?: string;
  cargo?: string;
  unidade?: string;

  // Blocos montados pelo Editar.salvar()
  fase0?: {
    modalidadeObtencao?: string;
    nomeImovel?: string;
    codigoSncr?: string;
    matricula?: string;
    nomeProprietario?: string;
    cpfCnpjProprietario?: string;
    municipioSelecionado?: string;
    ufSelecionada?: string;
    imovelOcupado?: string;
    areaRegistrada?: number | null;
    areaCertificada?: number | null;
    areaVisada?: number | null;
    vtiMedio?: number | null;
    vtnMedio?: number | null;
    entidadeDemandante?: string;
    justificativaViabilidade?: string;
  };
  fase1?: { processoSei?: string };
  fase7?: {
    processoCadeiaDominial?: string;
    dataAnalise?: string;
    statusAnalise?: string;
    linkParecer?: string;
  };
  fase9?: { conselheiro?: string; conclusao?: string };

  // Preenchimentos já existentes (edições posteriores)
  assunto?: string;
  conclusao?: string;
  consideracoes?: string;
  referencias?: ReferenciaRaw[];
}

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
    MatDialogModule,
  ],
  templateUrl: './modelo-voto-cd.html',
  styleUrl: './modelo-voto-cd.css',
})
export class ModeloVotoCd implements OnInit {
  /* =========================================================
     Injeções
  ========================================================= */
  private readonly fb = inject(FormBuilder);
  private readonly dialog = inject(MatDialog);

  /** JSON vindo da linha da lista via Editar (Lista → Editar → ModeloVotoCd). */
  private readonly dadosRecebidos = inject(MAT_DIALOG_DATA, {
    optional: true,
  }) as ModeloVotoData | null;

  /* =========================================================
     Campos gerados pelo sistema (fallbacks)
  ========================================================= */
  readonly numeroVoto = `${this.numeroAleatorio(100, 999)}/${new Date().getFullYear()}`;
  readonly processoSei = this.gerarProcessoSei();

  /* =========================================================
     Listas estáticas
  ========================================================= */
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

  /* =========================================================
     Formulário
  ========================================================= */
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

      // 4.1. Dados do imóvel
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

    this.prefillFromDados(this.dadosRecebidos);
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
     PREFILL — carrega dados vindos da linha da lista
  ========================================================= */
  private prefillFromDados(dados: ModeloVotoData | null): void {
    if (!dados) return;

    const imovel = dados.imovel ?? ({} as any);
    const obtencao = dados.obtencao ?? ({} as any);
    const fase0 = dados.fase0 ?? {};
    const fase1 = dados.fase1 ?? {};

    /* ---------- 1. Assunto (mapeado para modalidades[]) ---------- */
    const assunto = this.mapearModalidade(
      dados.assunto ??
        imovel.modalidade ??
        obtencao.formaObtencao ??
        fase0.modalidadeObtencao ??
        '',
    );

    /* ---------- 4.1. Dados do imóvel ---------- */
    const processoSei =
      obtencao.processoSei ??
      fase1.processoSei ??
      imovel.processo ??
      this.processoSei;

    const areaRegistrada = this.pickNumber(
      imovel.areaRegistrada,
      fase0.areaRegistrada,
      imovel.areaHa,
    );
    const areaMedida = this.pickNumber(
      imovel.areaVisada,
      imovel.areaCertificada,
      fase0.areaVisada,
      fase0.areaCertificada,
    );

    /* ---------- 4.2. Considerações (geradas) ---------- */
    const consideracoes = dados.consideracoes ?? this.gerarConsideracoes(dados);

    /* ---------- 5. Conclusão (fallback = texto padrão gerado) ---------- */
    const conclusao =
      dados.conclusao ??
      dados.fase9?.conclusao ??
      this.gerarConclusao(dados, assunto, imovel, processoSei);

    this.form.patchValue({
      // Identificação
      processoSei,
      interessado: imovel.proprietario ?? fase0.nomeProprietario ?? '',
      conselheiro: dados.conselheiro ?? dados.fase9?.conselheiro ?? '',
      cargo: dados.cargo ?? '',
      unidade: dados.unidade ?? '',

      // 1. Assunto
      assunto,

      // 4.1. Imóvel
      imovel: imovel.imovel ?? fase0.nomeImovel ?? '',
      matricula: imovel.matriculas ?? fase0.matricula ?? '',
      municipio: imovel.municipio ?? fase0.municipioSelecionado ?? '',
      uf: imovel.uf ?? fase0.ufSelecionada ?? '',
      sncr: imovel.sncr ?? fase0.codigoSncr ?? '',
      areaRegistrada: this.toStr(areaRegistrada),
      areaMedida: this.toStr(areaMedida),

      // 4.2. Relatório
      consideracoes,

      // 5. Conclusão
      conclusao,
    });

    this.prefillReferencias(dados, processoSei);
  }

  /* =========================================================
     Referências — do JSON ou geradas a partir do processo SEI
  ========================================================= */
  private prefillReferencias(dados: ModeloVotoData, processoSei: string): void {
    const refs = dados.referencias;

    if (Array.isArray(refs) && refs.length > 0) {
      this.referencias.clear();
      refs.forEach((r) => {
        this.referencias.push(
          this.fb.group({
            tipo: [r.tipo ?? ''],
            numero: [r.numero ?? ''],
            sei: [r.sei ?? ''],
            data: [this.normalizeDate(r.data)],
          }),
        );
      });
      return;
    }

    // Fallback: usa o processo SEI como primeira referência
    if (processoSei && this.referencias.length > 0) {
      const first = this.referencias.at(0);
      if (first) {
        (first as FormGroup).patchValue({
          tipo: 'Processo SEI',
          numero: processoSei,
          sei: processoSei,
          data: '',
        });
      }
    }
  }

  /* =========================================================
     Helpers de mapeamento
  ========================================================= */
  private mapearModalidade(raw: string): string {
    if (!raw) return '';
    const v = String(raw).toLowerCase().trim();

    // Match exato contra modalidades[]
    const exact = this.modalidades.find((m) => m.toLowerCase() === v);
    if (exact) return exact;

    // Mapeamento por palavra-chave
    if (
      v === 'compra' ||
      v.includes('433') ||
      (v.includes('compra') && v.includes('venda'))
    ) {
      return 'Compra e Venda Decreto 433/92';
    }
    if (v.includes('4132') || v.includes('4.132')) {
      return 'Desapropriação Lei 4132/62';
    }
    if (v.includes('8629') || v.includes('8.629')) {
      return 'Desapropriação Lei 8.629/93';
    }
    if (v === 'doacao' || v.includes('doa')) {
      return 'Doação';
    }
    if (v.includes('adjudica')) {
      return 'Adjudicação';
    }
    if (v.includes('arrecada')) {
      return 'Arrecadação de Terras Públicas da União';
    }
    if (v === 'desapropriacao' || v.includes('desapropria')) {
      return 'Desapropriação Lei 8.629/93';
    }

    return '';
  }

  private gerarConclusao(
    dados: ModeloVotoData,
    assunto: string,
    imovel: any,
    processoSei: string,
  ): string {
    const fase0 = dados.fase0 ?? {};
    const ob = dados.obtencao ?? ({} as any);

    const nomeImovel = imovel.imovel ?? fase0.nomeImovel ?? '[imóvel]';
    const matricula = imovel.matriculas ?? fase0.matricula ?? '[matrícula]';
    const municipio =
      imovel.municipio ?? fase0.municipioSelecionado ?? '[município]';
    const uf = imovel.uf ?? fase0.ufSelecionada ?? '[UF]';
    const sncr = imovel.sncr ?? fase0.codigoSncr ?? '[SNCR]';

    const areaReg = this.pickNumber(
      imovel.areaRegistrada,
      fase0.areaRegistrada,
      imovel.areaHa,
    );
    const areaMed = this.pickNumber(
      imovel.areaVisada,
      imovel.areaCertificada,
      fase0.areaVisada,
      fase0.areaCertificada,
    );

    const modalidade = assunto || '[modalidade]';
    const areaRegStr = areaReg ?? '[área registrada]';
    const areaMedStr = areaMed ?? '[área medida]';

    /* Trecho condicional — demanda social */
    const demandaPartes: string[] = [];
    if (ob.entidadeDemandante) {
      demandaPartes.push(`entidade demandante ${ob.entidadeDemandante}`);
    }
    if (ob.familiasCadastradas) {
      demandaPartes.push(`${ob.familiasCadastradas} famílias cadastradas`);
    }
    const demandaTexto = demandaPartes.length
      ? ` o atendimento da demanda social (${demandaPartes.join(' e ')})`
      : ' o atendimento da demanda social';

    return (
      `Diante do exposto e das considerações apresentadas, tendo em vista o ` +
      `cumprimento regular da instrução processual,${demandaTexto} e a regularidade ` +
      `da cadeia dominial do imóvel, VOTO no sentido de APROVAR a proposta de ` +
      `${modalidade} referente ao imóvel rural "${nomeImovel}", matrícula ` +
      `${matricula}, localizado no município de ${municipio}/${uf}, com código ` +
      `SNCR nº ${sncr}, apresentando área registrada de ${areaRegStr} ha e área ` +
      `medida de ${areaMedStr} ha, nos termos da fundamentação acima exposta e ` +
      `do Processo SEI nº ${processoSei}.\n\n` +
      `É como voto.`
    );
  }

  private gerarConsideracoes(dados: ModeloVotoData): string {
    const ob = dados.obtencao ?? ({} as any);
    const ib = dados.instrucaoBasica ?? ({} as any);
    const fase7 = dados.fase7 ?? {};

    const partes: string[] = [];

    /* --- Cumprimento da instrução processual --- */
    const documentos: string[] = [];
    if (ib.espelhoImovelSncr) documentos.push('Espelho do Imóvel no SNCR');
    if (ib.demonstrativoImovelSicar) documentos.push('Demonstrativo SICAR');
    if (ib.matriculas) documentos.push('Matrículas');
    if (ib.arquivoVetorialShp) documentos.push('Arquivo vetorial (SHP)');
    if (ib.mapaImpresso) documentos.push('Mapa impresso');
    if (ib.memorialDescritivo) documentos.push('Memorial descritivo');

    if (documentos.length > 0) {
      partes.push(
        `A instrução processual encontra-se cumprida, constando dos autos: ${documentos.join(', ')}.`,
      );
    }
    if (ib.observacao) {
      partes.push(ib.observacao);
    }

    /* --- Demanda social --- */
    const demanda: string[] = [];
    if (ob.entidadeDemandante) {
      demanda.push(`entidade demandante: ${ob.entidadeDemandante}`);
    }
    if (ob.familiasCadastradas) {
      demanda.push(`famílias cadastradas: ${ob.familiasCadastradas}`);
    }
    if (ob.capacidadeAssentamento) {
      demanda.push(
        `capacidade de assentamento: ${ob.capacidadeAssentamento} famílias`,
      );
    }
    if (ob.acampamentoVinculado) {
      demanda.push(`acampamento vinculado: ${ob.acampamentoVinculado}`);
    }
    if (demanda.length > 0) {
      partes.push(`Quanto à demanda social: ${demanda.join('; ')}.`);
    }

    /* --- Cadeia dominial --- */
    if (fase7.statusAnalise) {
      const link = fase7.linkParecer ? ` (${fase7.linkParecer})` : '';
      partes.push(`Análise da cadeia dominial: ${fase7.statusAnalise}${link}.`);
    }

    /* --- Ações de reintegração --- */
    if (ob.acoesReintegracao) {
      partes.push(`Ações de reintegração: ${ob.acoesReintegracao}.`);
    }

    return partes.join('\n\n');
  }

  private normalizeDate(v: any): string {
    if (!v) return '';
    if (v instanceof Date) {
      const y = v.getFullYear();
      const m = String(v.getMonth() + 1).padStart(2, '0');
      const d = String(v.getDate()).padStart(2, '0');
      return `${y}-${m}-${d}`;
    }
    if (typeof v === 'string') {
      return v.includes('T') ? v.split('T')[0] : v;
    }
    return '';
  }

  private pickNumber(
    ...values: Array<number | null | undefined>
  ): number | null {
    for (const v of values) {
      if (v !== null && v !== undefined && !Number.isNaN(Number(v))) {
        return Number(v);
      }
    }
    return null;
  }

  private toStr(v: any): string {
    return v === null || v === undefined ? '' : String(v);
  }

  /* =========================================================
     AÇÕES
  ========================================================= */
  imprimir(): void {
    window.print();
  }

  Salvar(): void {
    /*
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }*/

    // Payload completo do formulário (inclui FormArray de referências)
    const payload = this.form.getRawValue();

    this.dialog.open(ImprimirModeloVotoCd, {
      data: payload,
      width: '100%',
      maxWidth: '56.25rem',
      panelClass: 'print-dialog',
      autoFocus: false,
      restoreFocus: false,
    });
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
