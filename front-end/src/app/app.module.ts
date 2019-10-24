import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FlashMessagesModule } from 'angular2-flash-messages';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { RedirectComponent } from './update-user-info/redirect.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { UrlComponent } from './url/url.component';
import { ListUrlsComponent } from './list-urls/list-urls.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UserService } from './user.service';
import { UrlService } from './url.service';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    RedirectComponent,
    UserInfoComponent,
    UrlComponent,
    ListUrlsComponent,
    HomeComponent,
    NavbarComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlashMessagesModule.forRoot()
  ],
  providers: [
    UserService,
    UrlService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
