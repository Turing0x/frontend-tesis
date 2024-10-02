import { Routes } from '@angular/router';
import { ExcerciseCreateComponent } from '../pages/excercise-create/excercise-create.component';
import { ExcersiceDetailComponent } from '../pages/excersice-detail/excersice-detail.component';
import { ExercisesComponent } from '../pages/exercises/exercises.component';
import { HomePageComponent } from '../pages/home-page/home-page.component';
import { SolutionDetailComponent } from '../pages/solution-detail/solution-detail.component';
import { SolutionsComponent } from '../pages/solutions/solutions.component';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    children: [
      {
        path: 'excercises',
        component: ExercisesComponent
      },
      {
        path: 'excersice/details/:id',
        component: ExcersiceDetailComponent
      },
      {
        path: 'solutions',
        component: SolutionsComponent
      },
      {
        path: 'solution/details/:id',
        component: SolutionDetailComponent
      },
      {
        path: 'create',
        component: ExcerciseCreateComponent
      },
      {
        path: '',
        redirectTo: 'excercises',
        pathMatch: 'full'
      }
    ]
  },
];

export const ProfessorRoutes = routes;
