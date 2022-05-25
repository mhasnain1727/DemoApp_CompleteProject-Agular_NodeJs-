import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit, AfterViewInit {

  public quizData: any[];

  public question: any;
  public option_a: any;
  public option_b: any;
  public option_c: any;
  public questionIndex: number = 0;
  public totalQuestions: number;
  public score: number = 0;
  public form: any;

  public displayQuestion: boolean = true;
  public displayResult: boolean = false;

  constructor(
    public router: Router,
    private questionService: AuthService
  ) {

  }

  // form = new FormGroup({  
  //   options : new FormControl('', Validators.required)
  // });

  ngOnInit(): void {
    this.form = new FormGroup({
      options: new FormControl('', Validators.required)
    });
    this.questionService.getQuestion().subscribe(data => {
      console.log(data);
      this.quizData = data['question'];
      console.log(this.quizData, "quiz Data");
      console.log(this.quizData.length, "length of quiz data");
      this.totalQuestions = this.quizData.length;
      this.start(this.quizData);
    })
    // this.quizData = JSON.parse(localStorage.getItem('question_data'));
    // console.log('question_dataaaaaaa', this.quizData);
    // if (this.quizData) {
    //   this.totalQuestions = this.quizData.length;
    //   console.log(this.totalQuestions, "Total Question");
    // }


    // this.questionService.getQuestion().subscribe(data => {
    //   console.log(data);
    //   this.quizData = data['question'];
    //   console.log(this.quizData, "quiz Data");
    // })
    // // this.quizData = JSON.parse(localStorage.getItem('question_data'));
    // // console.log('question_dataaaaaaa', this.quizData);
    // if(this.quizData){
    //   this.totalQuestions = this.quizData.length;
    // }
    // this.start(this.quizData);
  }

  ngAfterViewInit(): void {
    // this.questionService.getQuestion().subscribe(data => {
    //   console.log(data);
    //   this.quizData = data['question'];
    //   console.log(this.quizData, "quiz Data");
    // })
    // this.quizData = JSON.parse(localStorage.getItem('question_data'));
    // console.log('question_dataaaaaaa', this.quizData);
    // if (this.quizData) {
    //   this.totalQuestions = this.quizData.length;
    // }
    // this.start(this.quizData);
  }


  start(val) {
    if (this.quizData && this.quizData.length > 0) {
      console.log('indexxxxx', this.questionIndex);
      this.question = val[this.questionIndex].question;
      this.option_a = val[this.questionIndex].option_a;
      this.option_b = val[this.questionIndex].option_b;
      this.option_c = val[this.questionIndex].option_c;
    }
  }

  onSubmit() {
    console.log(this.form.value, this.quizData[this.questionIndex].answer);
    // console.log('aaaa', this.questionIndex, this.quizData.length)

    if (this.form.value['options'] == this.quizData[this.questionIndex].answer) {
      this.score = this.score + 1;
    }
    console.log('score', this.score)

    this.questionIndex = this.questionIndex + 1;
    if (this.questionIndex < this.quizData.length) {
      this.question = this.quizData[this.questionIndex].question;
      this.option_a = this.quizData[this.questionIndex].option_a;
      this.option_b = this.quizData[this.questionIndex].option_b;
      this.option_c = this.quizData[this.questionIndex].option_c;
    }
    else {
      this.displayQuestion = false;
      this.displayResult = true;
    }

    this.form.reset();
  }

  onAttepmtAgain() {
    this.displayQuestion = true;
    this.displayResult = false;
    this.questionIndex = 0;
    this.score = 0;
    this.start(this.quizData);
  }

  get f() {
    return this.form.controls;
  }

}
