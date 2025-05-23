import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; // Import MatProgressSpinnerModule

@Component({
  selector: 'app-loading-spinner',
  standalone: true, // <-- Mark as standalone
  imports: [ // <-- Add imports array
    CommonModule,
    MatProgressSpinnerModule
  ],
  template: `
    <div class="spinner-container" [ngStyle]="{'height': containerHeight}">
      <mat-progress-spinner
        [color]="color"
        [mode]="'indeterminate'"
        [diameter]="diameter">
      </mat-progress-spinner>
      <p *ngIf="message" class="spinner-message">{{ message }}</p>
    </div>
  `,
  styles: [`
    .spinner-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 200px; /* Consider making this an input property if needed */
    }
    .spinner-message {
      margin-top: 16px;
      font-size: 1rem;
      color: rgba(0, 0, 0, 0.6); /* Use theme colors or CSS variables */
    }
  `]
})
export class LoadingSpinnerComponent {
  @Input() color: 'primary' | 'accent' | 'warn' = 'primary';
  @Input() diameter = 50;
  @Input() message = '';
  @Input() containerHeight = '100%'; // Input for container height
}