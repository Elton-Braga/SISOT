import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortariaCdr } from './portaria-cdr';

describe('PortariaCdr', () => {
  let component: PortariaCdr;
  let fixture: ComponentFixture<PortariaCdr>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortariaCdr]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortariaCdr);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
