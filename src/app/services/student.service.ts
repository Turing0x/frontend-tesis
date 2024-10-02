import { inject, Injectable } from '@angular/core';
import { map, catchError, throwError, Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Environments } from '../environment/environment';
import { Exercise } from '../interfaces/exercise.interface';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private http = inject(HttpClient);

  private user_url = `${Environments.base_url}/users/pending_exercises`;

  private get httpHeaders() {
    return new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  getPendingExercises(id: string): Observable<Exercise[]> {

    return this.http.get<any>(`${ this.user_url }/${ id }`, {
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

}
