import { ChangeDetectorRef, Component, inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Solution } from '../../interfaces/solution.interface';
import { SolutionService } from '../../services/solution.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ValidatorService } from '../../validators/validator.service';
import Swal from 'sweetalert2';
import { SnackbarComponent } from '../../shared/snackbar/snackbar.component';
import { downloadFile } from '../../helpers/download_file';

@Component({
  selector: 'app-solution-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    SnackbarComponent
],
  templateUrl: './solution-detail.component.html',
  styleUrl: './solution-detail.component.css'
})
export class SolutionDetailComponent implements OnInit {

  @ViewChild(SnackbarComponent) snackbar!: SnackbarComponent;

  private cdrf = inject(ChangeDetectorRef);

  private fb = inject(FormBuilder);
  private validatorService = inject(ValidatorService);

  private activateRoute = inject(ActivatedRoute);
  private solService = inject(SolutionService);

  public myForm = this.fb.group({
    evaluation: [0, [ Validators.required, Validators.min(2), Validators.max(5) ]]
  });

  public solution!: Solution;

  ngOnInit(): void {
    this.activateRoute.params.subscribe(params => {
      const id = params['id'];
      this.solService.getSolution(id).subscribe(solution => {
        this.solution = solution;
        this.myForm.controls['evaluation'].setValue(solution.evaluation);
        this.cdrf.detectChanges();
      });
    });
  }

  async onDownload(){
    const sol_id = this.solution._id;
    await downloadFile('solutions', sol_id)
  }

  onSubmit(){
    if( this.myForm.invalid || !this.solution.evaluation ){
      this.myForm.markAllAsTouched();
      return;
    }
  }

  calificateSolution() {

    if (this.myForm.invalid) return;

    const id = this.solution._id;
    const evaluation = this.myForm.get('evaluation')?.value;

    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, calificar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.solService.calificateSolution(id!, evaluation!).subscribe(
          () => {
            this.snackbar.showSnackbar(
              'Funciona',
              'La calificación ha sido enviada', 'success');
          }
        );
      }
    });
  }

  isValidField( field: string ): boolean | null {
    return this.validatorService.isValidField( this.myForm, field );
  }

}
