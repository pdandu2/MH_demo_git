import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-session',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="new-session">
      <header class="header">
        <button class="back-btn" (click)="goBack()">← Back to Dashboard</button>
        <h1>Schedule New Session</h1>
      </header>

      <div class="session-form">
        <div class="form-section">
          <div class="form-group">
            <label for="patientSearch">Search Patient</label>
            <input 
              type="text" 
              id="patientSearch" 
              [(ngModel)]="searchTerm"
              (input)="searchPatients()"
              placeholder="Search by name or ID..."
            >
          </div>

          @if (searchTerm && filteredPatients.length > 0) {
            <div class="search-results">
              @for (patient of filteredPatients; track patient.id) {
                <div class="patient-item" (click)="selectPatient(patient)">
                  <span class="patient-name">{{ patient.name }}</span>
                  <span class="patient-id">ID: PAT{{ patient.id.toString().padStart(5, '0') }}</span>
                </div>
              }
            </div>
          }

          @if (selectedPatient) {
            <div class="selected-patient">
              <h3>Selected Patient</h3>
              <div class="patient-card">
                <div class="patient-info">
                  <span class="patient-name">{{ selectedPatient.name }}</span>
                  <span class="patient-id">ID: PAT{{ selectedPatient.id.toString().padStart(5, '0') }}</span>
                </div>
              </div>
            </div>
          }
        </div>

        <div class="form-section">
          <div class="form-grid">
            <div class="form-group">
              <label for="date">Date *</label>
              <input 
                type="date" 
                id="date" 
                [(ngModel)]="sessionData.date" 
                [min]="minDate"
                required
              >
            </div>

            <div class="form-group">
              <label for="time">Time *</label>
              <input 
                type="time" 
                id="time" 
                [(ngModel)]="sessionData.time"
                required
              >
            </div>

            <div class="form-group">
              <label for="type">Session Type *</label>
              <select id="type" [(ngModel)]="sessionData.type" required>
                <option value="">Select Type</option>
                <option value="initial">Initial</option>
                <option value="follow-up">Follow-up</option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label for="notes">Session Notes</label>
            <textarea 
              id="notes" 
              [(ngModel)]="sessionData.notes"
              rows="4"
              placeholder="Enter any preliminary notes for the session..."
            ></textarea>
          </div>
        </div>

        @if (error) {
          <div class="error-message">{{ error }}</div>
        }

        <div class="form-actions">
          <button type="button" class="cancel-btn" (click)="goBack()">Cancel</button>
          <button 
            type="submit" 
            class="submit-btn" 
            [disabled]="!isFormValid()"
            (click)="scheduleSession()"
          >
            Schedule Session
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .new-session {
      padding: 2rem;
      background-color: #f8fafc;
      min-height: 100vh;
    }

    .header {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 2rem;
    }

    .back-btn {
      padding: 0.5rem 1rem;
      background-color: #3b82f6;
      color: white;
      border: none;
      border-radius: 0.375rem;
      cursor: pointer;
      font-size: 0.875rem;
    }

    .back-btn:hover {
      background-color: #2563eb;
    }

    h1 {
      color: #1e293b;
      font-size: 1.5rem;
      font-weight: 600;
      margin: 0;
    }

    .session-form {
      max-width: 800px;
      margin: 0 auto;
    }

    .form-section {
      background: white;
      padding: 1.5rem;
      border-radius: 0.5rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      margin-bottom: 1.5rem;
    }

    .form-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      margin-bottom: 1rem;
    }

    label {
      color: #64748b;
      font-size: 0.875rem;
    }

    input, select, textarea {
      padding: 0.5rem;
      border: 1px solid #e2e8f0;
      border-radius: 0.375rem;
      font-size: 1rem;
    }

    input:focus, select:focus, textarea:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }

    textarea {
      resize: vertical;
      min-height: 100px;
    }

    .search-results {
      margin-top: 0.5rem;
      border: 1px solid #e2e8f0;
      border-radius: 0.375rem;
      max-height: 200px;
      overflow-y: auto;
    }

    .patient-item {
      padding: 0.75rem 1rem;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #e2e8f0;
    }

    .patient-item:last-child {
      border-bottom: none;
    }

    .patient-item:hover {
      background-color: #f8fafc;
    }

    .patient-name {
      font-weight: 500;
      color: #1e293b;
    }

    .patient-id {
      color: #64748b;
      font-size: 0.875rem;
    }

    .selected-patient {
      margin-top: 1.5rem;
    }

    .selected-patient h3 {
      color: #1e293b;
      font-size: 1rem;
      margin-bottom: 0.5rem;
    }

    .patient-card {
      padding: 0.75rem 1rem;
      background-color: #f8fafc;
      border-radius: 0.375rem;
      border: 1px solid #e2e8f0;
    }

    .error-message {
      color: #dc2626;
      background-color: #fee2e2;
      padding: 0.75rem;
      border-radius: 0.375rem;
      margin-bottom: 1rem;
    }

    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
      margin-top: 2rem;
    }

    .cancel-btn {
      padding: 0.75rem 1.5rem;
      background-color: white;
      color: #4b5563;
      border: 1px solid #e2e8f0;
      border-radius: 0.375rem;
      cursor: pointer;
      font-size: 0.875rem;
    }

    .cancel-btn:hover {
      background-color: #f8fafc;
    }

    .submit-btn {
      padding: 0.75rem 1.5rem;
      background-color: #3b82f6;
      color: white;
      border: none;
      border-radius: 0.375rem;
      cursor: pointer;
      font-size: 0.875rem;
    }

    .submit-btn:hover:not(:disabled) {
      background-color: #2563eb;
    }

    .submit-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `]
})
export class NewSessionComponent {
  searchTerm = '';
  selectedPatient: any = null;
  error = '';
  minDate = new Date().toISOString().split('T')[0];

  sessionData = {
    date: '',
    time: '',
    type: '',
    notes: ''
  };

  // Example patients data
  patients = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Mike Johnson' },
    { id: 4, name: 'Sarah Williams' },
    { id: 5, name: 'David Brown' }
  ];

  filteredPatients: any[] = [];

  constructor(private router: Router) {}

  searchPatients() {
    if (!this.searchTerm.trim()) {
      this.filteredPatients = [];
      return;
    }

    const search = this.searchTerm.toLowerCase();
    this.filteredPatients = this.patients.filter(patient => 
      patient.name.toLowerCase().includes(search) ||
      `PAT${patient.id.toString().padStart(5, '0')}`.toLowerCase().includes(search)
    );
  }

  selectPatient(patient: any) {
    this.selectedPatient = patient;
    this.searchTerm = '';
    this.filteredPatients = [];
  }

  isFormValid(): boolean {
    return !!(
      this.selectedPatient &&
      this.sessionData.date &&
      this.sessionData.time &&
      this.sessionData.type
    );
  }

  scheduleSession() {
    if (!this.isFormValid()) {
      this.error = 'Please fill in all required fields';
      return;
    }

    // Here you would typically make an API call to schedule the session
    console.log('Session scheduled:', {
      patient: this.selectedPatient,
      ...this.sessionData
    });

    this.router.navigate(['/dashboard']);
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }
}