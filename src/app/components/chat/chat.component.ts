import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ChatMessage {
  id: string;
  patientId: string;
  patientName: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  isFromPatient: boolean;
}

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="chat-container" [class.open]="isOpen">
      <button class="chat-toggle" (click)="toggleChat()">
        <span class="material-icons">chat</span>
        @if (unreadCount > 0) {
          <span class="unread-badge">{{ unreadCount }}</span>
        }
      </button>

      <div class="chat-panel">
        <div class="chat-header">
          <h3>Messages</h3>
          <button class="close-btn" (click)="toggleChat()">×</button>
        </div>

        <div class="chat-content">
          @if (!selectedPatient) {
            <div class="patient-list">
              @for (patient of getUniquePatients(); track patient.patientId) {
                <div 
                  class="patient-item" 
                  [class.has-unread]="hasUnreadMessages(patient.patientId)"
                  (click)="selectPatient(patient.patientId)"
                >
                  <div class="patient-info">
                    <span class="patient-name">{{ patient.patientName }}</span>
                    <span class="patient-id">ID: {{ patient.patientId }}</span>
                  </div>
                  @if (hasUnreadMessages(patient.patientId)) {
                    <span class="unread-indicator"></span>
                  }
                </div>
              }
            </div>
          } @else {
            <div class="chat-messages">
              <div class="chat-header">
                <button class="back-btn" (click)="selectedPatient = null">←</button>
                <div class="selected-patient">
                  <span class="patient-name">{{ getPatientName(selectedPatient) }}</span>
                  <span class="patient-id">ID: {{ selectedPatient }}</span>
                </div>
              </div>
              
              <div class="messages-container">
                @for (msg of getPatientMessages(selectedPatient); track msg.id) {
                  <div 
                    class="message" 
                    [class.from-patient]="msg.isFromPatient"
                    [class.from-provider]="!msg.isFromPatient"
                  >
                    <div class="message-content">{{ msg.message }}</div>
                    <div class="message-time">
                      {{ msg.timestamp | date:'short' }}
                    </div>
                  </div>
                }
              </div>

              <div class="message-input">
                <input 
                  type="text" 
                  [(ngModel)]="newMessage" 
                  (keyup.enter)="sendMessage()"
                  placeholder="Type a message..."
                >
                <button (click)="sendMessage()">Send</button>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  `,
  styles: [`
    .chat-container {
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      z-index: 1000;
    }

    .chat-toggle {
      width: 3.5rem;
      height: 3.5rem;
      border-radius: 50%;
      background-color: #3b82f6;
      color: white;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .unread-badge {
      position: absolute;
      top: -5px;
      right: -5px;
      background-color: #ef4444;
      color: white;
      border-radius: 50%;
      width: 20px;
      height: 20px;
      font-size: 0.75rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .chat-panel {
      position: absolute;
      bottom: 4.5rem;
      right: 0;
      width: 320px;
      height: 480px;
      background-color: white;
      border-radius: 0.5rem;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      display: none;
      flex-direction: column;
    }

    .chat-container.open .chat-panel {
      display: flex;
    }

    .chat-header {
      padding: 1rem;
      border-bottom: 1px solid #e2e8f0;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .chat-content {
      flex: 1;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }

    .patient-list {
      overflow-y: auto;
      flex: 1;
    }

    .patient-item {
      padding: 1rem;
      border-bottom: 1px solid #e2e8f0;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .patient-item:hover {
      background-color: #f8fafc;
    }

    .patient-info {
      display: flex;
      flex-direction: column;
    }

    .patient-name {
      font-weight: 500;
      color: #1e293b;
    }

    .patient-id {
      font-size: 0.75rem;
      color: #64748b;
    }

    .unread-indicator {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: #3b82f6;
    }

    .chat-messages {
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .messages-container {
      flex: 1;
      overflow-y: auto;
      padding: 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .message {
      max-width: 80%;
      padding: 0.5rem 1rem;
      border-radius: 1rem;
      margin-bottom: 0.5rem;
    }

    .from-patient {
      align-self: flex-start;
      background-color: #f1f5f9;
    }

    .from-provider {
      align-self: flex-end;
      background-color: #3b82f6;
      color: white;
    }

    .message-time {
      font-size: 0.75rem;
      opacity: 0.7;
      margin-top: 0.25rem;
    }

    .message-input {
      padding: 1rem;
      border-top: 1px solid #e2e8f0;
      display: flex;
      gap: 0.5rem;
    }

    .message-input input {
      flex: 1;
      padding: 0.5rem;
      border: 1px solid #e2e8f0;
      border-radius: 0.375rem;
    }

    .message-input button {
      padding: 0.5rem 1rem;
      background-color: #3b82f6;
      color: white;
      border: none;
      border-radius: 0.375rem;
      cursor: pointer;
    }

    .back-btn {
      padding: 0.5rem;
      background: none;
      border: none;
      cursor: pointer;
      color: #64748b;
    }

    .selected-patient {
      display: flex;
      flex-direction: column;
    }
  `]
})
export class ChatComponent implements OnInit {
  isOpen = false;
  selectedPatient: string | null = null;
  newMessage = '';
  unreadCount = 0;

  // Example messages
  messages: ChatMessage[] = [
    {
      id: '1',
      patientId: 'PAT12345',
      patientName: 'John Doe',
      message: 'Hello, I have a question about my medication.',
      timestamp: new Date(),
      isRead: false,
      isFromPatient: true
    },
    {
      id: '2',
      patientId: 'PAT67890',
      patientName: 'Jane Smith',
      message: 'When is my next appointment?',
      timestamp: new Date(),
      isRead: false,
      isFromPatient: true
    }
  ];

  ngOnInit() {
    this.updateUnreadCount();
  }

  toggleChat() {
    this.isOpen = !this.isOpen;
  }

  getUniquePatients() {
    const patients = new Map();
    this.messages.forEach(msg => {
      if (!patients.has(msg.patientId)) {
        patients.set(msg.patientId, {
          patientId: msg.patientId,
          patientName: msg.patientName
        });
      }
    });
    return Array.from(patients.values());
  }

  hasUnreadMessages(patientId: string): boolean {
    return this.messages.some(msg => 
      msg.patientId === patientId && !msg.isRead && msg.isFromPatient
    );
  }

  getPatientMessages(patientId: string): ChatMessage[] {
    return this.messages.filter(msg => msg.patientId === patientId);
  }

  getPatientName(patientId: string): string {
    const patient = this.messages.find(msg => msg.patientId === patientId);
    return patient?.patientName || '';
  }

  selectPatient(patientId: string) {
    this.selectedPatient = patientId;
    // Mark messages as read
    this.messages = this.messages.map(msg => {
      if (msg.patientId === patientId && !msg.isRead) {
        return { ...msg, isRead: true };
      }
      return msg;
    });
    this.updateUnreadCount();
  }

  sendMessage() {
    if (!this.newMessage.trim() || !this.selectedPatient) return;

    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      patientId: this.selectedPatient,
      patientName: this.getPatientName(this.selectedPatient),
      message: this.newMessage,
      timestamp: new Date(),
      isRead: true,
      isFromPatient: false
    };

    this.messages.push(newMsg);
    this.newMessage = '';
  }

  updateUnreadCount() {
    this.unreadCount = this.messages.filter(msg => !msg.isRead && msg.isFromPatient).length;
  }
}