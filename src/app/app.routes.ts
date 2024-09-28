import { Routes } from '@angular/router';
import { ExercisePageComponent } from './exercise/pages/exercise-page/exercise-page.component';

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
    path: 'exercise/:id',
    component: ExercisePageComponent
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
];
