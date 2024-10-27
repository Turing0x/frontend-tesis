import { Routes } from '@angular/router';
import { ExerciseCreateComponent } from '../pages/exercise-create/exercise-create.component';
import { ExercisesComponent } from '../pages/exercises/exercises.component';
import { HomePageComponent } from '../pages/home-page/home-page.component';
import { FinishedDetailComponent } from '../pages/finished-detail/finished-detail.component';
import { FinishedExercisesComponent } from '../pages/finished-exercise/finished-exercises.component';
import { PendingExercicesComponent } from '../pages/pending-exercices/pending-exercices.component';
import { ExcersiceDetailComponent } from '../pages/exercise-detail/exercise-detail.component';
import { ExercisePageComponent } from '../pages/exercise-page/exercise-page.component';
import { ConfigFilesComponent } from '../pages/config-files/config-files.component';
import { WizardComponent } from '../pages/wizard/wizard.component';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    children: [
      {
        path: 'create',
        component: ExerciseCreateComponent,
        title: 'Crear ejercicio'
      },
      {
        path: 'professor',
        component: ExercisesComponent,
        title: 'Ejercicios',

      },
      {
        path: 'student',
        component: PendingExercicesComponent,
        title: 'Ejercicios pendientes',

      },
      {
        path: 'finished',
        component: FinishedExercisesComponent,
        title: 'Ejercicios realizados'
      },
      {
        path: 'config-files',
        component: ConfigFilesComponent,
        title: 'Generación de archivos de configuración'
      },
      {
        path: 'wizard',
        component: WizardComponent,
        title: 'Wizard'
      },
      {
        path: 'details/:id',
        component: ExercisePageComponent,
        title: 'Detalles del ejercicio'
      },
      {
        path: 'manager/:id',
        component: ExcersiceDetailComponent,
        title: 'Detalles del ejercicio'
      },
      {
        path: 'finished/details/:id',
        component: FinishedDetailComponent,
        title: 'Detalles del ejercicio realizado'
      },
      {
        path: '',
        redirectTo: 'exercises',
        pathMatch: 'full'
      }
    ]
  },
];

export const ExercisesRoutes = routes;
