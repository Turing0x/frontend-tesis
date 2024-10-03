import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidatorService } from '../../validators/validator.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { SnackbarComponent } from "../../shared/snackbar/snackbar.component";
import { ExerciseService } from '../../services/exercise-service.service';

@Component({
  selector: 'app-exercise-create',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SnackbarComponent
],
  templateUrl: './exercise-create.component.html',
  styleUrl: './exercise-create.component.css'
})
export class ExerciseCreateComponent implements OnInit {

  @ViewChild(SnackbarComponent) snackbar!: SnackbarComponent;

  private fb = inject(FormBuilder);
  private exService = inject(ExerciseService);
  private validatorService = inject(ValidatorService);

  public allStudents: boolean = false;


  myForm: FormGroup = this.fb.group({
    title: ['prueba', Validators.required],
    description: ['prueba', Validators.required],
    destine: ['prueba', Validators.required],
    annotations: ['prueba'],
  })

  ngOnInit(): void {
    this.myForm.reset();
  }

  isValidField( field: string ): boolean | null {
    return this.validatorService.isValidField( this.myForm, field );
  }

  noExerciseFile(): boolean{
    const ExerciseFileInput = document.getElementById('exercise-files') as HTMLInputElement

    return ExerciseFileInput!.files!.length === 0;
  }

  toggleAllStudents(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    this.allStudents = checkbox.checked;
  }

  onSave(){

    const excFiles = document.getElementById('exercise-files') as HTMLInputElement;
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
        this.exService.createExercise( formData ).subscribe(
          () => {
            this.snackbar.showSnackbar('Ejercicio creado', 'El ejercicio ha sido creado exitosamente', 'success');
            this.myForm.reset();
          }
        );
      }
    });

  }

}
