import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { ExerciseService } from '../../services/exercise-service.service';

@Component({
  selector: 'shared-card',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

  @Input() title?: string = 'Titulo';
  @Input() id?: string;
  @Input() description: string = 'Descripción';
  @Input() link: string = 'Link';
  @Input() param: string = 'Param';
  @Input() delete: boolean = false;
  @Input() deleteFunc?: Function;

  private exService = inject(ExerciseService);

  onDelete(){

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
        this.exService.deleteExercise( this.id! ).subscribe(
          () => {
            Swal.fire({
              title: 'eliminado',
              text: 'El ejercicio ha sido eliminado exitosamente',
              icon: 'success',
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'OK'
            });
            window.location.reload();
            //Reload Component
          }
        );
      }
    }
  )}

}
