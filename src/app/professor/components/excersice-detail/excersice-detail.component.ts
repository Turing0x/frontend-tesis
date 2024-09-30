import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-excersice-detail',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './excersice-detail.component.html',
  styleUrl: './excersice-detail.component.css'
})
export class ExcersiceDetailComponent {

  private fb = inject(FormBuilder);

  myForm: FormGroup = this.fb.group({
    description: ['', Validators.required],
    annotations: [''],
  })

  onSave(){
    if( !this.myForm.invalid && !this.emptyFiles() ){
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
