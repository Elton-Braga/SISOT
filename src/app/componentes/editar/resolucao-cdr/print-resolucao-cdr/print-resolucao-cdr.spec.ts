import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintResolucaoCdr } from './print-resolucao-cdr';

describe('PrintResolucaoCdr', () => {
  let component: PrintResolucaoCdr;
  let fixture: ComponentFixture<PrintResolucaoCdr>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrintResolucaoCdr]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintResolucaoCdr);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
