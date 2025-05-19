import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { ServiceService } from 'src/app/services/Service/service.service';
import { MaterialModule } from 'src/app/material.module';
import { MatDialog } from '@angular/material/dialog';
import { ServiceSuccessDialogComponent } from '../service-success-dialog.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Service } from 'src/app/models/service.model';

@Component({
  selector: 'app-service-form',
  templateUrl: './service-form.component.html',
  styleUrls: ['./service-form.component.scss'],
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
})
export class ServiceFormComponent {
  form: FormGroup;
  submitted = false;
  isEdit = false;
  serviceId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private serviceService: ServiceService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // Formatear la fecha y hora actual para input type='datetime-local'
    const now = new Date();
    const pad = (n: number) => n.toString().padStart(2, '0');
    const formatted = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}`;

    this.form = this.fb.group({
      clientId: [{ value: '', disabled: false }, [Validators.required, Validators.pattern('^[0-9]+$')]],
      bill: ['', [Validators.required, Validators.min(0)]],
      datetimeClose: [formatted, [this.noPastDateValidator]]
    });

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEdit = true;
        this.serviceId = id;
        this.serviceService.getServiceById(id).subscribe((service: Service) => {
          this.form.patchValue({
            clientId: service.clientId,
            bill: service.bill,
            datetimeClose: service.datetimeClose ? (typeof service.datetimeClose === 'string' ? String(service.datetimeClose).substring(0, 16) : new Date(service.datetimeClose as any).toISOString().substring(0, 16)) : ''
          });
          this.form.get('clientId')?.disable();
        });
      }
    });
  }

  noPastDateValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;
    const now = new Date();
    const inputDate = new Date(control.value);
    // Solo comparar hasta minutos
    now.setSeconds(0, 0);
    inputDate.setSeconds(0, 0);
    return inputDate < now ? { pastDate: true } : null;
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.valid) {
      if (this.isEdit && this.serviceId) {
        const updateData: any = {
          bill: this.form.get('bill')?.value,
          datetimeClose: this.form.get('datetimeClose')?.value
        };
        this.serviceService.updateService(this.serviceId, updateData).subscribe(() => {
          this.dialog.open(ServiceSuccessDialogComponent, {
            width: '420px',
            data: {
              title: '¡Actualizado!',
              message: '¡Servicio actualizado exitosamente!'
            }
          });
        });
      } else {
        this.serviceService.createService(this.form.getRawValue()).subscribe(() => {
          this.dialog.open(ServiceSuccessDialogComponent, {
            width: '420px',
            data: {
              title: '¡Éxito!',
              message: '¡Servicio creado exitosamente!'
            }
          });
        });
      }
    }
  }
} 