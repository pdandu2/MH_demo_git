import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Provider {
  id: number;
  name: string;
  specialty: string;
  since: string;
  nextAppointment?: string;
}

@Component({
  selector: 'app-providers-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="providers">
      <h2>Your Healthcare Team</h2>
      
      <div class="providers-container">
        @for (provider of providers; track provider.id) {
          <div class="provider-card">
            <div class="provider-info">
              <h3>{{ provider.name }}</h3>
              <p class="specialty">{{ provider.specialty }}</p>
              <p class="since">Treating since: {{ provider.since }}</p>
              @if (provider.nextAppointment) {
                <p class="next-appointment">
                  Next appointment: {{ provider.nextAppointment }}
                </p>
              }
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .providers {
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    h2 {
      color: #1e293b;
      margin: 0 0 1rem 0;
    }

    .providers-container {
      flex: 1;
      overflow-y: auto;
      padding-right: 0.5rem;
    }

    .providers-container::-webkit-scrollbar {
      width: 0.5rem;
    }

    .providers-container::-webkit-scrollbar-track {
      background: #f1f5f9;
      border-radius: 0.25rem;
    }

    .providers-container::-webkit-scrollbar-thumb {
      background: #cbd5e1;
      border-radius: 0.25rem;
    }

    .providers-container::-webkit-scrollbar-thumb:hover {
      background: #94a3b8;
    }

    .provider-card {
      padding: 1rem;
      border: 1px solid #e2e8f0;
      border-radius: 0.375rem;
      margin-bottom: 0.5rem;
      background-color: white;
    }

    .provider-info h3 {
      color: #1e293b;
      margin: 0;
      font-size: 1rem;
    }

    .specialty {
      color: #64748b;
      margin: 0.25rem 0;
      font-size: 0.875rem;
    }

    .since {
      color: #64748b;
      margin: 0.25rem 0;
      font-size: 0.875rem;
    }

    .next-appointment {
      color: #0369a1;
      margin: 0.25rem 0 0;
      font-size: 0.875rem;
      font-weight: 500;
    }
  `]
})
export class ProvidersListComponent {
  @Input() patientId!: string;

  providers: Provider[] = [
    {
      id: 1,
      name: 'Dr. Sarah Williams',
      specialty: 'Psychiatrist',
      since: 'January 2024',
      nextAppointment: '2024-01-20 10:00 AM'
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      specialty: 'Psychologist',
      since: 'January 2024',
      nextAppointment: '2024-01-25 2:00 PM'
    },
    {
      id: 3,
      name: 'Dr. Emily Johnson',
      specialty: 'Therapist',
      since: 'January 2024'
    }
  ];
}