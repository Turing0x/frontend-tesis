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
];
