import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface JournalEntry {
  id: number;
  date: string;
  mood: string;
  moodColor: string;
  content: string;
}

@Component({
  selector: 'app-patient-journal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="journal">
      <h2>Your Journal</h2>
      <div class="journal-entries">
        @for (entry of entries; track entry.id) {
          <div class="journal-entry">
            <div class="entry-header">
              <h3>{{ entry.date }}</h3>
              <span class="mood-indicator" [style.backgroundColor]="entry.moodColor">
                {{ entry.mood }}
              </span>
            </div>
            <p>{{ entry.content }}</p>
          </div>
        }

        @if (entries.length === 0) {
          <div class="no-entries">
            <p>No journal entries yet</p>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .journal {
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    h2 {
      color: #1e293b;
      margin: 0 0 1rem 0;
    }

    .journal-entries {
      flex: 1;
      overflow-y: auto;
      padding-right: 0.5rem;
    }

    .journal-entries::-webkit-scrollbar {
      width: 0.5rem;
    }

    .journal-entries::-webkit-scrollbar-track {
      background: #f1f5f9;
      border-radius: 0.25rem;
    }

    .journal-entries::-webkit-scrollbar-thumb {
      background: #cbd5e1;
      border-radius: 0.25rem;
    }

    .journal-entries::-webkit-scrollbar-thumb:hover {
      background: #94a3b8;
    }

    .journal-entry {
      padding: 1rem;
      border: 1px solid #e2e8f0;
      border-radius: 0.375rem;
      margin-bottom: 1rem;
      background-color: white;
    }

    .entry-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.5rem;
    }

    .entry-header h3 {
      color: #1e293b;
      margin: 0;
      font-size: 1rem;
    }

    .mood-indicator {
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
      font-size: 0.875rem;
      color: white;
    }

    p {
      color: #64748b;
      font-size: 0.875rem;
      line-height: 1.5;
      margin: 0;
    }

    .no-entries {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      color: #64748b;
      font-style: italic;
    }
  `]
})
export class PatientJournalComponent {
  @Input() patientId!: string;

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