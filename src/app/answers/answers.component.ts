import { Component, OnInit } from '@angular/core';
import { CalculationService } from './calculation.service';
import { IAnswer } from './answer';
import { Observable } from 'rxjs/Rx';
import { ChangeDetectionStrategy } from '@angular/core/src/change_detection/constants';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.css']
})
export class AnswersComponent implements OnInit {
  private answers$: Observable<IAnswer[]>;
  private answers: IAnswer[] = []; /* = [
    {'question': 'q1', 'answer': 'a1'},
    {'question': 'q2', 'answer': 'a2'}
  ];*/

  constructor(private _calcService: CalculationService) { }

  ngOnInit() {
   this._calcService.executeQuestions().subscribe(answer => {
     this.answers.push(answer);
     console.log(JSON.stringify(answer));
    });
   // this.answers$ = this._calcService.executeQuestions();
  }

}
