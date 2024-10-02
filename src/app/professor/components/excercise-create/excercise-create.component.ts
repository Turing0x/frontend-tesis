import { ChangeDetectorRef, Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ExerciseService } from '../../../exercise/services/exercise-service.service';
import { Exercise } from '../../../interfaces/exercise.interface';
import { ValidatorService } from '../../../helpers/validators/validator.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { SnackbarComponent } from "../../../shared/snackbar/snackbar.component";

@Component({
  selector: 'app-excercise-create',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SnackbarComponent
],
  templateUrl: './excercise-create.component.html',
  styleUrl: './excercise-create.component.css'
})
export class ExcerciseCreateComponent implements OnInit {

  @ViewChild(SnackbarComponent) snackbar!: SnackbarComponent;

  private fb = inject(FormBuilder);

  private exService = inject(ExerciseService);

  private validatorService = inject(ValidatorService);

  myForm: FormGroup = this.fb.group({
    title: ['prueba', Validators.required],
    description: ['prueba', Validators.required],
    annotations: ['prueba'],
  })

  ngOnInit(): void {
    this.myForm.reset();
  }

  isValidField( field: string ): boolean | null {
    return this.validatorService.isValidField( this.myForm, field );
  }

  noExcerciseFile(): boolean{
    const ExcerciseFileInput = document.getElementById('exercise-files') as HTMLInputElement

    return ExcerciseFileInput!.files!.length === 0;
  }

  onSave(){

    const excFiles = document.getElementById('exercise-files') as HTMLInputElement;
    console.log(this.myForm.invalid);
    if( this.myForm.invalid || !excFiles || excFiles.files?.length === 0 ) {
      this.myForm.markAllAsTouched();
      return;
    }
    const titleValue = this.myForm.get('title')?.value;
    const descriptionValue = this.myForm.get('description')?.value;
    const annotationsValue = this.myForm.get('annotations')?.value;

    const solutionFiles = document.getElementById('solution-files') as HTMLInputElement;

    const formData = new FormData();
    formData.append('title', titleValue);
    formData.append('description', descriptionValue);
    formData.append('annotations', annotationsValue);
    formData.append('exFile', excFiles.files![0]);
    formData.append('possibleSolFile', solutionFiles.files![0]);

    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Está seguro que deseas guardar el ejercicio?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, guardar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.exService.createExcercise( formData ).subscribe(
          () => {
            console.log('create');
            this.snackbar.showSnackbar('Ejercicio creado', 'El ejercicio ha sido creado exitosamente', 'success');
            this.myForm.reset();
          }
        );
      }
    });

  }

}
