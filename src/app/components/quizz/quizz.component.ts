import { Component, OnInit } from '@angular/core';
import quizz from 'src/assets/data/quizz.json';

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css'],
})
export class QuizzComponent implements OnInit {
  quizz: any;
  question = 0;
  answers: number[] = [];
  finished: boolean = false;
  result: string = '';

  constructor() {
    this.quizz = quizz;
  }

  ngOnInit(): void {}

  onOptionSelected(id: number): void {
    this.answers.push(this.quizz.questions[this.question].options[id].value);
    if (this.question + 1 < this.quizz.questions.length) {
      this.question++;
    } else {
      //finished... display results
      this.finished = true;
      let answer_count = new Map<number, number>();
      for (let answer of this.answers) {
        answer_count.set(answer, (answer_count.get(answer) || 0) + 1);
      }
      let result_id: number = 0;
      let max: number = 0;
      for (let [answer, count] of answer_count) {
        if (max < count) {
          max = count;
          result_id = answer;
        }
      }
      this.result = quizz.results[result_id];
    }
  }

  onTryAgain(): void {
    this.question = 0;
    this.answers.length = 0;
    this.finished = false;
  }
}
