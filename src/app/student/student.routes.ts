import { Routes } from "@angular/router";
import { PendingExercicesComponent } from "./components/pending-exercices/pending-exercices.component";
import { FinishedExercisesComponent } from "./components/finished-exercises/finished-exercises.component";
import { HomePageComponent } from "./pages/home-page/home-page.component";

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
