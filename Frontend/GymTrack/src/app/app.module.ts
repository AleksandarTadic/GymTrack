import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CookieService} from 'ngx-cookie-service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import {MatSelectModule} from '@angular/material/select';
import {MatPaginatorModule} from '@angular/material/paginator'
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'
import {MatSortModule} from '@angular/material/sort'
import {MatTableModule} from '@angular/material/table'
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatExpansionModule} from '@angular/material/expansion';



import { LoginComponent } from './components/login/login/login.component';
import { MainMenuComponent } from './components/main-menu/main-menu/main-menu.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegisterComponent } from './components/register/register/register.component';
import { ExerciseTypeComponent } from './components/exercise-type/exercise-type/exercise-type.component';
import { ExerciseTypeFormComponent } from './components/exercise-type/exercise-type-form/exercise-type-form.component';
import { FrontPageComponent } from './components/front-page/front-page/front-page.component';
import { TrainingComponent } from './components/training/training/training.component';
import { TrainingFormComponent } from './components/training/training-form/training-form.component';
import { TrainingStatsComponent } from './components/training/training-stats/training-stats.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainMenuComponent,
    RegisterComponent,
    ExerciseTypeComponent,
    ExerciseTypeFormComponent,
    FrontPageComponent,
    TrainingComponent,
    TrainingFormComponent,
    TrainingStatsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSliderModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule,
    MatSelectModule,
    NgbModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
