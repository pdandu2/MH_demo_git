import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JournalComponent } from './journal.component';

describe('JournalComponent', () => {
  let component: JournalComponent;
  let fixture: ComponentFixture<JournalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JournalComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(JournalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with journal entries', () => {
    expect(component.entries.length).toBe(3);
  });

  it('should display entries with correct mood colors', () => {
    const goodEntry = component.entries.find(e => e.mood === 'Good');
    const fairEntry = component.entries.find(e => e.mood === 'Fair');
    const excellentEntry = component.entries.find(e => e.mood === 'Excellent');

    expect(goodEntry?.moodColor).toBe('#16a34a');
    expect(fairEntry?.moodColor).toBe('#d97706');
    expect(excellentEntry?.moodColor).toBe('#059669');
  });

  it('should accept selectedPatientId input', () => {
    component.selectedPatientId = '123';
    expect(component.selectedPatientId).toBe('123');
  });
});