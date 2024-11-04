import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface PatientDetails {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  legalSex: string;
  address: string;
  aptNumber: string;
  zipcode: string;
  homePhone: string;
  workPhone: string;
  email: string;
  maritalStatus: string;
  race: string;
  language: string;
  religion: string;
  emergencyContact: {
    name: string;
    relation: string;
    phone: string;
  };
}

@Component({
  selector: 'app-patient-details',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="patient-details">
      <header class="header">
        <button class="back-btn" (click)="goBack()">← Back to Dashboard</button>
        <h1>Patient Details</h1>
      </header>

      <div class="details-grid">
        <div class="details-card personal-info">
          <h2>Personal Information</h2>
          <div class="info-grid">
            <div class="info-item">
              <label>First Name</label>
              <p>{{ patient.firstName }}</p>
            </div>
            <div class="info-item">
              <label>Last Name</label>
              <p>{{ patient.lastName }}</p>
            </div>
            <div class="info-item">
              <label>Age</label>
              <p>{{ patient.age }}</p>
            </div>
            <div class="info-item">
              <label>Legal Sex</label>
              <p>{{ patient.legalSex }}</p>
            </div>
          </div>
        </div>

        <div class="details-card contact-info">
          <h2>Contact Information</h2>
          <div class="info-grid">
            <div class="info-item">
              <label>Home Address</label>
              <p>{{ patient.address }}</p>
            </div>
            <div class="info-item">
              <label>APT Number</label>
              <p>{{ patient.aptNumber }}</p>
            </div>
            <div class="info-item">
              <label>Zipcode</label>
              <p>{{ patient.zipcode }}</p>
            </div>
            <div class="info-item">
              <label>Home Phone</label>
              <p>{{ patient.homePhone }}</p>
            </div>
            <div class="info-item">
              <label>Work Phone</label>
              <p>{{ patient.workPhone }}</p>
            </div>
            <div class="info-item">
              <label>Email</label>
              <p>{{ patient.email }}</p>
            </div>
          </div>
        </div>

        <div class="details-card demographic-info">
          <h2>Demographic Information</h2>
          <div class="info-grid">
            <div class="info-item">
              <label>Marital Status</label>
              <p>{{ patient.maritalStatus }}</p>
            </div>
            <div class="info-item">
              <label>Race</label>
              <p>{{ patient.race }}</p>
            </div>
            <div class="info-item">
              <label>Language</label>
              <p>{{ patient.language }}</p>
            </div>
            <div class="info-item">
              <label>Religion</label>
              <p>{{ patient.religion }}</p>
            </div>
          </div>
        </div>

        <div class="details-card emergency-info">
          <h2>Emergency Contact</h2>
          <div class="info-grid">
            <div class="info-item">
              <label>Name</label>
              <p>{{ patient.emergencyContact.name }}</p>
            </div>
            <div class="info-item">
              <label>Relation</label>
              <p>{{ patient.emergencyContact.relation }}</p>
            </div>
            <div class="info-item">
              <label>Phone</label>
              <p>{{ patient.emergencyContact.phone }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .patient-details {
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

    .details-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
    }

    .details-card {
      background: white;
      padding: 1.5rem;
      border-radius: 0.5rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    h2 {
      color: #1e293b;
      font-size: 1.25rem;
      margin-bottom: 1rem;
      padding-bottom: 0.5rem;
      border-bottom: 2px solid #e2e8f0;
    }

    .info-grid {
      display: grid;
      gap: 1rem;
    }

    .info-item {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    label {
      color: #64748b;
      font-size: 0.875rem;
    }

    p {
      color: #1e293b;
      font-size: 1rem;
      margin: 0;
    }
  `]
})
export class PatientDetailsComponent {
  patient: PatientDetails = {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    age: 35,
    legalSex: 'Male',
    address: '123 Main Street',
    aptNumber: '4B',
    zipcode: '10001',
    homePhone: '(555) 123-4567',
    workPhone: '(555) 987-6543',
    email: 'john.doe@email.com',
    maritalStatus: 'Married',
    race: 'Caucasian',
    language: 'English',
    religion: 'Christian',
    emergencyContact: {
      name: 'Jane Doe',
      relation: 'Spouse',
      phone: '(555) 789-0123'
    }
  };

  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['/dashboard']);
  }
}