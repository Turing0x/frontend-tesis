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
  private exService = inject(ExerciseService);

  myForm: FormGroup = this.fb.group({
    description: ['prueba', Validators.required],
    annotations: ['prueba'],
  })

  onSave(){

    const excFiles = document.getElementById('exercise-files') as HTMLInputElement;

    if( this.myForm.valid && excFiles && excFiles.files?.length !== 0 ){

      const descriptionValue = this.myForm.get('description')?.value;
      const annotationsValue = this.myForm.get('annotations')?.value;

      const solutionFiles = document.getElementById('solution-files') as HTMLInputElement;

      const formData = new FormData();
      formData.append('description', descriptionValue);
      formData.append('annotations', annotationsValue);
      formData.append('exFile', excFiles.files![0]);
      formData.append('solFile', solutionFiles.files![0]);

      this.exService.createExcercise( formData ).subscribe(
        () => {
          console.log('create');
        }
      );

    }
  }

}
