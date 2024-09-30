import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Environments } from '../../environment/environment';
import { catchError, map, Observable, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { User } from '../../interfaces/user.interface';
import { AuthResponse } from '../interfaces/auth_response.interface';
import { Exercise } from '../../interfaces/exercise.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);

  private url = `${Environments.base_url}/users`;

  private get httpHeaders() {
    return new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  getAllUsers(): Observable<User[]>{
    return this.http.get<any>(this.url, {
      headers: this.httpHeaders
    }).pipe(
        map(response => response.data),
        catchError(e => {
          Swal.fire(
            'Error Interno',
            'Ha ocurrido algo grave. Contacte a soporte por favor',
            'error'
          )
          return throwError(() => e)
        })
      );
  }

  createUser(user: User): Observable<User> {
    return this.http.post<any>(this.url, user, {
      headers: this.httpHeaders
    }).pipe(
      map(response => response.data),
      catchError(e => {
        Swal.fire(
          'Error Interno',
          'Ha ocurrido algo grave. Contacte a soporte por favor',
          'error'
        )
        return throwError(() => e)
      })
    );
  }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.url}/signin`, {email, password}, {
      headers: this.httpHeaders
    }).pipe(
      catchError(e => {
        Swal.fire(
          'Error Interno',
          'Ha ocurrido algo grave. Contacte a soporte por favor',
          'error'
        )
        return throwError(() => e)
      })
    );
  }

}
