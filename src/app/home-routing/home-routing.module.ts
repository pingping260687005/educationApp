import { TeacherFinanceManagementComponent } from '../teacher-finance-management/teacher-finance-management.component';
import { StudentFinanceManagementComponent } from '../student-finance-management/student-finance-management.component';
import { OtherFinanceManagementComponent } from '../other-finance-management/other-finance-management.component';
import { CourseManagementComponentComponent } from './../course-management/course-management.component';
import { StudentCoursesManagementComponentComponent } from './../student-courses-management/student-courses-management.component';
import { VedioDetailManagementComponentComponent } from './../vedio-detail-management/vedio-detail-management.component';
import { TeacherManagementComponentComponent } from '../teacher-management/teacher-management.component';
import { UserManagementComponent } from './../user-management/user-management.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { StudentManagementComponent } from '../student-management/student-management.component';
import { HomeComponent } from '../home/home.component';
import {ContactUsComponent} from '../contact-us/contact-us.component'

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
declare var require: any;
const appRoutes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: 'user', component: UserManagementComponent },
      { path: 'student', component: StudentManagementComponent },
      { path: 'teacher', component: TeacherManagementComponentComponent },
      { path: 'vedioDetail', component: VedioDetailManagementComponentComponent },
      { path: 'studentCourses', component: StudentCoursesManagementComponentComponent },
      { path: 'course', component: CourseManagementComponentComponent },
      { path: 'teacherFinance', component: TeacherFinanceManagementComponent },
      { path: 'studentFinance', component: StudentFinanceManagementComponent },
      { path: 'otherFinance', component: OtherFinanceManagementComponent },
      {path: 'contactUs', component: ContactUsComponent}
    ]
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
  ]
})
export class HomeRoutingModule { }
