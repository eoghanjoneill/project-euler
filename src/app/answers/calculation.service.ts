import { Injectable } from '@angular/core';
import { IAnswer } from '../answers/answer';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class CalculationService {

  private solutions = [this.q1SumMultiples, this.q2EvenFibonacci];

  constructor(private http: HttpClient) {
  }

  async executeQuestions(): Promise<IAnswer[]> {
    const questions = await this.http.get('/assets/questions.json').toPromise();
    const answers: IAnswer[] = [];
    this.solutions.forEach((element, idx) => {
      answers.push({'answer': '' + element.call(this), 'question': questions[idx].question});
    });
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

  q2EvenFibonacci(max: number = (4 * 10 ** 6)): number {
    let total = 0, curFib = 2, prevFib = 1;
    while (curFib <= max) {
      if (curFib % 2 === 0) {
        total += curFib;
      }
      let temp = curFib;
      curFib = curFib + prevFib;
      prevFib = temp;
    }
    return total;
  }
}
