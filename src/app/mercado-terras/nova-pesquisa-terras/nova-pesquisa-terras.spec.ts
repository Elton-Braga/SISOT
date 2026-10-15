import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovaPesquisaTerras } from './nova-pesquisa-terras';

describe('NovaPesquisaTerras', () => {
  let component: NovaPesquisaTerras;
  let fixture: ComponentFixture<NovaPesquisaTerras>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NovaPesquisaTerras]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NovaPesquisaTerras);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
