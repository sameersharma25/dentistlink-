import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component'
import { AdminComponent } from './admin/admin.component'
import { UsersComponent } from './users/users.component'
import { AppointmentComponent } from './appointment/appointment.component';
import { CreateAppointmentComponent } from './create-appointment/create-appointment.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactusComponent } from './contactus/contactus.component';
import { AuthGuardGuard } from './shared/services/auth-guard.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: WelcomeComponent
  },
  {
    path: 'create-appointment',
    component: CreateAppointmentComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    canActivate: [AuthGuardGuard],
    component: HomeComponent
  },
  {
    path: 'admin',
    canActivate: [AuthGuardGuard],
    component: AdminComponent
  },
  {
    path: 'appointment',
    canActivate: [AuthGuardGuard],
    component: AppointmentComponent
  },
  {
    path: 'create-appointment',
    canActivate: [AuthGuardGuard],
    component: CreateAppointmentComponent
  },
  {
    path: 'users',
    canActivate: [AuthGuardGuard],
    component: UsersComponent
  },
  {
    path: 'resetPassword',
    component: UsersComponent
  },
  {
    path: 'aboutus',
    component: AboutusComponent
  },
  {
    path: 'contactus',
    component: ContactusComponent
  },
  { 
    path: '**', 
    component: WelcomeComponent // can be put path not match component.
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
