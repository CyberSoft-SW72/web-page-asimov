import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { catchError, retry, throwError } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  basePath = 'https://asimov-api-production.up.railway.app/api/v1';
  //basePath = 'http://localhost:8080/api/v1'

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

  getAllByCourseId(courseId: any) {
    return this.http.get(`${this.basePath}/courses/${courseId}/items`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
  create(item: any, courseId: any) {
    return this.http.post(`${this.basePath}/courses/${courseId}/items`, item, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
  delete(id: any) {
    return this.http.delete(`${this.basePath}/items/${id}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  update(id: any, item: any) {
    return this.http.put(`${this.basePath}/items/${id}`, item, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
}
