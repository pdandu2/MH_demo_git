import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ActionPlan {
  id: number;
  title: string;
  description: string;
  status: 'active' | 'completed' | 'pending';
}

@Component({
  selector: 'app-action-plans',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="action-plans">
      <h2>Action Plans</h2>
      <div class="plans-list">
        @for (plan of plans; track plan.id) {
          <div class="plan-card">
            <div class="plan-info">
              <h3>{{ plan.title }}</h3>
              <p>{{ plan.description }}</p>
            </div>
            <div class="plan-actions">
              <span class="status-badge" [class]="plan.status">
                {{ plan.status | titlecase }}
              </span>
              <button class="assign-btn">Assign</button>
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .action-plans {
      height: 100%;
    }

    h2 {
      color: #1e293b;
      margin-bottom: 1rem;
    }

    .plan-card {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      border: 1px solid #e2e8f0;
      border-radius: 0.375rem;
      margin-bottom: 0.5rem;
      background-color: white;
    }

    .plan-info {
      flex: 1;
    }

    .plan-info h3 {
      color: #1e293b;
      margin: 0;
      font-size: 1rem;
    }

    .plan-info p {
      color: #64748b;
      margin: 0.25rem 0 0;
      font-size: 0.875rem;
    }

    .plan-actions {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .status-badge {
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
      font-size: 0.75rem;
    }

    .status-badge.active {
      background-color: #dcfce7;
      color: #16a34a;
    }

    .status-badge.completed {
      background-color: #e0f2fe;
      color: #0369a1;
    }

    .status-badge.pending {
      background-color: #fef3c7;
      color: #d97706;
    }

    .assign-btn {
      padding: 0.5rem 1rem;
      background-color: #3b82f6;
      color: white;
      border: none;
      border-radius: 0.375rem;
      cursor: pointer;
      font-size: 0.875rem;
    }

    .assign-btn:hover {
      background-color: #2563eb;
    }
  `]
})
export class ActionPlansComponent {
  @Input() selectedPatientId: string = '';

  plans: ActionPlan[] = [
    { 
      id: 1, 
      title: 'Daily Mindfulness', 
      description: '15-minute daily meditation practice',
      status: 'active'
    },
    { 
      id: 2, 
      title: 'Sleep Hygiene', 
      description: 'Structured bedtime routine',
      status: 'pending'
    },
    { 
      id: 3, 
      title: 'Exercise Routine', 
      description: '30-minute daily walking',
      status: 'completed'
    }
  ];
}