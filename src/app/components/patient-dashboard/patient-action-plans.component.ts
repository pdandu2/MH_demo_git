import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ActionPlan {
  id: number;
  title: string;
  description: string;
  status: 'active' | 'completed' | 'pending';
  questions?: { id: number; text: string; rating?: number }[];
  isSubmitted: boolean;
  assignmentDetails: {
    startDate: string;
    endDate: string;
    reminderTimes: ('morning' | 'afternoon' | 'evening' | 'night')[];
  };
}

@Component({
  selector: 'app-patient-action-plans',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="action-plans">
      <h2>Your Action Plans</h2>
      
      <div class="plans-list">
        @for (plan of plans; track plan.id) {
          <div class="plan-card">
            <div class="plan-info">
              <h3>{{ plan.title }}</h3>
              <p>{{ plan.description }}</p>
              
              @if (plan.questions) {
                <div class="questions-list">
                  @for (question of plan.questions; track question.id) {
                    <div class="question-item">
                      <span>{{ question.text }}</span>
                      <div class="rating-input">
                        <input 
                          type="number" 
                          min="1" 
                          max="10" 
                          [(ngModel)]="question.rating"
                          (input)="validateRating($event, question)"
                          [attr.disabled]="plan.isSubmitted"
                        >
                        <span class="scale-info">(1-10)</span>
                      </div>
                    </div>
                  }

                  <div class="submit-section">
                    @if (!plan.isSubmitted) {
                      <button 
                        class="submit-btn" 
                        [disabled]="!areAllQuestionsAnswered(plan)"
                        (click)="submitPlan(plan)"
                      >
                        Submit Responses
                      </button>
                    } @else {
                      <div class="submitted-message">
                        <span class="check-icon">✓</span> Responses submitted
                      </div>
                    }
                  </div>
                </div>
              }

              <div class="assignment-details">
                <p class="dates">{{ plan.assignmentDetails.startDate }} to {{ plan.assignmentDetails.endDate }}</p>
                <div class="reminder-badges">
                  @for (time of plan.assignmentDetails.reminderTimes; track time) {
                    <span class="reminder-badge">{{ time }}</span>
                  }
                </div>
              </div>
            </div>
            
            <div class="plan-status">
              <span class="status-badge" [class]="plan.status">
                {{ plan.status | titlecase }}
              </span>
            </div>
          </div>
        }

        @if (plans.length === 0) {
          <div class="no-plans">
            <p>No action plans assigned yet.</p>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .action-plans {
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    h2 {
      color: #1e293b;
      margin: 0 0 1rem 0;
    }

    .plans-list {
      flex: 1;
      overflow-y: auto;
      padding-right: 0.5rem;
    }

    .plans-list::-webkit-scrollbar {
      width: 0.5rem;
    }

    .plans-list::-webkit-scrollbar-track {
      background: #f1f5f9;
      border-radius: 0.25rem;
    }

    .plans-list::-webkit-scrollbar-thumb {
      background: #cbd5e1;
      border-radius: 0.25rem;
    }

    .plans-list::-webkit-scrollbar-thumb:hover {
      background: #94a3b8;
    }

    .plan-card {
      padding: 1rem;
      border: 1px solid #e2e8f0;
      border-radius: 0.375rem;
      margin-bottom: 0.5rem;
      background-color: white;
    }

    .plan-info h3 {
      color: #1e293b;
      margin: 0;
      font-size: 1rem;
    }

    .plan-info p {
      color: #64748b;
      margin: 0.25rem 0;
      font-size: 0.875rem;
    }

    .questions-list {
      margin: 1rem 0;
      padding: 1rem;
      background-color: #f8fafc;
      border-radius: 0.375rem;
    }

    .question-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.75rem;
      font-size: 0.875rem;
      color: #4b5563;
    }

    .rating-input {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .rating-input input {
      width: 60px;
      padding: 0.25rem;
      border: 1px solid #e2e8f0;
      border-radius: 0.25rem;
      text-align: center;
    }

    .rating-input input:disabled {
      background-color: #f1f5f9;
      cursor: not-allowed;
    }

    .scale-info {
      color: #64748b;
      font-size: 0.75rem;
    }

    .submit-section {
      margin-top: 1rem;
      padding-top: 1rem;
      border-top: 1px solid #e2e8f0;
      display: flex;
      justify-content: flex-end;
    }

    .submit-btn {
      padding: 0.5rem 1rem;
      background-color: #3b82f6;
      color: white;
      border: none;
      border-radius: 0.375rem;
      cursor: pointer;
      font-size: 0.875rem;
      transition: background-color 0.2s;
    }

    .submit-btn:hover:not(:disabled) {
      background-color: #2563eb;
    }

    .submit-btn:disabled {
      background-color: #94a3b8;
      cursor: not-allowed;
    }

    .submitted-message {
      color: #16a34a;
      font-size: 0.875rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .check-icon {
      color: #16a34a;
      font-weight: bold;
    }

    .assignment-details {
      margin-top: 1rem;
    }

    .dates {
      color: #4b5563;
      margin: 0 0 0.5rem 0;
      font-size: 0.875rem;
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

    .no-plans {
      text-align: center;
      color: #64748b;
      font-style: italic;
      padding: 2rem;
    }
  `]
})
export class PatientActionPlansComponent {
  @Input() patientId!: string;

  plans: ActionPlan[] = [
    {
      id: 1,
      title: 'Daily Mood Assessment',
      description: 'Track your daily mood and symptoms',
      status: 'active',
      questions: [
        { id: 1, text: 'How would you rate your anxiety level today?' },
        { id: 2, text: 'How would you rate your mood today?' },
        { id: 3, text: 'How would you rate your sleep quality?' },
        { id: 4, text: 'How would you rate your energy level?' }
      ],
      isSubmitted: false,
      assignmentDetails: {
        startDate: '2024-01-01',
        endDate: '2024-02-01',
        reminderTimes: ['morning', 'night']
      }
    }
  ];

  validateRating(event: Event, question: { id: number; text: string; rating?: number }) {
    const input = event.target as HTMLInputElement;
    let value = parseInt(input.value);
    
    if (isNaN(value)) {
      value = 1;
    } else if (value > 10) {
      value = 10;
    } else if (value < 1) {
      value = 1;
    }
    
    question.rating = value;
    input.value = value.toString();
  }

  areAllQuestionsAnswered(plan: ActionPlan): boolean {
    return plan.questions?.every(q => 
      q.rating !== undefined && 
      q.rating >= 1 && 
      q.rating <= 10
    ) ?? false;
  }

  submitPlan(plan: ActionPlan) {
    if (!this.areAllQuestionsAnswered(plan)) return;

    // Here you would typically make an API call to save the responses
    console.log(`Submitting responses for plan ${plan.id}:`, plan.questions);
    
    plan.isSubmitted = true;
    plan.status = 'completed';
  }
}