import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/Service/employee.service';
import { Employee } from 'src/app/models/employee.model';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeSuccessDialogComponent } from '../employee-success-dialog.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterModule],
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];

  constructor(private employeeService: EmployeeService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe((data) => {
      this.employees = data;
    });
  }

  deleteEmployee(employeeId: string | undefined) {
    if (!employeeId) return;
    this.employeeService.deleteEmployee(employeeId).subscribe(() => {
      this.employees = this.employees.filter(e => e.employeeId !== employeeId);
      this.dialog.open(EmployeeSuccessDialogComponent, {
        width: '420px',
        data: {
          title: '¡Eliminado!',
          message: 'El empleado fue eliminado correctamente.'
        }
      });
    });
  }
} 