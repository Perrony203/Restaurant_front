import { Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';

export const routes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/dashboard/dishes',
        pathMatch: 'full',
      },
      {
        path: 'dashboard/dishes',
        loadChildren: () =>
          import('./pages/dishes/dishes.routes').then((m) => m.DishesRoutes),
      },
      {
        path: 'dashboard/ingredients',
        loadChildren: () =>
          import('./pages/ingredients/ingredients.route').then((m) => m.IngredientRoutes),
      },      
    ],
  },
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: 'authentication',
        loadChildren: () =>
          import('./pages/authentication/authentication.routes').then(
            (m) => m.AuthenticationRoutes
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'authentication/error',
  },
];
