import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Exercise } from '../../../interfaces/exercise.interface';
import { StudentService } from '../../services/student.service';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CardComponent } from '../../../shared/card/card.component';

@Component({
  selector: 'student-pending-exercices',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterOutlet,
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
