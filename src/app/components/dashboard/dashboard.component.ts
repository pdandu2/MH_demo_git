import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PatientListComponent } from '../patient-list/patient-list.component';
import { ChartComponent } from '../chart/chart.component';
import { SessionsComponent } from '../sessions/sessions.component';
import { ActionPlansComponent } from '../action-plans/action-plans.component';
import { JournalComponent } from '../journal/journal.component';
import { ChatComponent } from '../chat/chat.component';
import { MedicationComponent } from '../medication/medication.component';
import { FormsModule } from '@angular/forms';
import { PatientService, Patient } from '../../services/patient.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    PatientListComponent,
    ChartComponent,
    SessionsComponent,
    ActionPlansComponent,
    JournalComponent,
    ChatComponent,
    MedicationComponent
  ]
})
export class DashboardComponent {
  selectedPatientId: string = '';
  currentDateTime: Date = new Date();
  patientSearch: string = '';
  startDate: string = '';
  endDate: string = '';
  filteredPatients: Patient[] = [];
  selectedProgressPatient: Patient | null = null;

  constructor(
    private router: Router,
    private patientService: PatientService
  ) {
    // Initialize date range to last 7 days
    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - 7);
    
    this.endDate = end.toISOString().split('T')[0];
    this.startDate = start.toISOString().split('T')[0];
  }

  onPatientSelected(patientId: string) {
    this.selectedPatientId = patientId;
  }

  onPatientSearchChange() {
    if (this.patientSearch.trim()) {
      this.filteredPatients = this.patientService.searchPatientsLocal(this.patientSearch);
    } else {
      this.filteredPatients = [];
    }
  }

  selectProgressPatient(patient: Patient) {
    this.selectedProgressPatient = patient;
    this.patientSearch = '';
    this.filteredPatients = [];
  }

  onDateChange() {
    if (this.selectedProgressPatient) {
      console.log('Date range:', this.startDate, 'to', this.endDate);
      // Update chart data based on date range
    }
  }

  getSelectedPatientId(): string {
    return this.selectedProgressPatient ? this.selectedProgressPatient.id.toString() : '';
  }

  signOut() {
    this.router.navigate(['/']);
  }
}