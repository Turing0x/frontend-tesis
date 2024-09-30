import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ExercisePageComponent } from '../exercise/pages/exercise-page/exercise-page.component';
import { ExercisesComponent } from './components/exercises/exercises.component';
import { SolutionsComponent } from './components/solutions/solutions.component';
import { ExcersiceDetailComponent } from './components/excersice-detail/excersice-detail.component';

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
        path: 'solutions',
        component: SolutionsComponent
      },
      {
        path: 'details/:id',
        component: ExcersiceDetailComponent
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
