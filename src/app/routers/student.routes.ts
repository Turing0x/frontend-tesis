import { Routes } from "@angular/router";
import { FinishedExercisesComponent } from "../pages/finished-exercises/finished-exercises.component";
import { HomePageComponent } from "../pages/home-page/home-page.component";
import { PendingExercicesComponent } from "../pages/pending-exercices/pending-exercices.component";

export const StudentRoutes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    children: [
      {
        path: 'pending',
        component: PendingExercicesComponent
      },
      {
        path: 'finished',
        component: FinishedExercisesComponent,
      },
      {
        path: '**',
        redirectTo: 'pending',
      }
    ]
  }
]
