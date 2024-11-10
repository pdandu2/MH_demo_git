import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  selector: 'app-patient-medication',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="medication">
      <h2>Your Medications</h2>

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

        @if (medications.length === 0) {
          <div class="no-medications">
            <p>No medications prescribed</p>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .medication {
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    h2 {
      color: #1e293b;
      margin: 0 0 1rem 0;
    }

    .medications-list {
      flex: 1;
      overflow-y: auto;
      padding-right: 0.5rem;
    }

    .medications-list::-webkit-scrollbar {
      width: 0.5rem;
    }

    .medications-list::-webkit-scrollbar-track {
      background: #f1f5f9;
      border-radius: 0.25rem;
    }

    .medications-list::-webkit-scrollbar-thumb {
      background: #cbd5e1;
      border-radius: 0.25rem;
    }

    .medications-list::-webkit-scrollbar-thumb:hover {
      background: #94a3b8;
    }

    .medication-card {
      padding: 1rem;
      border: 1px solid #e2e8f0;
      border-radius: 0.375rem;
      margin-bottom: 0.5rem;
      background-color: white;
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

    .no-medications {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      color: #64748b;
      font-style: italic;
    }
  `]
})
export class PatientMedicationComponent {
  @Input() patientId!: string;

  medications: Medication[] = [
    {
      id: 1,
      name: 'Sertraline 50mg',
      dosage: '50mg',
      frequency: {
        morning: true,
        afternoon: false,
        night: false
      },
      timing: 'after',
      startDate: '2024-01-15',
      endDate: '2024-04-15'
    },
    {
      id: 2,
      name: 'Melatonin 5mg',
      dosage: '5mg',
      frequency: {
        morning: false,
        afternoon: false,
        night: true
      },
      timing: 'before',
      startDate: '2024-01-15',
      endDate: '2024-02-15'
    }
  ];
}