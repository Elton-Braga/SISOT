import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortariaCd } from './portaria-cd';

describe('PortariaCd', () => {
  let component: PortariaCd;
  let fixture: ComponentFixture<PortariaCd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortariaCd]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortariaCd);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
