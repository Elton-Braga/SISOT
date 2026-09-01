import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResolucaoCd } from './resolucao-cd';

describe('ResolucaoCd', () => {
  let component: ResolucaoCd;
  let fixture: ComponentFixture<ResolucaoCd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResolucaoCd]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResolucaoCd);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
