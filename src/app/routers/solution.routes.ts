import { Routes } from '@angular/router';
import { HomePageComponent } from '../pages/home-page/home-page.component';
import { SolutionDetailComponent } from '../pages/solution-detail/solution-detail.component';
import { SolutionsComponent } from '../pages/solutions/solutions.component';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    children: [
      {
        path: 'solutions',
        component: SolutionsComponent,
        title: 'Soluciones'
      },
      {
        path: 'details/:id',
        component: SolutionDetailComponent,
        title: 'Detalles de la solución'
      },
      {
        path: '',
        redirectTo: 'solutions',
        pathMatch: 'full'
      }
    ]
  },
];

export const SolutionsRoutes = routes;
