import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImprimirLaudo } from './imprimir-laudo';

describe('ImprimirLaudo', () => {
  let component: ImprimirLaudo;
  let fixture: ComponentFixture<ImprimirLaudo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImprimirLaudo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImprimirLaudo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
