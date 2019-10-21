import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  userInfo : Object;
  upladState : Boolean;
  file : any = null; 
  constructor(private user : UserService , private flashMessage : FlashMessagesService) { }

  ngOnInit() {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
  }
  toggleUpload(stat: Boolean) {
    this.upladState = stat;
  }

  loadFile(event){
    if (event.target.files.length > 0) {
      this.file = <File>event.target.files[0];
    }
  }
  onSubmit() : void{
    if(this.file){
      let formData = new FormData();
      formData.append('profile' , this.file);
      this.user.uploadProfile(formData).subscribe(
        (res) => {
          if(res['body']){
            let body = res['body'];
            if(body['status'] === 'done'){
              this.flashMessage.show(`${body['status']} : uploading done `, { cssClass: "alert-success" });
              this.userInfo['profile'] = body['profile'];
              this.user.setLocalStorage('userInfo' , JSON.stringify(this.userInfo));
              this.file = null;
            } else {
              this.flashMessage.show(`${body['status']} : ${body['error']}`, { cssClass: "alert-danger" });
            }
          }
        },
        (err) => {
          this.flashMessage.show(err.message, { cssClass: "alert-danger" });
        }
      )
    }
  }

}
