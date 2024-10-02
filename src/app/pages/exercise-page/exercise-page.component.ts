import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExerciseService} from '../../services/exercise-service.service';
import { Exercise } from '../../interfaces/exercise.interface';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';

@Component({
  selector: 'app-exercise-page',
  standalone: true,
  imports: [CommonModule, SidebarComponent ],
  templateUrl: './exercise-page.component.html',
  styleUrl: './exercise-page.component.css'
})
export class ExercisePageComponent implements OnInit{

  private activatedRouter = inject(ActivatedRoute);
  private exSerive = inject(ExerciseService);

  private cdrf = inject(ChangeDetectorRef);

  public exercise!: Exercise;

  ngOnInit(): void {
    this.activatedRouter.params.subscribe(({id}) => {
      this.exSerive.getExercise(id).subscribe(
        excersice => {
          this.exercise = excersice;
          this.cdrf.detectChanges();
        }
      );
    })
  }

  uploadFiles(): void {
    const $inputFiles = document.getElementById('file-upload') as HTMLInputElement;
    if (!$inputFiles || !$inputFiles.files) {
      return;
    }

    this.handleFilesUpload($inputFiles.files!);
  }

  async downloadExcerciseFile() {

    const ex_id = this.exercise._id;

    const response = await fetch(`http://localhost:8080/api/excercises/download/${ex_id}`);

    if( !response.ok ) {
      return;
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `prueba.rar`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);

  }

  handleFilesUpload(file: FileList) {

    const formData = new FormData();
    formData.append('solutionFile', file[0]);

    const student_id = localStorage.getItem('user_id');
    if( !student_id ) return;

    this.exSerive.uploadSolution(this.exercise._id, student_id, formData).subscribe(
      res => {
        console.log('res :>> ', res);
      }
    );

  }

}
