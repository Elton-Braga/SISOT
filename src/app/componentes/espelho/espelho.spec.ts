import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Espelho } from './espelho';

describe('Espelho', () => {
  let component: Espelho;
  let fixture: ComponentFixture<Espelho>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Espelho]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Espelho);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
