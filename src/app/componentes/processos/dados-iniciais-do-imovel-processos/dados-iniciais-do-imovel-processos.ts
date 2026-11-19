import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

import { Estados } from '../../../serviços/estados';
import { Estado, Municipio } from '../../../serviços/estados.model';

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
export class DadosIniciaisDoImovelProcessos implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly estadosService = inject(Estados);
  private readonly destroyRef = inject(DestroyRef);

  form: FormGroup;
  partesEnvolvidas: string[] = [];

  // ⬇️ ESTAS DUAS LINHAS SÃO O QUE O TEMPLATE ESPERA
  readonly estados = signal<Estado[]>([]);
  readonly municipios = signal<Municipio[]>([]);

  readonly srs: string[] = [
    'SR(02)PE',
    'SR(08)SP',
    'SR(09)PR',
    'SR(11)RS',
    'SR(12)MA',
    'SR(13)MT',
    'SR(14)AC',
    'SR(16)MS',
    'SR(20)ES',
    'SR(26)TO',
    'SR(27)MBA',
  ];

  constructor() {
    this.form = this.fb.group({
      dadosImovel: this.fb.group({
        sr: [''],
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

  ngOnInit(): void {
    this.carregarEstados();
    this.escutarMudancaUf();
  }

  private carregarEstados(): void {
    this.estadosService
      .listarEstados()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((lista) => this.estados.set(lista));
  }

  private escutarMudancaUf(): void {
    this.form
      .get('dadosImovel.uf')
      ?.valueChanges.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((uf: string) => {
        this.form
          .get('dadosImovel.municipio')
          ?.setValue('', { emitEvent: false });

        this.municipios.set([]);

        if (!uf) return;

        this.estadosService
          .listarMunicipiosPorUf(uf)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe((lista) => this.municipios.set(lista));
      });
  }
}
