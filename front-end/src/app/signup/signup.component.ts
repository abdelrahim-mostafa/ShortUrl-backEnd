import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MyValidation } from '../my-validation';
import { UserService } from '../user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  loginForm : FormGroup;
  loginFormErrors : Object = {
    firstname : '',
    lastname : '',
    email : '',
    password : '',
  };

  constructor(private fb : FormBuilder , private user : UserService , private router : Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      firstname : ['' , [Validators.required , Validators.maxLength(20) , Validators.minLength(5)]],
      lastname : ['' , [Validators.required , Validators.maxLength(20) , Validators.minLength(5)]],
      email : ['' , [Validators.required , Validators.pattern(/[a-zA-z0-9_\-\.]+\@[a-zA-z0-9_\-]{3,6}\.[a-zA-z]{3,5}/)]],
      password : ['' , [Validators.required , Validators.maxLength(25) , Validators.minLength(6)]],
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
    this.user.loginOrSignup(this.loginForm.value , 'signup').subscribe(
      (res) => {
        console.log('result' , res, res['status']);
        if(res['status'] === "done"){
          console.log('done');
          this.router.navigate(['/login']);
        }
      },
      (err) => {
        console.log(err);

      }
    );
  }

}