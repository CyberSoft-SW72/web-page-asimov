import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnnouncementTeacherComponent } from "../announcement/pages/announcement-teacher/announcement-teacher.component";
import { AnnouncementComponent } from '../announcement/pages/announcement/announcement.component';
import { CompetencesComponent } from "../competences/pages/competences/competences.component";
import { CourseDetailComponent } from "../courses/pages/course-detail/course-detail.component";
import { CoursesComponent } from "../courses/pages/courses/courses.component";
import { DashboardComponent } from "../dashboard/pages/dashboard/dashboard.component";
import { MainComponent } from "../main/pages/main/main.component";
import { ProfileComponent } from "../profile/pages/profile/profile.component";
import { SignInComponent } from "../sign-in/pages/sign-in/sign-in.component";
import { AuthGuardService as AuthGuard } from '../sign-in/services/auth-guard.service';
import { SignUpComponent } from "../sign-up/pages/sign-up/sign-up.component";
import { TeacherDetailComponent } from "../teachers/pages/teacher-detail/teacher-detail.component";
import { TeachersComponent } from "../teachers/pages/teachers/teachers.component";
import { TopTeachersComponent } from '../top-teachers/pages/top-teachers/top-teachers.component';
const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full'},
  { path: 'sign-up', component: SignUpComponent },
  { path: 'sign-in', component: SignInComponent},
  { path: 'main', component: MainComponent,
  children: [
      { path: 'dashboard', component: DashboardComponent},
      { path: 'announcements', component: AnnouncementComponent},
      { path: 'announcementsTeacher', component: AnnouncementTeacherComponent},
      { path: 'competences', component: CompetencesComponent},
      { path: 'courses', component: CoursesComponent},
      { path: 'courses/:id', component: CourseDetailComponent},
      { path: 'teachers', component: TeachersComponent},
      { path: 'top-teachers', component: TopTeachersComponent },
      { path: 'teachers/:id', component: TeacherDetailComponent },
      { path: 'profile', component: ProfileComponent },
    ],  canActivate: [AuthGuard], canActivateChild: [AuthGuard]},
    { path: '**', redirectTo: '/sign-in' },

]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
