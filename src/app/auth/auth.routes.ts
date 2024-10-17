import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login.component';
import { RegisterPageComponent } from './pages/register-page/register.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'register',
    component: RegisterPageComponent
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }

];

export const AuthRoutes = routes;
