import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActionPlanCardComponent, ActionPlan } from './action-plan-card.component';

@Component({
  selector: 'app-action-plans',
  templateUrl: './action-plans.component.html',
  styleUrls: ['./action-plans.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ActionPlanCardComponent]
})
export class ActionPlansComponent {
  @Input() selectedPatientId: string = '';

  showAssignForm = false;
  selectedPlan: ActionPlan | null = null;
  currentDate = new Date().toISOString().split('T')[0];
  
  reminderTimes = ['morning', 'afternoon', 'evening', 'night'] as const;
  
  assignmentDetails = {
    startDate: '',
    endDate: '',
    reminderTime: [] as typeof this.reminderTimes[number][]
  };

  plans: ActionPlan[] = [
    { 
      id: 1, 
      title: 'Clinical Disorders Assessment', 
      description: 'Daily assessment of clinical disorder symptoms',
      status: 'active',
      showQuestions: false,
      questions: [
        { id: 1, text: 'Little interest or pleasure in doing things' },
        { id: 2, text: 'Feeling down, depressed, or hopeless' },
        { id: 3, text: 'Trouble falling or staying asleep, or sleeping too much' },
        { id: 4, text: 'Feeling tired or having little energy' },
        { id: 5, text: 'Poor appetite or overeating' },
        { id: 6, text: 'Feeling bad about yourself—or that you are a failure or have let yourself or your family down' },
        { id: 7, text: 'Trouble concentrating on things, such as reading the newspaper or watching television' },
        { id: 8, text: 'Thoughts that you would be better off dead or of hurting yourself' }
      ]
    },
    { 
      id: 2, 
      title: 'Sleep Hygiene', 
      description: 'Structured bedtime routine',
      status: 'pending',
      showQuestions: false
    },
    { 
      id: 3, 
      title: 'Exercise Routine', 
      description: '30-minute daily walking',
      status: 'completed',
      showQuestions: false
    }
  ];

  toggleAssignment(plan: ActionPlan) {
    if (plan.assignedTo === (this.selectedPatientId ? +this.selectedPatientId : null)) {
      plan.assignedTo = undefined;
      plan.assignmentDetails = undefined;
    } else {
      this.selectedPlan = plan;
      this.showAssignForm = true;
    }
  }

  toggleQuestions(plan: ActionPlan) {
    plan.showQuestions = !plan.showQuestions;
  }

  isTimeSelected(time: string): boolean {
    return this.assignmentDetails.reminderTime.includes(time as any);
  }

  toggleReminderTime(time: typeof this.reminderTimes[number]) {
    const index = this.assignmentDetails.reminderTime.indexOf(time);
    if (index === -1) {
      this.assignmentDetails.reminderTime.push(time);
    } else {
      this.assignmentDetails.reminderTime.splice(index, 1);
    }
  }

  isAssignmentValid(): boolean {
    return !!(
      this.assignmentDetails.startDate &&
      this.assignmentDetails.endDate &&
      this.assignmentDetails.reminderTime.length > 0
    );
  }

  confirmAssignment() {
    if (this.selectedPlan && this.isAssignmentValid() && this.selectedPatientId) {
      this.selectedPlan.assignedTo = +this.selectedPatientId;
      this.selectedPlan.assignmentDetails = {
        startDate: this.assignmentDetails.startDate,
        endDate: this.assignmentDetails.endDate,
        reminderTimes: [...this.assignmentDetails.reminderTime]
      };
      this.cancelAssignment();
    }
  }

  cancelAssignment() {
    this.showAssignForm = false;
    this.selectedPlan = null;
    this.assignmentDetails = {
      startDate: '',
      endDate: '',
      reminderTime: []
    };
  }
}