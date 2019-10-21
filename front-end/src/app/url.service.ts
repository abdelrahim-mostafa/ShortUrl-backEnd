import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders , HttpErrorResponse } from '@angular/common/http';
import { throwError , Observable } from 'rxjs'
import { catchError } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  constructor(private http : HttpClient) { }

  allUrls() : Observable<Object> {
    let token = localStorage.getItem('token');
    return this.http.get<Object>(`http://localhost:3000/url/list` , {
      reportProgress: true,
      observe: 'events',
      headers : new HttpHeaders({
        'Content-Type' :'application/json',
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

}
