import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { AppHeaderComponent } from './app-header/app-header.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';

import { RouterModule, Routes } from '@angular/router';
import { StudentManagementComponent } from './student-management/student-management.component';
import { AppShellComponent } from './app-shell/app-shell.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


const appRoutes: Routes = [
  { path: 'user', component: UserManagementComponent },
  { path: 'student', component: StudentManagementComponent },
  { path: '',
    redirectTo: '/user',
    pathMatch: 'full'
  }
];
@NgModule({
  declarations: [
    AppComponent,
    UserManagementComponent,
    AppHeaderComponent,
    NavBarComponent,
    StudentManagementComponent,
    AppShellComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
      {enableTracing:false}
    ), 
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
