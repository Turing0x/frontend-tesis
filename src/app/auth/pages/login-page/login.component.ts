import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ValidatorService } from '../../../validators/validator.service';

@Component({
  selector: 'auth-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent implements OnInit{

  private authService = inject(AuthService);

  private fb = inject(FormBuilder);

  private router = inject(Router);

  private validatorService = inject(ValidatorService);

  public myForm!: FormGroup;

  ngOnInit(): void {
    this.myForm = this.fb.group({
      email: new FormControl('raul@mail.com', [ Validators.required, Validators.pattern( this.validatorService.emailPattern ) ] ),
      password: new FormControl('87654321', [ Validators.required, Validators.minLength(8) ] ),
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

    const { email, password } = this.myForm.value;

    this.authService.login( email, password).subscribe(
      response => {
        if (response.success){

          const [user] = response.data

          localStorage.setItem("user_id", user._id!);
          localStorage.setItem("user_type", user.type);
          this.redirectByRole(user.type);
        }else{
          //TODO: snack bar Login Failed (email o contraseña incorrectos)
          console.log('Login failed', response.success);
        }

      },
      error => {
        console.log(error);
      }
    )
  }

  redirectByRole( role: string ){

    if ( role === 'professor' ){
      this.router.navigate(['/professor']);
      localStorage.setItem('last_path', 'professor');
    } else {
      this.router.navigate(['/student']);
      localStorage.setItem('last_path', 'student');
    }

  }

 }
