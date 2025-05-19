import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-employee-success-dialog',
  template: `
    <div class="modern-dialog-content">
      <div class="icon-container">
        <mat-icon color="primary" class="success-icon">check_circle</mat-icon>
      </div>
      <h2 class="dialog-title">{{ data.title }}</h2>
      <p class="dialog-message">{{ data.message }}</p>
      <div class="dialog-actions">
        <button mat-raised-button color="primary" class="modern-btn" (click)="close()">
          <mat-icon>done</mat-icon>
          Cerrar
        </button>
      </div>
    </div>
  `,
  styles: [`
    .modern-dialog-content {
      text-align: center;
      padding: 40px 32px 32px 32px;
      border-radius: 24px;
      min-width: 350px;
      max-width: 500px;
      background: #fff;
      box-shadow: 0 8px 32px rgba(0,0,0,0.18);
    }
    .icon-container {
      display: flex;
      justify-content: center;
      margin-bottom: 16px;
    }
    .success-icon {
      font-size: 64px;
      color: #4caf50;
      background: linear-gradient(135deg, #4caf50 60%, #81c784 100%);
      border-radius: 50%;
      padding: 8px;
      box-shadow: 0 2px 8px rgba(76,175,80,0.15);
    }
    .dialog-title {
      font-size: 2rem;
      font-weight: 700;
      margin: 0 0 8px 0;
      color: #222;
    }
    .dialog-message {
      font-size: 1.1rem;
      color: #555;
      margin-bottom: 32px;
    }
    .dialog-actions {
      display: flex;
      justify-content: center;
    }
    .modern-btn {
      font-size: 1.1rem;
      padding: 12px 32px;
      border-radius: 32px;
      background: linear-gradient(90deg, #00c6ff 0%, #0072ff 100%);
      color: #fff;
      font-weight: 600;
      box-shadow: 0 2px 8px rgba(0,123,255,0.15);
      transition: background 0.2s;
    }
    .modern-btn:hover {
      background: linear-gradient(90deg, #0072ff 0%, #00c6ff 100%);
    }
  `],
  imports: [MatIconModule]
})
export class EmployeeSuccessDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<EmployeeSuccessDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string, message: string }
  ) {}

  close() {
    this.dialogRef.close();
  }
} 