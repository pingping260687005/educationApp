import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
import { TeacherManagementComponentComponent } from './teacher-management-component/teacher-management-component.component';
import { VedioDetailManagementComponentComponent } from './vedio-detail-management-component/vedio-detail-management-component.component';
import { StudentCoursesManagementComponentComponent } from './student-courses-management-component/student-courses-management-component.component';
import { CourseManagementComponentComponent } from './course-management-component/course-management-component.component';
import { FinanceManagementComponentComponent } from './finance-management-component/finance-management-component.component';

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
    FinanceManagementComponentComponent
  ],
  imports: [
    BrowserModule,
    HomeRoutingModule,
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: false}
    ),
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  // providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],//后端路经匹配 刷新
  bootstrap: [AppComponent]
})
export class AppModule { }
