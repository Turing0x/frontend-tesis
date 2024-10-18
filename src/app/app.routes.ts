import { Routes } from '@angular/router';
import { Page404Component } from './shared/page-404/page-404.component';
import { authGuard } from './guards/auth.guard';
import { byRoleGuard } from './guards/by-role.guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    loadChildren: () => import('./auth/auth.routes').then(m => m.AuthRoutes)
  },
  {
    path: 'exercise',
    canActivate: [byRoleGuard],
    loadChildren: () => import('./routers/exercise.routes').then(m => m.ExercisesRoutes)
  },
  {
    path: 'solution',
    canActivate: [byRoleGuard],
    loadChildren: () => import('./routers/solution.routes').then(m => m.SolutionsRoutes)
  },
  {
    path: '**',
    component: Page404Component
  }
];
