import { TestBed } from '@angular/core/testing';

import { ContrIventarioService } from './contr-iventario.service';

describe('ContrIventarioService', () => {
  let service: ContrIventarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContrIventarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
