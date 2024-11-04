import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Medication {
  id: number;
  name: string;
  dosage: string;
  frequency: {
    morning: boolean;
    afternoon: boolean;
    night: boolean;
  };
  timing: 'before' | 'after';
  startDate: string;
  endDate: string;
}

@Component({
  selector: 'app-medication',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="medication">
      <div class="header">
        <h2>Medications</h2>
        <button class="add-btn" (click)="showAddForm = true">+ Add Medication</button>
      </div>

      <div class="content-scroll">
        @if (showAddForm) {
          <div class="add-form">
            <div class="form-grid">
              <div class="form-group">
                <label>Medicine Name & Dosage</label>
                <input 
                  type="text" 
                  [(ngModel)]="newMed.name" 
                  placeholder="e.g., Aspirin 200mg"
                >
              </div>

              <div class="form-group">
                <label>Frequency</label>
                <div class="checkbox-group">
                  <label>
                    <input 
                      type="checkbox" 
                      [(ngModel)]="newMed.frequency.morning"
                    > Morning
                  </label>
                  <label>
                    <input 
                      type="checkbox" 
                      [(ngModel)]="newMed.frequency.afternoon"
                    > Afternoon
                  </label>
                  <label>
                    <input 
                      type="checkbox" 
                      [(ngModel)]="newMed.frequency.night"
                    > Night
                  </label>
                </div>
              </div>

              <div class="form-group">
                <label>Timing</label>
                <select [(ngModel)]="newMed.timing">
                  <option value="before">Before Meal</option>
                  <option value="after">After Meal</option>
                </select>
              </div>

              <div class="form-group">
                <label>Start Date</label>
                <input 
                  type="date" 
                  [(ngModel)]="newMed.startDate"
                >
              </div>

              <div class="form-group">
                <label>End Date</label>
                <input 
                  type="date" 
                  [(ngModel)]="newMed.endDate"
                >
              </div>
            </div>

            <div class="form-actions">
              <button class="cancel-btn" (click)="cancelAdd()">Cancel</button>
              <button class="save-btn" (click)="addMedication()">Save</button>
            </div>
          </div>
        }

        <div class="medications-list">
          @for (med of medications; track med.id) {
            <div class="medication-card">
              <div class="med-header">
                <h3>{{ med.name }}</h3>
                <span class="timing-badge" [class]="med.timing">
                  {{ med.timing === 'before' ? 'Before Meal' : 'After Meal' }}
                </span>
              </div>
              <div class="med-details">
                <div class="frequency">
                  @if (med.frequency.morning) {
                    <span class="time-badge">Morning</span>
                  }
                  @if (med.frequency.afternoon) {
                    <span class="time-badge">Afternoon</span>
                  }
                  @if (med.frequency.night) {
                    <span class="time-badge">Night</span>
                  }
                </div>
                <div class="dates">
                  {{ med.startDate }} - {{ med.endDate }}
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  `,
  styles: [`
    .medication {
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
      flex-shrink: 0;
    }

    .content-scroll {
      flex: 1;
      overflow-y: auto;
      padding-right: 0.5rem;
    }

    .content-scroll::-webkit-scrollbar {
      width: 0.5rem;
    }

    .content-scroll::-webkit-scrollbar-track {
      background: #f1f5f9;
      border-radius: 0.25rem;
    }

    .content-scroll::-webkit-scrollbar-thumb {
      background: #cbd5e1;
      border-radius: 0.25rem;
    }

    .content-scroll::-webkit-scrollbar-thumb:hover {
      background: #94a3b8;
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

    .add-form {
      background-color: #f8fafc;
      padding: 1rem;
      border-radius: 0.375rem;
      margin-bottom: 1rem;
    }

    .form-grid {
      display: grid;
      gap: 1rem;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .checkbox-group {
      display: flex;
      gap: 1rem;
    }

    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 0.5rem;
      margin-top: 1rem;
    }

    .cancel-btn {
      padding: 0.5rem 1rem;
      background-color: white;
      border: 1px solid #e2e8f0;
      border-radius: 0.375rem;
      cursor: pointer;
    }

    .save-btn {
      padding: 0.5rem 1rem;
      background-color: #3b82f6;
      color: white;
      border: none;
      border-radius: 0.375rem;
      cursor: pointer;
    }

    .medications-list {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .medication-card {
      background-color: white;
      border: 1px solid #e2e8f0;
      border-radius: 0.375rem;
      padding: 1rem;
    }

    .med-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.5rem;
    }

    .med-header h3 {
      margin: 0;
      color: #1e293b;
      font-size: 1rem;
    }

    .timing-badge {
      padding: 0.25rem 0.5rem;
      border-radius: 9999px;
      font-size: 0.75rem;
    }

    .timing-badge.before {
      background-color: #fee2e2;
      color: #dc2626;
    }

    .timing-badge.after {
      background-color: #dcfce7;
      color: #16a34a;
    }

    .med-details {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.875rem;
    }

    .frequency {
      display: flex;
      gap: 0.5rem;
    }

    .time-badge {
      padding: 0.25rem 0.5rem;
      background-color: #e0f2fe;
      color: #0369a1;
      border-radius: 9999px;
      font-size: 0.75rem;
    }

    .dates {
      color: #64748b;
    }
  `]
})
export class MedicationComponent {
  @Input() patientId: string = '';
  
  showAddForm = false;
  
  newMed = {
    name: '',
    frequency: {
      morning: false,
      afternoon: false,
      night: false
    },
    timing: 'before' as 'before' | 'after',
    startDate: '',
    endDate: ''
  };

  medications: Medication[] = [
    {
      id: 1,
      name: 'Aspirin 200mg',
      dosage: '200mg',
      frequency: {
        morning: true,
        afternoon: false,
        night: true
      },
      timing: 'after',
      startDate: '2024-01-15',
      endDate: '2024-02-15'
    }
  ];

  cancelAdd() {
    this.showAddForm = false;
    this.resetForm();
  }

  addMedication() {
    const newMedication: Medication = {
      id: Date.now(),
      name: this.newMed.name,
      dosage: this.newMed.name.split(' ')[1] || '',
      frequency: { ...this.newMed.frequency },
      timing: this.newMed.timing,
      startDate: this.newMed.startDate,
      endDate: this.newMed.endDate
    };

    this.medications.push(newMedication);
    this.showAddForm = false;
    this.resetForm();
  }

  resetForm() {
    this.newMed = {
      name: '',
      frequency: {
        morning: false,
        afternoon: false,
        night: false
      },
      timing: 'before',
      startDate: '',
      endDate: ''
    };
  }
}