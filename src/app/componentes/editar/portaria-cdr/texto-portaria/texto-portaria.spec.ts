import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextoPortaria } from './texto-portaria';

describe('TextoPortaria', () => {
  let component: TextoPortaria;
  let fixture: ComponentFixture<TextoPortaria>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextoPortaria]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextoPortaria);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
