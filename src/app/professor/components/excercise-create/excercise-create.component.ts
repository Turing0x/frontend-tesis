import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ExerciseService } from '../../../exercise/services/exercise-service.service';
import { Exercise } from '../../../interfaces/exercise.interface';

@Component({
  selector: 'app-excercise-create',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './excercise-create.component.html',
  styleUrl: './excercise-create.component.css'
})
export class ExcerciseCreateComponent{

  private fb = inject(FormBuilder);
  private activatedRouter = inject(ActivatedRoute);

  private cdrf = inject(ChangeDetectorRef);

  private exService = inject(ExerciseService);
  public excersice!: Exercise;

  myForm: FormGroup = this.fb.group({
    description: ['', Validators.required],
    annotations: [''],
  })

  onSave(){
    if( !this.myForm.invalid && !this.emptyFiles() ){

      const id = this.excersice._id;
      const descriptionValue = this.myForm.get('description')?.value;
      const annotationsValue = this.myForm.get('annotations')?.value;

      const excFiles = document.getElementById('exercise-files') as HTMLInputElement;
      const solutionFiles = document.getElementById('solution-files') as HTMLInputElement;

      const formData = new FormData();
      formData.append('description', descriptionValue);
      formData.append('annotations', annotationsValue);
      formData.append('file', excFiles.files![0]);

      // formData.append('solutionFiles', solutionFiles.files![0]);


      this.exService.editExercise( id, formData ).subscribe(
        () => {
          console.log('Editado');
        }
      );
      console.log('Save');

    }
  }

  emptyFiles(): boolean{

    const ExcerciseFileInput = document.getElementById('exercise-files') as HTMLInputElement
    const PosibleSolutionFileInput = document.getElementById('solution-files') as HTMLInputElement

    if (ExcerciseFileInput!.files!.length === 0 || PosibleSolutionFileInput!.files!.length === 0){
      return false
    }

    return true;
  }

}