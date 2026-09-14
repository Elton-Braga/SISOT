import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmitirLaudo } from './emitir-laudo';

describe('EmitirLaudo', () => {
  let component: EmitirLaudo;
  let fixture: ComponentFixture<EmitirLaudo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmitirLaudo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmitirLaudo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
