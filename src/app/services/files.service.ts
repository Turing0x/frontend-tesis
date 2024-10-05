import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, map, catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { Environments } from '../environment/environment';
import { FileInfo } from '../interfaces/file.interface';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  private http = inject(HttpClient);
  private files_url = `${Environments.base_url}/files`;

  private get httpHeaders() {
    return new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  getAllConfigFiless(): Observable<FileInfo[]> {
    return this.http.get<any>(this.files_url, {
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
      }));
  }

  saveFile(full_path: string, content: string): Observable<FileInfo> {

    console.log(full_path);
    console.log(content);
    return this.http.post<any>(this.files_url, { full_path, content }).pipe( 
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
