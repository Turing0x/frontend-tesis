import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login.component';
import { RegisterPageComponent } from './pages/register-page/register.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginPageComponent
  },
  {
    path: 'register',
    component: RegisterPageComponent
  }
];

export const AuthRoutes = routes;
