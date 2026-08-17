import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintOS } from './print-os';

describe('PrintOS', () => {
  let component: PrintOS;
  let fixture: ComponentFixture<PrintOS>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrintOS]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintOS);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
