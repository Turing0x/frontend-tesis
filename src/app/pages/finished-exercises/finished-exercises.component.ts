import { Component, OnInit } from '@angular/core';
import { CardComponent } from "../../components/card/card.component";
import { Exercise } from '../../interfaces/exercise.interface';

@Component({
  selector: 'student-finished-exercises',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './finished-exercises.component.html',
  styleUrl: './finished-exercises.component.css'
})
export class FinishedExercisesComponent implements OnInit {

  public exercises: Exercise[] = [];

  ngOnInit(): void {
    console.log('finished-exercises OnInit');
  }

}
