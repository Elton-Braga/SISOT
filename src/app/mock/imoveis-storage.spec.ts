import { TestBed } from '@angular/core/testing';

import { ImoveisStorage } from './imoveis-storage';

describe('ImoveisStorage', () => {
  let service: ImoveisStorage;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImoveisStorage);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
