import { Injectable } from '@angular/core';
import { IAnswer } from '../answers/answer';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class CalculationService {

  constructor(private http: HttpClient) { }

  private solutions = [this.q1SumMultiples,
          this.q2EvenFibonacci,
          this.q3LargestPrimeFactor,
        ];

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
    let total = 0, curFib = 2, prevFib = 1, temp;
    while (curFib <= max) {
      if (curFib % 2 === 0) {
        total += curFib;
      }
      temp = curFib;
      curFib = curFib + prevFib;
      prevFib = temp;
    }
    return total;
  }

  q3LargestPrimeFactor(n: number = 600851475143): number { // 600851475143
    const factors = [];
    let f = 2; // first possible prime factor
    while (n > 1) {
      if (n % f === 0) {
        factors.push(f);
        n /= f;
      } else {
        f++;
      }
    }
    console.log('factors: ' + factors.toString());
    return factors[factors.length - 1];
  }

  q4LargestPalindrome(): number {
    let pal = 0;
    let startFrom = 999 ** 2;
    while (startFrom > 0) {
      if (isPalindrome(startFrom.toString())) {
        //
      } else {
        startFrom --;
      }
    }
    return 0;

    function isPalindrome(s: string): boolean {

      while (s.length > 0) {
        if (s[0] === s[s.length - 1]) {
          s = s.substr(1, s.length - 2);
        } else {
          return false;
        }
      }
      return true;
    }
  }

  async executeQuestions(): Promise<IAnswer[]> {
    const questions = await this.http.get('/assets/questions.json').toPromise();
    const answers: IAnswer[] = [];
    this.solutions.forEach((element, idx) => {
      answers.push({'answer': '' + element.call(this), 'question': questions[idx] ? questions[idx].question : ''});
    });
    return answers;
  }
}
