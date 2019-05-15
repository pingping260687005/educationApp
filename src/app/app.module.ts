import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import * as $ from 'jquery'; // import Jquery here
import * as bootstrap from 'bootstrap';
import 'bootstrap-table';
import { AppComponent } from './app.component';
import { AppHeaderComponent } from './app-header/app-header.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';

import { RouterModule, Routes } from '@angular/router';
import { AppShellComponent } from './app-shell/app-shell.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeRoutingModule } from './home-routing/home-routing.module';
import { TeacherManagementComponentComponent } from './teacher-management/teacher-management.component';
import { VedioDetailManagementComponentComponent } from './vedio-detail-management/vedio-detail-management.component';
import { StudentCoursesManagementComponentComponent } from './student-courses-management/student-courses-management.component';
import { CourseManagementComponentComponent } from './course-management/course-management.component';
import { TimetableManagementComponentComponent } from './timetable-management/timetable-management.component';
import { HttpClientModule } from '@angular/common/http';
import { TeacherFinanceManagementComponent } from './teacher-finance-management/teacher-finance-management.component';
import { StudentFinanceManagementComponent } from './student-finance-management/student-finance-management.component';
import { OtherFinanceManagementComponent } from './other-finance-management/other-finance-management.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import * as CommonService from './common-service/commonService';





const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: '**', component: PageNotFoundComponent },
  {
    path: 'home',
    component: HomeComponent,
    loadChildren: './home-routing/home-routing.module#HomeRoutingModule',
  }
];
@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    NavBarComponent,
    AppShellComponent,
    HomeComponent,
    LoginComponent,
    PageNotFoundComponent,
    TeacherManagementComponentComponent,
    VedioDetailManagementComponentComponent,
    StudentCoursesManagementComponentComponent,
    CourseManagementComponentComponent,
    TimetableManagementComponentComponent,
    TeacherFinanceManagementComponent,
    StudentFinanceManagementComponent,
    OtherFinanceManagementComponent,
    ContactUsComponent
  ],
  imports: [
    BrowserModule,
    HomeRoutingModule,
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: false}
    ),
    FormsModule,
    HttpModule,
    HttpClientModule
  ],
   providers: [CommonService.ToastMessageService, CommonService.NotificationService], // [{provide: LocationStrategy, useClass: HashLocationStrategy}] 后端路经匹配 刷新
  bootstrap: [AppComponent]
})
export class AppModule { }
