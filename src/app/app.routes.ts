import { Routes } from '@angular/router';
import { Page404Component } from './shared/page-404/page-404.component';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./auth/auth.routes').then(m => m.AuthRoutes)
  },
  {
    path: 'exercise',
    loadChildren: () => import('./routers/exercise.routes').then(m => m.ExercisesRoutes)
  },
  {
    path: 'solution', 
    loadChildren: () => import('./routers/solution.routes').then(m => m.SolutionsRoutes)
  },
  {
    path: '**',
    component: Page404Component
  }
];
