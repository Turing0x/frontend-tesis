import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { Exercise } from '../../interfaces/exercise.interface';
import { CardComponent } from '../../components/card/card.component';

@Component({
  selector: 'student-pending-exercices',
  standalone: true,
  imports: [
    CardComponent
  ],
  templateUrl: './pending-exercices.component.html',
  styleUrl: './pending-exercices.component.css'
})
export class PendingExercicesComponent implements OnInit {

  private studentService = inject(StudentService);
  private chrf = inject(ChangeDetectorRef);

  public pendingExercises!: Exercise[];

  ngOnInit(): void {

    const user_id = localStorage.getItem("user_id");
    this.studentService.getPendingExercises(user_id!).subscribe(
      value => {
        this.pendingExercises = value;
        this.chrf.detectChanges();
      }
    );

  }

}
