import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActionPlansComponent } from './action-plans.component';
import { ActionPlanCardComponent } from './action-plan-card.component';

describe('ActionPlansComponent', () => {
  let component: ActionPlansComponent;
  let fixture: ComponentFixture<ActionPlansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActionPlansComponent, ActionPlanCardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ActionPlansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default plans', () => {
    expect(component.plans.length).toBe(3);
  });

  it('should toggle assignment form', () => {
    const plan = component.plans[0];
    component.toggleAssignment(plan);
    expect(component.showAssignForm).toBeTrue();
    expect(component.selectedPlan).toBe(plan);
  });

  it('should toggle questions visibility', () => {
    const plan = component.plans[0];
    component.toggleQuestions(plan);
    expect(plan.showQuestions).toBeTrue();
    component.toggleQuestions(plan);
    expect(plan.showQuestions).toBeFalse();
  });

  it('should validate assignment form', () => {
    expect(component.isAssignmentValid()).toBeFalse();
    
    component.assignmentDetails = {
      startDate: '2024-01-01',
      endDate: '2024-02-01',
      reminderTime: ['morning']
    };
    
    expect(component.isAssignmentValid()).toBeTrue();
  });

  it('should handle reminder time selection', () => {
    component.toggleReminderTime('morning');
    expect(component.assignmentDetails.reminderTime).toContain('morning');
    
    component.toggleReminderTime('morning');
    expect(component.assignmentDetails.reminderTime).not.toContain('morning');
  });

  it('should reset form on cancel', () => {
    component.assignmentDetails = {
      startDate: '2024-01-01',
      endDate: '2024-02-01',
      reminderTime: ['morning']
    };
    component.selectedPlan = component.plans[0];
    component.showAssignForm = true;

    component.cancelAssignment();

    expect(component.showAssignForm).toBeFalse();
    expect(component.selectedPlan).toBeNull();
    expect(component.assignmentDetails.startDate).toBe('');
    expect(component.assignmentDetails.endDate).toBe('');
    expect(component.assignmentDetails.reminderTime.length).toBe(0);
  });
});