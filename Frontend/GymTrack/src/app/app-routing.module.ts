import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login/login.component';
import { RegisterComponent } from './components/register/register/register.component';
import { ExerciseTypeComponent } from './components/exercise-type/exercise-type/exercise-type.component';
import { auth } from './guards/auth.guard';
import { ExerciseTypeFormComponent } from './components/exercise-type/exercise-type-form/exercise-type-form.component';
import { FrontPageComponent } from './components/front-page/front-page/front-page.component';
import { TrainingComponent } from './components/training/training/training.component';
import { TrainingFormComponent } from './components/training/training-form/training-form.component';
import { TrainingStatsComponent } from './components/training/training-stats/training-stats.component';
const routes: Routes = [
  {path: "", component: FrontPageComponent},
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  // {path: "exercise-types", component: ExerciseTypeComponent},
  {path: "exercise-types", component: ExerciseTypeComponent, pathMatch: 'full', data: {roles: ["Admin"]}, canActivate: [
    auth
  ]},
  {path: "exercise-type-form", component: ExerciseTypeFormComponent, pathMatch: 'full', data: {roles: ["Admin"]}, canActivate: [
    auth
  ]},
  {path: "exercise-type-form/:id", component: ExerciseTypeFormComponent, pathMatch: 'full', data: {roles: ["Admin"]}, canActivate: [
    auth
  ]},
  {path: "my-trainings", component: TrainingComponent, pathMatch: 'full', data: {roles: ["Admin", "User"]}, canActivate: [
    auth
  ]},
  {path: "training-form", component: TrainingFormComponent, pathMatch: 'full', data: {roles: ["Admin", "User"]}, canActivate: [
    auth
  ]},
  {path: "training-form/:id", component: TrainingFormComponent, pathMatch: 'full', data: {roles: ["Admin", "User"]}, canActivate: [
    auth
  ]},
  {path: "training-stats", component: TrainingStatsComponent, pathMatch: 'full', data: {roles: ["Admin", "User"]}, canActivate: [
    auth
  ]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
