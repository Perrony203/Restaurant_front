import { Routes } from '@angular/router';
import { StarterComponent } from './starter/starter.component';
import { authGuard } from '../guards/auth.guard';

export const PagesRoutes: Routes = [{
  path: '',
  component: StarterComponent,
  data: {
    title: 'Starter Page',
    urls: [
      { title: 'Dashboard', url: '/dashboards/dashboard1' },
      { title: 'Starter Page' },
    ],
  }, canActivate: [authGuard]
}];
