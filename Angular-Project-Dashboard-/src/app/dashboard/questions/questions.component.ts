import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css'],
})
export class QuestionsComponent implements OnInit {
  private question_record: Array<any> = [];
  public queData: any;
  public editQuestionIndexVal: number;
  public edit: boolean = false;
  public updateId: any;

  constructor(private formBuilder: FormBuilder,
    private question: AuthService) { }

  ngOnInit(): void {
    this.question_data();
  }

  questionForm = this.formBuilder.group({
    question: ['', Validators.required],
    option_a: ['', Validators.required],
    option_b: ['', Validators.required],
    option_c: ['', Validators.required],
    correct_option: ['', Validators.required],
  });

  get f() {
    return this.questionForm.controls;
  }


  question_data() {
    this.question.getQuestion().subscribe(data => {
      console.log(data, "dataaaaa");
      this.queData = data
      console.log("quizDatais", this.queData);
    })
    // this.queData = JSON.parse(localStorage.getItem('question_data'));
    // console.log('questiondata', this.queData);
  }

  clickAddQuestion() {
    this.questionForm.reset();
  }

  clear() {
    this.questionForm.reset();
  }

  onAddQuestion() {
    this.edit = false;
    console.log(this.questionForm.value);
    // this.question_record = JSON.parse(localStorage.getItem('question_data'))
    //   ? JSON.parse(localStorage.getItem('question_data'))
    //   : [];
    // this.question_record.push(this.questionForm.value);
    // localStorage.setItem('question_data', JSON.stringify(this.question_record));

    this.question.createQuestion(this.questionForm.value).subscribe(res => {
      console.log(res)
      this.question_data()
    }, err => console.log(err));
    // this.question_data();
  }

  deleteQuestion(row) {
    console.log(row);
    this.updateId=row._id;
    console.log(this.updateId, "updated ID");
    this.question.deleteQuestion(this.updateId).subscribe((res) => {
      console.log(res);
      this.question_data();
    }, error => {
      console.log(error);
    })
    // let questionList = JSON.parse(localStorage.getItem('question_data'));
    // // console.log('aaaa', row)
    // questionList = questionList.filter((val) => questionList.indexOf(val) != i);
    // // console.log('after del', questionList)
    // localStorage.setItem('question_data', JSON.stringify(questionList));
  }
  
  clickEditQuestion(row, i) {
    this.edit = true;
    console.log('clickeddd', row);

    this.editQuestionIndexVal = i;
    this.updateId = row._id;
    this.questionForm.setValue({
      question: row.question,
      option_a: row.option_a,
      option_b: row.option_b,
      option_c: row.option_c,
      correct_option: row.answer
    });

  }

  onUpdate() {
    // let questionList = JSON.parse(localStorage.getItem('question_data'));
    // questionList[this.editQuestionIndexVal] = this.questionForm.value;
    // localStorage.setItem('question_data', JSON.stringify(questionList));
    this.question.updateQuestion({ ...this.questionForm.value, _id: this.updateId }).subscribe((res) => {
      console.log(res);
    }, error => console.log(error));

    this.edit = false;
    this.question_data();
  }
}
