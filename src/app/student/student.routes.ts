import { Routes } from "@angular/router";
import { DashboardPageComponent } from "./pages/dashboard-page/dashboard-page.component";
import { PendingExercicesComponent } from "./components/pending-exercices/pending-exercices.component";
import { FinishedExercisesComponent } from "./components/finished-exercises/finished-exercises.component";

export const routes: Routes = [
  {
    path: '',
    component: DashboardPageComponent,
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
        path: '',
        redirectTo: 'pending',
        pathMatch: 'full'
      }
    ]
  },
]



export const StudentRoutes = routes;
