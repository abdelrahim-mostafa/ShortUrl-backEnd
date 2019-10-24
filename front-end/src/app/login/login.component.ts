import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { MyValidation } from '../my-validation';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup;
  loginFormErrors : Object = {
    email : '',
    password : ''
  };

  constructor(private fb : FormBuilder , private user : UserService , private router : Router ,
              private flashMessage : FlashMessagesService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email : ['' , [Validators.required , Validators.pattern(/[a-zA-z0-9_\-\.]+\@[a-zA-z0-9_\-]{3,6}\.[a-zA-z]{3,5}/)]],
      password : ['' , [Validators.required , Validators.maxLength(25) , Validators.minLength(6)]]
    });
    this.loginForm.valueChanges.subscribe(_ =>{
      this.getFormError();
    })
  }

  hasError(field){
    return (this.loginForm.get(field).invalid && (this.loginForm.get(field).touched || this.loginForm.get(field).dirty));
  }

  getFormError() : void {
    Object.keys(this.loginForm.controls).forEach( controll => {
      this.loginFormErrors[controll] = '';
      if(this.loginForm.get(controll).invalid){
        Object.keys(this.loginForm.get(controll).errors).forEach(error => {
          this.loginFormErrors[controll] += MyValidation.errorMessage(error , controll);
        });
      }
    });
  }

  onSubmit() : void {
    this.user.loginOrSignupOrupdate(this.loginForm.value , 'login').subscribe(
      (res) => {
        if(res['status'] === "done"){
          this.flashMessage.show(`${res['status']} : Welcome ^_^ `, { cssClass: "alert-success" });
          this.user.setLocalStorage('token' , res['token']);
          this.user.setLocalStorage('userInfo' , JSON.stringify(res['data']));
          location.href = '/home';
        } else {
          this.flashMessage.show(`${res['status']} : ${res['error']}`, { cssClass: "alert-danger" });
        }
      },
      (err) => {
        this.flashMessage.show(err.message, { cssClass: "alert-danger" });
      }
    );
  }
}
