import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ExerciseService } from '../../../exercise/services/exercise-service.service';
import { Exercise } from '../../../interfaces/exercise.interface';
import { CardComponent } from '../../../shared/card/card.component';
import { SnackbarComponent } from '../../../shared/snackbar/snackbar.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-exercises',
  standalone: true,
  imports: [
    RouterLink,
    CardComponent,
    SnackbarComponent
  ],
  templateUrl: './exercises.component.html',
  styleUrl: './exercises.component.css'
})
export class ExercisesComponent implements OnInit{

  @ViewChild(SnackbarComponent) snackbar!: SnackbarComponent;

  private exService = inject(ExerciseService);

  public excersice!: Exercise;

  public list!: Exercise[];

  ngOnInit(): void {
    this.exService.getAllExcercises().subscribe(
      data => this.list = data
    )
  }

  showSB(){
    this.snackbar.showSnackbar('Funciona', 'Todo ha funcionado bien', 'success');
  }

}
