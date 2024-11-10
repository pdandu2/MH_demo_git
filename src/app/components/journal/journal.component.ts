import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface JournalEntry {
  id: number;
  date: string;
  mood: string;
  moodColor: string;
  content: string;
}

@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class JournalComponent {
  @Input() selectedPatientId: string = '';

  entries: JournalEntry[] = [
    {
      id: 1,
      date: '2024-01-15',
      mood: 'Good',
      moodColor: '#16a34a',
      content: 'Had a productive therapy session today. Feeling more confident about managing anxiety.'
    },
    {
      id: 2,
      date: '2024-01-14',
      mood: 'Fair',
      moodColor: '#d97706',
      content: 'Sleep was better last night. Still working on maintaining a consistent schedule.'
    },
    {
      id: 3,
      date: '2024-01-13',
      mood: 'Excellent',
      moodColor: '#059669',
      content: 'Great day! Completed all my exercises and maintained positive thoughts throughout.'
    }
  ];
}