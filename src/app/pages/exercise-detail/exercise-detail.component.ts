import {
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Exercise } from '../../interfaces/exercise.interface';
import { ValidatorService } from '../../validators/validator.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { SnackbarComponent } from '../../shared/snackbar/snackbar.component';
import { ExerciseService } from '../../services/exercise-service.service';

@Component({
  selector: 'app-exercise-detail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SnackbarComponent],
  templateUrl: './exercise-detail.component.html',
  styleUrl: './exercise-detail.component.css',
})
export class ExcersiceDetailComponent implements OnInit {
  @ViewChild(SnackbarComponent) snackbar!: SnackbarComponent;

  private fb = inject(FormBuilder);
  private activatedRouter = inject(ActivatedRoute);
  private cdrf = inject(ChangeDetectorRef);
  private exService = inject(ExerciseService);
  private validatorService = inject(ValidatorService);
  private router = inject(Router);

  public exercise!: Exercise;
  public allStudents: boolean = false;

  public allowEdit: boolean = false;

  myForm: FormGroup = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    destine: ['', Validators.required],
    annotations: [''],
  });

  ngOnInit(): void {
    this.activatedRouter.params.subscribe(({ id }) => {
      this.exService.getExcersiceById(id).subscribe((exc) => {
        this.myForm.controls['title'].setValue(exc.title);
        this.myForm.controls['description'].setValue(exc.description);
        this.myForm.controls['annotations'].setValue(exc.annotations);
        this.myForm.controls['destine'].setValue(exc.destine);

        this.exercise = exc;
      });

      this.cdrf.detectChanges();
    });
  }

  isValidField(field: string): boolean | null {
    return this.validatorService.isValidField(this.myForm, field);
  }

  noExerciseFile(): boolean {
    const ExerciseFileInput = document.getElementById(
      'exercise-files'
    ) as HTMLInputElement;
    return ExerciseFileInput!.files!.length === 0;
  }

  toggleAllStudents(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    this.myForm.controls['destine'].reset();
    this.allStudents = checkbox.checked;
  }

  onSave() {
    if (this.myForm.valid && !this.noExerciseFile()) {
      const id = this.exercise._id;
      const titleValue = this.myForm.get('title')?.value;
      const descriptionValue = this.myForm.get('description')?.value;
      const annotationsValue = this.myForm.get('annotations')?.value;
      const destineValue = this.myForm.get('destine')?.value;

      const excFiles = document.getElementById(
        'exercise-files'
      ) as HTMLInputElement;
      const solutionFiles = document.getElementById(
        'solution-files'
      ) as HTMLInputElement;

      const formData = new FormData();
      formData.append('title', titleValue);
      formData.append('description', descriptionValue);
      formData.append('annotations', annotationsValue);
      formData.append('destine', destineValue);
      formData.append('exFile', excFiles.files![0]);
      formData.append('possibleSolFile', solutionFiles.files![0]);

      Swal.fire({
        title: '¿Estás seguro?',
        text: 'Está seguro que deseas editar el ejercicio?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, guardar',
      }).then((result) => {
        if (result.isConfirmed) {
          this.exService.editExercise(id!, formData).subscribe(() => {
            this.snackbar.showSnackbar(
              'Ejercicio editado',
              'El ejercicio ha sido editado exitosamente',
              'success'
            );
          });
        }
      });
    }
  }

  onEdit() {
    const tohide = document.getElementsByClassName('to-hide');
    const editBtn = document.getElementById('edit-btn') as HTMLButtonElement;

    Array.from(tohide).forEach((element) => {
      const classList = element.classList;
      if (classList.contains('hidden')) {
        classList.remove('hidden');
        editBtn.classList.add('cancel-edit');
        editBtn.classList.remove('green-btn');
        editBtn.innerText = 'Cancelar';
      } else {
        classList.add('hidden');
        editBtn.classList.remove('cancel-edit');
        editBtn.classList.add('green-btn');
        editBtn.innerText = 'Editar';
        this.myForm.controls['title'].setValue(this.exercise.title);
        this.myForm.controls['description'].setValue(this.exercise.description);
        this.myForm.controls['annotations'].setValue(this.exercise.annotations);
      }
    });

    this.allowEdit = !this.allowEdit;
  }

  onDelete() {
    const id = this.exercise._id;

    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Está seguro que deseas eliminar el ejercicio?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.exService.deleteExercise(id!).subscribe(() => {
          Swal.fire({
            title: 'eliminado',
            text: 'El ejercicio ha sido eliminado exitosamente',
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
          });
          this.router.navigate(['/exercise/professor']);
        });
      }
    });
  }

  showSB() {
    this.snackbar.showSnackbar(
      'Funciona',
      'Todo ha funcionado bien',
      'success'
    );
  }
}
