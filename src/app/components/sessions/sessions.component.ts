import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sessions',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="sessions">
      <div class="header">
        <h2>Sessions</h2>
        <button class="new-session-btn" (click)="createNewSession()">+ New Session</button>
      </div>
      
      <div class="sessions-container">
        <div class="sessions-list">
          @for (session of sessions; track session.id) {
            <div class="session-card">
              <div class="session-info">
                <div class="patient-info">
                  <h3>{{ session.patientName }}</h3>
                  <span class="patient-id">ID: PAT{{ session.patientId.toString().padStart(5, '0') }}</span>
                </div>
                <p class="session-datetime">{{ session.date }} - {{ session.time }}</p>
              </div>
              <div class="session-type" [class]="session.type">
                {{ session.type | titlecase }}
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  `,
  styles: [`
    .sessions {
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

    .new-session-btn {
      padding: 0.5rem 1rem;
      background-color: #3b82f6;
      color: white;
      border: none;
      border-radius: 0.375rem;
      cursor: pointer;
      font-size: 0.875rem;
      transition: background-color 0.2s;
    }

    .new-session-btn:hover {
      background-color: #2563eb;
    }

    .sessions-container {
      flex: 1;
      overflow: hidden;
    }

    .sessions-list {
      height: 100%;
      overflow-y: auto;
      padding-right: 0.5rem;
    }

    .sessions-list::-webkit-scrollbar {
      width: 0.5rem;
    }

    .sessions-list::-webkit-scrollbar-track {
      background: #f1f5f9;
      border-radius: 0.25rem;
    }

    .sessions-list::-webkit-scrollbar-thumb {
      background: #cbd5e1;
      border-radius: 0.25rem;
    }

    .sessions-list::-webkit-scrollbar-thumb:hover {
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

    .session-info {
      flex: 1;
    }

    .patient-info {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .patient-info h3 {
      color: #1e293b;
      margin: 0;
      font-size: 1rem;
    }

    .patient-id {
      color: #64748b;
      font-size: 0.75rem;
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
  `]
})
export class SessionsComponent {
  sessions = [
    { 
      id: 1, 
      patientId: 1,
      patientName: 'John Doe', 
      date: '2024-01-16', 
      time: '10:00 AM', 
      type: 'follow-up' 
    },
    { 
      id: 2, 
      patientId: 2,
      patientName: 'Jane Smith', 
      date: '2024-01-16', 
      time: '2:00 PM', 
      type: 'initial' 
    },
    { 
      id: 3,
      patientId: 3, 
      patientName: 'Mike Johnson', 
      date: '2024-01-16', 
      time: '3:00 PM', 
      type: 'follow-up' 
    },
    { 
      id: 4,
      patientId: 4, 
      patientName: 'Mike Tyson', 
      date: '2024-01-16', 
      time: '3:00 PM', 
      type: 'follow-up' 
    },
    { 
      id: 5,
      patientId: 4, 
      patientName: 'Mike Milk', 
      date: '2024-01-16', 
      time: '3:00 PM', 
      type: 'follow-up' 
    },
  ];

  constructor(private router: Router) {}

  createNewSession() {
    this.router.navigate(['/new-session']);
  }
}