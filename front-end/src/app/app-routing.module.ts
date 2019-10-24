import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { ListUrlsComponent } from './list-urls/list-urls.component';
import { UrlComponent } from './url/url.component';
import { AuthGuard } from './auth.guard';
import { NotFoundComponent } from './not-found/not-found.component';
import { RedirectComponent } from './update-user-info/redirect.component';


const routes: Routes = [
  {path : 'login' , component: LoginComponent },
  {path : 'signup' , component: SignupComponent },
  {path : '' , redirectTo : 'home' , pathMatch : 'full' },
  {
    path : 'home' , 
    component: HomeComponent ,
    canActivate : [AuthGuard] ,
    children :[
     {
      path : '' , 
      canActivateChild : [AuthGuard] ,
      children : [
        {path : '' , component: ListUrlsComponent },
        {path : 'urls' , component: ListUrlsComponent },
        {path : 'new' , component: UrlComponent },
        {path : 'updateUrl/:id' , component: UrlComponent },
        {path : 'updateUser' , component: SignupComponent },
      ]
     },
    ]
  },
  {path : 'u/:parser' , component: RedirectComponent },
  {path : '**' , component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
