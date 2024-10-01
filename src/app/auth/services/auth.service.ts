import { HttpClient, HttpHeaders } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Environments } from '../../environment/environment';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { User } from '../../interfaces/user.interface';
import { AuthResponse } from '../interfaces/auth_response.interface';
import { AuthStatus } from '../../interfaces/auth.status.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);

  private _authStatus = signal<AuthStatus>( AuthStatus.notAuthenticated );
  public authStatus = computed(() => this._authStatus())

  private url = `${Environments.base_url}/users`;

  constructor() {
    this.checkAuthStatus().subscribe();
  }

  private get httpHeaders() {
    return new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  logout() {
    localStorage.removeItem('last_path');
    localStorage.removeItem('user_id');
    this._authStatus.set(AuthStatus.notAuthenticated);
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
      tap( resp => {
        if( resp.success ) {
          this._authStatus.set(AuthStatus.authenticated);
        }
      }), 
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

  checkAuthStatus(): Observable<boolean> {
    const user_id = localStorage.getItem('user_id');

    if (!user_id) {
      this._authStatus.set(AuthStatus.notAuthenticated);
      this.logout();
      return of(false);
    }
    
    this._authStatus.set(AuthStatus.authenticated);
    return of(true);

  }

}
