import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-parecer-tecnico-conclusivo',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    MatCheckboxModule,
    MatIconModule,
  ],
  templateUrl: './parecer-tecnico-conclusivo.html',
  styleUrl: './parecer-tecnico-conclusivo.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParecerTecnicoConclusivo implements OnInit, OnChanges {
  @Input() dados: any = {};
  @Input() readonly = false;
  private readonly router = inject(Router);
  @Output() imprimir = new EventEmitter<any>();
  @Output() assinar = new EventEmitter<any>();

  private readonly fb = inject(FormBuilder);

  form: FormGroup = this.fb.group({
    interessadoProprietario: ['', [Validators.required]],
    perfilOcupantes: [''],
    analiseRevisoraConclusao: [''],
    // 1.1 — Introdução e histórico
    introducaoHistorico: [''],
    historicoImpugnacoes: [''],
    analiseIndeferimento: [''],
    resultado: [''],

    // 3.4 — Síntese da viabilidade (radio + condicional)
    viabilidade: [''],
    viabilidadeCondicionantes: [''],

    // 4.1 — Tensão/conflito e ações judiciais (radios + condicionais)
    tensaoConflito: [''],
    tensaoConflitoDescricao: [''],
    acoesJudiciais: [''],
    acoesJudiciaisDescricao: [''],

    // 4.1 — Manifestação da CCA (checkboxes + textarea) — AGORA NO NÍVEL RAIZ

    manifestacaoCca: [''],
    ccaInstancia: [''], // 'regional' | 'nacional'

    // 6 — Outros aspectos relevantes (radio + condicional)
    outrosAspectos: [''],
    outrosAspectosDescricao: [''],

    // 7 — Análise revisora e conclusão
    sintesePontosExaminados: [''],
    divergenciasManifestacoes: [''],
    pendenciasRessalvas: [''],
    conclusaoRevisora: [''],

    // 8 — Documentos de fundamentação (checkbox múltiplo + "Outro")
    documentos: this.fb.group({
      laf: [false],
      mapaCapacidadeUso: [false],
      mapaDeclividadeSolo: [false],
      mapaUsoAtualSolo: [false],
      plantaGeral: [false],
      memorialDescritivo: [false],
      laudoAvaliacao: [false],
      planilhaHomogeneizacao: [false],
      relacaoBenfeitoriasCustos: [false],
      extratoLaudoAvaliacao: [false],
      fichaAgronomica: [false],
      ecgr: [false],
      ataGrupoTecnico: [false],
      outro: [false],
      outroEspecificar: [''],
    }),
  });

  ngOnInit(): void {
    this.aplicarReadonly();
    this.patchForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dados']) {
      this.dados = this.dados ?? {};
      this.patchForm();
    }
    if (changes['readonly']) {
      this.aplicarReadonly();
    }
  }

  private aplicarReadonly(): void {
    if (this.readonly) {
      this.form.disable({ emitEvent: false });
    } else {
      this.form.enable({ emitEvent: false });
    }
  }

  private patchForm(): void {
    this.form.patchValue(
      {
        interessadoProprietario: this.dados?.imovel?.proprietario ?? '',
      },
      { emitEvent: false },
    );
  }

  onImprimir(): void {
    this.imprimir.emit(this.dados ?? {});
  }

  onAssinar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.assinar.emit({
      ...(this.dados ?? {}),
      imovel: {
        ...(this.dados?.imovel ?? {}),
        proprietario: this.form.value.interessadoProprietario,
      },
      parecer: this.form.value,
    });
  }

  onChancelar(): void {
    this.router.navigate(['editar']);
  }

  onSalvar(): void {
    // Se quiser manter a validação apenas no "Assinar parecer", salve direto.
    // Caso queira validar antes de salvar, descomente o bloco abaixo:
    //
    // if (this.form.invalid) {
    //   this.form.markAllAsTouched();
    //   return;
    // }

    this.router.navigate(['editar']);
  }
}
