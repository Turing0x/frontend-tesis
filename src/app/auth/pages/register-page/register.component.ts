import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ValidatorService } from '../../../validators/validator.service';

@Component({
  selector: 'auth-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterPageComponent {

  private authService = inject(AuthService);

  private router = inject(Router);

  private fb = inject(FormBuilder);

  private validatorService = inject(ValidatorService);

  public myForm!: FormGroup;

  ngOnInit(): void {
    this.myForm = this.fb.group({
      name: new FormControl('', [ Validators.required, Validators.pattern( this.validatorService.firstNameAndLastnamePattern ) ]),
      email: new FormControl('', [ Validators.required, Validators.pattern( this.validatorService.emailPattern ) ]),
      group: new FormControl('', [ Validators.required, Validators.minLength(4), Validators.maxLength(4) ] ),
      password: new FormControl('', [ Validators.required, Validators.minLength(8) ] ),
    });
  }

  isValidField( field: string ): boolean | null {
    return this.validatorService.isValidField( this.myForm, field );
  }

  onSubmit() {
    this.myForm.markAllAsTouched();
    if(this.myForm.invalid) {
      return;
    }

    const { full_name, email, group, password } = this.myForm.value;

    const type = 'student';

    this.authService.createUser({ full_name, email, group, password, type }).subscribe(
      response => {
        localStorage.setItem('user_type', type);
        localStorage.setItem('user_id', response._id!);
        this.router.navigate(['/student']);
      },
      error => {
        console.log(error);
      }
    )
  }

}
