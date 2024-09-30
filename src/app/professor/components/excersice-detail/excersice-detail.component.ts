import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ExerciseService } from '../../../exercise/services/exercise-service.service';
import { Exercise } from '../../../interfaces/exercise.interface';

@Component({
  selector: 'app-excersice-detail',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './excersice-detail.component.html',
  styleUrl: './excersice-detail.component.css'
})
export class ExcersiceDetailComponent implements OnInit {

  private fb = inject(FormBuilder);
  private activatedRouter = inject(ActivatedRoute);

  private cdrf = inject(ChangeDetectorRef);

  private exService = inject(ExerciseService);
  public excersice!: Exercise;

  myForm: FormGroup = this.fb.group({
    description: ['', Validators.required],
    annotations: [''],
  })

  ngOnInit(): void {
    this.activatedRouter.params.subscribe(
      ({id}) => {
        this.exService.getExcersiceById(id).subscribe(
          exc => {

            this.myForm.controls['description'].setValue(exc.description);
            this.myForm.controls['annotations'].setValue(exc.annotations);

            this.excersice = exc}
        );

        this.cdrf.detectChanges();
      }
    );
  }

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

}
