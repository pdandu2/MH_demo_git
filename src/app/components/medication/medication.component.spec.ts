import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MedicationComponent } from './medication.component';

describe('MedicationComponent', () => {
  let component: MedicationComponent;
  let fixture: ComponentFixture<MedicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedicationComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MedicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with medications', () => {
    expect(component.medications.length).toBe(2);
  });

  it('should show add form when clicking add button', () => {
    expect(component.showAddForm).toBeFalse();
    component.showAddForm = true;
    expect(component.showAddForm).toBeTrue();
  });

  it('should reset form on cancel', () => {
    component.newMed.name = 'Test Med';
    component.newMed.frequency.morning = true;
    component.cancelAdd();
    expect(component.showAddForm).toBeFalse();
    expect(component.newMed.name).toBe('');
    expect(component.newMed.frequency.morning).toBeFalse();
  });

  it('should add new medication', () => {
    const initialCount = component.medications.length;
    component.newMed = {
      name: 'Test Med 10mg',
      frequency: {
        morning: true,
        afternoon: false,
        night: false
      },
      timing: 'before',
      startDate: '2024-01-20',
      endDate: '2024-02-20'
    };

    component.addMedication();

    expect(component.medications.length).toBe(initialCount + 1);
    const newMed = component.medications[component.medications.length - 1];
    expect(newMed.name).toBe('Test Med 10mg');
    expect(newMed.dosage).toBe('10mg');
    expect(newMed.frequency.morning).toBeTrue();
    expect(newMed.timing).toBe('before');
  });

  it('should accept patientId input', () => {
    component.patientId = '123';
    expect(component.patientId).toBe('123');
  });
});