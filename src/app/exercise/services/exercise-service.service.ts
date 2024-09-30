import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { Exercise } from '../../interfaces/exercise.interface';

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

  getAllExcercises(): Observable<Exercise[]> {
    return this.http.get<any>(this.url, {headers: this.httpHeaders}).pipe(
      map( resp => resp.data ),
      catchError(e => {
        Swal.fire(
          'Error Interno',
          'Ha ocurrido algo grave. Contacte a soporte por favor',
          'error'
        )
        return throwError(() => e)
      })
    )
  }

  getExcersiceById(id: string): Observable<Exercise> {
    return this.http.get<any>(`${this.url}/${id}`, {headers: this.httpHeaders}).pipe(
      map( resp => resp.data ),
      catchError(e => {
        Swal.fire(
          'Error Interno',
          'Ha ocurrido algo grave. Contacte a soporte por favor',
          'error'
        )
        return throwError(() => e)
      })
    )
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

  uploadSolution(ex_id: string, student_id: string, file: FormData): Observable<Exercise> {
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

  editExercise(id: string, data: FormData){

    return this.http.put<any>(`${this.url}/${id}`, data).pipe(
      map( resp => resp.data ),
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
