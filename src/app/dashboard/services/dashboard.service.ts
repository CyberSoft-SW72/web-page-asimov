import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { catchError, retry, throwError } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  basePath = 'https://app-asimov-api-220614235642.azurewebsites.net/api/v1'

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
  }

  constructor(private http: HttpClient) { }

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

  getAllAnnouncements() {
    return this.http.get(`${this.basePath}/directors/${
      localStorage.getItem('role') === 'ROLE_DIRECTOR' ? localStorage.getItem('userId') : localStorage.getItem('directorId')
    }/announcements`, this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    );
  }
}
