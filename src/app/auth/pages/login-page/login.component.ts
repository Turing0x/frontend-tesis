import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PendingExercisesService } from '../../../services/pending-exercises.service';

@Component({
  selector: 'auth-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent implements OnInit{

  private authService = inject(AuthService);

  private peService = inject(PendingExercisesService);

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
          const [user, pending_exercises] = response.data

          console.log('Response:', response);
          console.log('User:', user);
          console.log('Pending Exercises:', pending_exercises);

          this.peService.setPendingExercises(pending_exercises);
          this.router.navigate(['/student']);

        }else{
          console.log('Login failed', response.success);
        }

      },
      error => {
        console.log(error);
      }
    )
  }

 }
