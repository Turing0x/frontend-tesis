import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  private url = 'http://localhost:8080/api/excercises';

  private http = inject(HttpClient);

  private get httpHeaders() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }

  getExercise(id: string) {
    return this.http.get<any>(`${ this.url }/${ id }`, {
      headers: this.httpHeaders
    })
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

  uploadSolution(ex_id: string, student_id: string, file: FormData) {
    return this.http.post<any>(`http://localhost:8080/api/solutions/${ex_id}/${student_id}`, file)
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
