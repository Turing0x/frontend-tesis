import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';
import { Exercise } from '../../interfaces/exercise.interface';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  private url = 'http://localhost:8080/api/excercises';

  private http = inject(HttpClient);

  private get httpHeaders() {
    return new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  getExercise(id: string) {
    return this.http.get<any>(`${ this.url }/${ id }`)
      .pipe(
        map( response => response.data ),
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
