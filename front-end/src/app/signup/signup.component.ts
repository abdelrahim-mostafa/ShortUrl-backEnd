import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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

  constructor(private fb : FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      firstname : ['' , [Validators.required , Validators.maxLength(20) , Validators.minLength(5)]],
      lastname : ['' , [Validators.required , Validators.maxLength(20) , Validators.minLength(5)]],
      email : ['' , [Validators.required , Validators.pattern(/[a-zA-z0-9_\-\.]+\@[a-zA-z0-9_\-]{3,6}\.[a-zA-z]{3,5}/)]],
      password : ['' , [Validators.required , Validators.maxLength(25) , Validators.minLength(6)]],
    })
  }

  hasError(field){
    return (this.loginForm.get(field).valid && (this.loginForm.get(field).touched || this.loginForm.get(field).dirty));
  }

}
