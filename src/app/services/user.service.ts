import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

export interface User {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: number;
  profileImage:any;
  DOB:any;
}
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http
      .get<User[]>('http://localhost:3000/users')
      .pipe(catchError(this.handleError));
  }
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with a user-facing error message.
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
  postuser(user: User): Observable<User> {
    return this.http.post<User>('http://localhost:3000/users', user);
  }
  getUser(id: number): Observable<User> {
    return this.http.get<User>('http://localhost:3000/users/' + id);
  }
  updateUser(user: User): Observable<User> {
    return this.http.patch<User>(
      'http://localhost:3000/users/' + user.id,
      user
    );
  }
  deleteUser(id: number) {
    return this.http.delete('http://localhost:3000/users/' + id);
  }
}
