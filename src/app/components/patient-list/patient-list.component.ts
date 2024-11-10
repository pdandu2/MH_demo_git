import { Component, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PatientService, Patient } from '../../services/patient.service';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class PatientListComponent {
  @Input() disableSearch: boolean = false;
  @Output() patientSelected = new EventEmitter<string>();

  filteredPatients: Patient[] = [];
  searchTerm = '';
  sortDirection: 'asc' | 'desc' = 'desc';

  constructor(
    private router: Router,
    private patientService: PatientService
  ) {
    this.patientService.getPatients().subscribe(patients => {
      this.filteredPatients = patients;
      this.sortPatients();
    });
  }

  filterPatients() {
    if (!this.disableSearch) {
      this.patientService.searchPatients(this.searchTerm);
    }
  }

  toggleSort() {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.sortPatients();
  }

  sortPatients() {
    this.filteredPatients.sort((a, b) => {
      const multiplier = this.sortDirection === 'asc' ? 1 : -1;
      return (a.score - b.score) * multiplier;
    });
  }

  selectPatient(patient: Patient) {
    this.patientSelected.emit(patient.id.toString());
    this.router.navigate(['/patient', patient.id]);
  }

  getScoreClass(score: number): string {
    if (score >= 10) return 'score-high';
    if (score >= 5) return 'score-medium';
    return 'score-low';
  }

  onboardNewPatient() {
    this.router.navigate(['/patient-onboard']);
  }
}