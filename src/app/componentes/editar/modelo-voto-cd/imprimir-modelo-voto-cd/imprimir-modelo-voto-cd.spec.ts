import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImprimirModeloVotoCd } from './imprimir-modelo-voto-cd';

describe('ImprimirModeloVotoCd', () => {
  let component: ImprimirModeloVotoCd;
  let fixture: ComponentFixture<ImprimirModeloVotoCd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImprimirModeloVotoCd]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImprimirModeloVotoCd);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
