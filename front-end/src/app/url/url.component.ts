import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MyValidation } from '../my-validation';
import { ActivatedRoute } from '@angular/router';
import { UrlService } from '../url.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-url',
  templateUrl: './url.component.html',
  styleUrls: ['./url.component.css']
})
export class UrlComponent implements OnInit {

  urlForm : FormGroup;
  urlFormErrors : Object = {
    link : '',
    status : ''
  };
  urlCase :Object = {
    case : 'new'
  };

  constructor(private url : UrlService, private fb : FormBuilder , private route : ActivatedRoute , 
              private flashMessage : FlashMessagesService) { }

  ngOnInit() {
    this.urlForm = this.fb.group({
      link : ['' , [Validators.required , Validators.minLength(14)]] , 
      status : ['true' , Validators.required]
    });
    this.urlForm.valueChanges.subscribe(_ =>{
      this.getFormError();
    });
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if(id){
        this.urlCase['id'] = id;
        this.url.urlData(id).subscribe(
          (res) => {
            if(res['status'] === "done"){
              let data = res['data'];
              this.urlForm.get('link').setValue(data['link']);
              this.urlForm.get('status').setValue(data['status']);
            } else {
              this.flashMessage.show(`${res['status']} : ${res['error']}`, { cssClass: "alert-danger" });
            }
          },
          (err) => {
            this.flashMessage.show(err.message, { cssClass: "alert-danger" });
          }
        );
      }
    });
    if(this.urlCase['id']) {
      this.urlCase['case'] = 'update';
    }
  }

  getFormError() : void {
    Object.keys(this.urlForm.controls).forEach( controll => {
      this.urlFormErrors[controll] = '';
      if(this.urlForm.get(controll).invalid){
        Object.keys(this.urlForm.get(controll).errors).forEach(error => {
          this.urlFormErrors[controll] += MyValidation.errorMessage(error , controll);
        });
      }
    });
  }

  hasError(field){
    return (this.urlForm.get(field).invalid && (this.urlForm.get(field).touched || this.urlForm.get(field).dirty));
  }

  onSubmit() {
    let data = this.urlForm.value;
    if(this.urlCase['id']) {
      data['_id'] =  this.urlCase['id'];
    }
    this.url.newOrUpdateUrl(data , this.urlCase['case']).subscribe(
      (res) => {
        if(res['status'] === "done"){
          this.flashMessage.show(`${res['status']} : SuccessFull Task `, { cssClass: "alert-success" });
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
