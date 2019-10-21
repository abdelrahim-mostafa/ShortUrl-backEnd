import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  loginStatus : Boolean = false;
  constructor(private user : UserService ,  private router : Router) { }

  ngOnInit() {
    this.loginStatus = this.user.isLoggedin();
  }

  logOut() {
    this.user.logOut();
    this.loginStatus = false;
    this.router.navigate(['/login']);
  }

}
