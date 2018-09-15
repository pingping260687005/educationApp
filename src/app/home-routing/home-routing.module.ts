import { UserManagementComponent } from './../user-management/user-management.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { StudentManagementComponent } from '../student-management/student-management.component';
import { HomeComponent } from '../home/home.component';

const appRoutes: Routes = [
  {
    path: "",
    component: HomeComponent,
    children: [
      { path: 'user', component: UserManagementComponent },
      { path: 'student', component: StudentManagementComponent },
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
