import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { EmployeeService } from 'src/app/services/Service/employee.service';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeSuccessDialogComponent } from '../employee-success-dialog.component';
import { MaterialModule } from 'src/app/material.module';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/models/employee.model';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss'],
  standalone: true,
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
})
export class EmployeeFormComponent {
  form: FormGroup;
  submitted = false;
  idTypes = ['DNI', 'Pasaporte', 'Cédula'];
  isEdit = false;
  employeeId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.fb.group({
      employeeId: [{ value: '', disabled: false }, [Validators.required, Validators.pattern('^[0-9]+$')]],
      idType: ['', Validators.required],
      name: ['', [Validators.required, Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$')]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      password: ['']
    });

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEdit = true;
        this.employeeId = id;
        this.employeeService.getEmployeeById(id).subscribe((employee: Employee) => {
          this.form.patchValue({
            employeeId: employee.employeeId,
            idType: employee.idType,
            name: employee.name,
            phoneNumber: employee.phoneNumber
          });
        });
      }
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.valid) {
      if (this.isEdit && this.employeeId) {
        const updateData: any = {
          idType: this.form.get('idType')?.value,
          name: this.form.get('name')?.value,
          phoneNumber: this.form.get('phoneNumber')?.value
        };
        if (this.form.get('password')?.value) {
          updateData.password = this.form.get('password')?.value;
        }
        this.employeeService.updateEmployee(this.employeeId, updateData).subscribe(() => {
          this.dialog.open(EmployeeSuccessDialogComponent, {
            width: '420px',
            data: {
              title: '¡Actualizado!',
              message: '¡Empleado actualizado exitosamente!'
            }
          });
          // Opcional: redirigir
        });
      } else {
        this.employeeService.createEmployee(this.form.getRawValue()).subscribe(() => {
          this.dialog.open(EmployeeSuccessDialogComponent, {
            width: '420px',
            data: {
              title: '¡Éxito!',
              message: '¡Empleado creado exitosamente!'
            }
          });
          // Opcional: limpiar el formulario o redirigir
        });
      }
    }
  }
} 