import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="login-container">
      <div class="login-card">
        <h1>Mental Health Portal</h1>
        
        @if (!showLoginForm) {
          <div class="role-selection">
            <button (click)="selectRole('provider')" class="role-btn provider-btn">
              Login as Provider
            </button>
            <button (click)="selectRole('patient')" class="role-btn patient-btn">
              Login as Patient
            </button>
          </div>
        } @else {
          <div class="login-form">
            <h2>Login as {{ selectedRole | titlecase }}</h2>
            
            <div class="form-group">
              <label for="email">Email</label>
              <input 
                type="email" 
                id="email" 
                [(ngModel)]="email" 
                placeholder="demo@mail.com"
              >
            </div>
            
            <div class="form-group">
              <label for="password">Password</label>
              <input 
                type="password" 
                id="password" 
                [(ngModel)]="password" 
                placeholder="Enter password"
              >
            </div>

            @if (error) {
              <div class="error-message">{{ error }}</div>
            }
            
            <div class="form-actions">
              <button (click)="back()" class="back-btn">Back</button>
              <button (click)="login()" class="login-btn">Login</button>
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #f8fafc;
      padding: 1rem;
    }

    .login-card {
      background: white;
      padding: 2rem;
      border-radius: 0.5rem;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      width: 100%;
      max-width: 400px;
    }

    h1 {
      text-align: center;
      color: #1e293b;
      margin-bottom: 2rem;
      font-size: 1.5rem;
    }

    h2 {
      text-align: center;
      color: #1e293b;
      margin-bottom: 1.5rem;
      font-size: 1.25rem;
    }

    .role-selection {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .role-btn {
      padding: 1rem;
      border: none;
      border-radius: 0.375rem;
      font-size: 1rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;
    }

    .provider-btn {
      background-color: #3b82f6;
      color: white;
    }

    .provider-btn:hover {
      background-color: #2563eb;
    }

    .patient-btn {
      background-color: #10b981;
      color: white;
    }

    .patient-btn:hover {
      background-color: #059669;
    }

    .form-group {
      margin-bottom: 1rem;
    }

    label {
      display: block;
      margin-bottom: 0.5rem;
      color: #4b5563;
      font-size: 0.875rem;
    }

    input {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #e2e8f0;
      border-radius: 0.375rem;
      font-size: 1rem;
    }

    input:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }

    .error-message {
      color: #dc2626;
      font-size: 0.875rem;
      margin-bottom: 1rem;
    }

    .form-actions {
      display: flex;
      gap: 1rem;
      margin-top: 1.5rem;
    }

    .back-btn {
      flex: 1;
      padding: 0.5rem;
      border: 1px solid #e2e8f0;
      background-color: white;
      color: #4b5563;
      border-radius: 0.375rem;
      cursor: pointer;
    }

    .back-btn:hover {
      background-color: #f8fafc;
    }

    .login-btn {
      flex: 2;
      padding: 0.5rem;
      border: none;
      background-color: #3b82f6;
      color: white;
      border-radius: 0.375rem;
      cursor: pointer;
    }

    .login-btn:hover {
      background-color: #2563eb;
    }
  `]
})
export class LoginComponent {
  showLoginForm = false;
  selectedRole = '';
  email = '';
  password = '';
  error = '';

  constructor(private router: Router) {}

  selectRole(role: string) {
    this.selectedRole = role;
    this.showLoginForm = true;
  }

  back() {
    this.showLoginForm = false;
    this.selectedRole = '';
    this.email = '';
    this.password = '';
    this.error = '';
  }

  login() {
    if (this.email === 'demo@mail.com' && this.password === 'demo') {
      if (this.selectedRole === 'provider') {
        this.router.navigate(['/dashboard']);
      } else {
        this.router.navigate(['/patient-dashboard']);
      }
    } else {
      this.error = 'Invalid credentials. Use demo@mail.com / demo';
    }
  }
}