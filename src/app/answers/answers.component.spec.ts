import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Injectable } from '@angular/core';

import { AnswersComponent } from './answers.component';
import { CalculationService } from './calculation.service';
import { HttpClientModule } from '@angular/common/http';
import { IAnswer } from './answer';

describe('AnswersComponent', () => {
  let component: AnswersComponent;
  let fixture: ComponentFixture<AnswersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnswersComponent ],
      providers: [ {provide: CalculationService, useClass: MockCalcService} ],
      imports: [ HttpClientModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnswersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

@Injectable()
class MockCalcService {
  async executeQuestions(): Promise<IAnswer[]> {
    return [
      {'question': 'q1', 'answer': 'a1'},
      {'question': 'q2', 'answer': 'a2'}
    ];
  }
}
