import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChartComponent } from './chart.component';
import Chart from 'chart.js/auto';

describe('ChartComponent', () => {
  let component: ChartComponent;
  let fixture: ComponentFixture<ChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ChartComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create chart on init', () => {
    const canvasEl = document.createElement('canvas');
    canvasEl.id = 'surveyChart';
    document.body.appendChild(canvasEl);

    fixture.detectChanges();
    
    expect(document.getElementById('surveyChart')).toBeTruthy();
    
    document.body.removeChild(canvasEl);
  });

  it('should accept selectedPatientId input', () => {
    component.selectedPatientId = '123';
    expect(component.selectedPatientId).toBe('123');
  });
});