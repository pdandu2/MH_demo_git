import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PatientDashboardComponent } from './components/patient-dashboard/patient-dashboard.component';
import { PatientDetailsComponent } from './components/patient-details/patient-details.component';
import { PatientOnboardComponent } from './components/patient-onboard/patient-onboard.component';
import { NewSessionComponent } from './components/new-session/new-session.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'patient-dashboard',
    component: PatientDashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'patient/:id',
    component: PatientDetailsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'patient-onboard',
    component: PatientOnboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'new-session',
    component: NewSessionComponent,
    canActivate: [AuthGuard]
  }
];