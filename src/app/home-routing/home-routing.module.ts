import { FinanceManagementComponentComponent } from '../finance-management/finance-management.component';
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

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
      { path: 'finance', component: FinanceManagementComponentComponent },
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
