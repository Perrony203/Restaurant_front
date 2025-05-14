import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { ServiciosApiService, Servicio } from './servicios-api.service';

@Component({
  selector: 'app-servicios',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
  template: `
    <mat-card class="cardWithShadow theme-card">
      <mat-card-header>
        <mat-card-title class="m-b-0">
          <mat-icon color="primary">tools</mat-icon> Servicios
        </mat-card-title>
      </mat-card-header>
      <mat-card-content class="b-t-1">
        <!-- Formulario para crear servicio -->
        <form (ngSubmit)="crearServicio()" #servicioForm="ngForm" class="m-b-16">
          <div class="row">
            <div class="col-lg-4">
              <mat-form-field appearance="outline" class="w-100">
                <mat-label>Bill</mat-label>
                <input matInput type="number" name="bill" [(ngModel)]="nuevoServicio.bill" required />
              </mat-form-field>
            </div>
            <div class="col-lg-4">
              <mat-form-field appearance="outline" class="w-100">
                <mat-label>Client ID</mat-label>
                <input matInput name="clientId" [(ngModel)]="nuevoServicio.clientId" />
              </mat-form-field>
            </div>
            <div class="col-lg-4 d-flex align-items-end">
              <button mat-flat-button color="primary" type="submit" [disabled]="servicioForm.invalid">Crear</button>
            </div>
          </div>
        </form>

        <!-- Tabla de servicios -->
        <table mat-table [dataSource]="servicios" class="mat-elevation-z1 w-100">
          <ng-container matColumnDef="serviceId">
            <th mat-header-cell *matHeaderCellDef>ID</th>
            <td mat-cell *matCellDef="let s">{{ s.serviceId }}</td>
          </ng-container>
          <ng-container matColumnDef="bill">
            <th mat-header-cell *matHeaderCellDef>Bill</th>
            <td mat-cell *matCellDef="let s">{{ s.bill }}</td>
          </ng-container>
          <ng-container matColumnDef="clientId">
            <th mat-header-cell *matHeaderCellDef>Client ID</th>
            <td mat-cell *matCellDef="let s">{{ s.clientId }}</td>
          </ng-container>
          <ng-container matColumnDef="datetimeOpen">
            <th mat-header-cell *matHeaderCellDef>Abierto</th>
            <td mat-cell *matCellDef="let s">{{ s.datetimeOpen | date:'short' }}</td>
          </ng-container>
          <ng-container matColumnDef="datetimeClose">
            <th mat-header-cell *matHeaderCellDef>Cerrado</th>
            <td mat-cell *matCellDef="let s">{{ s.datetimeClose ? (s.datetimeClose | date:'short') : '-' }}</td>
          </ng-container>
          <ng-container matColumnDef="acciones">
            <th mat-header-cell *matHeaderCellDef>Acciones</th>
            <td mat-cell *matCellDef="let s">
              <button mat-icon-button color="primary" (click)="cerrarServicio(s)" [disabled]="!!s.datetimeClose">
                <mat-icon>lock</mat-icon>
              </button>
              <button mat-icon-button color="accent" (click)="editarBill(s)">
                <mat-icon>edit</mat-icon>
              </button>
              <button mat-icon-button color="warn" (click)="eliminarServicio(s)">
                <mat-icon>delete</mat-icon>
              </button>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="columnas"></tr>
          <tr mat-row *matRowDef="let row; columns: columnas;"></tr>
        </table>
      </mat-card-content>
    </mat-card>

    <!-- Edición rápida de bill -->
    <div *ngIf="servicioEditando" class="m-t-16">
      <mat-card>
        <mat-card-title>Editar Bill</mat-card-title>
        <mat-card-content>
          <form (ngSubmit)="guardarBill()">
            <mat-form-field appearance="outline">
              <mat-label>Nuevo Bill</mat-label>
              <input matInput type="number" [(ngModel)]="servicioEditando!.bill" name="editBill" required />
            </mat-form-field>
            <button mat-flat-button color="primary" type="submit">Guardar</button>
            <button mat-stroked-button color="warn" type="button" (click)="servicioEditando = null">Cancelar</button>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
})
export class ServiciosComponent implements OnInit {
  servicios: Servicio[] = [];
  columnas = ['serviceId', 'bill', 'clientId', 'datetimeOpen', 'datetimeClose', 'acciones'];
  nuevoServicio: Partial<Servicio> = {};
  servicioEditando: Servicio | null = null;

  constructor(private api: ServiciosApiService) {}

  ngOnInit() {
    this.cargarServicios();
  }

  cargarServicios() {
    this.api.getServicios().subscribe(data => this.servicios = data);
  }

  crearServicio() {
    this.api.createServicio(this.nuevoServicio).subscribe(() => {
      this.nuevoServicio = {};
      this.cargarServicios();
    });
  }

  cerrarServicio(servicio: Servicio) {
    if (!servicio.serviceId) return;
    const datetimeClose = new Date().toISOString();
    this.api.updateServicioCloseDate(servicio.serviceId, datetimeClose).subscribe(() => {
      this.cargarServicios();
    });
  }

  editarBill(servicio: Servicio) {
    this.servicioEditando = { ...servicio };
  }

  guardarBill() {
    if (!this.servicioEditando?.serviceId || this.servicioEditando.bill == null) return;
    this.api.updateServicioBill(this.servicioEditando.serviceId, this.servicioEditando.bill).subscribe(() => {
      this.servicioEditando = null;
      this.cargarServicios();
    });
  }

  eliminarServicio(servicio: Servicio) {
    if (!servicio.serviceId) return;
    this.api.deleteServicio(servicio.serviceId).subscribe(() => {
      this.cargarServicios();
    });
  }
}
