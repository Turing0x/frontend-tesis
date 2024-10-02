import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, map, catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { Environments } from '../../environment/environment';
import { Exercise } from '../../interfaces/exercise.interface';
import { Solution } from '../../interfaces/solution.interface';

@Injectable({
  providedIn: 'root'
})
export class SolutionService {

  private http = inject(HttpClient);

  private user_url = `${Environments.base_url}/solutions`;

  private get httpHeaders() {
    return new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  getAllSolutions(): Observable<Solution[]> {

    return this.http.get<any>(this.user_url, {
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

  getSolution(id: string): Observable<Solution> {
    return this.http.get<any>(`${this.user_url}/${id}`, {
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
