import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard">
      <header class="header">
        <h1>Patient Dashboard</h1>
        <button class="sign-out-btn" (click)="signOut()">Sign Out</button>
      </header>
      
      <div class="dashboard-content">
        <div class="card">
          <h2>Your Progress</h2>
          <p>Welcome to your mental health journey.</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard {
      padding: 2rem;
      background-color: #f8fafc;
      min-height: 100vh;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }

    h1 {
      color: #1e293b;
      font-size: 2rem;
      font-weight: 600;
    }

    .sign-out-btn {
      padding: 0.5rem 1rem;
      background-color: #ef4444;
      color: white;
      border: none;
      border-radius: 0.375rem;
      cursor: pointer;
    }

    .sign-out-btn:hover {
      background-color: #dc2626;
    }

    .dashboard-content {
      display: grid;
      gap: 1.5rem;
    }

    .card {
      background: white;
      padding: 1.5rem;
      border-radius: 0.5rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    h2 {
      color: #1e293b;
      margin-bottom: 1rem;
    }
  `]
})
export class PatientDashboardComponent {
  constructor(private router: Router) {}

  signOut() {
    this.router.navigate(['/']);
  }
}