import { TestBed } from '@angular/core/testing';

import { ConexionUrlService } from './conexion-url.service';

describe('ConexionUrlService', () => {
  let service: ConexionUrlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConexionUrlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
