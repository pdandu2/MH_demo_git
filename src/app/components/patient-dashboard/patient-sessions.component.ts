import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Session {
  id: number;
  providerId: number;
  providerName: string;
  date: string;
  time: string;
  type: 'initial' | 'follow-up';
}

@Component({
  selector: 'app-patient-sessions',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="sessions">
      <h2>Upcoming Sessions</h2>
      
      <div class="sessions-container">
        @for (session of sessions; track session.id) {
          <div class="session-card">
            <div class="session-info">
              <h3>{{ session.providerName }}</h3>
              <p class="session-datetime">{{ session.date }} - {{ session.time }}</p>
            </div>
            <div class="session-type" [class]="session.type">
              {{ session.type | titlecase }}
            </div>
          </div>
        }

        @if (sessions.length === 0) {
          <div class="no-sessions">
            <p>No upcoming sessions scheduled</p>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .sessions {
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    h2 {
      color: #1e293b;
      margin: 0 0 1rem 0;
    }

    .sessions-container {
      flex: 1;
      overflow-y: auto;
      padding-right: 0.5rem;
    }

    .sessions-container::-webkit-scrollbar {
      width: 0.5rem;
    }

    .sessions-container::-webkit-scrollbar-track {
      background: #f1f5f9;
      border-radius: 0.25rem;
    }

    .sessions-container::-webkit-scrollbar-thumb {
      background: #cbd5e1;
      border-radius: 0.25rem;
    }

    .sessions-container::-webkit-scrollbar-thumb:hover {
      background: #94a3b8;
    }

    .session-card {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      border: 1px solid #e2e8f0;
      border-radius: 0.375rem;
      margin-bottom: 0.5rem;
      background-color: white;
    }

    .session-info h3 {
      color: #1e293b;
      margin: 0;
      font-size: 1rem;
    }

    .session-datetime {
      color: #64748b;
      margin: 0.25rem 0 0;
      font-size: 0.875rem;
    }

    .session-type {
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 500;
    }

    .initial {
      background-color: #fee2e2;
      color: #dc2626;
    }

    .follow-up {
      background-color: #e0f2fe;
      color: #0369a1;
    }

    .no-sessions {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      color: #64748b;
      font-style: italic;
    }
  `]
})
export class PatientSessionsComponent {
  @Input() patientId!: string;

  sessions: Session[] = [
    {
      id: 1,
      providerId: 1,
      providerName: 'Dr. Sarah Williams',
      date: '2024-01-20',
      time: '10:00 AM',
      type: 'follow-up'
    },
    {
      id: 2,
      providerId: 2,
      providerName: 'Dr. Michael Chen',
      date: '2024-01-25',
      time: '2:00 PM',
      type: 'follow-up'
    }
  ];
}