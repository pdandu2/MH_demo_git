import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Medication {
  id: number;
  name: string;
  dosage: string;
  frequency: {
    morning: boolean;
    afternoon: boolean;
    night: boolean;
  };
  timing: 'before' | 'after';
  startDate: string;
  endDate: string;
}

@Component({
  selector: 'app-medication',
  templateUrl: './medication.component.html',
  styleUrls: ['./medication.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class MedicationComponent {
  @Input() patientId: string = '';
  
  showAddForm = false;
  
  newMed = {
    name: '',
    frequency: {
      morning: false,
      afternoon: false,
      night: false
    },
    timing: 'before' as 'before' | 'after',
    startDate: '',
    endDate: ''
  };

  medications: Medication[] = [
    {
      id: 1,
      name: 'Sertraline 50mg',
      dosage: '50mg',
      frequency: {
        morning: true,
        afternoon: false,
        night: false
      },
      timing: 'after',
      startDate: '2024-01-15',
      endDate: '2024-04-15'
    },
    {
      id: 2,
      name: 'Melatonin 5mg',
      dosage: '5mg',
      frequency: {
        morning: false,
        afternoon: false,
        night: true
      },
      timing: 'before',
      startDate: '2024-01-15',
      endDate: '2024-02-15'
    }
  ];

  cancelAdd() {
    this.showAddForm = false;
    this.resetForm();
  }

  addMedication() {
    const newMedication: Medication = {
      id: Date.now(),
      name: this.newMed.name,
      dosage: this.newMed.name.split(' ')[1] || '',
      frequency: { ...this.newMed.frequency },
      timing: this.newMed.timing,
      startDate: this.newMed.startDate,
      endDate: this.newMed.endDate
    };

    this.medications.push(newMedication);
    this.showAddForm = false;
    this.resetForm();
  }

  resetForm() {
    this.newMed = {
      name: '',
      frequency: {
        morning: false,
        afternoon: false,
        night: false
      },
      timing: 'before',
      startDate: '',
      endDate: ''
    };
  }
}