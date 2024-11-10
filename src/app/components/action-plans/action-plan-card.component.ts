import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface ActionPlan {
  id: number;
  title: string;
  description: string;
  status: 'active' | 'completed' | 'pending';
  assignedTo?: number;
  questions?: { id: number; text: string; }[];
  showQuestions?: boolean;
  assignmentDetails?: {
    startDate: string;
    endDate: string;
    reminderTimes: ('morning' | 'afternoon' | 'evening' | 'night')[];
  };
}

@Component({
  selector: 'app-action-plan-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="plan-card">
      <div class="plan-info">
        <h3>{{ plan.title }}</h3>
        <p>{{ plan.description }}</p>
        @if (plan.questions) {
          <button class="view-questions-btn" (click)="onToggleQuestions()">
            {{ plan.showQuestions ? 'Hide Questions' : 'View Questions' }}
          </button>
          @if (plan.showQuestions) {
            <div class="questions-list">
              @for (question of plan.questions; track question.id) {
                <div class="question-item">
                  <span>{{ question.id }}. {{ question.text }}</span>
                  <span class="scale-info">(Scale: 0-10)</span>
                </div>
              }
            </div>
          }
        }
        @if (plan.assignmentDetails && plan.assignedTo === selectedPatientId) {
          <div class="assignment-details">
            <p class="dates">{{ plan.assignmentDetails.startDate }} to {{ plan.assignmentDetails.endDate }}</p>
            <div class="reminder-badges">
              @for (time of plan.assignmentDetails.reminderTimes; track time) {
                <span class="reminder-badge">{{ time }}</span>
              }
            </div>
          </div>
        }
      </div>
      <div class="plan-actions">
        <span class="status-badge" [class]="plan.status">
          {{ plan.status | titlecase }}
        </span>
        <button 
          [class]="isAssigned ? 'unassign-btn' : 'assign-btn'"
          (click)="onToggleAssignment()"
          [disabled]="selectedPatientId === null"
        >
          {{ isAssigned ? 'Unassign' : 'Assign' }}
        </button>
      </div>
    </div>
  `,
  styles: [`
    .plan-card {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
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

    .assign-btn, .unassign-btn {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 0.375rem;
      cursor: pointer;
      font-size: 0.875rem;
      transition: background-color 0.2s;
    }

    .assign-btn {
      background-color: #3b82f6;
      color: white;
    }

    .assign-btn:hover:not(:disabled) {
      background-color: #2563eb;
    }

    .unassign-btn {
      background-color: #ef4444;
      color: white;
    }

    .unassign-btn:hover:not(:disabled) {
      background-color: #dc2626;
    }

    .assign-btn:disabled, .unassign-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .view-questions-btn {
      background: none;
      border: none;
      color: #3b82f6;
      padding: 0;
      margin-top: 0.5rem;
      cursor: pointer;
      font-size: 0.875rem;
    }

    .questions-list {
      margin-top: 0.5rem;
      padding: 0.5rem;
      background-color: #f8fafc;
      border-radius: 0.375rem;
    }

    .question-item {
      margin-bottom: 0.5rem;
      font-size: 0.875rem;
      color: #4b5563;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .scale-info {
      color: #64748b;
      font-size: 0.75rem;
    }

    .assignment-details {
      margin-top: 0.5rem;
      padding: 0.5rem;
      background-color: #f8fafc;
      border-radius: 0.375rem;
      font-size: 0.875rem;
    }

    .dates {
      color: #4b5563;
      margin: 0 0 0.5rem 0;
    }

    .reminder-badges {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
    }

    .reminder-badge {
      padding: 0.25rem 0.5rem;
      background-color: #e0f2fe;
      color: #0369a1;
      border-radius: 9999px;
      font-size: 0.75rem;
    }
  `]
})
export class ActionPlanCardComponent {
  @Input() plan!: ActionPlan;
  @Input() selectedPatientId: number | null = null;
  @Output() toggleAssignment = new EventEmitter<void>();
  @Output() toggleQuestions = new EventEmitter<void>();

  get isAssigned(): boolean {
    return this.plan.assignedTo === this.selectedPatientId;
  }

  onToggleAssignment() {
    this.toggleAssignment.emit();
  }

  onToggleQuestions() {
    this.toggleQuestions.emit();
  }
}