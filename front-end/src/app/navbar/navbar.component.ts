import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  loginStatus : Boolean = false;
  constructor(private user : UserService) { }

  ngOnInit() {
    this.user.isLoggedin().subscribe(
      (res) =>{
        if(res['status'] === 'done') this.loginStatus  = true;
        else this.loginStatus =  false;
      },
      (err) => this.loginStatus =  false
    );
  }

  logOut() {
    this.user.logOut();
    this.loginStatus = false;
  }

}
