import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
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

  pageCase : String = 'signup';

  constructor(private fb : FormBuilder , private user : UserService , private router : Router ,
              private flashMessage : FlashMessagesService , private route : ActivatedRoute) { }

  ngOnInit() {
    this.signupForm = this.fb.group({
      firstname : ['' , [Validators.required , Validators.maxLength(20) , Validators.minLength(5)]],
      lastname : ['' , [Validators.required , Validators.maxLength(20) , Validators.minLength(5)]],
      email : ['' , [Validators.required , Validators.pattern(/[a-zA-z0-9_\-\.]+\@[a-zA-z0-9_\-]{3,6}\.[a-zA-z]{3,5}/)]],
      password : ['' , [Validators.required , Validators.maxLength(25) , Validators.minLength(6)]],
    });
    this.signupForm.valueChanges.subscribe(_ =>{
      this.getFormError();
    });
    if(this.route.snapshot.routeConfig.path === 'updateUser'){
      this.pageCase = 'update';
      this.signupForm.get('password').setValidators([]);
      this.getUserData();
    }
  }

  getUserData() {
    this.user.getUserData().subscribe(
      (res) => {
        if(res['status'] === "done"){
          let data = res['data'];
          this.user.setLocalStorage('userInfo' , JSON.stringify({email : data['email'] , fullName : `${data['firstname']} ${ data['lastname']}` , profile : data['profile']}));
          this.signupForm.patchValue({email : data['email'] , firstname : data['firstname'] , lastname : data['lastname']});
        } else {
          this.flashMessage.show(`${res['status']} : ${res['error']}`, { cssClass: "alert-danger" });
        }
      },
      (err) => {
        console.log({err});
        this.flashMessage.show(err.message, { cssClass: "alert-danger" });
      }
    );
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
    this.user.loginOrSignupOrupdate(this.signupForm.value , this.pageCase).subscribe(
      (res) => {
        if(res['status'] === "done"){
          this.flashMessage.show(`${res['status']} : you can Login now `, { cssClass: "alert-success" });
          if(this.pageCase === 'update'){
            this.getUserData();
          } else this.router.navigate(['/login']);
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