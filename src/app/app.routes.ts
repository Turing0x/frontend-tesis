import { Routes } from '@angular/router';
import { Page404Component } from './shared/page-404/page-404.component';
import { FinishedDetailComponent } from './pages/finished-detail/finished-detail.component';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./auth/auth.routes').then(m => m.AuthRoutes)
  },
  {
    path: 'student',
    loadChildren: () => import('./routers/student.routes').then(m => m.StudentRoutes)
  },
  {
    path: 'professor',
    loadChildren: () => import('./routers/professor.routes').then(m => m.ProfessorRoutes)
  },
  {
    path: 'exercise/:id',
    loadChildren: () => import('./routers/exercise.routes').then(m => m.ExerciseRoutes)
  },
  {
    path: 'finished-detail/:id',
    loadChildren: () => import('./routers/finished.routes').then(m => m.ExerciseFinishedRoutes)
  },
  {
    path: '',
    redirectTo: () => {
      const lastPath = localStorage.getItem('last_path');

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
