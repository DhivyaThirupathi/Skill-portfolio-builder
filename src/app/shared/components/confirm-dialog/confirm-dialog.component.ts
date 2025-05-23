import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle, // Explicitly import MatDialogTitle
  MatDialogContent, // Explicitly import MatDialogContent
  MatDialogActions, // Explicitly import MatDialogActions
  MatDialogModule // Import MatDialogModule
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button'; // Import MatButtonModule
import { CommonModule } from '@angular/common'; // Import CommonModule

export interface ConfirmDialogData {
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
}

@Component({
  selector: 'app-confirm-dialog',
  standalone: true, // <-- Mark as standalone
  imports: [ // <-- Add imports array
    CommonModule,
    MatDialogModule, // Import the module providing dialog components/services
    MatButtonModule, // Import button module
    // Although included in MatDialogModule, sometimes explicit import helps clarity/compilation
    // MatDialogTitle,
    // MatDialogContent,
    // MatDialogActions,
  ],
  template: `
    <h2 mat-dialog-title>{{ data.title }}</h2>
    <mat-dialog-content>
      <p>{{ data.message }}</p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">{{ data.cancelText }}</button>
      <button mat-raised-button color="primary" (click)="onConfirm()">{{ data.confirmText }}</button>
    </mat-dialog-actions>
  `,
  styles: [`
    mat-dialog-content {
      min-width: 300px;
    }
    mat-dialog-actions {
      margin-bottom: 8px;
    }
  `]
})
export class ConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData
  ) {}

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}