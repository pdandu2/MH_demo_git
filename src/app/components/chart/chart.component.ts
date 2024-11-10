import { Component, OnInit, Input } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  standalone: true
})
export class ChartComponent implements OnInit {
  @Input() selectedPatientId?: string;

  private chart?: Chart;

  ngOnInit() {
    this.createChart();
  }

  createChart() {
    const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    
    const surveyData = {
      'Interest & Pleasure': [7, 6, 8, 7, 8, 9, 8],
      'Emotional State': [6, 5, 7, 6, 8, 8, 7],
      'Sleep Quality': [5, 6, 6, 7, 8, 8, 7],
      'Energy Level': [6, 5, 7, 6, 7, 8, 7]
    };

    const ctx = document.getElementById('surveyChart') as HTMLCanvasElement;
    
    // Destroy existing chart if it exists
    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: weekDays,
        datasets: [
          {
            label: 'Interest & Pleasure',
            data: surveyData['Interest & Pleasure'],
            borderColor: '#4CAF50',
            backgroundColor: 'rgba(76, 175, 80, 0.1)',
            tension: 0.3,
            fill: true
          },
          {
            label: 'Emotional State',
            data: surveyData['Emotional State'],
            borderColor: '#2196F3',
            backgroundColor: 'rgba(33, 150, 243, 0.1)',
            tension: 0.3,
            fill: true
          },
          {
            label: 'Sleep Quality',
            data: surveyData['Sleep Quality'],
            borderColor: '#9C27B0',
            backgroundColor: 'rgba(156, 39, 176, 0.1)',
            tension: 0.3,
            fill: true
          },
          {
            label: 'Energy Level',
            data: surveyData['Energy Level'],
            borderColor: '#FF9800',
            backgroundColor: 'rgba(255, 152, 0, 0.1)',
            tension: 0.3,
            fill: true
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Weekly Mental Health Indicators',
            font: {
              size: 16
            }
          },
          legend: {
            position: 'bottom',
            labels: {
              padding: 20
            }
          },
          tooltip: {
            mode: 'index',
            intersect: false
          }
        },
        scales: {
          y: {
            title: {
              display: true,
              text: 'Happiness Index'
            },
            min: 0,
            max: 10,
            ticks: {
              stepSize: 1
            }
          },
          x: {
            title: {
              display: true,
              text: 'Day of Week'
            }
          }
        },
        interaction: {
          mode: 'nearest',
          axis: 'x',
          intersect: false
        }
      }
    });
  }
}