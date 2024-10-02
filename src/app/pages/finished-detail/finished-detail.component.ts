import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { Exercise } from '../../interfaces/exercise.interface';
import { ExerciseService } from '../../services/exercise-service.service';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from '../../services/student.service';
import { Solution } from '../../interfaces/solution.interface';

@Component({
  selector: 'finished-detail',
  standalone: true,
  imports: [],
  templateUrl: './finished-detail.component.html',
  styleUrl: './finished-detail.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FinishedDetailComponent {

  private activatedRouter = inject(ActivatedRoute);
  private exSerive = inject(ExerciseService);

  private cdrf = inject(ChangeDetectorRef);

  public exercise!: Exercise;
  public solution!: Solution;

  ngOnInit(): void {
    this.activatedRouter.params.subscribe(({id}) => {
      console.log(id);
      this.exSerive.getFinishedById(id).subscribe(
        ([exercise, solution]) => {
          this.exercise = exercise;
          this.solution = solution;
          this.cdrf.detectChanges();
        }
      );
    })
  }

}
