import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ChartData {
  date: string;
  who5: number;
  phq9: number;
  sleep: number;
  activity: number;
}

interface Patient {
  id: number;
  name: string;
  lastAssessment: string;
  score: number;
}

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="chart-container">
      <div class="header">
        <h2>Patient Progress</h2>
        <div class="patient-selector">
          <input 
            type="text" 
            [(ngModel)]="searchTerm"
            (input)="filterPatients()"
            placeholder="Search patients..."
            class="search-input"
          >
          @if (searchTerm && filteredPatients.length > 0) {
            <div class="search-results">
              @for (patient of filteredPatients; track patient.id) {
                <div 
                  class="patient-option" 
                  [class.selected]="patient.id === _selectedPatientId"
                  (click)="selectPatient(patient)"
                >
                  <span class="patient-name">{{ patient.name }}</span>
                  <span class="patient-score" [class]="getScoreClass(patient.score)">
                    Score: {{ patient.score }}
                  </span>
                </div>
              }
            </div>
          }
        </div>
      </div>

      @if (_selectedPatientId) {
        <div class="chart-controls">
          <select [(ngModel)]="selectedMetric" (change)="updateChart()">
            <option value="who5">WHO-5 Score</option>
            <option value="phq9">PHQ-9 Score</option>
            <option value="sleep">Sleep Quality</option>
            <option value="activity">Physical Activity</option>
          </select>
          <div class="time-range">
            <button 
              *ngFor="let r of ranges" 
              [class.active]="r === selectedRange"
              (click)="setRange(r)"
            >
              {{ r | titlecase }}
            </button>
          </div>
        </div>
        <div class="chart">
          <div class="placeholder">
            <p>Showing {{ selectedMetric | uppercase }} data for {{ selectedRange }}</p>
            <p>Selected Patient: {{ getSelectedPatientName() }}</p>
          </div>
        </div>
      } @else {
        <div class="no-selection">
          <p>Please select a patient to view progress</p>
        </div>
      }
    </div>
  `,
  styles: [`
    .chart-container {
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

    .patient-selector {
      position: relative;
      width: 300px;
    }

    .search-input {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #e2e8f0;
      border-radius: 0.375rem;
      font-size: 0.875rem;
    }

    .search-results {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: white;
      border: 1px solid #e2e8f0;
      border-radius: 0.375rem;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      max-height: 200px;
      overflow-y: auto;
      z-index: 10;
    }

    .patient-option {
      padding: 0.75rem 1rem;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #e2e8f0;
    }

    .patient-option:last-child {
      border-bottom: none;
    }

    .patient-option:hover {
      background-color: #f8fafc;
    }

    .patient-option.selected {
      background-color: #e0f2fe;
    }

    .patient-name {
      font-weight: 500;
      color: #1e293b;
    }

    .patient-score {
      padding: 0.25rem 0.5rem;
      border-radius: 9999px;
      font-size: 0.75rem;
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

    h2 {
      color: #1e293b;
      margin: 0;
    }

    .chart-controls {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }

    select {
      padding: 0.5rem;
      border: 1px solid #e2e8f0;
      border-radius: 0.375rem;
      background-color: white;
      font-size: 0.875rem;
      min-width: 150px;
    }

    .time-range {
      display: flex;
      gap: 0;
    }

    .time-range button {
      padding: 0.5rem 1rem;
      border: 1px solid #e2e8f0;
      background: white;
      color: #64748b;
      cursor: pointer;
      font-size: 0.875rem;
      transition: all 0.2s;
    }

    .time-range button:first-child {
      border-radius: 0.375rem 0 0 0.375rem;
    }

    .time-range button:last-child {
      border-radius: 0 0.375rem 0.375rem 0;
    }

    .time-range button.active {
      background-color: #3b82f6;
      color: white;
      border-color: #3b82f6;
    }

    .chart {
      flex: 1;
      border: 1px solid #e2e8f0;
      border-radius: 0.375rem;
      padding: 1rem;
      background-color: white;
    }

    .placeholder, .no-selection {
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: #64748b;
      text-align: center;
    }

    .placeholder p, .no-selection p {
      margin: 0.5rem 0;
    }
  `]
})
export class ChartComponent {
  @Input() set selectedPatientId(value: string) {
    this._selectedPatientId = value ? parseInt(value) : null;
    this.updateChart();
  }
  get selectedPatientId(): string {
    return this._selectedPatientId?.toString() || '';
  }

  _selectedPatientId: number | null = null;
  selectedMetric: string = 'who5';
  selectedRange: string = 'week';
  ranges: string[] = ['week', 'month', 'year'];
  searchTerm: string = '';
  
  patients: Patient[] = [
    { id: 1, name: 'John Doe', lastAssessment: '2024-01-15', score: 15 },
    { id: 2, name: 'Jane Smith', lastAssessment: '2024-01-14', score: 8 },
    { id: 3, name: 'Mike Johnson', lastAssessment: '2024-01-13', score: 3 },
    { id: 4, name: 'Sarah Williams', lastAssessment: '2024-01-14', score: 7 },
    { id: 5, name: 'David Brown', lastAssessment: '2024-01-16', score: 12 }
  ];

  filteredPatients: Patient[] = [];

  chartData: ChartData[] = [
    { date: '2024-01-10', who5: 15, phq9: 8, sleep: 7, activity: 6 },
    { date: '2024-01-11', who5: 16, phq9: 7, sleep: 8, activity: 7 },
    { date: '2024-01-12', who5: 18, phq9: 6, sleep: 8, activity: 8 },
    { date: '2024-01-13', who5: 17, phq9: 6, sleep: 7, activity: 7 },
    { date: '2024-01-14', who5: 19, phq9: 5, sleep: 9, activity: 8 },
    { date: '2024-01-15', who5: 20, phq9: 4, sleep: 9, activity: 9 }
  ];

  filterPatients() {
    if (!this.searchTerm.trim()) {
      this.filteredPatients = [];
      return;
    }

    const search = this.searchTerm.toLowerCase();
    this.filteredPatients = this.patients.filter(patient =>
      patient.name.toLowerCase().includes(search)
    );
  }

  selectPatient(patient: Patient) {
    this._selectedPatientId = patient.id;
    this.searchTerm = '';
    this.filteredPatients = [];
    this.updateChart();
  }

  getSelectedPatientName(): string {
    const patient = this.patients.find(p => p.id === this._selectedPatientId);
    return patient ? patient.name : '';
  }

  getScoreClass(score: number): string {
    if (score >= 10) return 'score-high';
    if (score >= 5) return 'score-medium';
    return 'score-low';
  }

  updateChart() {
    // Implementation for updating chart visualization
    console.log(`Updating chart for patient: ${this._selectedPatientId}, metric: ${this.selectedMetric}`);
  }

  setRange(range: string) {
    this.selectedRange = range;
    this.updateChart();
  }
}