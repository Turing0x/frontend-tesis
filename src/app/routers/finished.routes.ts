import { Routes } from "@angular/router";
import { ExercisePageComponent } from "../pages/exercise-page/exercise-page.component";
import { HomePageComponent } from "../pages/home-page/home-page.component";
import { FinishedDetailComponent } from "../pages/finished-detail/finished-detail.component";

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    children: [
      {
        path: '',
        component: FinishedDetailComponent
      }
    ]
  }

]

export const ExerciseFinishedRoutes = routes;
