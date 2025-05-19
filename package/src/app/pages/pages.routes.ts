import { Routes } from '@angular/router';
import { StarterComponent } from './starter/starter.component';
import { authGuard } from '../guards/auth.guard';
import { ServicesRoutes } from './services/services.routes';

export const PagesRoutes: Routes = [
  {
    path: 'dashboard',
    children: [
      {
        path: '',
        component: StarterComponent,
        data: {
          title: 'Starter Page',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'Starter Page' },
          ],
        },
        canActivate: [authGuard]
      },
      {
        path: 'services',
        children: ServicesRoutes
      }
    ]
  }
];
