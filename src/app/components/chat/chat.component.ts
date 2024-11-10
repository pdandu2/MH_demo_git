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
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
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