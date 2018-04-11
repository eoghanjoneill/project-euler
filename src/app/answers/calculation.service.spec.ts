import { TestBed, inject } from '@angular/core/testing';
import { CalculationService } from './calculation.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';


describe('CalculationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CalculationService],
      imports: [HttpClientModule]
    });
  });

  it('should be created', inject([HttpClient, CalculationService], (service: CalculationService) => {
    expect(service).toBeTruthy();
  }));

  it('should return values from observable', inject([HttpClient, CalculationService], (service: CalculationService) => {
    service.executeQuestions().subscribe(value => {
      console.log(value);
      expect(value).toBeTruthy();
    });
  }));
});
