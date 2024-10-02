import { Routes } from '@angular/router';
import { Page404Component } from './shared/page-404/page-404.component';

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
    path: 'professor',
    loadChildren: () => import('./professor/professor.routes').then(m => m.ProfessorRoutes)
  },
  {
    path: 'exercise/:id',
    loadChildren: () => import('./exercise/exercise.routes').then(m => m.ExerciseRoutes)
  },
  {
    path: '',
    redirectTo: () => {
      const lastPath = localStorage.getItem('last_path');

      console.log('lastPath', lastPath);
      if (lastPath) {
        return lastPath;
      }

      return '/login';
    },
    pathMatch: 'full'
  },
  {
    path: '**',
    component: Page404Component
  }
];
