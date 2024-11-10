import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Patient {
  id: number;
  name: string;
  lastAssessment: string;
  score: number;
  email: string;
  phone: string;
  address: string;
  dateOfBirth: string;
  gender: string;
  insuranceProvider: string;
  insuranceNumber: string;
  emergencyContact: {
    name: string;
    relation: string;
    phone: string;
  };
  medicalHistory: {
    conditions: string[];
    allergies: string[];
    medications: string[];
  };
  appointments: {
    date: string;
    time: string;
    type: string;
    provider: string;
  }[];
}

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private patients: Patient[] = [
    {
      id: 1,
      name: "John Doe",
      lastAssessment: "2024-01-15",
      score: 15,
      email: "john.doe@email.com",
      phone: "(555) 123-4567",
      address: "123 Main St, Anytown, USA",
      dateOfBirth: "1985-06-15",
      gender: "Male",
      insuranceProvider: "Blue Cross",
      insuranceNumber: "BC123456789",
      emergencyContact: {
        name: "Jane Doe",
        relation: "Spouse",
        phone: "(555) 987-6543"
      },
      medicalHistory: {
        conditions: ["Anxiety", "Depression"],
        allergies: ["Penicillin"],
        medications: ["Sertraline", "Alprazolam"]
      },
      appointments: [
        {
          date: "2024-01-20",
          time: "10:00 AM",
          type: "Follow-up",
          provider: "Dr. Smith"
        }
      ]
    },
    {
      id: 2,
      name: "Jane Smith",
      lastAssessment: "2024-01-14",
      score: 8,
      email: "jane.smith@email.com",
      phone: "(555) 234-5678",
      address: "456 Oak Ave, Somewhere, USA",
      dateOfBirth: "1990-03-22",
      gender: "Female",
      insuranceProvider: "Aetna",
      insuranceNumber: "AE987654321",
      emergencyContact: {
        name: "John Smith",
        relation: "Brother",
        phone: "(555) 876-5432"
      },
      medicalHistory: {
        conditions: ["PTSD"],
        allergies: [],
        medications: ["Fluoxetine"]
      },
      appointments: [
        {
          date: "2024-01-22",
          time: "2:00 PM",
          type: "Initial",
          provider: "Dr. Johnson"
        }
      ]
    },
    {
      id: 3,
      name: "Mike Johnson",
      lastAssessment: "2024-01-13",
      score: 3,
      email: "mike.johnson@email.com",
      phone: "(555) 345-6789",
      address: "789 Pine St, Elsewhere, USA",
      dateOfBirth: "1978-11-30",
      gender: "Male",
      insuranceProvider: "United",
      insuranceNumber: "UN456789123",
      emergencyContact: {
        name: "Sarah Johnson",
        relation: "Wife",
        phone: "(555) 765-4321"
      },
      medicalHistory: {
        conditions: ["Insomnia"],
        allergies: ["Sulfa"],
        medications: ["Zolpidem"]
      },
      appointments: [
        {
          date: "2024-01-25",
          time: "11:30 AM",
          type: "Follow-up",
          provider: "Dr. Williams"
        }
      ]
    },
    {
      id: 4,
      name: "Sarah Williams",
      lastAssessment: "2024-01-14",
      score: 7,
      email: "sarah.williams@email.com",
      phone: "(555) 456-7890",
      address: "321 Elm St, Nowhere, USA",
      dateOfBirth: "1995-08-07",
      gender: "Female",
      insuranceProvider: "Cigna",
      insuranceNumber: "CI789123456",
      emergencyContact: {
        name: "Michael Williams",
        relation: "Father",
        phone: "(555) 654-3210"
      },
      medicalHistory: {
        conditions: ["Bipolar Disorder"],
        allergies: [],
        medications: ["Lithium", "Quetiapine"]
      },
      appointments: [
        {
          date: "2024-01-28",
          time: "3:30 PM",
          type: "Follow-up",
          provider: "Dr. Brown"
        }
      ]
    },
    {
      id: 5,
      name: "David Brown",
      lastAssessment: "2024-01-16",
      score: 12,
      email: "david.brown@email.com",
      phone: "(555) 567-8901",
      address: "654 Maple Dr, Anywhere, USA",
      dateOfBirth: "1982-04-18",
      gender: "Male",
      insuranceProvider: "Humana",
      insuranceNumber: "HU321654987",
      emergencyContact: {
        name: "Lisa Brown",
        relation: "Sister",
        phone: "(555) 543-2109"
      },
      medicalHistory: {
        conditions: ["OCD", "Anxiety"],
        allergies: ["Latex"],
        medications: ["Paroxetine", "Clonazepam"]
      },
      appointments: [
        {
          date: "2024-01-30",
          time: "1:00 PM",
          type: "Follow-up",
          provider: "Dr. Davis"
        }
      ]
    }
  ];

  private patientsSubject = new BehaviorSubject<Patient[]>(this.patients);
  private searchTermSubject = new BehaviorSubject<string>('');

  getPatients(): Observable<Patient[]> {
    return this.patientsSubject.asObservable();
  }

  searchPatients(term: string) {
    this.searchTermSubject.next(term);
    const filtered = this.patients.filter(patient =>
      patient.name.toLowerCase().includes(term.toLowerCase()) ||
      patient.email.toLowerCase().includes(term.toLowerCase()) ||
      patient.phone.includes(term)
    );
    this.patientsSubject.next(filtered);
  }

  searchPatientsLocal(term: string): Patient[] {
    return this.patients.filter(patient =>
      patient.name.toLowerCase().includes(term.toLowerCase()) ||
      patient.email.toLowerCase().includes(term.toLowerCase()) ||
      patient.phone.includes(term)
    );
  }

  getSearchTerm(): Observable<string> {
    return this.searchTermSubject.asObservable();
  }

  resetSearch() {
    this.searchTermSubject.next('');
    this.patientsSubject.next(this.patients);
  }

  getPatientById(id: number): Patient | undefined {
    return this.patients.find(patient => patient.id === id);
  }
}