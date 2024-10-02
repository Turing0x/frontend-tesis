import { ChangeDetectorRef, Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Exercise } from '../../interfaces/exercise.interface';
import { ValidatorService } from '../../validators/validator.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { SnackbarComponent } from "../../shared/snackbar/snackbar.component";
import { ExerciseService } from '../../services/exercise-service.service';

@Component({
  selector: 'app-excersice-detail',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SnackbarComponent
],
  templateUrl: './excersice-detail.component.html',
  styleUrl: './excersice-detail.component.css'
})
export class ExcersiceDetailComponent implements OnInit {

  @ViewChild(SnackbarComponent) snackbar!: SnackbarComponent;

  private fb = inject(FormBuilder);
  private activatedRouter = inject(ActivatedRoute);
  private cdrf = inject(ChangeDetectorRef);
  private exService = inject(ExerciseService);
  private validatorService = inject(ValidatorService);
  private router = inject(Router);

  public excersice!: Exercise;

  myForm: FormGroup = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    annotations: [''],
  })

  ngOnInit(): void {
    this.activatedRouter.params.subscribe(
      ({id}) => {
        this.exService.getExcersiceById(id).subscribe(
          exc => {

            this.myForm.controls['title'].setValue(exc.title);
            this.myForm.controls['description'].setValue(exc.description);
            this.myForm.controls['annotations'].setValue(exc.annotations);

            this.excersice = exc}
        );

        this.cdrf.detectChanges();
      }
    );
  }

  isValidField( field: string ): boolean | null {
    return this.validatorService.isValidField( this.myForm, field );
  }

  emptyFiles(): boolean{

    const ExcerciseFileInput = document.getElementById('exercise-files') as HTMLInputElement
    const PosibleSolutionFileInput = document.getElementById('solution-files') as HTMLInputElement

    if (ExcerciseFileInput!.files!.length === 0 || PosibleSolutionFileInput!.files!.length === 0){
      return false
    }

    return true;
  }

  noExcerciseFile(): boolean{
    const ExcerciseFileInput = document.getElementById('exercise-files') as HTMLInputElement

    return ExcerciseFileInput!.files!.length === 0;
  }

  onSave(){
    if( !this.myForm.invalid && !this.emptyFiles() ){

      const id = this.excersice._id;
      const titleValue = this.myForm.get('title')?.value;
      const descriptionValue = this.myForm.get('description')?.value;
      const annotationsValue = this.myForm.get('annotations')?.value;

      const excFiles = document.getElementById('exercise-files') as HTMLInputElement;
      const solutionFiles = document.getElementById('solution-files') as HTMLInputElement;

      const formData = new FormData();
      formData.append('title', titleValue);
      formData.append('description', descriptionValue);
      formData.append('annotations', annotationsValue);
      formData.append('file', excFiles.files![0]);


      this.exService.editExercise( id, formData ).subscribe(
        () => {
          Swal.fire({
            title: '¿Estás seguro?',
            text: 'Está seguro que deseas editar el ejercicio?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, guardar'
          }).then((result) => {
            if (result.isConfirmed) {
              this.exService.editExercise( id, formData ).subscribe(
                () => {
                  this.snackbar.showSnackbar('Ejercicio editado', 'El ejercicio ha sido editado exitosamente', 'success');
                }
              );
            }
          });
        }
      );

    }
  }

  onEdit() {

    const tohide = document.getElementsByClassName('to-hide');
    const editBtn = document.getElementById('edit-btn') as HTMLButtonElement;
    const textInput = document.getElementsByTagName('input');

    Array.from(tohide).forEach(element => {
      const classList = element.classList;
      if( classList.contains('hidden') ){
        classList.remove('hidden');
        editBtn.classList.add('cancel-edit')
        editBtn.innerText = 'Cancelar';
      } else {
        classList.add('hidden')
        editBtn.classList.remove('cancel-edit')
        editBtn.innerText = 'Editar';
        this.myForm.controls['title'].setValue(this.excersice.title);
        this.myForm.controls['description'].setValue(this.excersice.description);
        this.myForm.controls['annotations'].setValue(this.excersice.annotations);
      }
    });

    Array.from(textInput).forEach(input => {
      if(input.type === 'text'){
        const att = input.attributes;
        if( att.getNamedItem('readonly') ){
          input.removeAttribute('readonly')
        } else {
          input.readOnly = true;
        }
      }
    });

  }

  onDelete(){
    const id = this.excersice._id;

    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Está seguro que deseas eliminar el ejercicio?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.exService.deleteExercise( id ).subscribe(
          () => {
            Swal.fire({
              title: 'eliminado',
              text: 'El ejercicio ha sido eliminado exitosamente',
              icon: 'success',
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'OK'
            });
            this.router.navigate(['/professor']);
          }
        );
      }
    }
  )}

  showSB(){
    this.snackbar.showSnackbar('Funciona', 'Todo ha funcionado bien', 'success');
  }

}