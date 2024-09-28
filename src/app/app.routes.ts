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
    path: 'exercise',
    loadChildren: () => import('./exercise/exercise.routes').then(m => m.ExerciseRoutes)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
];
