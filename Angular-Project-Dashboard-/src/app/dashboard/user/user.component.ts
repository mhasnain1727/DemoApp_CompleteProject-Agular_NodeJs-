import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { LoginComponent } from '../../login/login.component'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})

export class UserComponent implements AfterViewInit {

  public loginedUserIndexValue: number;
  public userData: any;

  public email: any;

  public currentUserData: any;
  public updateForm: any;
  public edit: boolean = false;
  public isUpdated: boolean = false;
  public editImg: boolean = false;
  private token:any;
  public user:any;
  public userId:any;
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private customValidator: AuthService,
    ) { }

    // public login : LoginComponent;
    @ViewChild(LoginComponent) login;
    
  ngOnInit(): void {
    // this.loginedUserIndexValue = JSON.parse(localStorage.getItem('indexVal'));
    // this.loginedUserIndexValue = this.authService.indexValue;
    // console.log('helloooindex',this.loginedUserIndexValue);
    // console.log('acc', this.login.indexValue);

    this.token = sessionStorage.getItem('token');
    this.getUserData();
   
    // console.log('index', this.loginedUserIndexValue);
    // this.loadImage();
    // this.loadData();
  }

  getUserData(){
    this.authService.getUser(this.token).subscribe((data) =>{ 
      console.log(data)
      this.userData = data;
      this.currentUserData = this.userData.users;
      console.log(this.userData, "userDatatdatda");
    }, error => console.log(error))

  }

  ngAfterViewInit(){
    // console.log('acc1', this.login.indexValue);
  }

  val: string = '';
  url = './assets/images/profile.png';

  // loadData() {
  //   // this.userData = JSON.parse(localStorage.getItem('user_data'));
  //   // this.currentUserData = this.userData[this.loginedUserIndexValue];
  //   this.currentUserData = this.userData

  // }

  loadImage() {
    const userData1 = JSON.parse(localStorage.getItem('user_data'))
    // console.log(userData1[this.loginedUserIndexValue], userData1, this.loginedUserIndexValue);
    if ( (JSON.parse(localStorage.getItem('user_data')))[this.loginedUserIndexValue].image )  {
      // console.log('image set', JSON.parse(localStorage.getItem('user_data'))[this.loginedUserIndexValue].image)
      this.url = JSON.parse(JSON.parse(localStorage.getItem('user_data'))[this.loginedUserIndexValue].image);
    }
  }

  


  onSubmit() {
    this.isUpdated = true;
    // localStorage.removeItem('dash_key');
    this.authService.updateUser(this.updateForm.value, this.currentUserData._id).subscribe(res => console.log(res), error => console.log(error))
    this.getUserData();
    // const oldRecords = localStorage.getItem('user_data');
    // const userList = JSON.parse(oldRecords);
    // console.log('aa', userList[this.loginedUserIndexValue], 'b', this.updateForm.value);
    // userList[this.loginedUserIndexValue] = this.updateForm.value;
    // localStorage.setItem('user_data', JSON.stringify(userList));


    // this.loadData();
    setTimeout(() => {
      this.edit = false;
      this.isUpdated = false;
    }, 1000);

  }

  onImageSelected(event) {
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event: any) => {
      this.val = JSON.stringify(reader.result);
      console.log('12',this.val);

      //update pic in user data
      const oldRecords = localStorage.getItem('user_data');
      const userList = JSON.parse(oldRecords);
      userList[this.loginedUserIndexValue].image = this.val;
      localStorage.setItem('user_data', JSON.stringify(userList));

      // localStorage.setItem(this.email, this.val);
    };

    this.loadImage();
  }

  onEditImg() {
    this.editImg = true;
  }

  onImageUpload() {
    this.editImg = false;
    this.loadImage();
  }

  // ...................................

  onEdit() {
    this.edit = true;

    this.updateForm = this.formBuilder.group(
      {
        name: [
          this.currentUserData.name,
          [Validators.required, Validators.minLength(3)],
        ],
        mobile: [
          this.currentUserData.contact,
          [Validators.required, Validators.pattern('[0-9 ]{10}')],
        ],
        email: [
          this.currentUserData.email,
          [Validators.required, Validators.email],
        ],
        // password: ['', Validators.required],
        // confirmPassword: ['', Validators.required],
        address: this.formBuilder.group({
          house_no: [this.currentUserData.address.houseNumber],
          street: [this.currentUserData.address.street],
          city: [this.currentUserData.address.city],
          state: [this.currentUserData.address.state],
          zip: [this.currentUserData.address.zip],
        }),
        checkBox: [''],
      },
      {
        validator: this.customValidator.passwordMatchValidator(
          'password',
          'confirmPassword'
        ),
      }
    );
  }
  get address() {
    return this.updateForm.get('address') as FormArray;
  }

  get f() {
    return this.updateForm.controls;
  }

  get checkBox() {
    return this.updateForm.get('checkBox');
  }

  clear() {
    this.updateForm.reset();
  }

  onCancelUpdate() {
    this.edit = false;
  }
}


// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.

// export class DashboardComponent implements OnInit {
//   formValue!: FormGroup;
//   questionModelObj: DashboardModel = new DashboardModel()
//   questionData !:any;
//   showAdd!:boolean;
//   showupdate!:boolean
//   constructor(private formbuilder: FormBuilder,private api: ApiService) { }

//   ngOnInit(): void {
//     this.formValue = this.formbuilder.group({
//       question: [''],
//       option1: [''],
//       option2 : [''],
//       option3: [''],
//       option4 : [''],
//       answer : ['']
//   })
//       this.getAll();
// }
// clickAdd(){
//   this.formValue.reset();
//   this.showAdd=true;
//   this.showupdate=false;
// }
// postQuestionDetails() {
//   this.questionModelObj.question = this.formValue.value.question
//   this.questionModelObj.option1 = this.formValue.value.option1
//   this.questionModelObj.option2 = this.formValue.value.option2
//   this.questionModelObj.option3 = this.formValue.value.option3
//   this.questionModelObj.option4 = this.formValue.value.option4
//   this.questionModelObj.answer = this.formValue.value.answer
   
//   this.api.postQuestion(this.questionModelObj)
//       .subscribe(res => {
//         console.log(res);
//         alert("Question added successfully")
//         this.formValue.reset()
//         let ref = document.getElementById('cancel')
//         ref?.click();
//         this.formValue.reset();
//         this.getAll()
//       },
//         err => {
//           alert("something went wrong")
//         }
//       )
// }
// getAll(){
//   this.api.getQuestion()
//   .subscribe(res=>{
//     this.questionData=res;
//   })
// }
// deleteQuestion(row:any){
//   this.api.deleteQuestion(row.id)
//   .subscribe(res=>{
//     alert("Question Deleted")
//     this.getAll()
//   })
// }
// onEdit(row:any){
//   this.showAdd=false;
//   this.showupdate=true;
//   this.questionModelObj.id=row.id
//   this.formValue.controls['question'].setValue(row.question)
//   this.formValue.controls['option1'].setValue(row.option1)
//   this.formValue.controls['option2'].setValue(row.option2)
//   this.formValue.controls['option3'].setValue(row.option3)
//   this.formValue.controls['option4'].setValue(row.option4)
//   this.formValue.controls['answer'].setValue(row.answer)
// }
// update(){
//   this.questionModelObj.question = this.formValue.value.question
//   this.questionModelObj.option1 = this.formValue.value.option1
//   this.questionModelObj.option2 = this.formValue.value.option2
//   this.questionModelObj.option3 = this.formValue.value.option3
//   this.questionModelObj.option4 = this.formValue.value.option4
//   this.questionModelObj.answer = this.formValue.value.answer
//   this.api.updateQuestion(this.questionModelObj,this.questionModelObj.id)
//   .subscribe(res=>{
//     alert("updated successfully")
//     let ref = document.getElementById('cancel')
//     ref?.click();
//     this.formValue.reset();
//     this.getAll()
//   })
// }
// }