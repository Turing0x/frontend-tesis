import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Exercise } from '../interfaces/exercise.interface';

@Injectable({
  providedIn: 'root'
})
export class PendingExercisesService {

  private pendingExercisesSubject = new BehaviorSubject<Exercise[]>([]);
  pendingExercises$ = this.pendingExercisesSubject.asObservable();

  getPendingExercises() {
    return this.pendingExercisesSubject;
  }

  setPendingExercises(exercises: Exercise[]) {
    console.log(exercises);
    this.pendingExercisesSubject.next(exercises);
  }

}
