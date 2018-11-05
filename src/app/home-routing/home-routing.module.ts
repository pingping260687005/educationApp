import { FinanceManagementComponentComponent } from './../finance-management-component/finance-management-component.component';
import { CourseManagementComponentComponent } from './../course-management-component/course-management-component.component';
import { StudentCoursesManagementComponentComponent } from './../student-courses-management-component/student-courses-management-component.component';
import { VedioDetailManagementComponentComponent } from './../vedio-detail-management-component/vedio-detail-management-component.component';
import { TeacherManagementComponentComponent } from './../teacher-management-component/teacher-management-component.component';
import { UserManagementComponent } from './../user-management/user-management.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { StudentManagementComponent } from '../student-management/student-management.component';
import { HomeComponent } from '../home/home.component';

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
    )
  ],
  declarations: [
    UserManagementComponent,
    StudentManagementComponent
  ]
})
export class HomeRoutingModule { }
