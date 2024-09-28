import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { PendingExercisesService } from '../../../services/pending-exercises.service';
import { Exercise } from '../../../interfaces/exercise.interface';

@Component({
  selector: 'student-pending-exercices',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './pending-exercices.component.html',
  styleUrl: './pending-exercices.component.css'
})
export class PendingExercicesComponent implements OnInit {

  private peService = inject(PendingExercisesService);

  public pendingExercises!: Exercise[];

  ngOnInit(): void {
    //TODO: Ejecutar petición de ejercicios pendientes del usuario logeado
    this.peService.getPendingExercises().subscribe(
      exercises => this.pendingExercises = exercises
    )
  }
}
