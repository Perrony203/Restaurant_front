import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/Service/service.service';
import { Service } from 'src/app/models/service.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { MatDialog } from '@angular/material/dialog';
import { ServiceSuccessDialogComponent } from '../service-success-dialog.component';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.scss'],
  imports: [CommonModule, RouterModule, MaterialModule],
})
export class ServiceListComponent implements OnInit {
  services: Service[] = [];

  constructor(private serviceService: ServiceService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.serviceService.getServices().subscribe((data) => {
      this.services = data;
    });
  }

  deleteService(serviceId: string | undefined) {
    if (!serviceId) return;
    this.serviceService.deleteService(serviceId).subscribe(() => {
      this.services = this.services.filter(s => s.serviceId !== serviceId);
      this.dialog.open(ServiceSuccessDialogComponent, {
        width: '420px',
        data: {
          title: '¡Eliminado!',
          message: 'El servicio fue eliminado correctamente.'
        }
      });
    });
  }
} 