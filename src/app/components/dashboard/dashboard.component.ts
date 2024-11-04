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

@Component({
  selector: 'app-dashboard',
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
  ],
  template: `
    <div class="dashboard">
      <header class="header">
        <h1>Provider Dashboard</h1>
        <div class="header-right">
          <div class="datetime">{{ currentDateTime | date:'medium' }}</div>
          <button class="sign-out-btn" (click)="signOut()">Sign Out</button>
        </div>
      </header>
      
      <div class="dashboard-grid">
        <!-- First Row -->
        <section class="first-row">
          <div class="patients-section">
            <app-patient-list (patientSelected)="onPatientSelected($event)"></app-patient-list>
          </div>
          <div class="sessions-section">
            <app-sessions></app-sessions>
          </div>
        </section>

        <!-- Second Row -->
        <section class="second-row">
          <app-chart [selectedPatientId]="selectedPatientId"></app-chart>
        </section>

        <!-- Third Row -->
        <section class="third-row">
          <div class="action-plans-section">
            <app-action-plans [selectedPatientId]="selectedPatientId"></app-action-plans>
          </div>
          <div class="medication-section">
            <app-medication [patientId]="selectedPatientId"></app-medication>
          </div>
        </section>

        <!-- Fourth Row -->
        <section class="fourth-row">
          <div class="journal-section">
            <app-journal [selectedPatientId]="selectedPatientId"></app-journal>
          </div>
        </section>
      </div>

      <app-chat></app-chat>
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

    .header-right {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .datetime {
      color: #64748b;
      font-size: 0.875rem;
    }

    h1 {
      color: #1e293b;
      font-size: 2rem;
      font-weight: 600;
    }

    .sign-out-btn {
      padding: 0.5rem 1rem;
      background-color: #ef4444;
      color: white;
      border: none;
      border-radius: 0.375rem;
      cursor: pointer;
      transition: background-color 0.2s;
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

    .patients-section,
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
export class DashboardComponent {
  selectedPatientId: string = '';
  currentDateTime: Date = new Date();

  constructor(private router: Router) {
    // Update current time every minute
    setInterval(() => {
      this.currentDateTime = new Date();
    }, 60000);
  }

  onPatientSelected(patientId: string) {
    this.selectedPatientId = patientId;
  }

  signOut() {
    this.router.navigate(['/']);
  }
}