import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) { }

  public registerdUserData: Object;
  public isValid_user: boolean;
  public indexValue: number = -1;


  public baseUri: string = "http://localhost:2000";
  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  isAuthenticated(email: any, password: any) {
    this.registerdUserData = JSON.parse(localStorage.getItem('user_data'));
    for (const i in this.registerdUserData) {
      if (
        this.registerdUserData[i].email == email &&
        this.registerdUserData[i].password == password
      ) {
        this.isValid_user = true;
        this.indexValue = parseInt(i);
        localStorage.setItem('indexVal', JSON.stringify(this.indexValue));
        return true;
      }
    }
    return false;
  }

  login(body: any) {
    return this.http.post(this.baseUri + '/login', body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    })
  }

  otpVerifyToken(body: any) {
    return this.http.post(this.baseUri + '/login/otpVerification', body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    })
  }
  // getIndexValue(){
  //   return this.indexValue;
  // }

  registerUser(body: any) {
    return this.http.post(this.baseUri + '/registerUser', body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    })
  }
  passwordMatchValidator(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[password];
      const confirmPasswordControl = formGroup.controls[confirmPassword];

      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }

      if (
        confirmPasswordControl.errors &&
        !confirmPasswordControl.errors['passwordMismatch']
      ) {
        return null;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
    };
  }

  createQuestion(body: any) {
    return this.http.post(this.baseUri + '/createQuestion', body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    })
  }

  getQuestion() {
    return this.http.get(this.baseUri + '/getQuestion', {
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    })
  }

  updateQuestion(body: any) {
    return this.http.put(this.baseUri + '/updateQuestion', body, {
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    })
  }

  deleteQuestion(id: any) {
    return this.http.delete(this.baseUri + '/deleteQuestion/' + id)
  }


  getUser(token: any) {
    return this.http.get(this.baseUri + '/user', {
      headers: new HttpHeaders().set("Authorization", "Bearer " + token)
    });
  }

  updateUser(body: any, id) {
    return this.http.put(this.baseUri + "/user/" + id, body, {
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    })
  }
}
