import { Injectable } from '@angular/core';
import { IAnswer } from '../answers/answer';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class CalculationService {

  public questions = [];
  private getQuestions() {
    return this.http.get('./questions.json');
  }

  constructor(private http: HttpClient) {
  }

  async executeQuestions(): Promise<IAnswer[]> {
    const questions = await this.http.get('/assets/questions.json').toPromise();
    const answers: IAnswer[] = [];
    answers.push({'answer': '' + this.q1SumMultiples(), 'question': this.questions[0]});
    answers.push({'answer': 'answer 2', 'question': 'q2'});
    return answers;
  }

  /**
   * q1SumMultiples
   * If we list all the natural numbers below 10 that are multiples of 3 or 5, we get 3, 5, 6 and 9. The sum of these multiples is 23.
   * Find the sum of all the multiples of 3 or 5 below 1000.
   */
  q1SumMultiples(multiples: number[] = [3, 5], below: number = 1000): number {
    let total = 0;
    for (let i = 1; i < below; i++) {
      for (const multiple of multiples) {
        if (i % multiple === 0) {
          total += i;
          break;
        }
      }
    }
    return total;
  }
}
