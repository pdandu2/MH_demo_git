import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ChatMessage {
  id: string;
  providerId: string;
  providerName: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  isFromProvider: boolean;
}

interface Provider {
  id: string;
  name: string;
  unreadCount: number;
}

@Component({
  selector: 'app-patient-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="chat-container" [class.open]="isOpen">
      <button class="chat-toggle" (click)="toggleChat()">
        <span class="material-icons">chat</span>
        @if (totalUnreadCount > 0) {
          <span class="unread-badge">{{ totalUnreadCount }}</span>
        }
      </button>

      <div class="chat-panel">
        <div class="chat-header">
          <h3>Messages with Providers</h3>
          <button class="close-btn" (click)="toggleChat()">×</button>
        </div>

        <div class="chat-content">
          @if (!selectedProvider) {
            <div class="provider-list">
              @for (provider of providers; track provider.id) {
                <div 
                  class="provider-item" 
                  [class.has-unread]="provider.unreadCount > 0"
                  (click)="selectProvider(provider)"
                >
                  <div class="provider-info">
                    <span class="provider-name">{{ provider.name }}</span>
                  </div>
                  @if (provider.unreadCount > 0) {
                    <span class="unread-indicator">{{ provider.unreadCount }}</span>
                  }
                </div>
              }
            </div>
          } @else {
            <div class="chat-messages">
              <div class="chat-header">
                <button class="back-btn" (click)="selectedProvider = null">←</button>
                <div class="selected-provider">
                  <span class="provider-name">{{ selectedProvider.name }}</span>
                </div>
              </div>
              
              <div class="messages-container">
                @for (msg of getProviderMessages(selectedProvider.id); track msg.id) {
                  <div 
                    class="message" 
                    [class.from-provider]="msg.isFromProvider"
                    [class.from-patient]="!msg.isFromProvider"
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

    .provider-list {
      overflow-y: auto;
      flex: 1;
    }

    .provider-item {
      padding: 1rem;
      border-bottom: 1px solid #e2e8f0;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .provider-item:hover {
      background-color: #f8fafc;
    }

    .provider-info {
      display: flex;
      flex-direction: column;
    }

    .provider-name {
      font-weight: 500;
      color: #1e293b;
    }

    .unread-indicator {
      background-color: #3b82f6;
      color: white;
      border-radius: 50%;
      width: 20px;
      height: 20px;
      font-size: 0.75rem;
      display: flex;
      align-items: center;
      justify-content: center;
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

    .from-provider {
      align-self: flex-start;
      background-color: #f1f5f9;
    }

    .from-patient {
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

    .selected-provider {
      display: flex;
      flex-direction: column;
    }
  `]
})
export class PatientChatComponent {
  @Input() patientId!: string;
  
  isOpen = false;
  selectedProvider: Provider | null = null;
  newMessage = '';
  totalUnreadCount = 0;

  providers: Provider[] = [
    { id: '1', name: 'Dr. Sarah Williams', unreadCount: 2 },
    { id: '2', name: 'Dr. Michael Chen', unreadCount: 1 }
  ];

  messages: ChatMessage[] = [
    {
      id: '1',
      providerId: '1',
      providerName: 'Dr. Sarah Williams',
      message: 'How are you feeling today?',
      timestamp: new Date(),
      isRead: false,
      isFromProvider: true
    },
    {
      id: '2',
      providerId: '2',
      providerName: 'Dr. Michael Chen',
      message: 'Remember to complete your daily assessment.',
      timestamp: new Date(),
      isRead: false,
      isFromProvider: true
    }
  ];

  toggleChat() {
    this.isOpen = !this.isOpen;
  }

  selectProvider(provider: Provider) {
    this.selectedProvider = provider;
    // Mark messages as read
    this.messages = this.messages.map(msg => {
      if (msg.providerId === provider.id && !msg.isRead) {
        return { ...msg, isRead: true };
      }
      return msg;
    });
    this.updateUnreadCounts();
  }

  getProviderMessages(providerId: string): ChatMessage[] {
    return this.messages.filter(msg => msg.providerId === providerId);
  }

  sendMessage() {
    if (!this.newMessage.trim() || !this.selectedProvider) return;

    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      providerId: this.selectedProvider.id,
      providerName: this.selectedProvider.name,
      message: this.newMessage,
      timestamp: new Date(),
      isRead: true,
      isFromProvider: false
    };

    this.messages.push(newMsg);
    this.newMessage = '';
  }

  updateUnreadCounts() {
    // Update unread counts for each provider
    this.providers = this.providers.map(provider => ({
      ...provider,
      unreadCount: this.messages.filter(
        msg => msg.providerId === provider.id && !msg.isRead && msg.isFromProvider
      ).length
    }));

    // Update total unread count
    this.totalUnreadCount = this.providers.reduce(
      (total, provider) => total + provider.unreadCount,
      0
    );
  }
}