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
import { getSrFromUf } from '../../../utils/sr-por-uf'; // <-- NOVO

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

  readonly estados = signal<Estado[]>([]);
  readonly municipios = signal<Municipio[]>([]);

  readonly srs: string[] = [
    'SR(01)PA',
    'SR(02)CE',
    'SR(03)PE',
    'SR(04)GO',
    'SR(05)BA',
    'SR(06)MG',
    'SR(07)RJ',
    'SR(08)SP',
    'SR(09)PR',
    'SR(10)SC',
    'SR(11)RS',
    'SR(12)MA',
    'SR(13)MT',
    'SR(14)AC',
    'SR(15)AM',
    'SR(16)MS',
    'SR(17)RO',
    'SR(18)PB',
    'SR(19)RN',
    'SR(20)ES',
    'SR(21)AP',
    'SR(22)AL',
    'SR(23)SE',
    'SR(24)PI',
    'SR(25)RR',
    'SR(26)TO',
    'SR(27)MBA',
    'SR(28)DFE',
    'SR(29)MSF',
    'SR(30)STA',
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

  // ─────────────────────────────────────────────────────────────
  // 1) ngOnInit: dispara o carregamento inicial e a escuta de UF.
  // ─────────────────────────────────────────────────────────────
  ngOnInit(): void {
    this.carregarEstados();
    this.escutarMudancaUf();
  }

  // ─────────────────────────────────────────────────────────────
  // 2) carregarEstados(): popula o signal `estados` com as UFs.
  // ─────────────────────────────────────────────────────────────
  private carregarEstados(): void {
    this.estadosService
      .listarEstados()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((lista) => this.estados.set(lista));
  }

  // ─────────────────────────────────────────────────────────────
  // 3) escutarMudancaUf(): sempre que `dadosImovel.uf` muda:
  //    - limpa o município
  //    - ATUALIZA `dadosImovel.sr` via getSrFromUf(uf)  ⬅️ NOVO
  //    - recarrega a lista de municípios da UF
  // ─────────────────────────────────────────────────────────────
  private escutarMudancaUf(): void {
    this.form
      .get('dadosImovel.uf')
      ?.valueChanges.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((uf: string) => {
        // Limpa município
        this.form
          .get('dadosImovel.municipio')
          ?.setValue('', { emitEvent: false });

        // ⬇️ NOVO: preenche a SR com base na UF
        this.form
          .get('dadosImovel.sr')
          ?.setValue(getSrFromUf(uf), { emitEvent: false });

        this.municipios.set([]);

        if (!uf) return;

        this.estadosService
          .listarMunicipiosPorUf(uf)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe((lista) => this.municipios.set(lista));
      });
  }
}
