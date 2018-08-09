import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore'
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router'; 
import {FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment'
import { CoursesComponent } from './courses/courses.component';
import { StudentComponent } from './student/student.component';
import { TeacherComponent } from './teacher/teacher.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    CoursesComponent,
    StudentComponent,
    TeacherComponent,
    NavComponent,
    HomeComponent,
    ErrorComponent,
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase,'angularfs'),
    AngularFirestoreModule,
    FormsModule,
    RouterModule.forRoot([
      {      
        path:'',
        component:HomeComponent
      },
      {
        path:'courses',
        component:CoursesComponent
      },
      {
        path:'teachers',
        component:TeacherComponent
      },
      {
        path:'students',
        component:StudentComponent
      },
      {
        path:'**',
        component:ErrorComponent
      }     
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
