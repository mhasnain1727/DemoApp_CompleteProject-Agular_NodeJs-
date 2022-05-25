import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  public email: any;
  public password: any;
  public indexValue: number;
  public otp: string;
  public authenticate: boolean = false;

  registerdUserData: Object;

  //invalid msg
  public invalidMsg = false;
  public invalidMsgOTP = false;
  public message: any;
  public OTPMessage: any;

  onLogin() {
    const body = {
      email: this.email,
      password: this.password
    }
    // if (this.authService.isAuthenticated(this.email, this.password)) {
    //   localStorage.setItem('dash_key', "true");
    //   this.router.navigateByUrl("dashboard");
    //   this.indexValue = this.authService.indexValue;
    //   // console.log('indexxxx',this.indexValue);
    // }
    // else {
    //   this.invalidMsg = true;
    // }

    this.authService.login(body).subscribe((data) => {
      if (data['msg']) {
        this.router.navigateByUrl("login");
        this.invalidMsg = true;
        this.message = data['msg'];
      } else {
        console.log(data, "datyaaaaaaa");
        localStorage.setItem('dash_key', "true");
        sessionStorage.setItem('token', data['token']);
        this.authenticate = true;
        
        // this.router.navigateByUrl("dashboard");
      }
    }, error => {
      console.log(error);
      this.router.navigateByUrl("/login");
    }
    )
  }

  onOTPSubmit(){
    const body = {
      email: this.email,
      otp: this.otp
    }
    this.authService.otpVerifyToken(body).subscribe((data) => {
      if (data['msg']) {
        // this.router.navigateByUrl("login");
        this.invalidMsgOTP = true;
        this.OTPMessage = data['msg'];
      } else {
        // console.log(data, "datyaaaaaaa");
        // localStorage.setItem('dash_key', "true");
        // sessionStorage.setItem('token', data['token']);
        // this.authenticate = true;
        
        this.router.navigateByUrl("dashboard");
      }
    }, error => {
      console.log(error);
      this.router.navigateByUrl("/login");
    })
  }

  onRegistration() {
    localStorage.setItem("reg_key", "true");
    this.router.navigateByUrl('/registration')
  }
}
