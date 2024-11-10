import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-session',
  templateUrl: './new-session.component.html',
  styleUrls: ['./new-session.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class NewSessionComponent {
  searchTerm = '';
  selectedPatient: any = null;
  error = '';
  minDate = new Date().toISOString().split('T')[0];

  sessionData = {
    date: '',
    time: '',
    type: '',
    notes: ''
  };

  // Example patients data
  patients = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Mike Johnson' },
    { id: 4, name: 'Sarah Williams' },
    { id: 5, name: 'David Brown' }
  ];

  filteredPatients: any[] = [];

  constructor(private router: Router) {}

  searchPatients() {
    if (!this.searchTerm.trim()) {
      this.filteredPatients = [];
      return;
    }

    const search = this.searchTerm.toLowerCase();
    this.filteredPatients = this.patients.filter(patient => 
      patient.name.toLowerCase().includes(search) ||
      `PAT${patient.id.toString().padStart(5, '0')}`.toLowerCase().includes(search)
    );
  }

  selectPatient(patient: any) {
    this.selectedPatient = patient;
    this.searchTerm = '';
    this.filteredPatients = [];
  }

  isFormValid(): boolean {
    return !!(
      this.selectedPatient &&
      this.sessionData.date &&
      this.sessionData.time &&
      this.sessionData.type
    );
  }

  scheduleSession() {
    if (!this.isFormValid()) {
      this.error = 'Please fill in all required fields';
      return;
    }

    // Here you would typically make an API call to schedule the session
    console.log('Session scheduled:', {
      patient: this.selectedPatient,
      ...this.sessionData
    });

    this.router.navigate(['/dashboard']);
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }
}