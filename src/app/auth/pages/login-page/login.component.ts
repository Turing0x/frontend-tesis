import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

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

  public myForm!: FormGroup;

  ngOnInit(): void {
    this.myForm = this.fb.group({
      email: new FormControl('', [ Validators.required ] ),
      password: new FormControl('', [ Validators.required, Validators.minLength(8) ] ),
    });
  }


  onSubmit() {
    if(this.myForm.invalid) {
      return;
    }

    const { email, password } = this.myForm.value;

    this.authService.login( email, password).subscribe(
      response => {
        if (response.success){

          const [user] = response.data

          localStorage.setItem("user_id", user._id!);
          this.redirectByRole(user.type);

        }else{
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
    } else {
      this.router.navigate(['/student']);
    }

  }

 }
