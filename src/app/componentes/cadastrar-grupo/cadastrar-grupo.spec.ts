import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarGrupo } from './cadastrar-grupo';

describe('CadastrarGrupo', () => {
  let component: CadastrarGrupo;
  let fixture: ComponentFixture<CadastrarGrupo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastrarGrupo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastrarGrupo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
