import { Component, OnInit } from '@angular/core';
import { CalculationService } from './calculation.service';
import { IAnswer } from './answer';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.css']
})
export class AnswersComponent implements OnInit {
  private answers: IAnswer[];
  constructor(private _calcService: CalculationService) { }

  ngOnInit() {
   this._calcService.executeQuestions().then(val => this.answers = val);
  }

}
