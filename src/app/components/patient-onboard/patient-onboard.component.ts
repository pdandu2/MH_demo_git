import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-onboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="onboard-container">
      <header class="header">
        <button class="back-btn" (click)="goBack()">← Back to Dashboard</button>
        <h1>New Patient Onboarding</h1>
      </header>

      <form (ngSubmit)="onSubmit()" class="onboard-form">
        <div class="form-section">
          <h2>Personal Information</h2>
          <div class="form-grid">
            <div class="form-group">
              <label for="firstName">First Name *</label>
              <input type="text" id="firstName" [(ngModel)]="formData.firstName" name="firstName" required>
            </div>
            <div class="form-group">
              <label for="lastName">Last Name *</label>
              <input type="text" id="lastName" [(ngModel)]="formData.lastName" name="lastName" required>
            </div>
            <div class="form-group">
              <label for="age">Age *</label>
              <input type="number" id="age" [(ngModel)]="formData.age" name="age" required>
            </div>
            <div class="form-group">
              <label for="legalSex">Legal Sex *</label>
              <select id="legalSex" [(ngModel)]="formData.legalSex" name="legalSex" required>
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
        </div>

        <div class="form-section">
          <h2>Contact Information</h2>
          <div class="form-grid">
            <div class="form-group">
              <label for="address">Home Address *</label>
              <input type="text" id="address" [(ngModel)]="formData.address" name="address" required>
            </div>
            <div class="form-group">
              <label for="aptNumber">APT Number</label>
              <input type="text" id="aptNumber" [(ngModel)]="formData.aptNumber" name="aptNumber">
            </div>
            <div class="form-group">
              <label for="zipcode">Zipcode *</label>
              <input type="text" id="zipcode" [(ngModel)]="formData.zipcode" name="zipcode" required>
            </div>
            <div class="form-group">
              <label for="homePhone">Home Phone</label>
              <input type="tel" id="homePhone" [(ngModel)]="formData.homePhone" name="homePhone">
            </div>
            <div class="form-group">
              <label for="workPhone">Work Phone</label>
              <input type="tel" id="workPhone" [(ngModel)]="formData.workPhone" name="workPhone">
            </div>
            <div class="form-group">
              <label for="email">Email *</label>
              <input type="email" id="email" [(ngModel)]="formData.email" name="email" required>
            </div>
          </div>
        </div>

        <div class="form-section">
          <h2>Demographic Information</h2>
          <div class="form-grid">
            <div class="form-group">
              <label for="maritalStatus">Marital Status</label>
              <select id="maritalStatus" [(ngModel)]="formData.maritalStatus" name="maritalStatus">
                <option value="">Select</option>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="Divorced">Divorced</option>
                <option value="Widowed">Widowed</option>
              </select>
            </div>
            <div class="form-group">
              <label for="race">Race</label>
              <select id="race" [(ngModel)]="formData.race" name="race">
                <option value="">Select</option>
                <option value="Asian">Asian</option>
                <option value="Black">Black</option>
                <option value="Caucasian">Caucasian</option>
                <option value="Hispanic">Hispanic</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div class="form-group">
              <label for="language">Preferred Language *</label>
              <select id="language" [(ngModel)]="formData.language" name="language" required>
                <option value="">Select</option>
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div class="form-group">
              <label for="religion">Religion</label>
              <input type="text" id="religion" [(ngModel)]="formData.religion" name="religion">
            </div>
          </div>
        </div>

        <div class="form-section">
          <h2>Emergency Contact</h2>
          <div class="form-grid">
            <div class="form-group">
              <label for="emergencyName">Name *</label>
              <input type="text" id="emergencyName" [(ngModel)]="formData.emergencyContact.name" name="emergencyName" required>
            </div>
            <div class="form-group">
              <label for="emergencyRelation">Relation *</label>
              <input type="text" id="emergencyRelation" [(ngModel)]="formData.emergencyContact.relation" name="emergencyRelation" required>
            </div>
            <div class="form-group">
              <label for="emergencyPhone">Phone *</label>
              <input type="tel" id="emergencyPhone" [(ngModel)]="formData.emergencyContact.phone" name="emergencyPhone" required>
            </div>
          </div>
        </div>

        <div class="form-section">
          <h2>Login Credentials</h2>
          <div class="form-grid">
            <div class="form-group">
              <label for="username">Username *</label>
              <input type="text" id="username" [(ngModel)]="formData.credentials.username" name="username" required>
            </div>
            <div class="form-group">
              <label for="password">Password *</label>
              <input type="password" id="password" [(ngModel)]="formData.credentials.password" name="password" required>
            </div>
            <div class="form-group">
              <label for="confirmPassword">Confirm Password *</label>
              <input type="password" id="confirmPassword" [(ngModel)]="formData.credentials.confirmPassword" name="confirmPassword" required>
            </div>
          </div>
        </div>

        @if (error) {
          <div class="error-message">{{ error }}</div>
        }

        <div class="form-actions">
          <button type="button" class="cancel-btn" (click)="goBack()">Cancel</button>
          <button type="submit" class="submit-btn">Create Patient Account</button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .onboard-container {
      padding: 2rem;
      background-color: #f8fafc;
      min-height: 100vh;
    }

    .header {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 2rem;
    }

    .back-btn {
      padding: 0.5rem 1rem;
      background-color: #3b82f6;
      color: white;
      border: none;
      border-radius: 0.375rem;
      cursor: pointer;
      font-size: 0.875rem;
    }

    .back-btn:hover {
      background-color: #2563eb;
    }

    h1 {
      color: #1e293b;
      font-size: 1.5rem;
      font-weight: 600;
      margin: 0;
    }

    .onboard-form {
      max-width: 1200px;
      margin: 0 auto;
    }

    .form-section {
      background: white;
      padding: 1.5rem;
      border-radius: 0.5rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      margin-bottom: 1.5rem;
    }

    h2 {
      color: #1e293b;
      font-size: 1.25rem;
      margin-bottom: 1rem;
      padding-bottom: 0.5rem;
      border-bottom: 2px solid #e2e8f0;
    }

    .form-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1rem;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    label {
      color: #64748b;
      font-size: 0.875rem;
    }

    input, select {
      padding: 0.5rem;
      border: 1px solid #e2e8f0;
      border-radius: 0.375rem;
      font-size: 1rem;
    }

    input:focus, select:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }

    .error-message {
      color: #dc2626;
      background-color: #fee2e2;
      padding: 0.75rem;
      border-radius: 0.375rem;
      margin-bottom: 1rem;
    }

    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
      margin-top: 2rem;
    }

    .cancel-btn {
      padding: 0.75rem 1.5rem;
      background-color: white;
      color: #4b5563;
      border: 1px solid #e2e8f0;
      border-radius: 0.375rem;
      cursor: pointer;
      font-size: 0.875rem;
    }

    .cancel-btn:hover {
      background-color: #f8fafc;
    }

    .submit-btn {
      padding: 0.75rem 1.5rem;
      background-color: #3b82f6;
      color: white;
      border: none;
      border-radius: 0.375rem;
      cursor: pointer;
      font-size: 0.875rem;
    }

    .submit-btn:hover {
      background-color: #2563eb;
    }
  `]
})
export class PatientOnboardComponent {
  formData = {
    firstName: '',
    lastName: '',
    age: null,
    legalSex: '',
    address: '',
    aptNumber: '',
    zipcode: '',
    homePhone: '',
    workPhone: '',
    email: '',
    maritalStatus: '',
    race: '',
    language: '',
    religion: '',
    emergencyContact: {
      name: '',
      relation: '',
      phone: ''
    },
    credentials: {
      username: '',
      password: '',
      confirmPassword: ''
    }
  };

  error = '';

  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['/dashboard']);
  }

  onSubmit() {
    if (this.formData.credentials.password !== this.formData.credentials.confirmPassword) {
      this.error = 'Passwords do not match';
      return;
    }

    // Here you would typically make an API call to create the patient account
    console.log('Form submitted:', this.formData);
    this.router.navigate(['/dashboard']);
  }
}