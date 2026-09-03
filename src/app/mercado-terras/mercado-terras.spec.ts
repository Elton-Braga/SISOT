import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MercadoTerras } from './mercado-terras';

describe('MercadoTerras', () => {
  let component: MercadoTerras;
  let fixture: ComponentFixture<MercadoTerras>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MercadoTerras]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MercadoTerras);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
