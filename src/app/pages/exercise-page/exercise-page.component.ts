import { ChangeDetectorRef, Component, inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExerciseService} from '../../services/exercise-service.service';
import { Exercise } from '../../interfaces/exercise.interface';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { SnackbarComponent } from '../../shared/snackbar/snackbar.component';
import { downloadFile } from '../../helpers/download_file';

@Component({
  selector: 'app-exercise-page',
  standalone: true,
  imports: [CommonModule, SidebarComponent, SnackbarComponent],
  templateUrl: './exercise-page.component.html',
  styleUrl: './exercise-page.component.css'
})
export class ExercisePageComponent implements OnInit{

  @ViewChild(SnackbarComponent) snackbar!: SnackbarComponent;

  private activatedRouter = inject(ActivatedRoute);
  private exSerive = inject(ExerciseService);

  private cdrf = inject(ChangeDetectorRef);

  public exercise!: Exercise;

  ngOnInit(): void {
    this.activatedRouter.params.subscribe(({id}) => {
      this.exSerive.getExercise(id).subscribe(
        exercise => {
          this.exercise = exercise;
          this.cdrf.detectChanges();
        }
      );
    })
  }

  uploadFiles(): void {
    const $inputFiles = document.getElementById('file-upload') as HTMLInputElement;
    if ( $inputFiles.files!.length === 0 ) {
      this.snackbar.showSnackbar('No hay archivos para subir', 'No hay archivos para subir', 'error');
      return;
    }
    if (!$inputFiles || !$inputFiles.files) {
      return;
    }

    this.handleFilesUpload($inputFiles.files!);
  }

  async downloadExerciseFile() {
    const ex_id = this.exercise._id;
    downloadFile('exercises', ex_id!);
  }

  handleFilesUpload(file: FileList) {

    const formData = new FormData();
    formData.append('solutionFile', file[0]);

    const student_id = localStorage.getItem('user_id');
    if( !student_id ) return;

    this.exSerive.uploadSolution(this.exercise._id!, student_id, formData).subscribe(
      res => {
        this.snackbar.showSnackbar('Archivo subido', 'El archivo ha sido subido exitosamente', 'success');
      }
    );

  }

}
