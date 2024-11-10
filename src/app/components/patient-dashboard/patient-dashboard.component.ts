import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ChartComponent } from '../chart/chart.component';
import { PatientSessionsComponent } from './patient-sessions.component';
import { PatientActionPlansComponent } from './patient-action-plans.component';
import { PatientMedicationComponent } from './patient-medication.component';
import { PatientJournalComponent } from './patient-journal.component';
import { ProvidersListComponent } from './providers-list.component';
import { PatientChatComponent } from './patient-chat.component';

@Component({
  selector: 'app-patient-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    ChartComponent,
    PatientSessionsComponent,
    PatientActionPlansComponent,
    PatientMedicationComponent,
    PatientJournalComponent,
    ProvidersListComponent,
    PatientChatComponent
  ],
  template: `
    <div class="dashboard">
      <header class="header">
        <div class="header-left">
          <h1>{{ patientName }}'s Progress</h1>
          <div class="datetime">{{ currentDateTime | date:'medium' }}</div>
        </div>
        <button class="sign-out-btn" (click)="signOut()">Sign Out</button>
      </header>
      
      <div class="dashboard-grid">
        <!-- First Row -->
        <section class="first-row">
          <div class="providers-section">
            <app-providers-list [patientId]="patientId"></app-providers-list>
          </div>
          <div class="sessions-section">
            <app-patient-sessions [patientId]="patientId"></app-patient-sessions>
          </div>
        </section>

        <!-- Second Row -->
        <section class="second-row">
          <app-chart [selectedPatientId]="patientId"></app-chart>
        </section>

        <!-- Third Row -->
        <section class="third-row">
          <div class="action-plans-section">
            <app-patient-action-plans [patientId]="patientId"></app-patient-action-plans>
          </div>
          <div class="medication-section">
            <app-patient-medication [patientId]="patientId"></app-patient-medication>
          </div>
        </section>

        <!-- Fourth Row -->
        <section class="fourth-row">
          <div class="journal-section">
            <app-patient-journal [patientId]="patientId"></app-patient-journal>
          </div>
        </section>
      </div>

      <app-patient-chat [patientId]="patientId"></app-patient-chat>
    </div>
  `,
  styles: [`
    .dashboard {
      padding: 2rem;
      background-color: #f8fafc;
      min-height: 100vh;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }

    .header-left {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .datetime {
      color: #64748b;
      font-size: 0.875rem;
    }

    h1 {
      color: #1e293b;
      font-size: 2rem;
      font-weight: 600;
      margin: 0;
    }

    .sign-out-btn {
      padding: 0.5rem 1rem;
      background-color: #ef4444;
      color: white;
      border: none;
      border-radius: 0.375rem;
      cursor: pointer;
    }

    .sign-out-btn:hover {
      background-color: #dc2626;
    }

    .dashboard-grid {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .first-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.5rem;
    }

    .second-row {
      background: white;
      border-radius: 0.5rem;
      padding: 1.5rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      height: 400px;
    }

    .third-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.5rem;
    }

    .fourth-row {
      display: grid;
      grid-template-columns: 1fr;
    }

    .providers-section,
    .sessions-section,
    .action-plans-section,
    .medication-section,
    .journal-section {
      background: white;
      border-radius: 0.5rem;
      padding: 1.5rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      height: 400px;
    }
  `]
})
export class PatientDashboardComponent implements OnInit, OnDestroy {
  patientId: string = '1';
  patientName: string = 'John Doe';
  currentDateTime: Date = new Date();
  private timeInterval: any;

  constructor(private router: Router) {}

  ngOnInit() {
    this.timeInterval = setInterval(() => {
      this.currentDateTime = new Date();
    }, 1000);
  }

  ngOnDestroy() {
    if (this.timeInterval) {
      clearInterval(this.timeInterval);
    }
  }

  signOut() {
    this.router.navigate(['/']);
  }
}