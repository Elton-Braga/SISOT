import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeloDeVotoCdr } from './modelo-de-voto-cdr';

describe('ModeloDeVotoCdr', () => {
  let component: ModeloDeVotoCdr;
  let fixture: ComponentFixture<ModeloDeVotoCdr>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModeloDeVotoCdr]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModeloDeVotoCdr);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
