import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PatientListComponent } from './patient-list.component';
import { PatientService } from '../../services/patient.service';
import { of } from 'rxjs';

describe('PatientListComponent', () => {
  let component: PatientListComponent;
  let fixture: ComponentFixture<PatientListComponent>;
  let patientService: jasmine.SpyObj<PatientService>;

  const mockPatients = [
    { id: 1, name: 'John Doe', lastAssessment: '2024-01-15', score: 15 },
    { id: 2, name: 'Jane Smith', lastAssessment: '2024-01-14', score: 8 }
  ];

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('PatientService', ['getPatients', 'searchPatients']);
    spy.getPatients.and.returnValue(of(mockPatients));

    await TestBed.configureTestingModule({
      imports: [PatientListComponent, RouterTestingModule],
      providers: [
        { provide: PatientService, useValue: spy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PatientListComponent);
    component = fixture.componentInstance;
    patientService = TestBed.inject(PatientService) as jasmine.SpyObj<PatientService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load patients on init', () => {
    expect(component.filteredPatients).toEqual(mockPatients);
  });

  it('should toggle sort direction', () => {
    expect(component.sortDirection).toBe('desc');
    component.toggleSort();
    expect(component.sortDirection).toBe('asc');
  });

  it('should get correct score class', () => {
    expect(component.getScoreClass(15)).toBe('score-high');
    expect(component.getScoreClass(8)).toBe('score-medium');
    expect(component.getScoreClass(3)).toBe('score-low');
  });

  it('should emit selected patient', () => {
    spyOn(component.patientSelected, 'emit');
    component.selectPatient(mockPatients[0]);
    expect(component.patientSelected.emit).toHaveBeenCalledWith('1');
  });
});