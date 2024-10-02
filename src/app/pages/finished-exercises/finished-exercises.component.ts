import { Component, inject, OnInit } from '@angular/core';
import { CardComponent } from "../../components/card/card.component";
import { Exercise } from '../../interfaces/exercise.interface';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'student-finished-exercises',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './finished-exercises.component.html',
  styleUrl: './finished-exercises.component.css'
})
export class FinishedExercisesComponent implements OnInit {

  private studentService = inject(StudentService);

  public exercises: Exercise[] = [];

  ngOnInit(): void {
    const id = localStorage.getItem('user_id');
    if( !id ) return;

    this.studentService.getFinishedExercises(id).subscribe(
      data => {
        this.exercises = data
      }
    );
  }

}
