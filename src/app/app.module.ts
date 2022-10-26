import { HttpClientModule } from "@angular/common/http";
import { NgModule } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AnnouncementTeacherComponent } from './announcement/pages/announcement-teacher/announcement-teacher.component';
import { AnnouncementComponent } from './announcement/pages/announcement/announcement.component';
import { AppComponent } from './app.component';
import { CompetencesComponent } from "./competences/pages/competences/competences.component";
import { CoursesComponent } from './courses/pages/courses/courses.component';
import { DashboardComponent } from "./dashboard/pages/dashboard/dashboard.component";
import { AppRoutingModule } from "./modules/app-routing.module";
import { TeachersComponent } from "./teachers/pages/teachers/teachers.component";
import { TopTeachersComponent } from './top-teachers/pages/top-teachers/top-teachers.component';
import { CourseDetailComponent, DialogCourse } from './courses/pages/course-detail/course-detail.component';
import { MatDialogModule } from '@angular/material/dialog';
import { TeacherDetailComponent } from './teachers/pages/teacher-detail/teacher-detail.component';
import { MatChipsModule } from "@angular/material/chips";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ProfileComponent } from './profile/pages/profile/profile.component';
import { SignUpComponent } from './sign-up/pages/sign-up/sign-up.component';
import { MatGridListModule } from "@angular/material/grid-list";
import {MatSelectModule} from "@angular/material/select";
import {MatRadioModule} from "@angular/material/radio";
import { SignInComponent } from './sign-in/pages/sign-in/sign-in.component';
import { MainComponent } from './main/pages/main/main.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AnnouncementComponent,
    AnnouncementTeacherComponent,
    CompetencesComponent,
    CoursesComponent,
    TeachersComponent,
    TopTeachersComponent,
    TeacherDetailComponent,
    CourseDetailComponent,
    DialogCourse,
    ProfileComponent,
    SignUpComponent,
    SignInComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    AppRoutingModule,
    HttpClientModule,
    MatCardModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatChipsModule,
    ReactiveFormsModule,
    FormsModule,
    MatGridListModule,
    MatSelectModule,
    MatRadioModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
