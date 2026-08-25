import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResolucaoCdr } from './resolucao-cdr';

describe('ResolucaoCdr', () => {
  let component: ResolucaoCdr;
  let fixture: ComponentFixture<ResolucaoCdr>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResolucaoCdr]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResolucaoCdr);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
