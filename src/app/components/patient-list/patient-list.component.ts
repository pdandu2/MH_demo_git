import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Patient {
  id: number;
  name: string;
  lastAssessment: string;
  score: number;
}

@Component({
  selector: 'app-patient-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="patient-list">
      <div class="header">
        <h2>Patients</h2>
        <button class="add-btn" (click)="onboardNewPatient()">+ New Patient</button>
      </div>

      <div class="controls">
        <div class="search-bar">
          <input 
            type="text" 
            placeholder="Search patients..." 
            [(ngModel)]="searchTerm"
            (input)="filterPatients()"
          >
        </div>
        <button 
          class="sort-btn" 
          (click)="toggleSort()"
          [class.desc]="sortDirection === 'desc'"
        >
          Sort by Score
        </button>
      </div>

      <div class="patients-container">
        @for (patient of filteredPatients; track patient.id) {
          <div class="patient-card" (click)="selectPatient(patient)">
            <div class="patient-info">
              <h3>{{ patient.name }}</h3>
              <p>Last assessment: {{ patient.lastAssessment }}</p>
            </div>
            <div class="patient-score" [ngClass]="getScoreClass(patient.score)">
              {{ patient.score }}
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .patient-list {
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }

    h2 {
      color: #1e293b;
      margin: 0;
    }

    .add-btn {
      padding: 0.5rem 1rem;
      background-color: #3b82f6;
      color: white;
      border: none;
      border-radius: 0.375rem;
      cursor: pointer;
      font-size: 0.875rem;
    }

    .controls {
      display: flex;
      gap: 1rem;
      margin-bottom: 1rem;
    }

    .search-bar {
      flex: 1;
    }

    .search-bar input {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #e2e8f0;
      border-radius: 0.375rem;
    }

    .sort-btn {
      padding: 0.5rem 1rem;
      background-color: white;
      border: 1px solid #e2e8f0;
      border-radius: 0.375rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      position: relative;
    }

    .sort-btn::after {
      content: "↑";
      transition: transform 0.2s;
    }

    .sort-btn.desc::after {
      transform: rotate(180deg);
    }

    .patients-container {
      flex: 1;
      overflow-y: auto;
      padding-right: 0.5rem;
    }

    .patients-container::-webkit-scrollbar {
      width: 0.5rem;
    }

    .patients-container::-webkit-scrollbar-track {
      background: #f1f5f9;
      border-radius: 0.25rem;
    }

    .patients-container::-webkit-scrollbar-thumb {
      background: #cbd5e1;
      border-radius: 0.25rem;
    }

    .patients-container::-webkit-scrollbar-thumb:hover {
      background: #94a3b8;
    }

    .patient-card {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      border: 1px solid #e2e8f0;
      border-radius: 0.375rem;
      margin-bottom: 0.5rem;
      cursor: pointer;
      transition: all 0.2s;
      background-color: white;
    }

    .patient-card:hover {
      background-color: #f8fafc;
      transform: translateY(-1px);
    }

    .patient-info h3 {
      color: #1e293b;
      margin: 0;
    }

    .patient-info p {
      color: #64748b;
      margin: 0.25rem 0 0;
      font-size: 0.875rem;
    }

    .patient-score {
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
      font-weight: 600;
    }

    .score-high {
      background-color: #fee2e2;
      color: #dc2626;
    }

    .score-medium {
      background-color: #fef3c7;
      color: #d97706;
    }

    .score-low {
      background-color: #dcfce7;
      color: #16a34a;
    }
  `]
})
export class PatientListComponent {
  @Output() patientSelected = new EventEmitter<string>();

  patients: Patient[] = [
    { id: 1, name: 'John Doe', lastAssessment: '2024-01-15', score: 15 },
    { id: 2, name: 'Jane Smith', lastAssessment: '2024-01-14', score: 8 },
    { id: 3, name: 'Mike Johnson', lastAssessment: '2024-01-13', score: 3 },
    { id: 4, name: 'Sarah Williams', lastAssessment: '2024-01-14', score: 7 },
    { id: 5, name: 'David Brown', lastAssessment: '2024-01-16', score: 12 }
  ];

  filteredPatients: Patient[] = [...this.patients];
  searchTerm = '';
  sortDirection: 'asc' | 'desc' = 'desc';

  constructor(private router: Router) {}

  filterPatients() {
    this.filteredPatients = this.patients.filter(patient =>
      patient.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.sortPatients();
  }

  toggleSort() {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.sortPatients();
  }

  sortPatients() {
    this.filteredPatients.sort((a, b) => {
      const multiplier = this.sortDirection === 'asc' ? 1 : -1;
      return (a.score - b.score) * multiplier;
    });
  }

  selectPatient(patient: Patient) {
    this.patientSelected.emit(patient.id.toString());
    this.router.navigate(['/patient', patient.id]);
  }

  getScoreClass(score: number): string {
    if (score >= 10) return 'score-high';
    if (score >= 5) return 'score-medium';
    return 'score-low';
  }

  onboardNewPatient() {
    this.router.navigate(['/patient-onboard']);
  }
}