import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadeiaDominial } from './cadeia-dominial';

describe('CadeiaDominial', () => {
  let component: CadeiaDominial;
  let fixture: ComponentFixture<CadeiaDominial>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadeiaDominial]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadeiaDominial);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
