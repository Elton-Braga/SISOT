import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovoProcesso } from './novo-processo';

describe('NovoProcesso', () => {
  let component: NovoProcesso;
  let fixture: ComponentFixture<NovoProcesso>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NovoProcesso]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NovoProcesso);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
