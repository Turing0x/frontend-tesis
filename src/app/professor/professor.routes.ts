import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ExercisePageComponent } from '../exercise/pages/exercise-page/exercise-page.component';
import { ExercisesComponent } from './components/exercises/exercises.component';
import { SolutionsComponent } from './components/solutions/solutions.component';

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
        path: '',
        redirectTo: 'excercises',
        pathMatch: 'full'
      }
    ]
  },
];

export const ProfessorRoutes = routes;
