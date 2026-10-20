import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SobreposicaoInteresse } from './sobreposicao-interesse';

describe('SobreposicaoInteresse', () => {
  let component: SobreposicaoInteresse;
  let fixture: ComponentFixture<SobreposicaoInteresse>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SobreposicaoInteresse]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SobreposicaoInteresse);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
