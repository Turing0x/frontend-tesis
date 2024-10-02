import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Solution } from '../../interfaces/solution.interface';
import { SolutionService } from '../../services/solution.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ValidatorService } from '../../validators/validator.service';

@Component({
  selector: 'app-solution-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
  ],
  templateUrl: './solution-detail.component.html',
  styleUrl: './solution-detail.component.css'
})
export class SolutionDetailComponent implements OnInit {

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
        this.cdrf.detectChanges();
      });
    });
  }

  onDownload(){
    console.log('descargar');
  }

  onSubmit(){
    if( this.myForm.invalid || !this.solution.evaluation ){
      this.myForm.markAllAsTouched();
      return;
    }
  }

  isValidField( field: string ): boolean | null {
    return this.validatorService.isValidField( this.myForm, field );
  }

}
