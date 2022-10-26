import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { catchError, retry, throwError } from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class SignInService {
  basePath: string = 'https://app-asimov-api-220614235642.azurewebsites.net/api/v1';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) { }

  // API Error Handling
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Default Error Handling
      console.log(`An error occurred ${error.status}, body was: ${error.error}`);
    } else {
      // Unsuccessful Response Error Code returned from Backend
      console.log(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    // Return Observable with Error Message to Client
    return throwError(() => new Error('Something happened with request, please try again later.'));
  }

  // AuthGuard

  isLoggedIn() {
    if(localStorage.length > 0) {
      console.log('logged in');
      return true;
    }
    console.log('not logged in');
    return false;
  }

  // Sign-In

  signIn(data : any) {
    let role = data.role == 'ROLE_TEACHER' ? 'teachers' : 'directors';
    if(role === 'teachers') {
      // console.log(data);
      return this.http.post(`${this.basePath}/${role}/auth/sign-in`, data, this.httpOptions).
      pipe(
        retry(2),
        catchError(this.handleError)
      )
    }
    return this.http.post(`${this.basePath}/${role}/auth/sign-in`, data, this.httpOptions)
  }

  getTeacher(id: any) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }),
    };
    return this.http.get(`${this.basePath}/teachers/${id}`, this.httpOptions )
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // Sign-Out
  signOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    localStorage.removeItem('directorId');
  }

}
