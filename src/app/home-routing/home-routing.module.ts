import { TeacherFinanceManagementComponent } from '../teacher-finance-management/teacher-finance-management.component';
import { StudentFinanceManagementComponent } from '../student-finance-management/student-finance-management.component';
import { OtherFinanceManagementComponent } from '../other-finance-management/other-finance-management.component';
import { CourseManagementComponentComponent } from './../course-management/course-management.component';
import { TimetableManagementComponentComponent } from './../timetable-management/timetable-management.component';
import { StudentCoursesManagementComponentComponent } from './../student-courses-management/student-courses-management.component';
import { VedioDetailManagementComponentComponent } from './../vedio-detail-management/vedio-detail-management.component';
import { TeacherManagementComponentComponent } from '../teacher-management/teacher-management.component';
import { UserManagementComponent } from './../user-management/user-management.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { StudentManagementComponent } from '../student-management/student-management.component';
import { HomeComponent } from '../home/home.component';
import {ContactUsComponent} from '../contact-us/contact-us.component';
import { HomeRouterGuard } from './home-router-guard';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
declare var require: any;
const appRoutes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: 'user', component: UserManagementComponent, canActivate: [HomeRouterGuard] },
      { path: 'student', component: StudentManagementComponent, canActivate: [HomeRouterGuard] },
      { path: 'teacher', component: TeacherManagementComponentComponent, canActivate: [HomeRouterGuard] },
      { path: 'vedioDetail', component: VedioDetailManagementComponentComponent, canActivate: [HomeRouterGuard] },
      { path: 'studentCourses', component: StudentCoursesManagementComponentComponent, canActivate: [HomeRouterGuard] },
      { path: 'course', component: CourseManagementComponentComponent, canActivate: [HomeRouterGuard] },
      { path: 'timetable', component: TimetableManagementComponentComponent, canActivate: [HomeRouterGuard] }, // timetable
      { path: 'teacherFinance', component: TeacherFinanceManagementComponent, canActivate: [HomeRouterGuard] },
      { path: 'studentFinance', component: StudentFinanceManagementComponent, canActivate: [HomeRouterGuard] },
      { path: 'otherFinance', component: OtherFinanceManagementComponent, canActivate: [HomeRouterGuard] },
      {path: 'contactUs', component: ContactUsComponent, canActivate: [HomeRouterGuard]}
    ],
    canActivate: [HomeRouterGuard]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(
      appRoutes
    ),
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    UserManagementComponent,
    StudentManagementComponent
  ],
  providers: [
    HomeRouterGuard
  ]
})
export class HomeRoutingModule { }
