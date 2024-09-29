import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExerciseService} from '../../services/exercise-service.service';
import { Exercise } from '../../../interfaces/exercise.interface';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from "../../../layouts/ui/sidebar/sidebar.component";
import { FileInfo } from '../../../interfaces/file.interface';
import { filesPaths } from '../../../helpers/files-paths';

@Component({
  selector: 'app-exercise-page',
  standalone: true,
  imports: [CommonModule, SidebarComponent],
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

  downloadTxtFile( folderName: string ) {

    for(const { name, folder_name, data } of this.exercise.exercise_files_info) {

      console.log({ name, folder_name, data });

      if( folder_name === folderName ) {

        const content = data.join('\n');
        const blob = new Blob([content], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = name;
        document.body.appendChild(a);
        a.click();

        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);

      }
    }
  }

  handleFilesUpload(file: FileList) {

    const formData = new FormData();
    formData.append('file', file[0]);

    const student_id = localStorage.getItem('user_id');
    if( !student_id ) return;

    this.exSerive.uploadSolution(this.exercise._id, student_id, formData).subscribe(
      res => {
        console.log('res :>> ', res);
      }
    );

  }

}
