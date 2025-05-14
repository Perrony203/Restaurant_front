import {Routes} from '@angular/router';
import { DishesListComponent } from './dishes-list/dishes-list.component';
import { DishesFormComponent } from './dishes-form/dishes-form.component';
import { authGuard } from 'src/app/guards/auth.guard';



export const DishesRoutes: Routes = [{
    path:'',
    children: [
        {
            path:'',
            component: DishesListComponent
        },
        {
            path:'create',
            component: DishesFormComponent
        },
        {
            path:'create/:id',
            component: DishesFormComponent
        }
    ], canActivate: [authGuard]
}];