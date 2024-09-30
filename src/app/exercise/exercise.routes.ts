import { Routes } from "@angular/router";
import { ExercisePageComponent } from "./pages/exercise-page/exercise-page.component";
import { HomePageComponent } from "../student/pages/home-page/home-page.component";

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    children: [
      {
        path: '',
        component: ExercisePageComponent
      }
    ]
  }

]

export const ExerciseRoutes = routes;
