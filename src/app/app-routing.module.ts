import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { UsersComponent } from './users/users.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { CreateAppointmentComponent } from './create-appointment/create-appointment.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactusComponent } from './contactus/contactus.component';
import { AuthGuardGuard } from './shared/services/auth-guard.guard';
import { PatientsComponent } from './patients/patients.component';
import { PracticesComponent } from './practices/practices.component';
import { InvitationComponent } from './invitation/invitation.component';
import { PatientPageComponent } from './patient-page/patient-page.component';


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
    path: 'patients',
    canActivate: [AuthGuardGuard],
    component: PatientsComponent
  },
  {
    path: 'patient-page',
    canActivate: [AuthGuardGuard],
    component: PatientPageComponent
  },
  {
    path: 'practices',
    canActivate: [AuthGuardGuard],
    component: PracticesComponent
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
    path: 'invitation',
    component: InvitationComponent
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
