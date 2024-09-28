import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./auth/auth.routes').then(m => m.AuthRoutes)
  },
  {
    path: 'student',
    loadChildren: () => import('./student/student.routes').then(m => m.StudentRoutes)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
];
