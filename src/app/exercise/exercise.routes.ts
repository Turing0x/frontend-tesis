import { Routes } from "@angular/router";
import { ExercisePageComponent } from "./pages/exercise-page/exercise-page.component";
import { PublicLayoutComponent } from "../layouts/public-layout/public-layout.component";

export const routes: Routes = [
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      {
        path: '',
        component: ExercisePageComponent
      }
    ]
  }

]

export const ExerciseRoutes = routes;
