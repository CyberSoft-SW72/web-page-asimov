import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { catchError, retry, throwError } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SignUpService {
  basePath = 'https://app-asimov-api-220614235642.azurewebsites.net/api/v1';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) {  }

  handleError(error: HttpErrorResponse) {
    if(error.error instanceof ErrorEvent) {
      console.log(`Ann error occurred: ${error.error.message}`);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: ${error.error}`
      );
    }
    return throwError('Something happened with request, please try again later');
  }

  signUp(data: any) {
    let role = data.role === 'ROLE_TEACHER' ? 'teachers' : 'directors';
    let id = data.directorId;
    // console.log(role);
    if(role === 'teachers') {
      // console.log(data);
      return this.http.post(`${this.basePath}/${role}/auth/sign-up/${id}`, data, this.httpOptions)
        .pipe(
          retry(2),
          catchError(this.handleError)
        )
    }
    return this.http.post(`${this.basePath}/${role}/auth/sign-up`, data, this.httpOptions)
  }

  getAllDirectors() {
    return this.http.get(`${this.basePath}/directors`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
}
