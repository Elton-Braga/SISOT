import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitarSCDP } from './solicitar-scdp';

describe('SolicitarSCDP', () => {
  let component: SolicitarSCDP;
  let fixture: ComponentFixture<SolicitarSCDP>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitarSCDP]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitarSCDP);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
