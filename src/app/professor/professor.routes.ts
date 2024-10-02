import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ExercisesComponent } from './components/exercises/exercises.component';
import { SolutionsComponent } from './components/solutions/solutions.component';
import { ExcersiceDetailComponent } from './components/excersice-detail/excersice-detail.component';
import { ExcerciseCreateComponent } from './components/excercise-create/excercise-create.component';
import { SolutionDetailComponent } from './components/solution-detail/solution-detail.component';

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
