import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatComponent } from './chat.component';

describe('ChatComponent', () => {
  let component: ChatComponent;
  let fixture: ComponentFixture<ChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with closed chat', () => {
    expect(component.isOpen).toBeFalse();
  });

  it('should toggle chat visibility', () => {
    component.toggleChat();
    expect(component.isOpen).toBeTrue();
    component.toggleChat();
    expect(component.isOpen).toBeFalse();
  });

  it('should get unique patients', () => {
    const patients = component.getUniquePatients();
    expect(patients.length).toBe(2);
    expect(patients[0].patientName).toBe('John Doe');
    expect(patients[1].patientName).toBe('Jane Smith');
  });

  it('should detect unread messages', () => {
    expect(component.hasUnreadMessages('PAT12345')).toBeTrue();
  });

  it('should filter messages by patient', () => {
    const messages = component.getPatientMessages('PAT12345');
    expect(messages.length).toBe(1);
    expect(messages[0].patientName).toBe('John Doe');
  });

  it('should mark messages as read when selecting patient', () => {
    component.selectPatient('PAT12345');
    expect(component.hasUnreadMessages('PAT12345')).toBeFalse();
  });

  it('should send new message', () => {
    component.selectedPatient = 'PAT12345';
    component.newMessage = 'Test message';
    const initialCount = component.messages.length;
    
    component.sendMessage();
    
    expect(component.messages.length).toBe(initialCount + 1);
    expect(component.newMessage).toBe('');
  });

  it('should not send empty message', () => {
    component.selectedPatient = 'PAT12345';
    component.newMessage = '';
    const initialCount = component.messages.length;
    
    component.sendMessage();
    
    expect(component.messages.length).toBe(initialCount);
  });
});