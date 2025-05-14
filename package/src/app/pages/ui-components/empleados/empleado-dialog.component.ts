import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-empleado-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  template: `
    <h2 mat-dialog-title>Nuevo Empleado</h2>
    <form [formGroup]="form" (ngSubmit)="onSubmit()" mat-dialog-content>
      <mat-form-field appearance="outline" class="w-100 m-b-8">
        <mat-label>ID</mat-label>
        <input matInput formControlName="employeeId" required />
      </mat-form-field>
      <mat-form-field appearance="outline" class="w-100 m-b-8">
        <mat-label>Tipo ID</mat-label>
        <input matInput formControlName="idType" required />
      </mat-form-field>
      <mat-form-field appearance="outline" class="w-100 m-b-8">
        <mat-label>Nombre</mat-label>
        <input matInput formControlName="name" required />
      </mat-form-field>
      <mat-form-field appearance="outline" class="w-100 m-b-8">
        <mat-label>Teléfono</mat-label>
        <input matInput formControlName="phoneNumber" />
      </mat-form-field>
      <mat-form-field appearance="outline" class="w-100 m-b-8">
        <mat-label>Contraseña</mat-label>
        <input matInput type="password" formControlName="password" required />
      </mat-form-field>
      <div class="d-flex justify-content-end gap-8 m-t-16">
        <button mat-stroked-button type="button" (click)="onCancel()">Cancelar</button>
        <button mat-flat-button color="primary" type="submit" [disabled]="form.invalid">Crear</button>
      </div>
    </form>
  `,
})
export class EmpleadoDialogComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EmpleadoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      employeeId: ['', Validators.required],
      idType: ['', Validators.required],
      name: ['', Validators.required],
      phoneNumber: [''],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
} 