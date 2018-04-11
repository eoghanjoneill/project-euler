import { Injectable } from '@angular/core';
import { IAnswer } from '../answers/answer';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { ObserveOnOperator } from 'rxjs/operators/observeOn';

@Injectable()
export class CalculationService {

  constructor(private http: HttpClient) { }

  private solutions = [this.q1SumMultiples,
          this.q2EvenFibonacci,
          this.q3LargestPrimeFactor,
          this.q4LargestPalindrome,
          this.q5SmallestMultiple
        ];
  private questions;

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

  q3LargestPrimeFactor(n: number = 600851475143): number {
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
    let product = 999 ** 2;
    while (product > 0) {
      if (this.isPalindrome(product.toString())) {
        // check if palindrom is divisible by two 3-digit numbers
        let divisor = 999, keepGoing = true;
        while (keepGoing) {
          if (Math.floor(product / divisor) > 999) {
            // gone too far - if the second factor is > 999 then it's not a solution
            keepGoing = false;
          } else if (product % divisor === 0) {
            console.log(`Palindromic number ${product} is a product of ${divisor} and ${product / divisor}`);
            return product; // bingo
          } else {
            divisor --;
          }
        }
      }
      product --;
    }
    return 0; // failed
  }

  private isPalindrome(s: string): boolean {

    while (s.length > 0) {
      if (s[0] === s[s.length - 1]) {
        s = s.substr(1, s.length - 2);
      } else {
        return false;
      }
    }
    return true;
  }

  q5SmallestMultiple(max: number = 20): number {
    // return smallest common multiple of all numbers up to <max>
    let foundIt = false, multiple = max - 1;
    while (!foundIt) {
      multiple ++;
      let factor = max;
      while (factor > 1) {
        // crude - still checking the divisibility of numbers that are factors of previous divisors,
        // e.g. if a number is divisible by 16, we shouldn't need to check if it is divisible by 8, 4 or 2
        if (multiple % factor !== 0) {
          factor = -1; // not divisible - break out of inner while and continue to check next number
        } else if (factor === 2) {
          // have successfully divided evenly by all numbers down to 2
          factor = -1; // break out of inner while
          foundIt = true; // break out of outer while
        } else {
          factor--;
        }
      }
    }
    return multiple;
  }

  getQuestions(): Promise<any> {
    if (this.questions) {
      return this.questions;
    } else {
      return this.http.get('/assets/questions.json').toPromise().then(data => {
        this.questions = data;
        return this.questions;
      });
    }
  }

  executeQuestions(): Observable<IAnswer> {
    return Observable.create(observer => {
      this.http.get('/assets/questions.json').toPromise().then(questions => {
        this.solutions.forEach((element, idx) => {
          observer.next({'answer': '' + element.call(this), 'question': questions[idx] ? questions[idx].question : ''});
          // observer.complete();
        });
      });
    });
  }
}
