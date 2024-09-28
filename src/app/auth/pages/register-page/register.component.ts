import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'auth-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterPageComponent {

  private authService = inject(AuthService);

  private router = inject(Router);

  private fb = inject(FormBuilder);

  public myForm!: FormGroup;

  ngOnInit(): void {
    this.myForm = this.fb.group({
      name: new FormControl('', [ Validators.required ] ),
      email: new FormControl('', [ Validators.required ] ),
      group: new FormControl('', [ Validators.required ] ),
      password: new FormControl('', [ Validators.required, Validators.minLength(8) ] ),
    });
  }


  onSubmit() {
    if(this.myForm.invalid) {
      return;
    }

    const { full_name, email, group, password, type } = this.myForm.value;

    this.authService.createUser({ full_name, email, group, password, type }).subscribe(
      response => {
        console.log(response);
        this.router.navigate(['/student']);
      },
      error => {
        console.log(error);
      }
    )
  }

}
