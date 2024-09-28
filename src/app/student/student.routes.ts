import { Routes } from "@angular/router";
import { PendingExercicesComponent } from "./components/pending-exercices/pending-exercices.component";
import { FinishedExercisesComponent } from "./components/finished-exercises/finished-exercises.component";
import { PublicLayoutComponent } from "../layouts/public-layout/public-layout.component";

export const StudentRoutes: Routes = [
  {
    path: '',
    component: PublicLayoutComponent,
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
