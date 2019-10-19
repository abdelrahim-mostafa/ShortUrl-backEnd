import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { UrlComponent } from './url/url.component';
import { UpdateUserInfoComponent } from './update-user-info/update-user-info.component';
import { ListUrlsComponent } from './list-urls/list-urls.component';


const routes: Routes = [
  {path : 'login' , component: LoginComponent },
  {path : 'signup' , component: SignupComponent },
  {
    path : 'home' , 
    component: HomeComponent ,
    children :[
     {
      path : '' , 
      children : [
        {path : '' , component: ListUrlsComponent },
        {path : 'urls' , component: ListUrlsComponent },
        {path : 'new' , component: UrlComponent },
        {path : 'updateUrl/:id' , component: UrlComponent },
        {path : 'updateUser' , component: UpdateUserInfoComponent },
      ]
     },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
