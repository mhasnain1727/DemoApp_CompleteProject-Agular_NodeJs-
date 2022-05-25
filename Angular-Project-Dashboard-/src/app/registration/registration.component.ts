import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private customValidator: AuthService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  //array of objects conataining user data
  private user_record: Array<any> = [];

  isRegistered: boolean = false;
  // selectedFile:any;

  registrationForm = this.formBuilder.group(
    {
      name: ['', [Validators.required, Validators.minLength(3)]],
      mobile: ['', [Validators.required, Validators.pattern('[0-9 ]{10}')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      // role: ['', Validators.required],
      // image: ['', Validators.required],
      // address: this.formBuilder.array([this.formBuilder.control]),
      address: this.formBuilder.group({
        house_no: [''],
        street: [''],
        city: [''],
        state: [''],
        zip: [''],
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

  get address() {
    return this.registrationForm.get('address') as FormArray;
  }

  get f() {
    return this.registrationForm.controls;
  }

  get checkBox() {
    return this.registrationForm.get('checkBox');
  }

  onImageSelected(event) {
    // this.selectedFile = event.target.files[0];
    // console.log(event.target)
    console.log(event.target.files[0]);
  }

  clear() {
    console.log(this.isRegistered);
    this.registrationForm.reset();
  }

  onSubmit() {
    this.isRegistered = true;
    // console.log(this.isRegistered)
    console.log(this.registrationForm.value);
    // console.log(this.selectedFile);

    // this.user_record = JSON.parse(localStorage.getItem("user_data")) ? JSON.parse(localStorage.getItem("user_data")) : [];
    // this.user_record.push(this.registrationForm.value);
    localStorage.setItem('reg_key', 'false');
    // localStorage.setItem('user_data', JSON.stringify(this.user_record));
    // this.router.navigateByUrl("/login")

    this.authService
      .registerUser(this.registrationForm.value)
      .subscribe((res) => {
        console.log(res);
        this.router.navigateByUrl('/login');
      });
    // setTimeout(() => {
    // }, 2000);
  }

  onLogin() {
    console.log('on click fired');
    this.router.navigateByUrl('/login');
  }
}
