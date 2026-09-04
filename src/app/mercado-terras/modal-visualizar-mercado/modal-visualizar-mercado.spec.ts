import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalVisualizarMercado } from './modal-visualizar-mercado';

describe('ModalVisualizarMercado', () => {
  let component: ModalVisualizarMercado;
  let fixture: ComponentFixture<ModalVisualizarMercado>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalVisualizarMercado]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalVisualizarMercado);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
