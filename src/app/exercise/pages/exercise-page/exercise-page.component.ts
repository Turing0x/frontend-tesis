import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExerciseService} from '../../services/exercise-service.service';
import { map } from 'rxjs';
import { Exercise } from '../../../interfaces/exercise.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-exercise-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './exercise-page.component.html',
  styleUrl: './exercise-page.component.css'
})
export class ExercisePageComponent implements OnInit{

  private activatedRouter = inject(ActivatedRoute);
  private exSerive = inject(ExerciseService);

  public exercise!: Exercise;

  ngOnInit(): void {
    this.activatedRouter.params.subscribe(({id}) => {
      this.exSerive.getExercise(id).subscribe(
        excersice => this.exercise = excersice
      );
    })
  }

}
