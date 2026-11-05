import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeloVotoCd } from './modelo-voto-cd';

describe('ModeloVotoCd', () => {
  let component: ModeloVotoCd;
  let fixture: ComponentFixture<ModeloVotoCd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModeloVotoCd]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModeloVotoCd);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
