import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarMerdadoDeTerras } from './editar-merdado-de-terras';

describe('EditarMerdadoDeTerras', () => {
  let component: EditarMerdadoDeTerras;
  let fixture: ComponentFixture<EditarMerdadoDeTerras>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarMerdadoDeTerras]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarMerdadoDeTerras);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
