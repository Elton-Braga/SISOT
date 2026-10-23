import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParecerTecnicoConclusivo } from './parecer-tecnico-conclusivo';

describe('ParecerTecnicoConclusivo', () => {
  let component: ParecerTecnicoConclusivo;
  let fixture: ComponentFixture<ParecerTecnicoConclusivo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParecerTecnicoConclusivo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParecerTecnicoConclusivo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
