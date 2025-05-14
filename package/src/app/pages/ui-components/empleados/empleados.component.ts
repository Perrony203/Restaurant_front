import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { EmpleadosApiService, Empleado } from './empleados-api.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EmpleadoDialogComponent } from './empleado-dialog.component';

@Component({
  selector: 'app-empleados',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatDialogModule
  ],
  template: `
    <mat-card class="cardWithShadow theme-card">
      <mat-card-header>
        <mat-card-title class="m-b-0">
          <mat-icon color="primary">users</mat-icon> Empleados
        </mat-card-title>
        <button mat-flat-button color="primary" (click)="abrirDialogoNuevoEmpleado()" class="m-l-auto">Nuevo empleado</button>
      </mat-card-header>
      <mat-card-content class="b-t-1">
        <!-- Tabla de empleados -->
        <table mat-table [dataSource]="empleados" class="mat-elevation-z1 w-100">
          <ng-container matColumnDef="employeeId">
            <th mat-header-cell *matHeaderCellDef>ID</th>
            <td mat-cell *matCellDef="let e">{{ e.employeeId }}</td>
          </ng-container>
          <ng-container matColumnDef="idType">
            <th mat-header-cell *matHeaderCellDef>Tipo ID</th>
            <td mat-cell *matCellDef="let e">{{ e.idType }}</td>
          </ng-container>
          <ng-container matColumnDef="name">
            <th mat-header-cell *matHeaderCellDef>Nombre</th>
            <td mat-cell *matCellDef="let e">{{ e.name }}</td>
          </ng-container>
          <ng-container matColumnDef="phoneNumber">
            <th mat-header-cell *matHeaderCellDef>Teléfono</th>
            <td mat-cell *matCellDef="let e">{{ e.phoneNumber }}</td>
          </ng-container>
          <ng-container matColumnDef="acciones">
            <th mat-header-cell *matHeaderCellDef>Acciones</th>
            <td mat-cell *matCellDef="let e">
              <button mat-icon-button color="accent" (click)="editarEmpleado(e)">
                <mat-icon>edit</mat-icon>
              </button>
              <button mat-icon-button color="warn" (click)="eliminarEmpleado(e)">
                <mat-icon>delete</mat-icon>
              </button>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="columnas"></tr>
          <tr mat-row *matRowDef="let row; columns: columnas;"></tr>
        </table>
      </mat-card-content>
    </mat-card>

    <!-- Edición rápida de empleado -->
    <div *ngIf="empleadoEditando" class="m-t-16">
      <mat-card>
        <mat-card-title>Editar Empleado</mat-card-title>
        <mat-card-content>
          <form (ngSubmit)="guardarEmpleado()">
            <mat-form-field appearance="outline">
              <mat-label>Nombre</mat-label>
              <input matInput [(ngModel)]="empleadoEditando!.name" name="editName" required />
            </mat-form-field>
            <mat-form-field appearance="outline">
              <mat-label>Teléfono</mat-label>
              <input matInput [(ngModel)]="empleadoEditando!.phoneNumber" name="editPhone" />
            </mat-form-field>
            <button mat-flat-button color="primary" type="submit">Guardar</button>
            <button mat-stroked-button color="warn" type="button" (click)="empleadoEditando = null">Cancelar</button>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
})
export class EmpleadosComponent implements OnInit {
  empleados: Empleado[] = [];
  columnas = ['employeeId', 'idType', 'name', 'phoneNumber', 'acciones'];
  empleadoEditando: Empleado | null = null;

  constructor(private api: EmpleadosApiService, private dialog: MatDialog) {}

  ngOnInit() {
    this.cargarEmpleados();
  }

  cargarEmpleados() {
    this.api.getEmpleados().subscribe(data => this.empleados = data);
  }

  abrirDialogoNuevoEmpleado() {
    const dialogRef = this.dialog.open(EmpleadoDialogComponent, {
      width: '400px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.api.createEmpleado(result).subscribe(() => {
          this.cargarEmpleados();
        });
      }
    });
  }

  editarEmpleado(empleado: Empleado) {
    this.empleadoEditando = { ...empleado };
  }

  guardarEmpleado() {
    if (!this.empleadoEditando?.employeeId) return;
    const { name, phoneNumber } = this.empleadoEditando;
    this.api.updateEmpleado(this.empleadoEditando.employeeId, { name, phoneNumber }).subscribe(() => {
      this.empleadoEditando = null;
      this.cargarEmpleados();
    });
  }

  eliminarEmpleado(empleado: Empleado) {
    if (!empleado.employeeId) return;
    this.api.deleteEmpleado(empleado.employeeId).subscribe(() => {
      this.cargarEmpleados();
    });
  }
}
