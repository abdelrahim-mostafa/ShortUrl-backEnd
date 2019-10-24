import { Component, OnInit } from '@angular/core';
import { UrlService } from '../url.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-urls',
  templateUrl: './list-urls.component.html',
  styleUrls: ['./list-urls.component.css']
})
export class ListUrlsComponent implements OnInit {

  allUrls : Object;
  constructor( private url : UrlService , private flashMessage : FlashMessagesService , private router : Router) { }

  ngOnInit() {
    this.getAllUrls();
  }

  getAllUrls() {
    this.url.allUrls().subscribe(
      (res) => {
        if(res['status'] === "done"){
          this.allUrls = res['data'];
        } else {
          this.flashMessage.show(`${res['status']} : ${res['error']}`, { cssClass: "alert-danger" });
        }
      },
      (err) => {
        this.flashMessage.show(err.message, { cssClass: "alert-danger" });
      }
    );
  }

  eidtRedirect(_id) {
    this.router.navigate([`/home/updateUrl/${_id}`]);
    //console.log(_id);
  }

  deleteUrl(_id : String){
    this.url.deleteUrl(_id).subscribe(
      (res) => {
        console.log({res});
        if(res['status'] === "done"){
          this.flashMessage.show(`${res['status']} : SuccessFull Delete `, { cssClass: "alert-success" });
          this.getAllUrls();
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

  activeStatus(link , _id, status) {
    this.url.newOrUpdateUrl({link , _id , status} , 'update').subscribe(
      (res) => {
        if(res['status'] === "done"){
          this.getAllUrls();
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
