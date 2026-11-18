import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DadosIniciaisDoImovelProcessos } from './dados-iniciais-do-imovel-processos';

describe('DadosIniciaisDoImovelProcessos', () => {
  let component: DadosIniciaisDoImovelProcessos;
  let fixture: ComponentFixture<DadosIniciaisDoImovelProcessos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DadosIniciaisDoImovelProcessos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DadosIniciaisDoImovelProcessos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
