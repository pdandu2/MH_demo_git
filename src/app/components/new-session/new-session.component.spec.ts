import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NewSessionComponent } from './new-session.component';
import { Router } from '@angular/router';

describe('NewSessionComponent', () => {
  let component: NewSessionComponent;
  let fixture: ComponentFixture<NewSessionComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewSessionComponent, RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(NewSessionComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty form', () => {
    expect(component.selectedPatient).toBeNull();
    expect(component.sessionData.date).toBe('');
    expect(component.sessionData.time).toBe('');
    expect(component.sessionData.type).toBe('');
    expect(component.sessionData.notes).toBe('');
  });

  it('should filter patients based on search term', () => {
    component.searchTerm = 'john';
    component.searchPatients();
    expect(component.filteredPatients.length).toBe(1);
    expect(component.filteredPatients[0].name).toBe('John Doe');
  });

  it('should select patient and clear search', () => {
    const patient = { id: 1, name: 'John Doe' };
    component.searchTerm = 'john';
    component.filteredPatients = [patient];
    
    component.selectPatient(patient);
    
    expect(component.selectedPatient).toBe(patient);
    expect(component.searchTerm).toBe('');
    expect(component.filteredPatients.length).toBe(0);
  });

  it('should validate form correctly', () => {
    expect(component.isFormValid()).toBeFalse();

    component.selectedPatient = { id: 1, name: 'John Doe' };
    component.sessionData = {
      date: '2024-01-20',
      time: '10:00',
      type: 'initial',
      notes: 'Test notes'
    };

    expect(component.isFormValid()).toBeTrue();
  });

  it('should show error for invalid form submission', () => {
    component.scheduleSession();
    expect(component.error).toBe('Please fill in all required fields');
  });

  it('should navigate back to dashboard', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.goBack();
    expect(navigateSpy).toHaveBeenCalledWith(['/dashboard']);
  });
});