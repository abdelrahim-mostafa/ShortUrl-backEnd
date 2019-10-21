import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor (private user : UserService , private router : Router){}
  
  canActivate( next: ActivatedRouteSnapshot, state: RouterStateSnapshot):  boolean{
    
    if(this.user.isLoggedin()){
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
  canActivateChild( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state); 
  }
  
}
