import { TestBed, inject } from '@angular/core/testing';

import { CalculationService } from './calculation.service';
import { HttpClientModule } from '@angular/common/http';

describe('CalculationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CalculationService],
      imports: [HttpClientModule]
    });
  });

  it('should be created', inject([CalculationService], (service: CalculationService) => {
    expect(service).toBeTruthy();
  }));
});
