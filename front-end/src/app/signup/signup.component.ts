import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { MyValidation } from '../my-validation';
import { UserService } from '../user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm : FormGroup;
  signupFormErrors : Object = {
    firstname : '',
    lastname : '',
    email : '',
    password : '',
  };

  constructor(private fb : FormBuilder , private user : UserService , private router : Router ,
              private flashMessage : FlashMessagesService) { }

  ngOnInit() {
    this.signupForm = this.fb.group({
      firstname : ['' , [Validators.required , Validators.maxLength(20) , Validators.minLength(5)]],
      lastname : ['' , [Validators.required , Validators.maxLength(20) , Validators.minLength(5)]],
      email : ['' , [Validators.required , Validators.pattern(/[a-zA-z0-9_\-\.]+\@[a-zA-z0-9_\-]{3,6}\.[a-zA-z]{3,5}/)]],
      password : ['' , [Validators.required , Validators.maxLength(25) , Validators.minLength(6)]],
    });
    this.signupForm.valueChanges.subscribe(_ =>{
      this.getFormError();
    })
  }

  hasError(field){
    return (this.signupForm.get(field).invalid && (this.signupForm.get(field).touched || this.signupForm.get(field).dirty));
  }

  getFormError() : void {
    Object.keys(this.signupForm.controls).forEach( controll => {
      this.signupFormErrors[controll] = '';
      if(this.signupForm.get(controll).invalid){
        Object.keys(this.signupForm.get(controll).errors).forEach(error => {
          this.signupFormErrors[controll] += MyValidation.errorMessage(error , controll);
        });
      }
    });
  }

  onSubmit() : void {
    this.user.loginOrSignup(this.signupForm.value , 'signup').subscribe(
      (res) => {
        if(res['status'] === "done"){
          this.flashMessage.show(`${res['status']} : you can Login now `, { cssClass: "alert-success" });
          this.router.navigate(['/login']);
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