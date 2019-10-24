import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders , HttpErrorResponse } from '@angular/common/http';
import { throwError , Observable } from 'rxjs'
import { catchError } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  loginStatus = false;
  constructor(private http : HttpClient) {
    this.loginStatus = !!localStorage.getItem('token');
    let token = localStorage.getItem('token');
    this.http.get<Object>(`http://localhost:3000/user/verify` , {
      headers : new HttpHeaders({
        'Content-Type' : 'application/json',
        'Authorization' : `Bearer ${token}`
      })
    }).pipe(catchError(this.requsetError)).subscribe(
      (res) =>{
        if(res['status'] === 'done') this.loginStatus  = true;
        else this.loginStatus =  false;
      },
      (err) => this.loginStatus =  false
    );
    
  }

  loginOrSignupOrupdate(data , path) : Observable<Object> {
    let token = localStorage.getItem('token');
    return this.http.post<Object>(`http://localhost:3000/user/${path}` , data , {
      headers : new HttpHeaders({
        'Content-Type' : 'application/json',
        'Authorization' : `Bearer ${token}`
      })
    }).pipe(catchError(this.requsetError));
  }
  getUserData() : Observable<Object> {
    let token = localStorage.getItem('token');
    return this.http.get<Object>(`http://localhost:3000/user/verifyAndGetData` , {
      headers : new HttpHeaders({
        'Content-Type' : 'application/json',
        'Authorization' : `Bearer ${token}`
      })
    }).pipe(catchError(this.requsetError));
  }
  uploadProfile(data : any) : Observable<Object> {
    let token = localStorage.getItem('token');
    return this.http.post<Object>(`http://localhost:3000/user/uploadFile` , data , {
      reportProgress: true,
      observe: 'events',
      headers : new HttpHeaders({
        'Authorization' : `Bearer ${token}`
      })
    }).pipe(catchError(this.requsetError));
  }

  requsetError( error : HttpErrorResponse) {
    if(error instanceof ErrorEvent) {
     // A client-side or network error occurred. Handle it accordingly.
     console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(error);
  }


  setLocalStorage(key , value) {
    localStorage.setItem(key , value);
  }
  isLoggedin() : boolean{
    return this.loginStatus;
  }
  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
  }
}
