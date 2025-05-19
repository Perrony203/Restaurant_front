import { Routes } from '@angular/router';
import { ServiceListComponent } from './service-list/service-list.component';
import { ServiceFormComponent } from './service-form/service-form.component';

export const ServicesRoutes: Routes = [{
  path: '',
  children: [
    { path: '', component: ServiceListComponent },
    { path: 'create', component: ServiceFormComponent },
    { path: 'edit/:id', component: ServiceFormComponent }
  ]
}]; 