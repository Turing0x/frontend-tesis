import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ExerciseService } from '../../../exercise/services/exercise-service.service';
import { Exercise } from '../../../interfaces/exercise.interface';
import { CardComponent } from '../../../shared/card/card.component';

@Component({
  selector: 'app-exercises',
  standalone: true,
  imports: [
    RouterLink,
    CardComponent
  ],
  templateUrl: './exercises.component.html',
  styleUrl: './exercises.component.css'
})
export class ExercisesComponent implements OnInit{

  private exService = inject(ExerciseService);

  public list!: Exercise[];

  ngOnInit(): void {
    this.exService.getAllExcercises().subscribe(
      data => this.list = data
    )
  }

}
