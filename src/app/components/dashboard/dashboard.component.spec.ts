import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DashboardComponent } from './dashboard.component';
import { PatientService } from '../../services/patient.service';
import { Router } from '@angular/router';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let router: Router;
  let patientService: jasmine.SpyObj<PatientService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('PatientService', ['searchPatientsLocal']);
    
    await TestBed.configureTestingModule({
      imports: [DashboardComponent, RouterTestingModule],
      providers: [
        { provide: PatientService, useValue: spy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    patientService = TestBed.inject(PatientService) as jasmine.SpyObj<PatientService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default dates', () => {
    expect(component.startDate).toBeTruthy();
    expect(component.endDate).toBeTruthy();
  });

  it('should handle patient selection', () => {
    component.onPatientSelected('123');
    expect(component.selectedPatientId).toBe('123');
  });

  it('should search patients', () => {
    const mockPatients = [
      { id: 1, name: 'John Doe', lastAssessment: '2024-01-15', score: 5 }
    ];
    patientService.searchPatientsLocal.and.returnValue(mockPatients);

    component.patientSearch = 'John';
    component.onPatientSearchChange();

    expect(patientService.searchPatientsLocal).toHaveBeenCalledWith('John');
    expect(component.filteredPatients).toEqual(mockPatients);
  });

  it('should clear search when selecting progress patient', () => {
    const patient = { id: 1, name: 'John Doe', lastAssessment: '2024-01-15', score: 5 };
    component.patientSearch = 'John';
    component.filteredPatients = [patient];

    component.selectProgressPatient(patient);

    expect(component.selectedProgressPatient).toEqual(patient);
    expect(component.patientSearch).toBe('');
    expect(component.filteredPatients).toEqual([]);
  });

  it('should navigate to login on sign out', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.signOut();
    expect(navigateSpy).toHaveBeenCalledWith(['/']);
  });
});